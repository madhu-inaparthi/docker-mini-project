# Use Node.js base image
FROM node:14-alpine

# Set working directory
WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy frontend source code
COPY . .

# Expose port
EXPOSE 3000

# Start the React app
CMD ["npm", "start"]
