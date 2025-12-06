from django.http import JsonResponse
from django.shortcuts import render, get_object_or_404
from django.core.paginator import Paginator
from django.views.decorators.http import require_GET, require_POST
from ..models import Supplier
from ..forms import SupplierForm


@require_POST
def supplier_create(request):
    form = SupplierForm(request.POST)
    if not form.is_valid():
        return JsonResponse({
            "ok": False,
            "errors": form.errors
        })
    supplier = form.save()
    return JsonResponse({
            "ok": True,
            "id": supplier.pk,
            "name": supplier.name
        })


@require_GET
def supplier_recover(request):
    query = request.GET.get("q", "")
    suppliers = Supplier.objects.all().order_by("name")
    if (query):
        suppliers = suppliers.filter(name__icontains=query)
    page = Paginator(suppliers, 10).get_page(request.GET.get("page"))
    return render(request, "supplier/index.html", {
        "data": {
            "entities": page.object_list,
            "pagination": page,
            "title": "Fornecedores",
            "new_button_label": "Novo fornecedor"
        }
    })


@require_POST
def supplier_update(request, pk: int):
    supplier = get_object_or_404(Supplier, pk=pk)
    form = SupplierForm(request.POST, instance=supplier)
    if not form.is_valid():
        return JsonResponse({"ok": False, "errors": form.errors}, status=400)
    supplier = form.save()
    return JsonResponse({"ok": True, "id": supplier.pk, "name": supplier.name})


@require_POST
def supplier_delete(request, pk: int):
    supplier = get_object_or_404(Supplier, pk=pk)
    supplier.delete()
    return JsonResponse({ "OK": True })