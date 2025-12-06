from django.urls import path
from . import views

app_name = "sweet_pricing_v2_recipe"

urlpatterns = [
    path('', views.home, name="home"),

    path('product/', views.product_recover, name="product_recover"),
    path('product/create', views.product_create, name="product_create"),
    path('product/recover', views.product_recover, name="product_recover"),
    path('product/update/<int:pk>', views.product_update, name="product_update"),
    path('product/delete/<int:pk>', views.product_delete, name="product_delete"),

    path('supplier/', views.supplier_recover, name="supplier_recover"),
    path('supplier/create', views.supplier_create, name="supplier_create"),
    path('supplier/recover', views.supplier_recover, name="supplier_recover"),
    path('supplier/update/<int:pk>', views.supplier_update, name="supplier_update"),
    path('supplier/delete/<int:pk>', views.supplier_delete, name="supplier_delete")
]