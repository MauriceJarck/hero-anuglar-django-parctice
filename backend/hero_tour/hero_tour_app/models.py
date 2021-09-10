from django.db import models


def upload_path(instance, filename):
    return "/".join(["heros", instance.name, filename]) or "/"


class HeroModel(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    img = models.ImageField(upload_to=upload_path, default="")
