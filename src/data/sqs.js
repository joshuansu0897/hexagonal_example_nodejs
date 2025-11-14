'use strict'
const aws = require('aws-sdk')
const logger = require('../utils/logger')

const sqs = new aws.SQS({ 
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
})

const QUEUE_URL = process.env.SQS_QUEUE_URL

exports.sendMessageToSQS = async (msg) => {
  logger.log('SQSPort', `Sending message to SQS: ${msg}`)

  const params = {
    MessageBody: msg,
    QueueUrl: QUEUE_URL
  }

  let response = null
  try {
    response = await sqs.sendMessage(params).promise()
    logger.log('SQSPort', `Message sent to SQS with ID: ${response.MessageId}`)
  } catch (error) {
    logger.error('SQSPort', `Failed to send message to SQS: ${error.message}`)
  }

  return response
}
