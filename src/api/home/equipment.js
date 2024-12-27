import http from "@/utils/request"

/**
 * @name 情报资源库-装备战技参数
 */

// 获取装备列表
export const listZbInfo = (params) => {
	return http.get("/api/zbInfo/list", params)
}

// 新增
export const addZbInfo = (params) => {
	return http.post("/api/zbInfo", params)
}

// 编辑
export const editZbInfo = (params) => {
	return http.put("/api/zbInfo", params)
}

// 详情
export const getZbInfoByid = (id) => {
	return http.get(`/api/zbInfo/${id}`)
}

// 删除
export const deleteZbInfo = (id) => {
	return http.delete(`/api/zbInfo/${id}`)
}

// 导入 - 装备性能参数信息
export const importZbInfo = (params) => {
	return http.post("/api/zbInfo/importZbInfo", params)
}
