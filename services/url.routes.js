const express = require('express');
const { apiURL, addURL, getURL } = require('./url.controller');

const useRouterURL = express.Router();

useRouterURL.route("/")
    .get( apiURL )
    .post( addURL );

useRouterURL.route("/:shortId")
    .get( getURL );

module.exports = useRouterURL;