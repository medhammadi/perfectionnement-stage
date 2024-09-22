
# Use official Node.js image as base
FROM node:14

# Set working directory inside the container
WORKDIR /app-backend

# Copy package.json and package-lock.json to container
COPY . .

# Install dependencies
RUN npm install

# Copy the rest of the application code to container
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]
