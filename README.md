# Getting Started with the web interface

This project is a work-in-progress
Triggering rebuild, delete this line

## Installing Node.js and NPM

[https://nodejs.org/en/](https://nodejs.org/en/)

## Installing Git

[https://git-scm.com/book/en/v2/Getting-Started-Installing-Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

## Cloning the app

Frontend and backend must be in two separate folders. Make sure to not cd into the frontend folder before cloning the backend folder.

Frontend
`git clone https://github.com/neurotechpurdue/bci-web-interface.git`

Backend
`git clone https://github.com/neurotechpurdue/bci-dashboard.git`

## Running the app

Before running the app, use the terminal to cd into both frontend and backend folders and run `npm install`.

Then, in the backend folder, run
`npm run development`

In the frontend folder, run
`npm run development`

Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.
The page will reload when you make changes.

## Available Scripts

In the project directory, you can run:

`npm run development` in order to use the app locally. (this is to be coupled with running npm start on the backend available here: [https://github.com/neurotechpurdue/bci-dashboard](https://github.com/neurotechpurdue/bci-dashboard)

Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.
The page will reload when you make changes.

`npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!
