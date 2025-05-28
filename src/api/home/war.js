import http from "@/utils/request"

/**
 * @name 情报资源管理-经典历史战例
 */

// 获取经典历史战例列表
export const listWarfareExamples = (params) => {
	return http.get("/qbcjApi/warfareExamples/list", params)
}

// 新增
export const addWarfareExamples = (params) => {
	return http.post("/qbcjApi/warfareExamples", params)
}

// 编辑
export const editWarfareExamples = (params) => {
	return http.put("/qbcjApi/warfareExamples", params)
}

// 详情
export const getWarfareExamplesByid = (id) => {
	return http.get(`/qbcjApi/warfareExamples/${id}`)
}

// 删除
export const deleteWarfareExamples = (id) => {
	return http.delete(`/qbcjApi/warfareExamples/${id}`)
}

// 获取 战例下拉数据
export const dropDownWarfareExamples = (params) => {
	return http.get("/qbcjApi/warfareExamples/dropDown", params)
}

// 导入
export const importWarfareExamples = (params) => {
	return http.post("/qbcjApi/warfareExamples/import", params)
}

// 导入 - 装备性能参数信息
export const exportWarfareExamples = (params) => {
	return http.post("/qbcjApi/warfareExamples/exportOwl", params, { responseType: "blob" })
}

// 导入
export const importWarfareExamplesInfoV2 = (params) => {
	return http.post("/qbcjApi/warfareExamples/importWarfareExamplesInfoV2", params)
}
