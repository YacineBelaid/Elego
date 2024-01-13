#!/bin/sh
# Quitter le script si une commande échoue au lieu de continuer dans le entrypoint.
set -e
# Attendre que la base de donnéssoit disponible avant de continuer pour que la table de session soit correctement crée
# comme qu'elle ne réessaie pas, un échec sur la seule tentative fait en sorte que la table n'existe pas.
while ! mysql "--host=${DB_HOST}" "--port=${DB_PORT}" "--user=${DB_USER}" "--password=${DB_PASSWORD}" --execute 'SELECT 1' "${DB_NAME}" >/dev/null ; do
    echo "waiting for database to come up ..."
    sleep 5
done
#L'Url de la database, et un lancement du déploiement de migration prisma. 
#On déclare la variable à ce moment la afin de l'appliquer uniquement à la commande qui suit (variable temporaire, ce qui est plus optimisé)
#DATABASE_URL="mysql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}" ./node_modules/.bin/prisma migrate deploy
./node_modules/.bin/prisma migrate deploy
# Exécuter la commande originale passée en paramètre.
exec "${@}"



