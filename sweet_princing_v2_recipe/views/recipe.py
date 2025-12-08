from django.http import JsonResponse
from django.shortcuts import render, get_object_or_404
from django.core.paginator import Paginator
from django.views.decorators.http import require_GET, require_POST
from ..models import Recipe, RecipeItem, Product
from ..forms import RecipeForm


@require_POST
def recipe_create(request):
    form = RecipeForm(request.POST)
    if not form.is_valid():
        return JsonResponse({
            "ok": False,
            "errors": form.errors
        })
    recipe = form.save()
    return JsonResponse({
            "ok": True,
            "id": recipe.pk
        })


@require_GET
def recipe_recover(request, pk:int):    
    product = Product.objects.all().filter(id=pk).first()    
    recipe = Recipe.objects.all().order_by("product__name").filter(product__id=pk).first()
    recipeItems = RecipeItem.objects.all().order_by("id").filter(recipe__id=recipe.id)
    page = Paginator(recipeItems, 10).get_page(request.GET.get("page"))
    return render(request, "recipe/index.html", {
        "data": {
            "product": product,
            "recipe": recipe,
            "itens": page.object_list,
            "pagination": page
        }
    })


@require_POST
def recipe_update(request, pk: int):
    recipe = get_object_or_404(Recipe, pk=pk)
    form = RecipeForm(request.POST, instance=recipe)
    if not form.is_valid():
        return JsonResponse({"ok": False, "errors": form.errors}, status=400)
    recipe = form.save()
    return JsonResponse({"ok": True, "id": recipe.pk})


@require_POST
def recipe_delete(request, pk: int):
    recipe = get_object_or_404(Recipe, pk=pk)
    recipe.delete()
    return JsonResponse({ "OK": True })


@require_GET
def recipe_search(request):
    query = request.GET.get("q", "")
    recipes = Recipe.objects.all()
    if (query):
        recipes = recipes.filter(product__id=query)
    recipes_data = list(recipes.values("id"))
    return JsonResponse({
        "ok": True,
        "recipes": recipes_data
    })