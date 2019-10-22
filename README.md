# LoveIsAleWeNeed
RESTful API + MongoDB. About beers. Made with love in 2019 &lt;3

# Installation
For This API to work, you'll need to place the node.js command prompt in the LoveIsAleWeNeed folder root, and juste use npm install.
It will automatically install every depedency needed, but you can check te full list in the package.json file.

# Running the API
To run the API, you have several possibilities: place your node.js command prompt at the root of the LoveIsAleWeNeed folder, and do one of the followings:
- "npm run dev": it will launch a configuration with nodemon. Each time you make a change in the API, it will restart automatically the server
- "node src": a normal Running

# Testing the API
To test the API, you can send HTTP request (like get, post, put, delete) to the following paths:
- get localhost:3001/ (the root) will return all the beers.
- get, put, delete localhost:3001/beers/:idbeer will return / update / delete a beer with the idbeer as an id. 

A full documentation will be available in the future.

# License
This API is under the Mozilla Public License 2.0 . Learn more here : https://www.mozilla.org/en-US/MPL/2.0/
