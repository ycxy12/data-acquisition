import http from "@/utils/request"

/**
 * @name 资源管理-国家/地区管理
 */

// 获取国家/地区列表
export const listCountry = (params) => {
	return http.get("/api/countryRegion", params)
}

// 新增
export const addCountry = (params) => {
	return http.post("/api/countryRegion", params)
}

// 编辑
export const editCountry = (params) => {
	return http.put("/api/countryRegion", params)
}

// 详情
export const getCountryByid = (id) => {
	return http.get(`/api/countryRegion/${id}`)
}

// 删除
export const deleteCountry = (id) => {
	return http.delete(`/api/countryRegion/${id}`)
}

// 国家地区树形结构
export const listCountryTree = (params) => {
	return http.get("/api/countryRegion/tree", params)
}

// 获取国家或地区 下的兵力编程编组
export const getBlBcTreeByCountryId = (id) => {
	return http.get(`/api/countryRegion/getBlBcTreeByCountryId/${id}`)
}
