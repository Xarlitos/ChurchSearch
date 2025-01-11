#!/bin/bash

# Funkcja zabijająca wszystkie kontenery
kill_docker() {
    echo "Zabijanie wszystkich kontenerów..."
    docker stop $(docker ps -aq)
    docker rm $(docker ps -aq)
    docker system prune -af
}

# Funkcja uruchamiająca aplikację
run_app() {
    echo "Uruchamianie aplikacji..."
    docker compose up
}

# Przetwarzanie parametrów
case "$1" in
    -restart)
        kill_docker
        run_app
        ;;
    -kill)
        kill_docker
        ;;
    -run)
        run_app
        ;;
    *)
        echo "Niepoprawny argument. Dostępne opcje to: -restart, -kill, -run."
        ;;
esac