import http from "@/utils/request"

/**
 * @name 情报资源管理-经典历史战例
 */

// 获取经典历史战例列表
export const listWarfareExamples = (params) => {
	return http.get("/api/warfareExamples/list", params)
}

// 新增
export const addWarfareExamples = (params) => {
	return http.post("/api/warfareExamples", params)
}

// 编辑
export const editWarfareExamples = (params) => {
	return http.put("/api/warfareExamples", params)
}

// 详情
export const getWarfareExamplesByid = (id) => {
	return http.get(`/api/warfareExamples/${id}`)
}

// 删除
export const deleteWarfareExamples = (id) => {
	return http.delete(`/api/warfareExamples/${id}`)
}

// 获取 战例下拉数据
export const dropDownWarfareExamples = (params) => {
	return http.get("/api/warfareExamples/dropDown", params)
}

// 导入
export const importWarfareExamples = (params) => {
	return http.post("/api/warfareExamples/import", params)
}

// 导入 - 装备性能参数信息
export const exportWarfareExamples = (params) => {
	return http.post("/api/warfareExamples/exportOwl", params, { responseType: "blob" })
}

// 导入
export const importWarfareExamplesInfoV2 = (params) => {
	return http.post("/api/warfareExamples/importWarfareExamplesInfoV2", params)
}
