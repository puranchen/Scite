from django.contrib.auth.models import User
from django.db import models
from django.contrib.contenttypes.fields import GenericForeignKey, GenericRelation
from django.contrib.contenttypes.models import ContentType


class BaseModel(models.Model):
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE, blank=True, null=True)
    object_id = models.PositiveIntegerField(blank=True, null=True)
    content_object = GenericForeignKey('content_type', 'object_id')

    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, null=True, blank=True, on_delete=models.SET_NULL)

    class Meta:
        abstract = True


class ContentModel(BaseModel):
    comments = GenericRelation('Comment', related_query_name='parent_content')
    votes = GenericRelation('Vote')


class Vote(BaseModel):
    UPVOTE = 1
    DOWNVOTE = -1
    VOTE_CHOICES = (
        (UPVOTE, 'Upvote'),
        (DOWNVOTE, 'Downvote'),
    )

    vote_type = models.SmallIntegerField(choices=VOTE_CHOICES)


class Comment(BaseModel):
    parent = models.ForeignKey('self', null=True, blank=True, on_delete=models.SET_NULL)
    content = models.TextField()


class Article(BaseModel):
    article_type = models.CharField(max_length=100)
    title = models.CharField(max_length=100)
    journal = models.CharField(max_length=100)
    abstract = models.TextField()
    summary = models.TextField()
    last_author = models.CharField(max_length=50)
    published_on = models.DateField()
    doi = models.CharField(max_length=50, null=True, blank=True)

    def __str__(self):
        return self.title


class OriginalPost(BaseModel):
    title = models.CharField(max_length=200)
    content = models.TextField()
