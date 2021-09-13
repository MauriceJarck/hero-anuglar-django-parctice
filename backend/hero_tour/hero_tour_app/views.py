from django.http import HttpResponse
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

from .serializers import HeroSerializer, UserSerializer
from .models import HeroModel, UserModel123


class HeroViewSet(viewsets.ModelViewSet):
    queryset = HeroModel.objects.all()
    serializer_class = HeroSerializer
    authentication_classes = [JWTAuthentication, ]
    permission_classes = [IsAuthenticated, ]

    def post(self, request, *args, **kwargs):
        name = request.data['name']
        img = request.data['img']
        print(name, img)
        HeroModel.objects.create(title=name, img=img)
        return HttpResponse({'message': 'HeroModel created'}, status=200)

    def put(self, request, *args, **kwargs):
        id = request.data['id']
        new_name = request.data['name']

        hero = HeroModel.objects.get(pk=id)

        if hero.name != new_name:
            hero.name = new_name

        hero.save()

        return HttpResponse({'message': 'HeroModel property changed'})

    def delete(self, request):
        id = request.data['id']

        hero = HeroModel.objects.get(pk=id)
        hero.delete()

        return HttpResponse({'message': 'Hero deleted'})

