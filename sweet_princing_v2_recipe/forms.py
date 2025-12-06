from django import forms
from  .models import Product, Supplier

class ProductForm(forms.ModelForm):
    class Meta: 
        model = Product
        fields = ["name"]
        widgets = {
            "name": forms.TextInput(attrs={"class": "forma-control", "maxlength": 100})
        }

class SupplierForm(forms.ModelForm):
    class Meta: 
        model = Supplier
        fields = ["name"]
        widgets = {
            "name": forms.TextInput(attrs={"class": "forma-control", "maxlength": 100})
        }