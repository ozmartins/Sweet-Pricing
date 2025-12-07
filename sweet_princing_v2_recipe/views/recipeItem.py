from django.http import JsonResponse
from django.shortcuts import render, get_object_or_404
from django.core.paginator import Paginator
from django.views.decorators.http import require_GET, require_POST
from ..models import RecipeItem, Ingredient
from ..forms import RecipeItemForm


@require_POST
def recipe_item_create(request):
    form = RecipeItemForm(request.POST)
    if not form.is_valid():
        return JsonResponse({
            "ok": False,
            "errors": form.errors
        })
    recipeItem = form.save()
    return JsonResponse({
            "ok": True,
            "id": recipeItem.pk
        })


@require_GET
def recipe_item_recover(request, pk: int):
    recipes = RecipeItem.objects.all().filter(recipe__id=pk)
    page = Paginator(recipes, 10).get_page(request.GET.get("page"))    
    return render(request, "recipe/index.html", {
        "data": {            
            "entities": page.object_list,
            "pagination": page,            
        }
    })


@require_POST
def recipe_item_update(request, pk: int):
    recipeItem = get_object_or_404(RecipeItem, pk=pk)
    form = RecipeItemForm(request.POST, instance=recipeItem)
    if not form.is_valid():
        return JsonResponse({"ok": False, "errors": form.errors}, status=400)
    recipeItem = form.save()
    return JsonResponse({"ok": True, "id": recipeItem.pk})


@require_POST
def recipe_item_delete(request, pk: int):
    recipeItem = get_object_or_404(RecipeItem, pk=pk)
    recipeItem.delete()
    return JsonResponse({ "OK": True })