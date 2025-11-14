'use strict'
const logger = require('../utils/logger')
const httpPort = require('../data/http')
const sqsPort = require('../data/sqs')

// Business logic functions can be defined here
exports.processHTTPMessage = async (msg) => {
  logger.log('BusinessLogic', `Processing HTTP message in business logic: ${msg}`)

  msg = secretBusinessFunction(msg)
  const response = await httpPort.handleHTTPCall(msg)

  return `Processed HTTP: ${msg} with response: ${JSON.stringify(response)}`
}

exports.processSQSMessage = async (msg) => {
  logger.log('BusinessLogic', `Processing SQS message in business logic: ${msg}`)
  
  msg = secretBusinessFunction(msg)
  const response = await sqsPort.sendMessageToSQS(msg)

  return `Processed SQS: ${msg} with response: ${JSON.stringify(response)}`
}

function secretBusinessFunction(msg) {
  logger.log('BusinessLogic', 'Executing secret business function')
  return msg.split('').reverse().join('')
}
