#!/bin/bash
sudo apt update && sudo apt install -y apt-transport-https ca-certificates curl software-properties-common git

# Instalacja Node.js w wersji 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

node -v
curl --version
git --version

sudo apt update && sudo apt install -y apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable"
sudo apt update
sudo apt install -y docker-ce
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker $USER

docker --version
docker compose version
node -v
curl --version
git --version

# Nadanie uprawnień do wykonywania wszystkim skryptom w folderze
echo "Nadanie uprawnień do wykonywania skryptom w folderze..."
sudo chmod +x $(find . -type f -name "*.sh")

echo "127.0.0.1 church.local" | sudo tee -a /etc/hosts > /dev/null
echo "Wpis hosts dodany."

./docker/ssl/gen-ssl.sh

docker compose up --build

echo "koniec"
