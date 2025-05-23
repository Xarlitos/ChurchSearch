# Church Locator

Aplikacja umożliwia wyszukiwanie kościołów w określonym mieście za pomocą Google Places API. Użytkownik podaje nazwę miasta, a aplikacja korzysta z API Google, aby zwrócić listę dostępnych kościołów w tej lokalizacji. Wyniki wyszukiwania zawierają szczegóły takie jak nazwa kościoła, adres, oraz dane kontaktowe, jeśli są dostępne. Aplikacja ma na celu ułatwienie znalezienia kościołów w danym obszarze, wspierając użytkowników w planowaniu odwiedzin i wydarzeń religijnych.

# Run project
## ENV
 - Generating your API key and paste in '.env.example'
```
# key Google Maps API
VITE_GOOGLE_MAPS_API_KEY=your-google-api-key-here

# key google Oauth
VITE_GOOGLE_CLIENT_ID=your-google-cloud-key-here

VITE_AUTORZY="Author Names Here"
```
 - change file name from '.env.example' to '.env'

## local:
```
npm install
npm run dev
```

## Running with Docker Compose (WSL/Linux/MacOS Only)

If you're using Docker Compose (works only on Linux Debian-based systems), follow these steps:
1. Before running the script, install the required applications by executing
```
sudo chmod +x ./install_req_app.sh
./install_req_app.sh
```

2. docker run app with docker compose
```
# build container and run
./run_app.sh -run

# kill container and build from new
./run_app.sh -restart

# kill docker container and clean storage
./run_app.sh -kill
```

### on MacOS
1. Install colima vm.
```
#run colima vm with 4 threads and 8 gb ram
colima start --cpu 4 --memory 8

#run docker
./run_app.sh -run

#and others command from above

#kill colima
colima stop
```


### hosts
add to **C:\Windows\System32\drivers\etc\hosts** line 
```
127.0.0.1    church.pl
```