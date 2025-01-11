#!/bin/bash
CERT_DIR="./docker/ssl"
DOMAIN="church.local"
SERVER_KEY="$CERT_DIR/server.key"
SERVER_CSR="$CERT_DIR/server.csr"
SERVER_CRT="$CERT_DIR/server.crt"
ROOT_CA_KEY="$CERT_DIR/rootCA.key"
ROOT_CA_PEM="$CERT_DIR/rootCA.pem"
CONFIG_FILE="$CERT_DIR/openssl.conf"
V3_EXT="$CERT_DIR/v3.ext"

echo "Generating CA key..."
openssl genrsa -out $ROOT_CA_KEY 2048
echo ""

echo "Generating CA certificate..."
openssl req -x509 -new -nodes -key $ROOT_CA_KEY -sha256 -days 1000 -out $ROOT_CA_PEM -config $CONFIG_FILE
echo ""

echo "Generating server certificates..."
openssl req -new -sha256 -nodes -out $SERVER_CSR -newkey rsa:2048 -keyout $SERVER_KEY -config $CONFIG_FILE
echo ""

echo "Authorizing server certificate with extensions..."
openssl x509 -req -in $SERVER_CSR -CA $ROOT_CA_PEM -CAkey $ROOT_CA_KEY -CAcreateserial -out $SERVER_CRT -days 1000 -sha256 -extfile $V3_EXT
echo ""

echo "Installing root CA certificate..."
sudo cp $ROOT_CA_PEM /usr/local/share/ca-certificates/rootCA.pem
sudo update-ca-certificates
echo ""

echo "Certificate generation and installation complete."

# Kopiowanie Root CA do pulpitu Windows
WINDOWS_DESKTOP="/mnt/c/Users/xarlo/Desktop"
cp $ROOT_CA_PEM $WINDOWS_DESKTOP/rootCA.pem
echo "Root CA skopiowany na pulpit Windows: $WINDOWS_DESKTOP/rootCA.pem"
echo ""

echo "Certificate generation and installation complete."
