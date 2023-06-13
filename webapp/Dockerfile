# Use an official Node.js runtime as a parent image
FROM node:14-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in package.json
RUN npm install

# Set environment variables
ENV REACT_APP_API_URL=http://localhost:8080/api

# Make the container's port 3000 available to the outside world
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
