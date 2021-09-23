from django.http import HttpResponse
from rest_framework import viewsets, filters
from django.contrib.auth.models import User

from .serializers import ProductSerializer, UserSerializer
from .models import ProductModel


class ProductViewSet(viewsets.ModelViewSet):
    queryset = ProductModel.objects.all()
    serializer_class = ProductSerializer
    search_fields = ['name']
    filter_backends = (filters.SearchFilter, )

    def post(self, request, *args, **kwargs):
        name = request.data['name']
        img = request.data['img']
        print(name, img)
        ProductModel.objects.create(title=name, img=img)
        return HttpResponse({'message': 'HeroModel created'}, status=200)

    def put(self, request, *args, **kwargs):
        id = request.data['id']
        new_name = request.data['name']

        hero = ProductModel.objects.get(pk=id)

        if hero.name != new_name:
            hero.name = new_name

        hero.save()

        return HttpResponse({'message': 'HeroModel property changed'})

    def delete(self, request):
        id = request.data['id']

        hero = ProductModel.objects.get(pk=id)
        hero.delete()

        return HttpResponse({'message': 'Hero deleted'})


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer