import http from "@/utils/request"

/**
 * @name 情报资源库-装备战技参数
 */

// 获取装备列表
export const listZbInfo = (params) => {
	return http.get("/qbcjApi/zbInfo/list", params)
}

// 新增
export const addZbInfo = (params) => {
	return http.post("/qbcjApi/zbInfo", params)
}

// 编辑
export const editZbInfo = (params) => {
	return http.put("/qbcjApi/zbInfo", params)
}

// 详情
export const getZbInfoByid = (id) => {
	return http.get(`/qbcjApi/zbInfo/${id}`)
}

// 删除
export const deleteZbInfo = (id) => {
	return http.delete(`/qbcjApi/zbInfo/${id}`)
}
// 获取装备列表
export const dropDownZbInfo = (params) => {
	return http.get("/qbcjApi/zbInfo/dropDown", params)
}

// 导入 - 装备性能参数信息
export const importZbInfo = (params) => {
	return http.post("/qbcjApi/zbInfo/importZbInfo", params)
}

// 导入 - 装备性能参数信息
export const exportZbInfo = (params) => {
	return http.post("/qbcjApi/zbInfo/exportOwl", params, { responseType: "blob" })
}

// 导入 - 装备性能参数信息
export const importInfoV2 = (params) => {
	return http.post("/qbcjApi/zbInfo/importZbInfoV2", params)
}
