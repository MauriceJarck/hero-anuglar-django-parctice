from django.db import models


def upload_path(instance):
    return "/".join(["heros", instance.name])


class Hero(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
