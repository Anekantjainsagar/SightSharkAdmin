FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache libc6-compat g++ make

# Copy package.json and package-lock.json from the current context (client directory)
COPY package*.json ./

# Install dependencies
RUN npm install && npm install sharp

# Copy all files from the client directory to /app in the container
COPY . .

# Build the Next.js application
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Set the PORT environment variable
ENV PORT 3000

# Run the Next.js app
CMD ["npm", "run", "start"]
