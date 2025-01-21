import http from "@/utils/request"

/**
 * @name 情报问答
 */

// 问答
export const qaChat = (params) => {
	return http.post("/api/qa", params)
}
