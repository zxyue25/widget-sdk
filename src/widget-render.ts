export default {
  render() {
    // eslint-disable-next-line
    const _vm = this
    return _vm.$createElement(_vm.defaultComponent, {
      tag: 'component',
      props: Object.assign({}, _vm.$attrs, _vm.$props),
      on: this.$listeners,
      // eslint-disable-next-line
      scopedSlots: _vm._u(
        Object.keys(_vm.$scopedSlots || {}).map((slotName) => ({
          key: slotName,
          fn(scope) {
            // eslint-disable-next-line
            return _vm._t(slotName, null, {
              data: scope.data,
            })
          },
        })),
        this.$slots.default,
        true
      ),
    })
  },
  created() {
    this.dynamicComponentRender()
  },
  methods: {
    execute(jsContent) {
      return eval(jsContent)
    },
    fetch(src) {
      var xmlHttp = new XMLHttpRequest()
      let resolve
      const promise = new Promise((_resolve) => {
        resolve = _resolve
      })
      xmlHttp.open('GET', src, true)
      xmlHttp.setRequestHeader('Content-Type', 'application;charset=utf-8')
      xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
          resolve({ success: true, data: xmlHttp.responseText })
        }
      }
      xmlHttp.send()
      return promise
    },
    async loadDynamic() {
      const { success, data } = await this.fetch(this.src)
      if (!success) return

      //   const wrappedData = `
      //   (function(){
      //     const self = {};
      //     ${data};
      //   return self["XDinamicCommonComponent"];
      // })();
      //   `
      //   debugger
      //   const componentObj = this.execute(wrappedData)
      //   debugger
      this.execute(data)
      const component = (window as any).XDinamicCommonComponent.default
      const componentName =
        'XDynamicComponent-' +
        (this.name ||
          this.src
            .split('/')
            .pop()
            .replace(/\.(widgets?|js)/g, ''))

      return {
        name: componentName,
        component,
      }
    },
    async dynamicComponentRender() {
      const { name, component } = await this.loadDynamic()
      this.$options.components[name] = component
      this.defaultComponent = name
    },
  },
  components: {},
  props: {
    src: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      defaultComponent: 'div',
    }
  },
}
