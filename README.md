# TODO APP UI

## Project Setup Instructions

### Prerequisites

- Docker (instructions to install are provided below)
- Node.js and Yarn (for development mode)

### Environment Variables

Copy the `.env.example` file and rename it to `.env`. Fill in the required environment variables before proceeding.

### Production Mode Setup

1. Create a Docker network:

   ```bash
   docker network create shared_network
   ```

2. Build and start the project using Docker Compose:
   ```bash
   docker compose -f docker-compose.yaml up -d --build --force-recreate
   ```
   This command will:
   - Build the Docker images for the project.
   - Start the project in production mode.

### Development Mode Setup

1. Install project dependencies:

   ```bash
   yarn
   ```

2. Start the project in development mode:

   ```bash
   yarn start:dev
   ```

### Docker Installation Instructions (Ubuntu)

1. Update the package index:

   ```bash
   sudo apt-get update
   ```

2. Install required packages:

   ```bash
   sudo apt-get install ca-certificates curl
   ```

3. Create a directory for Docker’s keyrings:

   ```bash
   sudo install -m 0755 -d /etc/apt/keyrings
   ```

4. Download and add Docker’s GPG key:

   ```bash
   sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
   sudo chmod a+r /etc/apt/keyrings/docker.asc
   ```

5. Add Docker’s official repository to the sources list:

   ```bash
   echo \
     "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
     $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
     sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
   sudo apt-get update
   ```

6. Install Docker and related tools:

   ```bash
   sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
   ```

## Notes

- Ensure the `.env` file is correctly filled in both production and development setups.
