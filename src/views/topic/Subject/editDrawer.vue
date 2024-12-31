<template>
	<el-drawer title="编辑" :visible.sync="drawer" :direction="direction" :before-close="handleClose">
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			<el-form-item label="专题名称" prop="name">
				<el-input v-model="ruleForm.name" placeholder="请输入专题名称"></el-input>
			</el-form-item>
			<el-form-item label="时间范围" prop="num">
				<el-date-picker
					v-model="ruleForm.times"
					type="datetimerange"
					range-separator="至"
					start-placeholder="开始日期"
					end-placeholder="结束日期"
					value-format="yyyy-MM-dd HH:mm:ss"
					style="width: 100%"
				>
				</el-date-picker>
			</el-form-item>
			<el-form-item label="命中位置" prop="parameter">
				<el-radio-group v-model="ruleForm.parameter">
					<el-radio :label="1">全文</el-radio>
					<el-radio :label="2">标题</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="主题词" prop="tags">
				<input-tag v-model="ruleForm.tags" placeholder="请输入主题词(回车添加标签)"></input-tag>
			</el-form-item>
			<el-form-item label="专题封面" prop="file">
				<el-upload
					class="avatar-uploader"
					action="#"
					:show-file-list="false"
					:on-success="handleAvatarSuccess"
					:before-upload="beforeAvatarUpload"
				>
					<img v-if="imageUrl" :src="imageUrl" class="avatar" />
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
			</el-form-item>
			<div class="drawer-footer">
				<el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
			</div>
		</el-form>
	</el-drawer>
</template>

<script>
import { addZbModule, editZbModule, getZbModuleByid } from "@/api/home/module"
import InputTag from "@/components/InputTag/index.vue"

export default {
	components: { InputTag },
	data() {
		return {
			drawer: false,
			direction: "rtl",
			ruleForm: {},
			rules: {
				name: [{ required: true, message: "请输入装备名称", trigger: "blur" }],
				num: [{ required: true, message: "请输入数量", trigger: "blur" }],
			},
			zbInfoId: undefined,
			imageUrl: "",
		}
	},
	methods: {
		//打开抽屉
		async openDrawer(id, zbInfoId) {
			this.zbInfoId = zbInfoId
			if (id) {
				const { data } = await getZbModuleByid(id)
				this.ruleForm = data
			}
			this.drawer = true
		},
		//关闭抽屉
		handleClose() {
			this.drawer = false
			this.ruleForm = {}
			this.$refs.ruleForm.resetFields()
		},
		//提交表单
		submitForm(formName) {
			this.$refs[formName].validate(async (valid) => {
				if (valid) {
					this.ruleForm.zbInfoId = this.zbInfoId
					if (this.ruleForm.id) {
						await editZbModule(this.ruleForm)
					} else {
						await addZbModule(this.ruleForm)
					}
					this.$message.success("操作成功")
					this.$emit("refresh")
					this.handleClose()
				}
			})
		},
		handleAvatarSuccess(res, file) {
			this.imageUrl = URL.createObjectURL(file.raw)
		},
		beforeAvatarUpload(file) {
			const isJPG = file.type === "image/jpeg"
			const isLt2M = file.size / 1024 / 1024 < 2

			if (!isJPG) {
				this.$message.error("上传头像图片只能是 JPG 格式!")
			}
			if (!isLt2M) {
				this.$message.error("上传头像图片大小不能超过 2MB!")
			}
			return isJPG && isLt2M
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
