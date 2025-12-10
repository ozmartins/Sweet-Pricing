from django.shortcuts import render
from django.views.decorators.http import require_GET, require_POST
from django.contrib.auth.decorators import login_required
from ..models import Product, Recipe, RecipeItem


@login_required
@require_GET
def pricing_recover(request):
    products = Product.objects.for_user(request.user).order_by("name")
    return render(request, "pricing/index.html", {
        "data": {
            "products": products
        }
    })

@login_required
@require_POST
def pricing_calculate(request):
    product_id = int(request.POST["product"])
    products = Product.objects.for_user(request.user).order_by("name")    
    recipe = Recipe.objects.filter(product__id=product_id).first()
    items = RecipeItem.objects.filter(recipe__id=recipe.id)
    return render(request, "pricing/index.html", {
        "data": {
            "products": products,
            "product": product_id,
            "recipe": recipe,
            "items": items
        }
    })