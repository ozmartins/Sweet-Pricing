from django import forms
from .models import Product, Supplier, Recipe, RecipeItem, Ingredient, Purchase

class ProductForm(forms.ModelForm):
    class Meta: 
        model = Product
        fields = ["name"]
        widgets = {
            "name": forms.TextInput(attrs={"class": "forma-control", "maxlength": 100})
        }
        labels = {
            'name': 'Nome'
        }


class IngredientForm(forms.ModelForm):
    class Meta: 
        model = Ingredient
        fields = ["name"]
        widgets = {
            "name": forms.TextInput(attrs={"class": "forma-control", "maxlength": 100})
        }
        labels = {
            'name': 'Nome'
        }
        

class SupplierForm(forms.ModelForm):
    class Meta: 
        model = Supplier
        fields = ["name"]
        widgets = {
            "name": forms.TextInput(attrs={"class": "forma-control", "maxlength": 100})
        }
        labels = {
            'name': 'Nome'
        }


class RecipeForm(forms.ModelForm):
    class Meta:
        model = Recipe
        fields = ['product', 'yields', 'preparationTimeInMinutes']
        widgets = {            
            'product': forms.HiddenInput(),
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
            'yields': 'Rendimento (porções)',
            'preparationTimeInMinutes': 'Tempo de preparo (em minutos)'
        }


class RecipeItemForm(forms.ModelForm):        
    class Meta:    
        model = RecipeItem
        fields = ['ingredient', 'quantity', 'unitOfMeasure']
        widgets = {            
            'recipe': forms.HiddenInput(),
            'ingredient': forms.Select(attrs={
                'class': 'form-select'                
            }),
            'quantity': forms.NumberInput(attrs={
                'class': 'form-control',
                'step': '0.01',
                'min': '0'
            }),
            'unitOfMeasure': forms.Select(attrs={
                'class': 'form-select'
            })
        }
        labels = {            
            'recipe': 'Receita',
            'ingredient': 'Ingrediente',
            'quantity': 'Quantidade',
            'unitOfMeasure': 'Unidade de medida'
        }


class PurchaseForm(forms.ModelForm):
    class Meta:
        model = Purchase
        fields = ['supplier']
        widgets = {
            'supplier': forms.Select(attrs={
                'class': 'form-select'
            })
        }
        labels = {
            'supplier': 'Fornecedor'
        }
