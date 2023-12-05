# Stage 1: Building the React application
FROM node:16.14.0 as build-stage

# Add ARG for environment variable
ARG REACT_APP_API_HOST

WORKDIR /app

COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

COPY . .

# Use ARG value as environment variable
ENV REACT_APP_API_HOST=${REACT_APP_API_HOST}
ENV NODE_ENV=production

# Build the app
RUN yarn build

# Stage 2: Serve the app using Nginx
FROM nginx:stable-alpine as production-stage

# Copy the build output to replace the default nginx contents.
COPY --from=build-stage /app/build /usr/share/nginx/html

# Expose port 80 to the outside once the container has launched
EXPOSE 80

# Define the command to run your app using CMD which defines your runtime
CMD ["nginx", "-g", "daemon off;"]
