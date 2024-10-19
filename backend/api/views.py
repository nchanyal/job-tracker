from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from rest_framework.permissions import AllowAny
from rest_framework.permissions import IsAuthenticated
from .serializer import *

class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        # Authenticate the user
        user = authenticate(request, username=email, password=password)

        if user is not None:
            # Generate JWT token
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            })
        else:
            # Return HTTP 401 Unauthorized for invalid credentials
            return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

class RegisterView(GenericAPIView):
    permission_classes = (AllowAny,)
    serializer_class = CustomUserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            return Response(
                {
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                }, 
                status=status.HTTP_201_CREATED
            )
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class JobApplicationView(GenericAPIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        serializer = JobApplicationSerializerE(data=request.data)

        if serializer.is_valid():
            user_email = serializer.validated_data.get('user_email')
            try:
                user = CustomUser.objects.get(email=user_email)
                jobApplication = JobApplication(
                    user=user, 
                    job_title=serializer.validated_data.get('job_title'),
                    company=serializer.validated_data.get('company'),
                    job_location=serializer.validated_data.get('job_location'),
                    application_status=serializer.validated_data.get('application_status')
                )
                jobApplication.save()
                return Response(status=status.HTTP_201_CREATED)
            except CustomUser.DoesNotExist:
                return Response({'detail': 'Invalid email'}, status=status.HTTP_400_BAD_REQUEST)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get(self, request, *args, **kwargs):
        user = request.user
        queryset = JobApplication.objects.all().filter(user_id=user.id)
        serializer = JobApplicationSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)