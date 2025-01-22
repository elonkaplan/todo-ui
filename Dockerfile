# Dockerfile

# Use an existing node alpine image as a base image.
FROM node:alpine

# Set the working directory.
WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

# Install application dependencies.
RUN yarn

# Copy the rest of the application files.
COPY . .

# Build the app
RUN yarn build

# Run the application.
CMD ["yarn", "start"]