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

# TODO List

### New Features
- [ ] marker clustering: reduce the number of markers when zooming out and display their count
- [ ] ability to filter churches by type (Protestant, Catholic, etc.)
- [ ] additional information on marker click, such as reviews or photos


### Bugs to Fix
- [x] need to click clear button twice, it doesn't work on the first click
- [x] indentation issue with the top footer containing buttons
- [x] buttons should wrap into multiple rows if the browser window is smaller; currently they shrink and text overflows


### Application Structure
- [x] Created the application in React.
  - [x] Used **Vite** to scaffold the app.
  - [x] Basic component structure and routing.
  - [x] Basic component structure and routing. *(duplicate line in original)*
  - [x] Displaying the map using **Google Maps API**.
  - [x] Displaying church search results on the map.

### Front-end of the Application
- [x] Main page:
  - [x] footer with buttons,
  - [x] map container,
  - [x] version footer,
  - [x] applied Material UI
  - [x] day/night mode
- [x] 'About' dialog:
  - [x] title,
  - [x] short description, used technologies,
  - [x] authors and license,
  - [x] GitHub button.
- [x] improve marker details popup
  - [x] route planning to marker
  - [x] add marker to locally saved favorites

### Route Planning
- [x] if implementation Google login without server in app fails (CORS itp), implement route planning to the selected marker


### Docker Compose
- [x] **Dockerization**
    - [x] Containerization of the **Node.js** application
    - [x] Containerization of the **Nginx** server
    - [x] Created **nginx.conf** to serve React and handle HTTPS
    - [x] Created **Dockerfile** specifying how to build the app image
    - [x] Created **docker-compose.yml** for Node and Nginx
    - [x] Added appropriate config files `.dockerignore` and `.gitignore`

- [x] **SSL and local domain**
    - [x] Configured SSL in the web application
    - [x] Generated SSL certificates
    - [x] Assigned a local domain (e.g. `localhost` or `church.local`) to the app
    - [x] Set up the server to support HTTPS in the development environment
