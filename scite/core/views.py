from django.shortcuts import render
from django.contrib.contenttypes.models import ContentType
from django.shortcuts import get_object_or_404

from .serializer import ArticleSerializer, CommentSerializer, VoteSerializer
from .models import Article, Comment, Vote

from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view


class ArticleListCreateView(ListCreateAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer


class ArticleRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer


class CommentListCreateView(ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer


class CommentRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer


class VoteListCreateView(ListCreateAPIView):
    queryset = Vote.objects.all()
    serializer_class = VoteSerializer


class VoteRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    queryset = Vote.objects.all()
    serializer_class = VoteSerializer


@api_view(['GET'])
def article_votes(request, article_id):
    article = get_object_or_404(Article, pk=article_id)
    votes = Vote.objects.filter(object_id=article.pk)

    serializer = VoteSerializer(votes, many=True)

    return Response(serializer.data)


@api_view(['GET'])
def article_comments(request, article_id):
    article = get_object_or_404(Article, pk=article_id)
    comments = Comment.objects.filter(object_id=article.pk)

    serializer = CommentSerializer(comments, many=True)

    return Response(serializer.data)
