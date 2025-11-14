'use strict'
const { Server } = require("socket.io")
const io = new Server(process.env.SOCKET_PORT)

// Imports
const business_logic = require('../domain/business_logic')
const logger = require('../utils/logger')

io.on("connection", (socket) => {
  logger.log('Socket:Adapter', `user connected: ${socket.id}`)

  socket.on("http", async (msg) => {
    logger.log('Socket:Adapter', `HTTP - message: ${msg}`)

    // Call Domain logic here
    const response = await business_logic.processHTTPMessage(msg)

    socket.emit("http", response)
  })

  socket.on("sqs", async (msg) => {
    logger.log('Socket:Adapter', `SQS - message: ${msg}`)

    // Call Domain logic here
    const response = await business_logic.processSQSMessage(msg)

    socket.emit("sqs", response)
  })

  socket.on("disconnect", () => {
    logger.log('Socket:Adapter', "user disconnected")
  })
})

logger.log('Socket:Adapter', `Socket server listening on port ${process.env.SOCKET_PORT}`)
