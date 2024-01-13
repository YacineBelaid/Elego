# Stage pour build comme que le compilateur TypeScript est une dépendance de développement, donc il n'est pas présent en production.
FROM node:18-bullseye-slim AS build

WORKDIR /build

# Layer pour garder en cache le résultat de l'installation des packages à travers les builds.
COPY package.json \
    package-lock.json \
    ./
RUN npm ci

# Copier le code ensuite par-dessus.
COPY . .
RUN npm run "prisma:generate" \
    && npm run build

FROM node:18-bullseye-slim AS app

ENV NODE_ENV=production
WORKDIR /app

# Intaller 'tini' comme PID 1, c'est un détail de Linux mais nécessaire au bon fonctionnement du container.
RUN apt-get update \
    && apt-get install --no-install-recommends -y \
        tini \
        default-mysql-client \
    # Cleanup pour pas bloat l'image.
    && rm -rf /var/lib/apt/lists/*

# Layer pour garder en cache le résultat de l'installation des packages à travers les builds.
COPY package.json \
    package-lock.json \
    ./
RUN npm ci

COPY docker_entrypoint.sh /
COPY swagger.yaml .
COPY src/prisma src/prisma
COPY --from=build /build/node_modules/.prisma/client node_modules/.prisma/client
COPY --from=build /build/dist dist

# Juste à des fins de documentation, ça n'a aucun effet au final, ça s'affiche dans 'docker ps'.
EXPOSE 4500

# Réduire les droits dans le container.
USER node

ENTRYPOINT [ \
    # Tini doit être le premier processus démarré dans le container pour servir de PID 1 comme que Node ne peut pas jouer ce rôle.
    # (Tini va démarrer la commande après le '--' comme enfant.)
    # La raison de faire ça est un détail du fonctionnement de Linux mais nécessaire au bon fonctionnement du container.
    "tini", "--", \
    "/docker_entrypoint.sh", \
    # Il n'y a pas de shell pour interpréter les espaces avec la forme array / avec les crochets,
    # donc si on veut passer "npm run backend" en 3 arguments, il faut les envoyer comme 3 éléments d'array,
    # sinon s'il sont dans une seule string, ça les passe en un seul argument.
    # Utiliser 'node' directement au lieu d'utiliser 'npm' comme qu'il y a certaines situations qui fonctionnent mal avec 'npm'.
    # Passer '--enable-source-maps' à Node pour actuellement utiliser les source maps générées lors du build et afficher les stack traces selon les fichier '.ts' au lieu des fichiers '.js' générés.
    "node", "--enable-source-maps", "dist/server.js" \
]