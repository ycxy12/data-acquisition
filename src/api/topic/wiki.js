import http from "@/utils/request"

/**
 * @name 情报专题-wiki
 */

// 获取专题列表
export const listWiki = (params) => {
	return http.get("/api/subjectWiki/list", params)
}

// 发布文章
export const publishNews = (params) => {
	return http.put("/api/article/publish", params)
}

// 已读消息
export const readMsg = (params) => {
	return http.put("/api/article/readMsg", params)
}

// 订阅的已发布文章数量
export const publishedCount = (userId) => {
	return http.get(`/api/article/publishedCount/${userId}`,)
}

// 订阅的已发布文章标题列表
export const publishedArticles = (userId) => {
	return http.get(`/api/article/publishedArticles/${userId}`,)
}

