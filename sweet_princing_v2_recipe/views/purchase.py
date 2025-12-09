from django.http import JsonResponse
from django.shortcuts import render, get_object_or_404
from django.core.paginator import Paginator
from django.views.decorators.http import require_GET, require_POST
from django.contrib.auth.decorators import login_required
from ..models import Purchase
from ..forms import PurchaseForm


@login_required
@require_POST
def purchase_create(request):
    form = PurchaseForm(request.POST)
    if not form.is_valid():
        return JsonResponse({
            "ok": False,
            "errors": form.errors
        })
    purchase = form.save()
    return JsonResponse({
            "ok": True,
            "id": purchase.pk
        })


@login_required
@require_GET
def purchase_recover(request):
    query = request.GET.get("q", "")
    purchases = Purchase.objects.all().order_by("create_at")
    if (query):
        purchases = purchases.filter(supplier__name__icontains=query)
    page = Paginator(purchases, 10).get_page(request.GET.get("page"))
    return render(request, "purchase/index.html", {
        "data": {
            "entities": page.object_list,
            "pagination": page,
            "title": "Receitas",
            "new_button_label": "Nova compra"
        }
    })


@login_required
@require_POST
def purchase_update(request, pk: int):
    purchase = get_object_or_404(Purchase, pk=pk)
    form = PurchaseForm(request.POST, instance=purchase)
    if not form.is_valid():
        return JsonResponse({"ok": False, "errors": form.errors}, status=400)
    purchase = form.save()
    return JsonResponse({"ok": True, "id": purchase.pk})


@login_required
@require_POST
def purchase_delete(request, pk: int):
    purchase = get_object_or_404(Purchase, pk=pk)
    purchase.delete()
    return JsonResponse({ "OK": True })