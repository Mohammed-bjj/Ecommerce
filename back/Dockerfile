FROM node:alpine
COPY . /home
WORKDIR /home
RUN apk add bash && \ 
    npm install && \
    npm run build
EXPOSE 3000 