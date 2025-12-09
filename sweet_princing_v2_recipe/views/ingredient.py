from django.http import JsonResponse
from django.shortcuts import render, get_object_or_404
from django.core.paginator import Paginator
from django.views.decorators.http import require_GET, require_POST
from django.contrib.auth.decorators import login_required
from ..models import Ingredient
from ..forms import IngredientForm


@login_required
@require_POST
def ingredient_create(request):
    form = IngredientForm(request.POST)
    if not form.is_valid():
        return JsonResponse({
            "ok": False,
            "errors": form.errors
        })
    ingredient = form.save()
    ingredient.lastCost = 0
    ingredient.save()
    return JsonResponse({
            "ok": True,
            "id": ingredient.pk,
            "name": ingredient.name
        })


@login_required
@require_GET
def ingredient_recover(request):
    query = request.GET.get("q", "")
    ingredients = Ingredient.objects.all().order_by("name")
    if (query):
        ingredients = ingredients.filter(name__icontains=query)
    page = Paginator(ingredients, 10).get_page(request.GET.get("page"))
    return render(request, "ingredient/index.html", {
        "data": {
            "entities": page.object_list,
            "pagination": page,
            "title": "Ingredientes",
            "new_button_label": "Novo ingrediente"
        }
    })


@login_required
@require_GET
def ingredient_search(request):
    query = request.GET.get("q", "")
    ingredients = Ingredient.objects.all().order_by("name")
    if (query):
        ingredients = ingredients.filter(name__icontains=query)
    ingredients_data = list(ingredients.values("id", "name"))
    return JsonResponse({
        "ok": True,
        "ingredients": ingredients_data
    })


@login_required
@require_POST
def ingredient_update(request, pk: int):
    ingredient = get_object_or_404(Ingredient, pk=pk)
    form = IngredientForm(request.POST, instance=ingredient)
    if not form.is_valid():
        return JsonResponse({"ok": False, "errors": form.errors}, status=400)
    ingredient = form.save()
    return JsonResponse({"ok": True, "id": ingredient.pk, "name": ingredient.name})


@login_required
@require_POST
def ingredient_delete(request, pk: int):
    ingredient = get_object_or_404(Ingredient, pk=pk)
    ingredient.delete()
    return JsonResponse({ "OK": True })