from rest_framework import serializers
from .models import *

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('first_name', 'last_name', 'email', 'password')

class JobApplicationSerializer(serializers.ModelSerializer):
    user_email = serializers.EmailField(write_only=True, required=True)

    class Meta:
        model = JobApplication
        fields = ('user_email', 'job_title', 'company', 'job_location', 'application_status')