from django import forms
from  .models import Product, Supplier, Recipe

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

class RecipeForm(forms.ModelForm):
    class Meta:
        model = Recipe
        fields = ['product', 'yields', 'preparationTimeInMinutes']

        widgets = {
            'product': forms.Select(attrs={
                'class': 'form-select'
            }),
            'yields': forms.NumberInput(attrs={
                'class': 'form-control',
                'step': '0.01',
                'min': '0'
            }),
            'preparationTimeInMinutes': forms.NumberInput(attrs={
                'class': 'form-control',
                'step': '1',
                'min': '0'
            }),
        }

        labels = {
            'product': 'Produto',
            'yields': 'Rendimento (porções)',
            'preparationTimeInMinutes': 'Tempo de preparo (em minutos)'
        }
