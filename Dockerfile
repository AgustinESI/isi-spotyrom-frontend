
# --------------------------------------------------------
# Stage 1: Compile and Build angular codebase
# Use official node image as base image
FROM node:latest as build

# Set the working directory
WORKDIR /usr/local/app

# Add the source code to app
COPY ./ /usr/local/app/

# Install all the dependencies
RUN npm install --force

CMD ["npm", "start"]

# Set the proxy config file as an environment variable
#ENV HTTP_PROXY_CONFIG=/usr/local/app/proxy.conf.json

# Generate the build of the application
#RUN npm run build

# --------------------------------------------------------
# Stage 2: Serve app with nginx server
# Use official nginx image as the base image
#FROM nginx:latest

# Copy the build output to replace the default nginx contents.
#COPY --from=build /usr/local/app/dist/spotyrom-frontend /usr/share/nginx/html

# Expose port 80
#EXPOSE 80