from rest_framework import serializers
from .models import *

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('first_name', 'last_name', 'email', 'password')
    
    def create(self, validated_data):
        user = CustomUser(
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            email=validated_data['email']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

class JobApplicationSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = JobApplication
        fields = ('id', 'job_title', 'company', 'job_location', 'application_status')

class SecondJobApplicationSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = JobApplication
        fields = ('id', 'job_title', 'company', 'job_location', 'application_status')

    def validate_id(self, value):
        try:
            jobApplication = JobApplication.objects.get(id=value)
            return value
        except JobApplication.DoesNotExist:
            raise serializers.ValidationError('Invalid id')

class JobApplicationIdSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField()

    class Meta:
        model = JobApplication
        fields = ['id']

    def validate_id(self, value):
        try:
            jobApplication = JobApplication.objects.get(id=value)
            return value
        except JobApplication.DoesNotExist:
            raise serializers.ValidationError('Invalid id')