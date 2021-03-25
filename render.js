
import axios from 'axios'
export default {
  render() {
    // eslint-disable-next-line
    const _vm = this
    return _vm.$createElement(_vm.defaultComponent,
      {
        tag: 'component',
        props: Object.assign({}, _vm.$attrs, _vm.$props),
        on: this.$listeners,
        // eslint-disable-next-line
        scopedSlots: _vm._u(
          Object.keys(_vm.$scopedSlots || {}).map(slotName => ({
            key: slotName,
            fn(scope) {
              // eslint-disable-next-line
              return _vm._t(slotName, null, {
                data: scope.data
              })
            }
          })),
          this.$slots.default,
          true
        )
      })
  },
  created() {
    this.dynamicComponentRender()
  },
  methods: {
    execute(jsContent) {
      eval(jsContent)
    },
    async loadDynamic() {
      const res = await axios.get(this.src)
      this.execute(res.data)
      const component = window.XDinamicCommonComponent.default
      const componentName = 'XDynamicComponent-' + (this.name|| this.src.split('/').pop().replace(/\.(widgets?|js)/g,''))

      return {
        name: componentName,
        component
      }
    },
    async dynamicComponentRender() {
      const { name, component } = await this.loadDynamic()
      this.$options.components[name] = component
      this.defaultComponent = name
    }
  },
  components: {
  },
  props: {
    src: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      defaultComponent: 'div'
    }
  }
}
