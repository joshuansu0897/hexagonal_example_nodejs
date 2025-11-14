'use strict'

exports.log = (adapter, message) => {
  console.log(`[LOG] (${adapter}): ${message}`)
}

exports.error = (adapter, message) => {
  console.error(`[ERROR] (${adapter}): ${message}`)
}