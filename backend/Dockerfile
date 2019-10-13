FROM node:12.10.0

ARG FRONTEND-PORT=3000

RUN apt-get -y update
RUN apt-get -y upgrade
RUN apt-get install -y sqlite3 libsqlite3-dev

# Create app directory
WORKDIR /usr/src/app

# Copy backend dependencies and place-holder frontend
COPY backend/package*.json ./
COPY backend/public public/

# build backend dependencies (takes a long time)
RUN npm install

# Copy the frontend dependencies
WORKDIR /usr/src/app/frontend

COPY frontend/package*.json ./

# overwrite the backend's port number for the frontend
RUN echo "backendPort=${FRONTEND-PORT}" > .env

# install the frontend dependencies 
RUN npm install

# copy the frontend
COPY frontend .

# Build frontend
RUN npm run build

# Copy backend source
COPY backend ../

# move built frontend
RUN mv dist/* ../public/

WORKDIR /usr/src/app

# create database directory
RUN mkdir db

EXPOSE 8080
CMD [ "npm", "start" ]
