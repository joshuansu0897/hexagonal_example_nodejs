'use strict'
const express = require('express')
const app = express()

// Imports
const business_logic = require('../domain/business_logic')
const logger = require('../utils/logger')

// Middlewares
app.use(express.json())

// Routes for HTTP messages
app.post('/http', async (req, res) => {
  const msg = req.body.message
  logger.log('HTTP:Adapter', `HTTP - message: ${msg}`)

  // Call Domain logic here
  const response = await business_logic.processHTTPMessage(msg)

  res.status(200).send(response)
})

// Routes for SQS messages
app.post('/sqs', async (req, res) => {
  const msg = req.body.message
  logger.log('HTTP:Adapter', `SQS - message: ${msg}`)

  // Call Domain logic here
  const response = await business_logic.processSQSMessage(msg)

  res.status(200).send(response)
})

// Start the server
app.listen(process.env.HTTP_PORT, () => {
  logger.log('HTTP:Adapter', `HTTP server listening on port ${process.env.HTTP_PORT}`)
})
