#!/bin/bash
# Start Docker Compose
docker compose up -d

# Wait a couple seconds for the container to be ready
sleep 9

# Start Django Development Server
python manage.py runserver