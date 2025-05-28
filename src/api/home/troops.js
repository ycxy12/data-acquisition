import http from "@/utils/request"

/**
 * @name 情报资源库-兵力编成编组
 */

// 设置兵力编程编组 与 装备关系
export const setBlbcAndZbRelation = (params) => {
	return http.post("/qbcjApi/blbcZbRelation/setBlbcAndZbRelation", params)
}

//根据兵力编程编组id 获取编成编组和装备的关系
export const getBlbcAndZbRelation = (id) => {
	return http.get(`/qbcjApi/blbcZbRelation/getBlbcAndZbRelation/${id}`)
}

// 设置兵力编程编组 与 战例的关系
export const setBlbcWarfareExamplesRelation = (params) => {
	return http.post("/qbcjApi/blbcWarfareExamplesRelation/setBlbcWarfareExamplesRelation", params)
}

//根据兵力编程编组id获取 兵力编程编组 与战例关系
export const getBlbcWarfareExamplesRelation = (id) => {
	return http.get(`/qbcjApi/blbcWarfareExamplesRelation/getBlbcWarfareExamplesRelation/${id}`)
}

// 设置兵力编程编组 与 装备关系
export const exportBlbc = (id) => {
	return http.post(`/qbcjApi/blbc/exportOwl/${id}`, {}, { responseType: "blob" })
}

//获取情报图谱 实体详情
export const getQbRelation = (params) => {
	return http.get("/qbcjApi/relation/getQbRelation", params)
}

// 导入兵力编成编组数据V2
export const importInfoV2 = (params) => {
	return http.post("/qbcjApi/blbc/importInfoV2", params)
}
