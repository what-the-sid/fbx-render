
# FBX Render

Welcome to the FBX Render repository!

## Prerequisites

Before you start, make sure you have `nvm` (Node Version Manager) installed to manage different Node.js versions. We recommend using Node.js version `16.20.1` for this application.

If you don't have `nvm` installed, please follow the instructions at: [NVM Installation Guide](https://github.com/nvm-sh/nvm#installing-and-updating)

## Setting Up

### Installing the Correct Node.js Version

To install and use Node.js version `16.20.1`, run the following commands in your terminal:

```bash
nvm install 16.20.1
nvm use 16.20.1
```

### Installing Dependencies

To install all required dependencies (both Python packages and npm packages), execute the initialization script:


```bash
./init.sh
```

This script takes care of setting up everything you need to run the app.

## Running the Application

To start the application, use the following command:
```bash
pnpm start
```

This command utilizes the `concurrency` tool to run both the backend and frontend components simultaneously.

## Demo

https://github.com/what-the-sid/fbx-render/assets/9461670/963a07f5-6de5-4fbb-ac80-a2abf6464270



