
from .models import Article
from .serializers import ArticleSerializer, UserSerializer
from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
#from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User

# custom permission
from .permission import IsAdminUser,IsStaffUser, IsStaffUserx


class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = [IsAdminUser]
    authentication_classes = (TokenAuthentication,)
    


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsStaffUser]
    authentication_classes = (TokenAuthentication,)

class UserViewSetIsStaff(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsStaffUserx]
    authentication_classes = (TokenAuthentication,)




















