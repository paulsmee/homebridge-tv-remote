'use strict'

const buttonPress = require('./remote')

let Service, Characteristic

module.exports = (homebridge) => {
  /* this is the starting point for the plugin where we register the accessory */
  Service = homebridge.hap.Service
  Characteristic = homebridge.hap.Characteristic
  homebridge.registerAccessory('homebridge-lg-remote', 'lg-remote', RemoteAccessory)
}

class RemoteAccessory {
  constructor (log, config) {
    /*
     * The constructor function is called when the plugin is registered.
     * log is a function that can be used to log output to the homebridge console
     * config is an object that contains the config for this plugin that was defined the homebridge config.json
     */

    /* assign both log and config to properties on 'this' class so we can use them in other methods */
    this.log = log
    this.config = config

    /*
     * A HomeKit accessory can have many "services". This will create our base service,
     * Service types are defined in this code: https://github.com/KhaosT/HAP-NodeJS/blob/master/lib/gen/HomeKitTypes.js
     * Search for "* Service" to tab through each available service type.
     * Take note of the available "Required" and "Optional" Characteristics for the service you are creating
     */
    this.powerSwitch = new Service.Switch('TV', 'power')
    this.muteSwitch = new Service.Switch('Mute', 'mute');
  }

  getServices () {
    /*
     * The getServices function is called by Homebridge and should return an array of Services this accessory is exposing.
     * It is also where we bootstrap the plugin to tell Homebridge which function to use for which action.
     */

     /* Create a new information service. This just tells HomeKit about our accessory. */
    const informationService = new Service.AccessoryInformation()
        .setCharacteristic(Characteristic.Manufacturer, 'Hudson Industries')
        .setCharacteristic(Characteristic.Model, 'lg-remote')
        .setCharacteristic(Characteristic.SerialNumber, 'HI-1337')

    /*
     * For each of the service characteristics we need to register setters and getter functions
     * 'get' is called when HomeKit wants to retrieve the current state of the characteristic
     * 'set' is called when HomeKit wants to update the value of the characteristic
     */
    this.powerSwitch.getCharacteristic(Characteristic.On)
      .on('get', this.getPowerSwitchHandler.bind(this))
      .on('set', this.setPowerSwitchHandler.bind(this))

    this.muteSwitch.getCharacteristic(Characteristic.On)
      .on('get', this.getMuteSwitchHandler.bind(this))
      .on('set', this.setMuteSwitchHandler.bind(this))

    /* Return both the main service (this.powerSwitch) and the informationService */
    return [informationService, this.powerSwitch, this.muteSwitch]
  }

  setPowerSwitchHandler (value, callback) {
    this.log('called setPowerSwitchHandler')

    buttonPress('KEY_POWER')

    setTimeout(() => {
      /* Turn the switch off again to make it a stateless switch */
      this.powerSwitch.getCharacteristic(Characteristic.On).updateValue(false)
    }, 10)

    callback(null)
  }

  getPowerSwitchHandler (callback) {
    this.log('called getPowerSwitchHandler')
    callback(null, false)
  }


  setMuteSwitchHandler (value, callback) {
    this.log('called setMuteSwitchHandler')

    buttonPress('KEY_MUTE')

    setTimeout(() => {
      /* Turn the switch off again to make it a stateless switch */
      this.muteSwitch.getCharacteristic(Characteristic.On).updateValue(false)
    }, 10)

    callback(null)
  }

  getMuteSwitchHandler (callback) {
    this.log('called getMuteSwitchHandler')
    callback(null, false)
  }

}
