import event from 'event-helper'
const globalEventPrefix = 'jdt-widget-'
export default class eventCenter extends event {
  constructor(namespace) {
    super()
    const eventNamespace = globalEventPrefix + (namespace || 'default')
    if (window[eventNamespace]) {
      return window[eventNamespace]
    } else {
      window[eventNamespace] = this
    }
  }
}
