from rest_framework.views import APIView
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from rest_framework.permissions import AllowAny
from rest_framework.permissions import IsAuthenticated
from .serializer import *
from datetime import datetime

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
    serializer_class = JobApplicationSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            user = request.user
            customUser = CustomUser.objects.get(id=user.id)
            jobApplication = JobApplication(
                user=customUser, 
                job_title=serializer.validated_data.get('job_title'),
                company=serializer.validated_data.get('company'),
                job_location=serializer.validated_data.get('job_location'),
                application_status=serializer.validated_data.get('application_status')
            )
            jobApplication.save()
            # Getting a new serializer that will include the field 'id'
            serializer = JobApplicationSerializer(jobApplication)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get(self, request, *args, **kwargs):
        user = request.user
        queryset = JobApplication.objects.all().filter(user_id=user.id)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def put(self, request, jobApplicationId=None, *args, **kwargs):
        if jobApplicationId is None:
            return Response({'detail': 'Must include valid id as path parameter'}, status=status.HTTP_400_BAD_REQUEST)

        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            try:
                jobApplication = JobApplication.objects.get(id=jobApplicationId)
                jobApplication.job_title=serializer.validated_data.get('job_title')
                jobApplication.company=serializer.validated_data.get('company')
                jobApplication.job_location=serializer.validated_data.get('job_location')
                jobApplication.application_status=serializer.validated_data.get('application_status')
                jobApplication.save()
                # Getting a new serializer that will include the field 'id'
                serializer = JobApplicationSerializer(jobApplication)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except JobApplication.DoesNotExist:
                return Response({'detail': 'Invalid id'}, status=status.HTTP_400_BAD_REQUEST)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, jobApplicationId=None, *args, **kwargs):
        if jobApplicationId is None:
            return Response({'detail': 'Must include valid id as path parameter'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            jobApplication = JobApplication.objects.get(id=jobApplicationId)
            updated = jobApplication.delete()
            rowsDeleted = updated[0]

            if rowsDeleted != 1:
                return Response({'detail': 'Could not delete job application'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
            return Response(status=status.HTTP_200_OK)
        except JobApplication.DoesNotExist:
            return Response({'detail': 'Invalid id'}, status=status.HTTP_400_BAD_REQUEST)

class JobInterviewView(GenericAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = JobInterviewSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            user = request.user
            customUser = CustomUser.objects.get(id=user.id)
            jobInterview = JobInterview(
                user=customUser, 
                job_title=serializer.validated_data.get('job_title'),
                company=serializer.validated_data.get('company'),
                date=serializer.validated_data.get('date'),
                time=serializer.validated_data.get('time'),
                location=serializer.validated_data.get('location')
            )

            jobInterview.save()
            # Getting a new serializer that will include the field 'id'
            serializer = JobInterviewSerializer(jobInterview)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, *args, **kwargs):
        user = request.user
        queryset = JobInterview.objects.all().filter(user_id=user.id)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def put(self, request, jobInterviewId=None, *args, **kwargs):
        if jobInterviewId is None:
            return Response({'detail': 'Must include valid id as path parameter'}, status=status.HTTP_400_BAD_REQUEST)

        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            try:
                jobInterview = JobInterview.objects.get(id=jobInterviewId)
                jobInterview.job_title=serializer.validated_data.get('job_title')
                jobInterview.company=serializer.validated_data.get('company')
                jobInterview.date=str(serializer.validated_data.get('date'))
                jobInterview.time=serializer.validated_data.get('time')
                jobInterview.location=serializer.validated_data.get('location')
                jobInterview.save()
                # Getting a new serializer that will include the field 'id'
                serializer = JobInterviewSerializer(jobInterview)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except JobInterview.DoesNotExist:
                return Response({'detail': 'Invalid id'}, status=status.HTTP_400_BAD_REQUEST)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
