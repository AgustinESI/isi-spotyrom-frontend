
# --------------------------------------------------------
# Stage 1: Compile and Build angular codebase
# Use official node image as base image
FROM node:21-slim as build

# Set the working directory
WORKDIR /usr/local/app

# Add the source code to app
COPY ./ /usr/local/app/

# Install all the dependencies
RUN npm install --force

CMD ["npm", "start"]

EXPOSE 4200