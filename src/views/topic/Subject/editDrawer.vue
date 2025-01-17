<template>
	<el-drawer title="编辑" :visible.sync="drawer" :direction="direction" append-to-body :before-close="handleClose">
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			<el-form-item label="专题名称" prop="name">
				<el-input v-model="ruleForm.name" placeholder="请输入专题名称"></el-input>
			</el-form-item>
			<el-form-item label="时间范围" prop="times">
				<el-date-picker
					v-model="ruleForm.times"
					type="daterange"
					range-separator="至"
					start-placeholder="开始日期"
					end-placeholder="结束日期"
					value-format="yyyy-MM-dd 00:00:00"
					style="width: 100%"
				>
				</el-date-picker>
			</el-form-item>
			<el-form-item label="主题词" prop="keywords">
				<el-input v-model="ruleForm.keywords" placeholder="请输入主题词(使用逗号拼接)"></el-input>
				<!-- <input-tag v-model="ruleForm.keywords" placeholder="请输入主题词(使用逗号拼接)"></input-tag> -->
			</el-form-item>
			<el-form-item label="专题封面" prop="cover">
				<el-upload
					class="avatar-uploader"
					action="#"
					:file-list="fileList"
					:show-file-list="false"
					:before-upload="beforeUpload"
					:on-change="handleChange"
					accept="image/*"
					:auto-upload="false"
				>
					<img v-if="ruleForm.cover" :src="ruleForm.cover" class="avatar" />
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
			</el-form-item>
			<el-form-item label="是否订阅" prop="isSubscribed">
				<el-select v-model="ruleForm.isSubscribed" placeholder="请选择是否订阅" style="width: 100%">
					<el-option label="是" :value="true"> </el-option>
					<el-option label="否" :value="false"> </el-option>
				</el-select>
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
import { addSubject, editSubject, getSubjectByid, commonUpload } from "@/api/topic/subject.js"
import AspectRatio from "@/components/AspectRatio/index.vue"
import InputTag from "@/components/InputTag/index.vue"

export default {
	components: { AspectRatio, InputTag },
	data() {
		return {
			drawer: false,
			direction: "rtl",
			ruleForm: {},
			rules: {
				name: [{ required: true, message: "请输入装备名称", trigger: "blur" }],
				times: [{ required: true, message: "请选择时间范围", trigger: "change" }],
				keywords: [{ required: true, message: "请输入主题词", trigger: ["change", "blur"] }],
				cover: [{ required: true, message: "请选择专题封面", trigger: ["change", "blur"] }],
			},
			fileList: [],
		}
	},
	methods: {
		//打开抽屉
		async openDrawer(id) {
			if (id) {
				const { data } = await getSubjectByid(id)
				let times = []
				if (data.startTime && data.endTime) {
					times = [data.startTime, data.endTime]
				}
				this.ruleForm = Object.assign({}, data, { times })
			}
			this.drawer = true
		},
		//关闭抽屉
		handleClose() {
			this.drawer = false
			this.ruleForm = {}
			this.fileList = []
			this.$refs.ruleForm.resetFields()
		},
		//提交表单
		submitForm(formName) {
			console.log(this.ruleForm)
			this.$refs[formName].validate(async (valid) => {
				if (valid) {
					const cover = await this.uploadFile()
					this.ruleForm.cover = cover
					if (this.ruleForm.times && this.ruleForm.times.length > 0) {
						this.ruleForm.startTime = this.ruleForm.times[0]
						this.ruleForm.endTime = this.ruleForm.times[1]
					}
					if (this.ruleForm.id) {
						await editSubject(this.ruleForm)
					} else {
						await addSubject(this.ruleForm)
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
			this.ruleForm.cover = URL.createObjectURL(file.raw)
			this.fileList = fileList
			if (fileList.length !== 0) {
				this.$refs.ruleForm.validateField("cover")
			}
		},
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
