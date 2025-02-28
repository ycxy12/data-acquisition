<template>
	<el-drawer
		title="详情"
		:visible.sync="drawer"
		:direction="direction"
		append-to-body
		:before-close="handleClose"
		v-loading="loading"
		element-loading-text="拼命加载中"
		element-loading-spinner="el-icon-loading"
		element-loading-background="rgba(0, 0, 0, 0.5)"
	>
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px">
			<el-form-item label="上传文件" prop="fileUrl">
				<el-upload
					ref="upload"
					action="#"
					:file-list="fileList"
					:limit="1"
					:on-exceed="handleExceed"
					accept=".zip"
					:auto-upload="false"
					:before-upload="beforeUpload"
					:on-change="handleChange"
					:on-remove="handleRemove"
				>
					<el-button slot="trigger" size="small" type="primary">选取文件</el-button>
					<div slot="tip" class="el-upload__tip">只能上传zip格式文件！</div>
				</el-upload>
			</el-form-item>
			<div class="drawer-footer">
				<el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
			</div>
		</el-form>
	</el-drawer>
</template>

<script>
import { commonUpload } from "@/api/topic/subject.js"
import { addDataImport, editDataImport, getDataImportByid } from "@/api/resource/upload"

export default {
	data() {
		return {
			drawer: false,
			direction: "rtl",
			ruleForm: { fileUrl: undefined },
			rules: {
				fileUrl: [{ required: true, message: "请上传文件", trigger: "change" }],
			},
			fileList: [],
			loading: false,
		}
	},
	methods: {
		async openDrawer(id) {
			if (id) {
				const { data } = await getDataImportByid(id)
				this.ruleForm = data
				if (data.fileUrl) {
					this.fileList = [
						{
							name: data.fileUrl.split("/").pop(), // 提取文件名
							url: data.fileUrl,
						},
					]
				}
			}
			this.drawer = true
		},
		handleClose() {
			this.drawer = false
			this.ruleForm = {}
			this.fileList = []
			this.$refs.ruleForm.resetFields()
		},
		async submitForm(formName) {
			this.$refs[formName].validate(async (valid) => {
				if (valid) {
					this.loading = true
					// 只有有新文件时才上传
					if (this.fileList.length > 0 && this.fileList[0].raw) {
						const form = await this.uploadFile()
						this.ruleForm = Object.assign({ id: this.ruleForm.id ? this.ruleForm.id : undefined }, form)
					}
					if (this.ruleForm.id) {
						await editDataImport(this.ruleForm)
					} else {
						await addDataImport(this.ruleForm)
					}
					this.loading = false
					this.$message.success("操作成功")
					this.$emit("refresh")
					this.handleClose()
				}
			})
		},
		//上传文件获取文件地址
		async uploadFile() {
			//判断fileList是否有值
			if (this.fileList.length > 0) {
				const file = this.fileList[0]
				if (file.raw) {
					// 新上传的文件
					const formData = new FormData()
					formData.append("file", file.raw)
					const { code, msg, ...form } = await commonUpload(formData)
					return { fileName: form.newFileName, filePath: form.fileName, fileUrl: form.url }
				} else {
					// 已有文件
					return { fileUrl: file.url }
				}
			}
		},
		// 文件超出数量限制时的处理
		handleExceed(files, fileList) {
			if (this.validateFile(files[0])) {
				this.$refs.upload.clearFiles()
				this.$refs.upload.handleStart(files[0])
			}
		},
		beforeUpload(file) {
			return this.validateFile(file)
		},
		// 处理上传文件变更事件
		handleChange(file, fileList) {
			console.log(!this.validateFile(file))
			if (!this.validateFile(file)) {
				return false
			}
			this.fileList = fileList
			this.ruleForm.fileUrl = URL.createObjectURL(file.raw)

			this.$refs.ruleForm.validateField("fileUrl")
		},
		validateFile(file) {
			const isZip = file.name.toLowerCase().endsWith(".zip") || ["application/zip", "application/x-zip-compressed"].includes(file.type)
			if (!isZip) this.$message.error("只能上传ZIP格式文件!")
			return isZip
		},
		handleRemove() {
			this.fileList = []
			this.ruleForm.fileUrl = undefined
			this.$refs.ruleForm.validateField("fileUrl")
		},
	},
}
</script>
<style lang="scss">
.el-upload__tip {
	color: #fff;
}
.el-upload-list__item-name {
	color: #fff;
}
.el-tree-node__content:hover,
.el-upload-list__item:hover {
	background-color: rgba(0, 84, 251, 0.2);
}
</style>
