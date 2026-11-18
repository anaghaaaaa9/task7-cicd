FROM node:20-alpine
WORKDIR /app
COPY package.json app.js test.js ./
ENV PORT=3000
USER node
EXPOSE 3000
CMD ["node", "app.js"]