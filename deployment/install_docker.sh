#!/bin/sh

# Installe Docker et Docker Compose sur la machine.
# Devrait être roulé une fois seulement et en tant que root.

# Abort le script si une commande échoue.
set -e

DISTRO_NAME="$(lsb_release -si | tr '[:upper:]' '[:lower:]')"
VERSION_CODENAME="$(lsb_release -sc | tr '[:upper:]' '[:lower:]')"

# Dépendances pour ajouter le repo de Docker.
apt-get install -y curl gnupg ca-certificates apt-transport-https

# Setup du repo apt-get.
mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg  | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/${DISTRO_NAME} ${VERSION_CODENAME} stable" \
    >/etc/apt/sources.list.d/docker.list

# Refresh la liste des packages.
apt-get update

# Installer Docker et Docker Compose.
apt-get install -y docker-ce docker-ce-cli docker-compose-plugin

