# 1. Imagem base
FROM node:22-alpine

# 2. Define diretório de trabalho
WORKDIR /app

# Copie os arquivos de dependências
COPY package*.json ./
COPY tsconfig.json ./

# Copie a pasta prisma antes do generate!
COPY prisma ./prisma

# Instale dependências
RUN npm install

# Gere o client Prisma (agora a pasta prisma já existe!)
RUN npx prisma generate

# Copie o restante dos arquivos do projeto
COPY . .

# Compile o TypeScript
RUN npm run build

EXPOSE 3005
CMD ["node", "dist/server.js"]