import http from "@/utils/request"

/**
 * @name 资源管理-数据导入
 */

// 获取数据导入列表
export const listDataImport = (params) => {
	return http.get("/api/dataImport/list", params)
}

// 新增
export const addDataImport = (params) => {
	return http.post("/api/dataImport", params)
}

// 编辑
export const editDataImport = (params) => {
	return http.put("/api/dataImport", params)
}

// 详情
export const getDataImportByid = (id) => {
	return http.get(`/api/dataImport/${id}`)
}

// 删除
export const deleteDataImport = (id) => {
	return http.delete(`/api/dataImport/${id}`)
}
// 处理压缩包
export const parseDataImport = (id) => {
	return http.post("/api/dataImport/parseData/" + id)
}
