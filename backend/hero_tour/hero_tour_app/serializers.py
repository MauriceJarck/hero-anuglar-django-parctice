from rest_framework import serializers
from django.contrib.auth.models import User
from .models import ProductModel


class HeroSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ProductModel
        fields = ['name', 'id', 'img']


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']