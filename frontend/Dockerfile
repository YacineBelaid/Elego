# Stage pour build pour pas avoir besoin de node en production comme c'est juste des fichiers statiques.
FROM node:18-bullseye-slim AS build

WORKDIR /build

# Layer pour garder en cache le résultat de l'installation des packages à travers les builds.
COPY package.json \
    package-lock.json \
    ./
RUN npm ci

# Copier le code ensuite par-dessus.
COPY . .

RUN npm run build

# Stage qui sera déployé en production.
FROM nginx:1.23.3 AS app

# Override la config par défaut qui utilise déjà le port 80.
COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /build/dist/ssve/ /usr/share/nginx/html/

