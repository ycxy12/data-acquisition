import http from "@/utils/request"

/**
 * @name 情报专题-订阅
 */

// 获取专题列表
export const listArticle = (params) => {
	return http.get("/qbcjApi/article/list", params)
}

// 新增
export const addArticle = (params) => {
	return http.post("/qbcjApi/article", params)
}

// 编辑
export const editArticle = (params) => {
	return http.put("/qbcjApi/article", params)
}

// 详情
export const getArticleByid = (id) => {
	return http.get(`/qbcjApi/article/${id}`)
}

// 删除
export const deleteArticle = (id) => {
	return http.delete(`/qbcjApi/article/${id}`)
}
