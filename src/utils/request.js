import axios from "axios"
import { Message } from "element-ui"
import router from "@/router"
import store from "@/store"

const config = {
	// 默认地址请求地址，可在 .env.** 文件中修改
	baseURL: "",
	// 设置超时时间
	timeout: 60000,
	// 跨域时候允许携带凭证
	withCredentials: true,
}

class RequestHttp {
	constructor(config) {
		// Instantiate axios
		this.service = axios.create(config)

		/**
		 * @description 请求拦截器
		 * 客户端发送请求 -> [请求拦截器] -> 服务器
		 * token校验(JWT) : 接受服务器返回的 token,存储到 vuex/pinia/本地储存当中
		 */
		this.service.interceptors.request.use(
			(config) => {
				if (config.headers && typeof config.headers.set === "function") {
					config.headers.set("userId", store.getters.getUserId)
					config.headers.set("Authorization", store.getters.getToken)
				}
				return config
			},
			(error) => {
				return Promise.reject(error)
			}
		)

		/**
		 * @description 响应拦截器
		 *  服务器换返回信息 -> [拦截统一处理] -> 客户端JS获取到信息
		 */
		this.service.interceptors.response.use(
			(response) => {
				const { data, config } = response

				// 登录失效
				if (data.code === 403) {
					store.dispatch("logout")
					router.replace("/login")
					Message.error(data.msg)
					return Promise.reject(data)
				}

				// 全局错误信息拦截（防止下载文件的时候返回数据流，没有 code 直接报错）
				if (data.code && data.code !== 200) {
					Message.error(data.msg)
					return Promise.reject(data)
				}
				//下载接口直接返回
				if (config.responseType === "blob") {
					return response
				}

				// 成功请求（在页面上除非特殊情况，否则不用处理失败逻辑）
				return data
			},
			async (error) => {
				const { response } = error
				// 请求超时 && 网络错误单独判断，没有 response
				if (error.message.indexOf("timeout") !== -1) Message.error("请求超时！请您稍后重试")
				if (error.message.indexOf("Network Error") !== -1) Message.error("网络错误！请您稍后重试")
				// 根据服务器响应的错误状态码，做不同的处理
				if (response) {
					switch (response.status) {
						case 400:
							Message.error("请求失败！请您稍后重试")
							break
						case 401:
							Message.error("登录失效！请您重新登录")
							break
						case 403:
							Message.error("当前账号无权限访问！")
							router.push("/login")
							console.log("2333")

							break
						case 404:
							Message.error("你所访问的资源不存在！")
							break
						case 405:
							Message.error("请求方式错误！请您稍后重试")
							break
						case 408:
							Message.error("请求超时！请您稍后重试")
							break
						case 500:
							Message.error("服务异常！")
							break
						case 502:
							Message.error("网关错误！")
							break
						case 503:
							Message.error("服务不可用！")
							break
						case 504:
							Message.error("网关超时！")
							break
						default:
							Message.error("请求失败！")
					}
				}
				// 服务器结果都没有返回(可能服务器错误可能客户端断网)，断网处理:可以跳转到断网页面
				if (!window.navigator.onLine) router.replace("/500")
				return Promise.reject(error)
			}
		)
	}

	/**
	 * @description 常用请求方法封装
	 */
	get(url, params, _object = {}) {
		return this.service.get(url, { params, ..._object })
	}

	post(url, params, _object = {}) {
		return this.service.post(url, params, _object)
	}

	put(url, params, _object = {}) {
		return this.service.put(url, params, _object)
	}

	delete(url, params, _object = {}) {
		return this.service.delete(url, { params, ..._object })
	}

	download(url, params, _object = {}) {
		return this.service.post(url, params, { ..._object, responseType: "blob" })
	}
}

export default new RequestHttp(config)
