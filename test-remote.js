'use strict'

const exec = require('child_process').exec

// I know this is a long winded way but I wasn't sure how to do it
// I can change `exec` to be `+ command` and then have an array 
// with each command, but am not sure how to then use it on `exports`

// const buttons = {keysMute: 'KEY_MUTE', keysPower: 'KEY_POWER', keysUp: 'KEY_VOLUMEUP', keysDown: 'KEY_VOLUMEDOWN'}

//function buttonPress(buttons){
//    exec('irsend SEND_ONCE lg-remote ' + buttons, function(error){
//        if (error) {
//            console.error(`exec error: ${error}`)
//            return
//        }
//    })
//}

const remoteKeys = {}

function mute(){
    exec('irsend SEND_ONCE lg-remote KEY_MUTE', function(error){
        if (error) {
            console.error(`exec error: ${error}`)
            return
        }
    })
}

var buttonMute = mute()

function power(){
    exec('irsend SEND_ONCE lg-remote KEY_POWER', function(error){
        if (error) {
            console.error(`exec error: ${error}`)
            return
        }
    })
}
var buttonPower = power()

function volumeup(){
    exec('irsend SEND_ONCE lg-remote KEY_VOLUMEUP', function(error){
        if (error) {
            console.error(`exec error: ${error}`)
            return
        }
    })
}
var buttonVolumeup = volumeup()

function volumedown(){
    exec('irsend SEND_ONCE lg-remote KEY_VOLUMEDOWN', function(error){
        if (error) {
            console.error(`exec error: ${error}`)
            return
        }
    })
}
var buttonVolumedown = volumedown()

remote-keys.key-mute = buttonMute
remote-keys.key-power = buttonPower
remote-keys.key-volumeup = buttonVolumeup
remote-keys.key-volumeup = buttonVolumedown

module.exports = remoteKeys
