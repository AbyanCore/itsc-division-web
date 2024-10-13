FROM node:18-alpine

WORKDIR /app

COPY . .

RUN npm install
RUN npx prisma generate

ENV NODE_ENV=production
EXPOSE 3000

RUN npm run build 

# copy static files to standlone build folder
RUN mkdir -p .next/standalone/.next/static && \
    cp -r .next/static/* .next/standalone/.next/static/
# copy public files to standlone build folder
RUN mkdir -p .next/standalone/public && \
    cp -r public/* .next/standalone/public/

CMD ["node", ".next/standalone/server.js"]