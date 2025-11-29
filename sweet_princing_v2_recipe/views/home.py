from django.shortcuts import redirect
from django.views.decorators.http import require_GET

@require_GET
def home(request):
    return redirect("sweet_pricing_v2_recipe:product_recover")