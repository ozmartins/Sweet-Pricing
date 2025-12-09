from django.db import models
from django.conf import settings


class OwnedModel(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
    )

    class Meta:
        abstract = True


class Product(OwnedModel):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)    

    class Meta:
        verbose_name = "Produto"
        verbose_name_plural = "Produtos"


class Ingredient(OwnedModel):
    name = models.CharField(max_length=100)
    lastCost = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)

    class Meta:
        verbose_name = "Ingrediente"
        verbose_name_plural = "Ingredientes"


class Recipe(OwnedModel):    
    product = models.OneToOneField(
        Product,
        on_delete=models.CASCADE,
        blank=True        
    )
    yields = models.DecimalField(
        max_digits=5,
        decimal_places=2
    )
    preparationTimeInMinutes = models.IntegerField()

    class Meta:
        verbose_name = "Receita"
        verbose_name_plural = "Receitas"


class RecipeItem(OwnedModel):
    UNIT_CHOICES = [
        (1, 'Quilograma'),
        (2, 'Grama'),
        (3, 'Miligrama'),
        (4, 'Litro'),
        (5, 'Mililitro'),
        (6, 'Colher de chá'),
        (7, 'Colher de sopa'),
        (8, 'Colher de sobremesa'),
        (9, 'Xícara'),
        (10, 'Unidade'),
        (11, 'Pitada'),
        (12, 'Copo americano'),
        (13, 'Concha')
    ]

    recipe = models.ForeignKey(
        Recipe,
        on_delete=models.RESTRICT        
    )
    ingredient = models.ForeignKey(
        Ingredient,
        on_delete=models.RESTRICT        
    )    
    quantity = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )
    unitOfMeasure = models.SmallIntegerField(
        choices=UNIT_CHOICES,
        default=10
    )
    

    class Meta:
        verbose_name = "Ingrediente"
        verbose_name_plural = "Ingredientes"


class Supplier(OwnedModel):
    name = models.CharField(max_length=100)
    class Meta:
        verbose_name = "Fornecedor"
        verbose_name_plural = "Fornecedores"


class Purchase(OwnedModel):
    supplier = models.ForeignKey(
        'Supplier',
        on_delete=models.RESTRICT
    )
    create_at = models.DateField(auto_now_add=True, blank=True)
    total = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)

    class Meta:
        verbose_name = "Compra"
        verbose_name_plural = "Compras"


class PurchaseItem(OwnedModel):
    UNIT_CHOICES = [
        (1, 'Quilograma'),
        (2, 'Grama'),
        (3, 'Miligrama'),
        (4, 'Litro'),
        (5, 'Mililitro'),
        (6, 'Colher de chá'),
        (7, 'Colher de sopa'),
        (8, 'Colher de sobremesa'),
        (9, 'Xícara'),
        (10, 'Unidade'),
        (11, 'Pitada'),
        (12, 'Copo americano'),
        (13, 'Concha')
    ]

    purchase = models.ForeignKey(
        Purchase,
        on_delete=models.CASCADE
    )    
    ingredient = models.ForeignKey(
        Ingredient,
        on_delete=models.RESTRICT        
    )    
    quantity = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )
    unitOfMeasure = models.SmallIntegerField(
        choices=UNIT_CHOICES,
        default=10
    )
    total = models.DecimalField(
        max_digits=10, 
        decimal_places=2)

    class Meta:
        verbose_name = "Compra"
        verbose_name_plural = "Compras"