import http from "@/utils/request"

/**
 * @name 情报问答
 */

// 问答
export const qaChat = (params) => {
	return http.post("/qbcjApi/qa", params)
}

// 获取推荐搜索结果
export const qaChatSearch = (params) => {
	return http.get("/qbcjApi/qa/search", params)
}
