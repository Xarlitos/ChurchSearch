#!/bin/bash

CERT_DIR="./ssl"
DOMAIN="church.local"
PRIVATE_KEY="$CERT_DIR/server.key"
CERTIFICATE="$CERT_DIR/server.crt"
ROOT_CA_KEY="$CERT_DIR/rootCA.key"
ROOT_CA_CERT="$CERT_DIR/rootCA.crt"
CONFIG_FILE="$CERT_DIR/openssl.cnf"

# katalog na ssl
if [ ! -d "$CERT_DIR" ]; then
  echo "Folder SSL nie istnieje. Tworzę katalog $CERT_DIR..."
  mkdir -p $CERT_DIR
else
  echo "Folder SSL już istnieje."
fi

if [ -f $CERTIFICATE ] && [ -f $PRIVATE_KEY ] && [ -f $ROOT_CA_CERT ]; then
  echo "Certyfikaty SSL oraz Root CA już istnieją. Pomiń generowanie."
  echo ""
else
  # Tworzenie pliku konfiguracyjnego OpenSSL
  if [ ! -f $CONFIG_FILE ]; then
    echo "Tworzę plik konfiguracyjny openssl.cnf..."
    echo ""
   cat > $CONFIG_FILE <<EOL
[ req ]
default_bits       = 2048
default_keyfile    = privkey.pem
distinguished_name = req_distinguished_name
req_extensions     = v3_req
x509_extensions    = v3_ca  # Sekcja dla Root CA

[ req_distinguished_name ]
countryName                 = Country Name (2 letter code)
countryName_default         = PL
stateOrProvinceName         = State or Province Name (full name)
stateOrProvinceName_default = Gdansk
localityName                = Locality Name (eg, city)
localityName_default        = Gdansk
0.organizationName          = Organization Name (eg, company)
0.organizationName_default  = M. Burdak oraz M. Domanowski
commonName                  = Common Name (eg, server FQDN or YOUR name)
commonName_default          = $DOMAIN

[ v3_req ]
keyUsage = digitalSignature, keyEncipherment
extendedKeyUsage = serverAuth
subjectAltName = @alt_names

[ v3_ca ]  # Sekcja dla Root CA
keyUsage = critical, digitalSignature, cRLSign, keyCertSign
basicConstraints = critical, CA:TRUE
subjectAltName = @alt_names

[ alt_names ]
DNS.1 = $DOMAIN

EOL
  fi

  # Tworzenie Root CA, jeśli nie istnieje
  if [ ! -f $ROOT_CA_CERT ]; then
    echo "Generowanie klucza Root CA..."
    openssl genpkey -algorithm RSA -out $ROOT_CA_KEY

    # Generowanie certyfikatu Root CA
    openssl req -key $ROOT_CA_KEY -new -x509 -out $ROOT_CA_CERT -config $CONFIG_FILE -extensions v3_ca -subj "/CN=Root CA"
  fi

  echo "Generowanie klucza prywatnego dla serwera..."
  openssl genpkey -algorithm RSA -out $PRIVATE_KEY

  echo "Generowanie certyfikatu serwera..."
  openssl req -new -key $PRIVATE_KEY -out $CERTIFICATE -config $CONFIG_FILE

  # Podpisywanie certyfikatu serwera przez Root CA
  echo "Podpisywanie certyfikatu serwera..."
  openssl x509 -req -in $CERTIFICATE -CA $ROOT_CA_CERT -CAkey $ROOT_CA_KEY -CAcreateserial -out $CERTIFICATE

  echo "Certyfikat SSL oraz klucz prywatny zostały wygenerowane:"
  echo "Certyfikat: $CERTIFICATE"
  echo "Klucz prywatny: $PRIVATE_KEY"
  echo "Certyfikat Root CA: $ROOT_CA_CERT"
  echo "Klucz Root CA: $ROOT_CA_KEY"

fi

# Ustawienie odpowiednich uprawnień
sudo chmod 600 $PRIVATE_KEY
sudo chmod 644 $CERTIFICATE
sudo chmod 644 $ROOT_CA_CERT
