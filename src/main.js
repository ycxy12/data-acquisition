/*
 * @Author: yc
 * @Date: 2024-11-23 10:15:40
 * @LastEditors: yc
 * @LastEditTime: 2024-11-24 14:28:08
 * @Description: main.js
 */
import Vue from "vue"
//使用normalize 重置css
import "normalize.css/normalize.css"
//引入css
import "./styles/index.scss"
import ElementUI from "element-ui"
import "element-ui/lib/theme-chalk/index.css"
import "./styles/element.scss"
import App from "./App.vue"
// 引入路由配置
import router from "./router"
//引入vuex
import store from "./store"
// 引入 SVG 图标组件
import "@/components/SvgIcon/index"

import VueParticles from "vue-particles"

// 引入 Vconsole
// import Vconsole from "vconsole"

// 初始化 Vconsole
// new Vconsole()


Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueParticles)

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount("#app")
