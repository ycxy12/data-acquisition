import http from "@/utils/request"

/**
 * @name 资源管理-装备类型管理
 */

// 获取装备类型列表
export const listZbType = (params) => {
	return http.get("/api/zbType", params)
}

// 新增
export const addZbType = (params) => {
	return http.post("/api/zbType", params)
}

// 编辑
export const editZbType = (params) => {
	return http.put("/api/zbType", params)
}

// 详情
export const getZbTypeByid = (id) => {
	return http.get(`/api/zbType/${id}`)
}

// 删除
export const deleteZbType = (id) => {
	return http.delete(`/api/zbType/${id}`)
}

// 装备类型树形结构
export const listZbTypeTree = (params) => {
	return http.get("/api/zbType/tree", params)
}

// 查询所有装备类型并附带装备信息
export const listZbTypeTreeAndInfo = (params) => {
	return http.get("/api/zbType/treeAndZbInfo", params)
}
