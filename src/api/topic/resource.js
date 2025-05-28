import http from "@/utils/request"

/**
 * @name 情报专题-订阅
 */

// 获取专题列表 - 装备
export const listSubjectZb = (params) => {
	return http.get("/qbcjApi/subjectZb/getZbListOfSubjectZb", params)
}

// 新增
export const addSubjectZb = (params) => {
	return http.post("/qbcjApi/subjectZb", params)
}

// 删除
export const deleteSubjectZb = (params) => {
	return http.delete("/qbcjApi/subjectZb", {}, { data: params })
}

// 获取专题列表 - 兵力编成编组
export const listSubjectBlbc = (params) => {
	return http.get("/qbcjApi/subjectBlbc/list", params)
}

// 新增
export const addSubjectBlbc = (params) => {
	return http.post("/qbcjApi/subjectBlbc", params)
}

// 删除
export const deleteSubjectBlbc = (params) => {
	return http.delete("/qbcjApi/subjectBlbc", {}, { data: params })
}

// 获取专题列表 - 战例
export const listSubjectZl = (params) => {
	return http.get("/qbcjApi/subjectZl/list", params)
}

// 新增
export const addSubjectZl = (params) => {
	return http.post("/qbcjApi/subjectZl", params)
}

// 删除
export const deleteSubjectZl = (params) => {
	return http.delete("/qbcjApi/subjectZl", {}, { data: params })
}
