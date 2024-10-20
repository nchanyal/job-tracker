#!/bin/bash
# Start Docker Compose
docker compose up -d

# Wait a few seconds for the container to be ready
sleep 7

# Start Django Development Server
python manage.py runserver