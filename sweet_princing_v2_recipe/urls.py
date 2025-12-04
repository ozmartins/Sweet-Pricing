from django.urls import path
from . import views

app_name = "sweet_pricing_v2_recipe"

urlpatterns = [
    path('', views.home, name="home"),
    path('product/create', views.product_create, name="product_create"),
    path('product/', views.product_recover, name="product_recover"),
    path('product/update/<int:pk>', views.product_update, name="product_update"),
    path('product/delete/<int:pk>', views.product_delete, name="product_delete")
]