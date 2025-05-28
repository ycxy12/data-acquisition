import http from "@/utils/request"

/**
 * @name 资源管理-经典历史战役-战争
 */

// 获取经典历史战役-战争列表
export const listQbWarfare = (params) => {
	return http.get("/qbcjApi/qbWarfare/list", params)
}

// 新增
export const addQbWarfare = (params) => {
	return http.post("/qbcjApi/qbWarfare", params)
}

// 编辑
export const editQbWarfare = (params) => {
	return http.put("/qbcjApi/qbWarfare", params)
}

// 详情
export const getQbWarfareByid = (id) => {
	return http.get(`/qbcjApi/qbWarfare/${id}`)
}

// 删除
export const deleteQbWarfare = (id) => {
	return http.delete(`/qbcjApi/qbWarfare/${id}`)
}

// 下拉框
export const dropDownQbWarfare = () => {
	return http.get("/qbcjApi/qbWarfare/dropDown")
}
