# Modal Componet For Vue 3

基于`Vue 3`的`API`式弹窗组件

### 安装(Install)
---

`App.vue`

```html
<template>
    <modal-provider>
        <router-view>
    </modal-provider>
</template>

<script lang="ts">
import { ModalProvider } from "@gopowerteam/vue-modal";

export default defineComponent({
  components: {
    ModalProvider,
  }
});
</script>

<style>
// 引入样式文件
// 在vue文件中引入
@import url('~@gopowerteam/vue-modal/dist/style.css');

// 或在ts/js文件中引入
// import '@gopowerteam/vue-modal/dist/style.css'
</style>
```

### 使用(Usage)
---

通过使用`useModal`获取`modal`对象,然后通过`open`方法即可打开弹窗.

```html
import HelloWorld from "../components/HelloWorld.vue";
import { useModal } from "@gopowerteam/vue-modal";

export default defineComponent({
  components: {},
  setup() {
    const modal = useModal();

    function onClick() {
      modal
        .open({
          title: "弹窗标题",
          component: HelloWorld,
          props: {
            msg: "123",
          }
        })
        .then((a: any) => {});
    }

    return {
      onClick,
    };
```


### API
---


#### open   
**打开弹窗**

```
const modal = useModal()
modal.open(ModalOption)
```

#### ModalOption

| Name         | Type         | Default: | Description                  |
| ------------ | ------------ | :------: | ---------------------------- |
| component    | VueComponent |    -     | 弹窗内容组件                 |
| props        | Object       |    -     | 弹窗内容组件的props值        |
| title        | String       |    -     | 标题                         |
| header       | Boolean      |   true   | 是否显示弹窗标题栏           |
| closable     | Boolean      |   true   | 是否显示窗口关闭按钮         |
| maskClosable | Boolean      |   true   | 点击mask区域是否可以关闭弹窗 |


### close
**关闭弹窗**

```
const modal = useModal()
modal.close()
```

在打开弹窗的组件页面执行`modal.close`即可关闭组件所在的弹窗页面

`close`的参数将作为回传数据进行返回
```
modal.close({result:true})
```


### closeAll
**关闭所有弹窗**

```
const modal = useModal()
modal.closeAll()
```

### 数据回传
---

`modal.open`返回对象为`promise`对象,通过`then`即可接收回传数据

```
const modal = useModal()
modal.open(ModalOption).then(data=>{
  // 处理回传数据
}})
```

通过`modal.close`即可将数据进行回传

```
//open
modal.open(...).then(data=>{
  console.log(data) // {result:true}
})

// close
modal.close({result:true})
```

