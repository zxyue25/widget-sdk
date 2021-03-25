const event = require('event-helper')

const globalEventPrefix = 'jdt-widget-'

export default class{
  constructor(namespace){
    const eventNamespace =  globalEventPrefix + namespace
    if(!window[eventNamespace]){
      window[eventNamespace] = new event()
    }
    return window[eventNamespace]
  }
}