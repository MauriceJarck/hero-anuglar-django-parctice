from rest_framework import viewsets
from django.http import HttpResponse
from .serializers import HeroSerializer
from .models import Hero


class HeroViewSet(viewsets.ModelViewSet):
    queryset = Hero.objects.all()
    serializer_class = HeroSerializer

    def post(self, request, *args, **kwargs):
        name = request.data['name']
        img = request.data['img']
        print(name, img)
        Hero.objects.create(title=name, img=img)
        return HttpResponse({'message': 'Hero created'}, status=200)

    def put(self, request, *args, **kwargs):
        id = request.data['id']
        new_name = request.data['name']
        new_img = request.data['img']

        hero = Hero.objects.get(pk=id)

        if hero.name != new_name:
            hero.name = new_name
        if hero.img != new_img:
            hero.img = new_img

        hero.save()

        return HttpResponse({'message': 'Hero property changed'}, status=200)

    def delete(self, request):
        id = request.data['id']

        hero = Hero.objects.get(pk=id)
        hero.delete()

        return HttpResponse({'message': 'Hero deleted'})

