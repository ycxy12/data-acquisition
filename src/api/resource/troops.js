import http from "@/utils/request"

/**
 * @name 资源管理-兵力编成编组
 */

// 获取兵力编成编组列表
export const listBlbc = (params) => {
	return http.get("/qbcjApi/blbc/list", params)
}

// 新增
export const addBlbc = (params) => {
	return http.post("/qbcjApi/blbc", params)
}

// 编辑
export const editBlbc = (params) => {
	return http.put("/qbcjApi/blbc", params)
}

// 详情
export const getBlbcByid = (id) => {
	return http.get(`/qbcjApi/blbc/${id}`)
}

// 删除
export const deleteBlbc = (id) => {
	return http.delete(`/qbcjApi/blbc/${id}`)
}

// 兵力编程编组树形结构
export const listBlbcTree = (params) => {
	return http.get("/qbcjApi/blbc/tree", params)
}
