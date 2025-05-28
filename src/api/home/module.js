import http from "@/utils/request"

/**
 * @name 情报资源库-装备战技参数
 */

// 获取装备组件列表
export const listZbModule = (params) => {
	return http.get("/qbcjApi/zbModule/list", params)
}

// 新增
export const addZbModule = (params) => {
	return http.post("/qbcjApi/zbModule", params)
}

// 编辑
export const editZbModule = (params) => {
	return http.put("/qbcjApi/zbModule", params)
}

// 详情
export const getZbModuleByid = (id) => {
	return http.get(`/qbcjApi/zbModule/${id}`)
}

// 删除
export const deleteZbModule = (id) => {
	return http.delete(`/qbcjApi/zbModule/${id}`)
}

// 下拉框
export const dropDownZbModule = (params) => {
	return http.get("/qbcjApi/zbModule/dropDown", params)
}

// 设置装备与装备组件的关系
export const setRelation = (params) => {
	return http.put("/qbcjApi/zbModule/setRelation", params)
}

// 获取装备下的组件列表信息
export const getZbModuleByZbInfo = (id) => {
	return http.get(`/qbcjApi/zbModule/getZbModuleByZbInfo/${id}`)
}

// 获取装备下的组件列表信息
export const listzbRelation = (params) => {
	return http.get("/qbcjApi/zbRelation/getFromList", params)
}

// 新增
export const updatezbRelation = (params) => {
	return http.post("/qbcjApi/zbRelation", params)
}
