import http from "@/utils/request"

/**
 * @name 情报专题-wiki
 */

// 获取专题列表
export const listWiki = (params) => {
	return http.get("/api/subjectWiki/list", params)
}
