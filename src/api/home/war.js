import http from "@/utils/request"

/**
 * @name 情报资源库-经典历史战例
 */

// 获取列表
export const listUser = (params) => {
	return http.post("/user/list", params)
}

// 编辑
export const editUser = (params) => {
	return http.post("/user/edit", params)
}

// 删除
export const deleteUser = (params) => {
	return http.post("/user/delete", params)
}

// 导出数据
export const exportUser = (params) => {
	return http.download("/user/export", params)
}
