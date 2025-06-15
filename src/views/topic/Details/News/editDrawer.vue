<template>
	<el-drawer :title="ruleForm.id ? '编辑' : '新增'" :visible.sync="drawer" :direction="direction" append-to-body
		:before-close="handleClose">
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			<el-form-item label="标题" prop="title">
				<el-input v-model="ruleForm.title" placeholder="请输入标题"></el-input>
			</el-form-item>
			<el-form-item label="主题词" prop="keywords">
				<el-input v-model="ruleForm.keywords" placeholder="请输入主题词(使用逗号拼接)"></el-input>
			</el-form-item>
			<el-form-item label="来源" prop="source">
				<el-input v-model="ruleForm.source" placeholder="请输入来源"></el-input>
			</el-form-item>
			<el-form-item label="发布时间" prop="releaseTime">
				<el-date-picker v-model="ruleForm.releaseTime" type="datetime" placeholder="选择发布时间"
					value-format="yyyy-MM-dd HH:mm:ss" style="width: 100%">
				</el-date-picker>
			</el-form-item>
			<el-form-item label="简介" prop="intro">
				<el-input v-model="ruleForm.intro" type="textarea" :rows="4" placeholder="请输入简介"></el-input>
			</el-form-item>
			<el-form-item label="正文" prop="content" v-if="drawer">
				<BasicEditor v-model="ruleForm.content" />
			</el-form-item>
			<el-form-item label="专题封面" prop="cover">
				<el-upload class="avatar-uploader" action="#" :file-list="fileList" :show-file-list="false"
					:before-upload="beforeUpload" :on-change="handleChange" accept="image/*" :auto-upload="false">
					<img v-if="ruleForm.cover" :src="ruleForm.cover" class="avatar" />
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
			</el-form-item>

			<el-form-item label="备注" prop="remark">
				<el-input v-model="ruleForm.remark" type="textarea" :rows="4" placeholder="请输入备注"></el-input>
			</el-form-item>
			<div class="drawer-footer">
				<el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
			</div>
		</el-form>
	</el-drawer>
</template>

<script>
import { commonUpload } from "@/api/topic/subject.js"
import { addArticle, editArticle, getArticleByid } from "@/api/topic/article.js"
import BasicEditor from "@/components/BasicEditor/index.vue"

export default {
	components: { BasicEditor },
	data() {
		return {
			drawer: false,
			direction: "rtl",
			ruleForm: { content: "" },
			rules: {
				title: [{ required: true, message: "请输入标题", trigger: "blur" }],
				source: [{ required: true, message: "请选择时间范围", trigger: "change" }],
				keywords: [{ required: true, message: "请输入主题词", trigger: ["change", "blur"] }],
				intro: [{ required: true, message: "请输入简介", trigger: ["change", "blur"] }],
				releaseTime: [{ required: true, message: "请选选择发布时间", trigger: ["change", "blur"] }],
				content: [{ required: true, message: "请输入正文", trigger: ["change", "blur"] }],
			},
			fileList: [],
			subjectId: undefined,
		}
	},
	methods: {
		//打开抽屉
		async openDrawer(id) {
			if (id) {
				const { data } = await getArticleByid(id)
				this.ruleForm = data
			}
			this.drawer = true
		},
		//关闭抽屉
		handleClose() {
			this.drawer = false
			this.ruleForm = { content: "" }
			this.fileList = []
			this.$refs.ruleForm.resetFields()
		},
		//提交表单
		submitForm(formName) {
			this.$refs[formName].validate(async (valid) => {
				if (valid) {
					const cover = await this.uploadFile()
					this.ruleForm.cover = cover
					if (this.ruleForm.id) {
						await editArticle(this.ruleForm)
					} else {
						const params = this.$route.params
						this.ruleForm.subjectId = params.id
						await addArticle(this.ruleForm)
					}
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
				//判断file是否是一个file,还是一个文件地址
				if (Object.prototype.toString.call(file) === "[object Object]") {
					const formData = new FormData()
					formData.append("file", file.raw)
					const { url } = await commonUpload(formData)
					return url
				} else {
					return file
				}
			}
		},
		beforeUpload(file) {
			const isImage = file.type.startsWith("image/")
			if (!isImage) {
				this.$message.error("只能上传图片文件!")
			}
			return isImage
		},
		// 处理上传文件变更事件
		handleChange(file, fileList) {
			const reader = new FileReader()
			reader.onload = (e) => {
				this.ruleForm.cover = e.target.result // base64
				this.fileList = fileList
				this.$refs.ruleForm.validateField("cover")
			}
			reader.readAsDataURL(file.raw)
		}
	},
}
</script>

<style lang="scss">
.avatar-uploader {
	.el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}

	.el-upload:hover {
		border-color: #409eff;
	}

	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}

	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}
}
</style>
