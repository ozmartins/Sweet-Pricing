from django.db import models

class Product(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)

class Supplier(models.Model):
    name = models.CharField(max_length=100)

class Recipe(models.Model):
    product = models.OneToOneField(
        'Product',
        on_delete=models.RESTRICT,
        related_name='recipe'
    )
    yields = models.DecimalField(
        max_digits=5,
        decimal_places=2
    )
    preparationTimeInMinutes = models.IntegerField()

class Ingredient(models.Model):
    name = models.CharField(max_length=100)
    lastCost = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)