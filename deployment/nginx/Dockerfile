FROM jonasal/nginx-certbot:4.2.0-nginx1.23.3 AS app

# Hack pour pas avoir besoin d'un courriel.
RUN sed -i 's/--email "\${CERTBOT_EMAIL}"/--register-unsafely-without-email/' /scripts/run_certbot.sh

# Le copier en tant que template pour que les références à des variables de style ${VAR} se fassent remplacer par la valeur.
COPY ssve.conf /etc/nginx/templates/ssve.conf.template

