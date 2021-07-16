

from django.urls import path, include
from .views import ArticleViewSet, UserViewSet,UserViewSetIsStaff
from rest_framework.routers import DefaultRouter

#article_list, article_details, ArticleList, ArticleDetails

router = DefaultRouter()
router.register('articles', ArticleViewSet, basename='articles')
router.register('users', UserViewSet,basename='users')
router.register('usersx', UserViewSetIsStaff,basename='usersx')


urlpatterns = [
    path('api/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls')),
   

]
