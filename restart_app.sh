#!/bin/bash
docker stop $(docker ps -aq)
docker rm $(docker ps -aq)
docker system prune -a

echo ""
echo "wymazano poprzedni konfig, uruchamianie ponowne..."
echo ""

docker compose up --build
