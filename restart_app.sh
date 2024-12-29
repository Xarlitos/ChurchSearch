#!/bin/bash
docker stop $(docker ps -aq)
docker rm $(docker ps -aq)
docker system prune -a

echo "wymazano poprzedni konfig, uruchamianie ponowne..."

docker compose up
