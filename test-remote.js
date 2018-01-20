'use strict'

const exec = require('child_process').exec

// I know this is a long winded way but I wasn't sure how to do it
// I can change `exec` to be `+ command` and then have an array 
// with each command, but am not sure how to then use it on `exports`

// const buttons = {keys-mute: 'KEY_MUTE', keys-power: 'KEY_POWER', keys-up: 'KEY_VOLUMEUP', keys-down: 'KEY_VOLUMEDOWN'}

//function button-press(buttons){
//    exec('irsend SEND_ONCE lg-remote ' + buttons, function(error){
//        if (error) {
//            console.error(`exec error: ${error}`)
//            return
//        }
//    })
//}

const remote-keys = {}

function mute(){
    exec('irsend SEND_ONCE lg-remote KEY_MUTE', function(error){
        if (error) {
            console.error(`exec error: ${error}`)
            return
        }
    })
}

var button-mute = mute()

function power(){
    exec('irsend SEND_ONCE lg-remote KEY_POWER', function(error){
        if (error) {
            console.error(`exec error: ${error}`)
            return
        }
    })
}
var button-power = power()

function volumeup(){
    exec('irsend SEND_ONCE lg-remote KEY_VOLUMEUP', function(error){
        if (error) {
            console.error(`exec error: ${error}`)
            return
        }
    })
}
var button-volumeup = volumeup()

function volumedown(){
    exec('irsend SEND_ONCE lg-remote KEY_VOLUMEDOWN', function(error){
        if (error) {
            console.error(`exec error: ${error}`)
            return
        }
    })
}
var button-volumedown = volumedown()

remote-keys.key-mute = button-mute
remote-keys.key-power = button-power
remote-keys.key-volumeup = button-volumeup
remote-keys.key-volumeup = button-volumedown

module.exports = remote-keys
