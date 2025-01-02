import http from "@/utils/request"

/**
 * @name 情报资源库-兵力编成编组
 */

// 设置兵力编程编组 与 装备关系
export const setBlbcAndZbRelation = (params) => {
	return http.post("/api/blbcZbRelation/setBlbcAndZbRelation", params)
}

//根据兵力编程编组id 获取编成编组和装备的关系
export const getBlbcAndZbRelation = (id) => {
	return http.get(`/api/blbcZbRelation/getBlbcAndZbRelation/${id}`)
}

// 设置兵力编程编组 与 战例的关系
export const setBlbcWarfareExamplesRelation = (params) => {
	return http.post("/api/blbcWarfareExamplesRelation/setBlbcWarfareExamplesRelation", params)
}

//根据兵力编程编组id获取 兵力编程编组 与战例关系
export const getBlbcWarfareExamplesRelation = (id) => {
	return http.get(`/api/blbcWarfareExamplesRelation/getBlbcWarfareExamplesRelation/${id}`)
}