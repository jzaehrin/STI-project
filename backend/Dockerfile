FROM node:10

RUN apt-get -y update
RUN apt-get -y upgrade
RUN apt-get install -y sqlite3 libsqlite3-dev
RUN mkdir /db

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY backend/package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY backend .

# Copy the frontend folder
WORKDIR /usr/src/app/frontend
COPY frontend .

# Build frontend
RUN npm install
RUN npm run build

# move built frontend
RUN mv dist/* ../public/

WORKDIR /usr/src/app

EXPOSE 8080
CMD [ "npm", "start" ]
