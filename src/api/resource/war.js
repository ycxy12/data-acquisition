import http from "@/utils/request"

/**
 * @name 资源管理-经典历史战役-战争
 */

// 获取经典历史战役-战争列表
export const listQbWarfare = (params) => {
	return http.get("/api/qbWarfare/list", params)
}

// 新增
export const addQbWarfare = (params) => {
	return http.post("/api/qbWarfare", params)
}

// 编辑
export const editQbWarfare = (params) => {
	return http.put("/api/qbWarfare", params)
}

// 详情
export const getQbWarfareByid = (id) => {
	return http.get(`/api/qbWarfare/${id}`)
}

// 删除
export const deleteQbWarfare = (id) => {
	return http.delete(`/api/qbWarfare/${id}`)
}

// 下拉框
export const dropDownQbWarfare = () => {
	return http.get("/api/qbWarfare/dropDown")
}
