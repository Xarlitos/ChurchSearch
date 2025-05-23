# TODO List

### New Features

- [ ] marker clustering: reduce the number of markers when zooming out and display their count
  - [ ] research and choose a suitable clustering library (e.g. MarkerClusterer for Google Maps)
  - [ ] implement clustering logic on the map
  - [ ] display cluster count badges on grouped markers
  - [ ] test clustering behavior on different zoom levels

- [ ] ability to filter churches by type (Protestant, Catholic, etc.)
  - [x] create filter UI component with checkboxes or dropdown
  - [ ] filter markers based on selected types using local data stored in app state or local JSON
  - [ ] persist filter settings locally using `localStorage` to remember user preferences
  - [ ] test filtering with multiple selections

- [ ] additional information on marker click, such as reviews or photos
  - [ ] design popup/modal layout for displaying extra info
  - [ ] store reviews and photos locally (e.g. in JSON files or in `localStorage`)
  - [ ] implement photo gallery or carousel inside marker popup using local data
  - [ ] optionally add UI for users to add reviews/photos locally (saved in `localStorage`)
  - [ ] ensure responsive design for mobile and desktop views


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