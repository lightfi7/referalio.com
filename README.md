# - Referalio -

## Tech

- [NextJS] - Frontend
- [Tailwind CSS] - CSS
- [node.js] - Platform
- [Express] - fast node.js network app framework [@tjholowaychuk]
- [MongoDB] - Database
- [Puppeteer] - Scraping Library

## Installation

Referalio requires [Node.js](https://nodejs.org/) v16+ to run.

Install the dependencies and devDependencies and start the server.

```sh
npm install pm2 --global
cd Referalio/frontend
npm i --force
npm run build
pm2 start npm --name frontend -- run start

cd Referalio/backend
npm i
pm2 start npm --name backend -- run start

cd Referalio/admin/Frontend
npm i --force
npm run build
pm2 start npm --name adminFrontend -- run start

cd Referalio/admin/Backend
npm i
pm2 start npm --name adminBackend -- run start
```

Hosting using Nginx

```sh
cd /etc/nginx/sites-available/
vi referalio

        listen 443 ssl default_server;
        listen [::]:443 ssl default_server;

        ssl_certificate /etc/letsencrypt/live/app.referalio.com/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/app.referalio.com/privkey.pem;
        server_name app.referalio.com;
        add_header 'Referrer-Policy' 'strict-origin-when-cross-origin';
        location / {
                proxy_pass http://localhost:3000;
                proxy_set_header X-Forwarded-For $remote_addr;
                add_header 'Access-Control-Allow-Origin' '*';
                add_header 'Access-Control-Allow-Headers' 'User-Agent,Keep-Alive,Content-Type';
                add_header 'Access-Control-Allow-Credentials' 'true';
        }

        location /api {
                proxy_pass http://localhost:5000;
                proxy_set_header X-Forwarded-For $remote_addr;
                add_header 'Access-Control-Allow-Origin' '*';
                add_header 'Access-Control-Allow-Headers' 'User-Agent,Keep-Alive,Content-Type';
                add_header 'Access-Control-Allow-Credentials' 'true';

        }
}

server {
        listen 80;
        listen [::]:80;
        server_name app.referalio.com;
        return 301 https://$host$request_uri;
}

cd ..
vi nginx.conf - add this line.
... ...
        # gzip_vary on;
        # gzip_proxied any;
        # gzip_comp_level 6;
        # gzip_buffers 16 8k;
        # gzip_http_version 1.1;
        # gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

        ##
        # Virtual Host Configs
        ##

        include /etc/nginx/conf.d/*.conf;
        include /etc/nginx/sites-enabled/*;
        include /etc/nginx/sites-available/*;
...
```
