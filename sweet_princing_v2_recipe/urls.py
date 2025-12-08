from django.urls import path
from . import views

app_name = "sweet_pricing_v2_recipe"

urlpatterns = [
    path('', views.home, name="home"),

    path('product/', views.product_recover, name="product_recover"),
    path('product/search', views.product_search, name="product_search"),
    path('product/create', views.product_create, name="product_create"),
    path('product/recover', views.product_recover, name="product_recover"),
    path('product/update/<int:pk>', views.product_update, name="product_update"),
    path('product/delete/<int:pk>', views.product_delete, name="product_delete"),

    path('ingredient/', views.ingredient_recover, name="ingredient_recover"),
    path('ingredient/search', views.ingredient_search, name="ingredient_search"),
    path('ingredient/create', views.ingredient_create, name="ingredient_create"),
    path('ingredient/recover', views.ingredient_recover, name="ingredient_recover"),
    path('ingredient/update/<int:pk>', views.ingredient_update, name="ingredient_update"),
    path('ingredient/delete/<int:pk>', views.ingredient_delete, name="ingredient_delete"),

    path('supplier/', views.supplier_recover, name="supplier_recover"),
    path('supplier/create', views.supplier_create, name="supplier_create"),
    path('supplier/recover', views.supplier_recover, name="supplier_recover"),
    path('supplier/update/<int:pk>', views.supplier_update, name="supplier_update"),
    path('supplier/delete/<int:pk>', views.supplier_delete, name="supplier_delete"),

    path('recipe/<int:pk>', views.recipe_recover, name="recipe_recover"),
    path('recipe/search', views.recipe_search, name="recipe_search"),
    path('recipe/create', views.recipe_create, name="recipe_create"),
    path('recipe/recover/<int:pk>', views.recipe_recover, name="recipe_recover"),
    path('recipe/update/<int:pk>', views.recipe_update, name="recipe_update"),
    path('recipe/delete/<int:pk>', views.recipe_delete, name="recipe_delete"),
    
    path('recipe-item/create', views.recipe_item_create, name="recipe_item_create"),
    path('recipe-item/update/<int:pk>', views.recipe_item_update, name="recipe_item_update"),
    path('recipe-item/delete/<int:pk>', views.recipe_item_delete, name="recipe_item_delete"),

    path('purchase', views.purchase_recover, name="purchase_recover"),
    path('purchase/create', views.purchase_create, name="purchase_create"),
    path('purchase/recover', views.purchase_recover, name="purchase_recover"),
    path('purchase/update/<int:pk>', views.purchase_update, name="purchase_update"),
    path('purchase/delete/<int:pk>', views.purchase_delete, name="purchase_delete"),
    
    path('purchase-item/create', views.purchase_item_create, name="purchase_item_create"),
    path('purchase-item/update/<int:pk>', views.purchase_item_update, name="purchase_item_update"),
    path('purchase-item/delete/<int:pk>', views.purchase_item_delete, name="purchase_item_delete")
]