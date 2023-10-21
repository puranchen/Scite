from django.shortcuts import render
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.models import Token


@api_view(['POST'])
def create_new_user(request):
    if request.method == 'POST':
        username = request.data.get('username')
        password = request.data.get('password')
        email = request.data.get('email')

        # Validation
        if not username or not password or not email:
            return Response({'status': 'Invalid input'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.create_user(username=username, password=password, email=email)
        except ValidationError as e:
            return Response({'status': str(e)}, status=status.HTTP_400_BAD_REQUEST)

        # Generate token for the new user
        token, created = Token.objects.get_or_create(user=user)

        return Response({'status': 'User created', 'user_id': user.id}, status=status.HTTP_201_CREATED)

