import event from 'event-helper'
const globalEventPrefix = 'jdt-widget-'
export default class eventCanter {
  constructor(namespace) {
    const eventNamespace = globalEventPrefix + namespace
    if (!window[eventNamespace]) {
      window[eventNamespace] = event.create()
    }
    return window[eventNamespace]
  }
}
