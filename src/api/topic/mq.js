import http from "@/utils/request"

/**
 * @name 情报专题-MQ
 */

// 获取默认的MQ配置
export const fetchMqConfig = (params) => {
    return http.get("/qbcjApi/mqConfig", params)
}

// 新增MQ
export const addMqConfig = (params) => {
    return http.post("/qbcjApi/mqConfig", params)
}

// 编辑MQ
export const updateMqConfig = (params) => {
    return http.put("/qbcjApi/mqConfig", params)
}