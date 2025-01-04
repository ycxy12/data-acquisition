/**
 * @description 使用递归过滤出需要渲染在左侧菜单的列表 (需剔除 isHide == true 的菜单)
 * @param {Array} menuList 菜单列表
 * @returns {Array}
 * */
export function getShowMenuList(menuList) {
	let newMenuList = JSON.parse(JSON.stringify(menuList))
	return newMenuList.filter((item) => {
		item.children?.length && (item.children = getShowMenuList(item.children))
		return !item.meta?.isHide
	})
}

/**
 * @description 使用递归扁平化菜单，方便添加动态路由
 * @param {Array} menuList 菜单列表
 * @returns {Array}
 */
export function getFlatMenuList(menuList) {
	let newMenuList = JSON.parse(JSON.stringify(menuList))
	return newMenuList.flatMap((item) => [item, ...(item.children ? getFlatMenuList(item.children) : [])])
}

/**
 * 下载文件
 * @param {String} path - 文件地址
 * @param {String} name - 文件名,eg: test.png
 */
export function downloadBlob(response, name = null) {
	const disposition = response.headers["content-disposition"]
	// 获取文件下载头信息
	let fileName = "default-filename"
	// 默认文件名
	if (disposition && disposition.includes("attachment")) {
		// 如果下载头包含附件信息，提取文件名
		const fileNameMatch = disposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/)
		if (fileNameMatch != null && fileNameMatch[1]) {
			fileName = decodeURIComponent(fileNameMatch[1].replace(/['"]/g, ""))
			// 解码并去除引号
		}
	}
	const url = window.URL.createObjectURL(new Blob([response.data]))
	const link = document.createElement("a")
	link.style.display = "none"
	link.href = url
	link.setAttribute("download", name ? name : fileName)
	document.body.appendChild(link)
	link.click()
	document.body.removeChild(link)
	window.URL.revokeObjectURL(url)
}
