'use strict'

const exec = require('child_process').exec

const buttonPress = function(KEY) {
            exec(`irsend SEND_ONCE lg-remote ${KEY}`, function(error){
        if (error) {
            console.error(`exec error: ${error}`)
            return
        }
    })
}

module.exports = buttonPress
