FROM node:20-alpine

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml* ./

RUN pnpm install

RUN npm install -g ts-node

COPY . .

RUN chmod +x src/scripts/*.sh

EXPOSE ${PORT}

ENTRYPOINT ["sh", "/app/src/scripts/startup.sh"]