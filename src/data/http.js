'use strict'
const logger = require('../utils/logger')

// HTTP Call
exports.handleHTTPCall = async (msg) => {
  let response = null

  logger.log('HTTP:Port', `Making HTTP call with message: ${msg}`)

  try {
    response = await fetch(process.env.SERVICE_URL)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    response = await response.json()

    logger.log('HTTP:Port', `Received response: ${JSON.stringify(response)}`)
  } catch (error) {
    logger.error('HTTP:Port', `Error during HTTP call: ${error.message}`)
  }

  return response
}
