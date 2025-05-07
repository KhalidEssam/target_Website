# Use Node.js to build
FROM node:18 AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build  # this generates `dist/` folder

# Use Nginx to serve
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose default Nginx port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
