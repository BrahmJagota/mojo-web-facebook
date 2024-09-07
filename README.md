# Mojo Web Facebook App

This is a React application using the Facebook Graph API for data integration.

## Deployment

You can view the deployed version of the app [here](https://mojo-web-facebook.vercel.app/). 

**Note:** Unfortunately, the deployed URL domain is not supported by the Facebook Graph API, and you might encounter errors during API calls. For full functionality, please follow the instructions below to run the app locally.

## Local Setup

### 1. Install Dependencies
Navigate to the frontend directory and install the required dependencies:
```
cd frontend && npm install
```
Start the React Server
Once the dependencies are installed, start the React development server:

```
npm run start
```
Configure ngrok (for Facebook API)

Run the following command to start Ngrok:

```bash
ngrok http --domain=curious-narwhal-logically.ngrok-free.app 3000
```
