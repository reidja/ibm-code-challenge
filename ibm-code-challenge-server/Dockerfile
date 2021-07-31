# Build and run a production version of the server
FROM node:lts-slim
WORKDIR /app
# Install the Angular CLI
RUN npm i -g @angular/cli

# Copy in and install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy in the source code and build the production version
COPY . .
RUN npm run build

# Run Nest in production mode
CMD [ "npm", "run", "start:prod" ]
