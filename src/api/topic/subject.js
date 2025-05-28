import http from "@/utils/request"

/**
 * @name 情报专题-订阅
 */

// 获取专题列表
export const listSubject = (params) => {
	return http.get("/qbcjApi/subject/list", params)
}

// 新增
export const addSubject = (params) => {
	return http.post("/qbcjApi/subject", params)
}

// 编辑
export const editSubject = (params) => {
	return http.put("/qbcjApi/subject", params)
}

// 详情
export const getSubjectByid = (id) => {
	return http.get(`/qbcjApi/subject/${id}`)
}

// 删除
export const deleteSubject = (id) => {
	return http.delete(`/qbcjApi/subject/${id}`)
}

// 获取我的订阅专题列表
export const getMySubjectList = (params) => {
	return http.get("/qbcjApi/subject/getMySubscriptionSubjectList", params)
}

// 情报专题订阅/取消订阅
export const setSubjectSubscription = (params) => {
	return http.post("/qbcjApi/qbSubjectSubscription/setSubjectSubscription", params)
}

// 通用上传请求
export const commonUpload = (params) => {
	return http.post("/qbcjApi/common/upload", params)
}
