FROM node:current-slim

ENV MYPATH /home/node
WORKDIR ${MYPATH}

RUN node -v

RUN npm install -g pnpm

RUN npm install -g pm2

RUN pm2 ls

COPY . ./

RUN pnpm install

EXPOSE 8888

CMD [ "pm2","start", "./src/index.js" ]

RUN pm2 ls 