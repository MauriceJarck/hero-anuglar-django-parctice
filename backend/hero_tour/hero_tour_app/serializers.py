from rest_framework import serializers

from .models import HeroModel, UserModel123
from django.contrib.auth import authenticate, login


class HeroSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = HeroModel
        fields = ['name', 'id', 'img']
