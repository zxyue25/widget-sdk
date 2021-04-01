# @jdt/widget-sdk

## Installation

    npm install @jdt/widget-sdk

## Usage

```javascript
//in vue
<template>
   <widget-render src="widget地址" :name="name" @logout-click="handleLogoutClick" >
    <template slot="page-main">
      <div>main</div>
    </template>
   </widget-render>
</template>

<script>
import { WidgetRender, EventCenter } from "@jdt/widget-sdk/render"
export default {
   components: {
      WidgetRender
   },
   data() {
     return {
       name: 'widget-sdk'
     }
   },
   methods: {
      handleLogoutClick() {
        console.log('触发退出登录按钮')
      },
   },
   mounted() {
     const bus = new EventCenter('namescope')
     bus.emit('event-name')
   }
}
</script>
```

## EventCenter API

#### on(name,action)

    add event

#### off(name,action?)

    remove event

#### once(name,action)

    add evnet for one time

#### emit(name:string|string[])

    emit event by name or name array

#### has(name:string)

    check event name exists

#### first(name:string,action)

    remove events of name
    then add action of the same name

## Changelog

[详细更新内容](https://)
