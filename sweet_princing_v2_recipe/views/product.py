from django.http import JsonResponse
from django.shortcuts import render, get_object_or_404
from django.core.paginator import Paginator
from django.views.decorators.http import require_GET, require_POST
from ..models import Product
from ..forms import ProductForm


@require_POST
def product_create(request):
    form = ProductForm(request.POST)
    if not form.is_valid():
        return JsonResponse({
            "ok": False,
            "errors": form.errors
        })
    product = form.save()
    product.price = 0
    product.save()
    return JsonResponse({
            "ok": True,
            "id": product.pk,
            "name": product.name
        })


@require_GET
def product_recover(request):
    query = request.GET.get("q", "")
    products = Product.objects.all().order_by("name")
    if (query):
        products = products.filter(name__icontains=query)
    page = Paginator(products, 10).get_page(request.GET.get("page"))
    return render(request, "product/index.html", {
        "data": {
            "entities": page.object_list,
            "pagination": page,
            "title": "Produtos",
            "new_button_label": "Novo produto"
        }
    })


@require_GET
def product_search(request):
    query = request.GET.get("q", "")
    products = Product.objects.all().order_by("name")
    if (query):
        products = products.filter(name__icontains=query)
    products_data = list(products.values("id", "name"))
    return JsonResponse({
        "ok": True,
        "products": products_data
    })


@require_POST
def product_update(request, pk: int):
    product = get_object_or_404(Product, pk=pk)
    form = ProductForm(request.POST, instance=product)
    if not form.is_valid():
        return JsonResponse({"ok": False, "errors": form.errors}, status=400)
    product = form.save()
    return JsonResponse({"ok": True, "id": product.pk, "name": product.name})


@require_POST
def product_delete(request, pk: int):
    product = get_object_or_404(Product, pk=pk)
    product.delete()
    return JsonResponse({ "OK": True })