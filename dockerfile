FROM node:18-alpine

WORKDIR /app

COPY . .

RUN npm install
RUN npx prisma generate

ENV NODE_ENV=production
EXPOSE 3000

RUN npm run build 

RUN mkdir -p .next/standalone/.next/static && \
    cp -r .next/static/* .next/standalone/.next/static/

CMD ["node", ".next/standalone/server.js"]