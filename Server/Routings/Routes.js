const express = require('express');
const { getResponse } = require('../Controllers/AllFunctionalities');
const myRouter = express.Router();

myRouter.post("/get-response",getResponse);

module.exports = myRouter;