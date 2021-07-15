from django.db import models


# Create your models here.


class Article(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    # lekhxu
    # likes  = models.PositiveIntegerField(default=0)
    # implementation
    """
        1. button banauna (normal ma chai vote gareko xaina)
        2. 
    """


    def __str__(self):
        return self.title

    # @classmethod
    # def update_likes(cls, id):
    #     article = cls.objects.filter(id=id).first()
    #     article.likes +=1


