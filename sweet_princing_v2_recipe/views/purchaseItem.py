from django.http import JsonResponse
from django.shortcuts import  get_object_or_404
from django.views.decorators.http import require_POST
from ..models import PurchaseItem
from ..forms import PurchaseItemForm


@require_POST
def purchase_item_create(request):
    form = PurchaseItemForm(request.POST)    
    if not form.is_valid():
        return JsonResponse({
            "ok": False,
            "errors": form.errors
        })
    purchaseItem = form.save()
    return JsonResponse({
            "ok": True,
            "id": purchaseItem.pk
        })


@require_POST
def purchase_item_update(request, pk: int):
    purchaseItem = get_object_or_404(PurchaseItem, pk=pk)
    form = PurchaseItemForm(request.POST, instance=purchaseItem)
    if not form.is_valid():
        return JsonResponse({"ok": False, "errors": form.errors}, status=400)
    purchaseItem = form.save()
    return JsonResponse({"ok": True, "id": purchaseItem.pk})


@require_POST
def purchase_item_delete(_, pk: int):
    purchaseItem = get_object_or_404(PurchaseItem, pk=pk)
    purchaseItem.delete()
    return JsonResponse({ "OK": True })