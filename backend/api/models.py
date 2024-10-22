from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from .managers import CustomUserManager
from django.core.validators import MinLengthValidator
from django.utils.translation import gettext_lazy as _

class CustomUser(AbstractBaseUser, PermissionsMixin):
    """Custom user model where email is used instead of username."""

    id = models.AutoField(primary_key=True, blank=False, null=False)
    first_name = models.CharField(max_length=20, blank=False, null=False)
    last_name = models.CharField(max_length=20, blank=False, null=False)
    email = models.EmailField(unique=True, blank=False, null=False)
    password = models.CharField(max_length=128, validators=[MinLengthValidator(5)], blank=False, null=False)  # This is handled by Django's AbstractBaseUser

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = CustomUserManager()

    # Use email as the unique identifier for authentication
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']  # Fields required to create a superuser

    def __str__(self):
        """Return a string representation of the user."""
        return self.email

class JobApplication(models.Model):
    class ApplicationStatus(models.TextChoices):
        APPLYING = 'Applying'
        APPLIED = 'Applied'
        INTERVIEWING = 'Interviewing'
        INTERVIEWED = 'Interviewed'
        OFFER = 'Offer'

    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    id = models.AutoField(primary_key=True, blank=False, null=False)
    job_title = models.CharField(max_length=30, blank=False, null=False)
    company = models.CharField(max_length=20, blank=False, null=False)
    job_location = models.CharField(max_length=20, blank=False, null=False)
    application_status = models.CharField(max_length=12, choices=ApplicationStatus, blank=False, null=False)

    def __str__(self):
        return f'{self.job_title} {self.company} {self.application_status}'

class JobInterview(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    id = models.AutoField(primary_key=True, blank=False, null=False)
    job_title = models.CharField(max_length=30, blank=False, null=False)
    company = models.CharField(max_length=20, blank=False, null=False)
    date = models.DateField()
    time = models.TimeField()
    location = models.CharField(max_length=50, blank=False, null=False)