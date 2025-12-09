from django.contrib import admin
from django.urls import path, include
from django.views.generic import RedirectView
from django.templatetags.static import static
from django.http import HttpResponse
from sweet_princing_v2_recipe import views as recipe_views

urlpatterns = [
    path('', include('sweet_princing_v2_recipe.urls')),
    path('admin/', admin.site.urls),    
    path('.well-known/appspecific/com.chrome.devtools.json', lambda request: HttpResponse(status=204)),    
    path('favicon.ico/', RedirectView.as_view(url=static('img/favicon.ico'), permanent=True)),
    path("accounts/register/", recipe_views.register, name="register"),
    path("accounts/login/", recipe_views.login, name="login")
]
