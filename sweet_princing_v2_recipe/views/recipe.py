from django.http import JsonResponse
from django.shortcuts import render, get_object_or_404
from django.core.paginator import Paginator
from django.views.decorators.http import require_GET, require_POST
from ..models import Recipe
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
def recipe_recover(request):
    query = request.GET.get("q", "")
    recipes = Recipe.objects.all().order_by("product__name")
    if (query):
        recipes = recipes.filter(product__name__icontains=query)
    page = Paginator(recipes, 10).get_page(request.GET.get("page"))
    return render(request, "recipe/index.html", {
        "data": {
            "entities": page.object_list,
            "pagination": page,
            "title": "Receitas",
            "new_button_label": "Nova receita"
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