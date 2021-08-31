from rest_framework import viewsets
from django.http import HttpResponse
from .serializers import HeroSerializer
from .models import Hero


class HeroViewSet(viewsets.ModelViewSet):
    queryset = Hero.objects.all()
    serializer_class = HeroSerializer

    def post(self, request, *args, **kwargs):
        name = request.data['name']
        Hero.objects.create(title=name)
        return HttpResponse({'message': 'Hero created'}, status=200)

    def put(self, request, *args, **kwargs):
        newname = request.data['name']
        id = request.data['id']

        hero = Hero.objects.get(pk=id)
        hero.name = newname
        hero.save()

        return HttpResponse({'message': 'Hero name changed'}, status=200)

    def delete(self, request):
        id = request.data['id']

        hero = Hero.objects.get(pk=id)
        hero.delete()

        return HttpResponse({'message': 'Hero deleted'})

