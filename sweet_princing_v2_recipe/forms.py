from django import forms
from  .models import Product

class ProductForm(forms.ModelForm):
    class Meta: 
        model = Product
        fields = ["name"]
        widgets = {
            "name": forms.TextInput(attrs={"class": "forma-control", "maxlength": 100})
        }