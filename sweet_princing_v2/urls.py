from django.contrib import admin
from django.urls import path, include
from django.views.generic import RedirectView
from django.templatetags.static import static
from django.http import HttpResponse

urlpatterns = [
    path('admin/', admin.site.urls),
    path('.well-known/appspecific/com.chrome.devtools.json', lambda request: HttpResponse(status=204)),
    path('', include('sweet_princing_v2_recipe.urls')),
    path('favicon.ico/', RedirectView.as_view(url=static('img/favicon.ico'), permanent=True))
]
