import http from "@/utils/request"

/**
 * @name 情报专题-订阅
 */

// 获取专题列表
export const listArticle = (params) => {
	return http.get("/api/article/list", params)
}

// 新增
export const addArticle = (params) => {
	return http.post("/api/article", params)
}

// 编辑
export const editArticle = (params) => {
	return http.put("/api/article", params)
}

// 详情
export const getArticleByid = (id) => {
	return http.get(`/api/article/${id}`)
}

// 删除
export const deleteArticle = (id) => {
	return http.delete(`/api/article/${id}`)
}
