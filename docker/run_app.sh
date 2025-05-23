#!/bin/bash

# Funkcja zabijająca wszystkie kontenery
kill() {
    echo "######  killing container ..."
    docker stop $(docker ps -aq)
    docker rm $(docker ps -aq)
    docker system prune -af
}

# Funkcja uruchamiająca aplikację
run() {
    echo "######  starting app ..."
    docker compose up
}

clean() {
    echo "######  cleaning ..."
    sudo rm -rf node_modules/
}

help()
{
    echo "#################################"
    echo ""
    echo "Usage: $0 [option]"
    echo ""
    echo "Options:"
    echo "  -r    Kill all containers, remove them, prune system, then start the app"
    echo "  -k    Kill all containers and remove them"
    echo "  -s    Start the app (docker compose up)"
    echo "  -c    Kill all containers, clean node_modules, then start the app"
    echo ""
    echo "Example:"
    echo "  $0 -r"
    echo ""
    echo "Note: script must be run from the main folder containing the docker-compose.yaml file."
    echo "#################################"
}

# Przetwarzanie parametrów
case "$1" in
    -r)
        kill
        run
        ;;
    -k)
        kill
        ;;
    -s)
        run
        ;;
    -c)
        kill
        clean
        run
        ;;        
    *)
        echo "error args"
        help
        ;;
esac