# Use uma imagem base oficial do Node.js
FROM node:20-alpine

# Defina o diretório de trabalho dentro do container
WORKDIR /app

# Copie o package.json e o package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências da aplicação
RUN npm install

RUN addgroup dev && adduser -S -G dev moises

USER moises

COPY ./.env ./.env

# Copie o restante dos arquivos da aplicação
COPY . .

# Exponha a porta em que a aplicação será executada
EXPOSE 5050

# Defina o comando padrão para rodar a aplicação
CMD ["npm", "start"]
