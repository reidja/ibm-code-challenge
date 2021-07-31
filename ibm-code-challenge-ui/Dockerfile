# Build the production version of the user interface
FROM node:lts-slim as code
WORKDIR /app
# Install the Angular CLI
RUN npm i -g @angular/cli

# Copy in and install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy in the source code and build the production version
COPY . .
RUN ng build --base-href /ibm-code-challenge/

# Deploy the user interface as a static application using NGINX
FROM nginx:stable

# Copy the NGINX configuration to the container
COPY nginx/nginx.conf /etc/nginx/nginx.conf

# Copy in the production application from the code stage
COPY --from=code /app/dist/ibm-code-challenge-ui /usr/share/nginx/html/
