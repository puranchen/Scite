from django.urls import path
from . import views

app_name = 'core'
urlpatterns = [
    path('articles/', views.ArticleListCreateView.as_view(), name='article_list_create'),
    path('articles/<int:pk>/', views.ArticleRetrieveUpdateDestroyView.as_view(), name='article_retrieve_update_destroy'),
    path('comments/', views.CommentListCreateView.as_view(), name='comment_list_create'),
    path('comments/<int:pk>/', views.CommentRetrieveUpdateDestroyView.as_view(), name='comment_retrieve_update_destroy'),
    path('comments/article/<int:article_id>/', views.article_comments, name='article-comments'),
    path('votes/', views.VoteListCreateView.as_view(), name='vote_list_create'),
    path('votes/<int:pk>/', views.VoteRetrieveUpdateDestroyView.as_view(), name='vote_retrieve_update_destroy'),
    path('votes/article/<int:article_id>/', views.article_votes, name='article-votes')

]