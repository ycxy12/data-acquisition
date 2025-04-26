<template>
	<div class="container">
		<div class="content">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px">
				<el-form-item label="NameServer地址" prop="nameServer">
					<el-input v-model="ruleForm.nameServer"
						placeholder="请输入NameServer地址，NameServer地址（多个用分号分隔）"></el-input>
				</el-form-item>
				<el-form-item label="生产者组名" prop="producerGroup">
					<el-input v-model="ruleForm.producerGroup" placeholder="请输入生产者组名"></el-input>
				</el-form-item>
				<el-form-item label="消息主题" prop="topic">
					<el-input v-model="ruleForm.topic" placeholder="请输入消息主题"></el-input>
				</el-form-item>
				<div class="mq_footer">
					<el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
				</div>
			</el-form>
		</div>
	</div>
</template>

<script>
import { addMqConfig, updateMqConfig, fetchMqConfig } from "@/api/topic/mq"

export default {
	data() {
		return {
			ruleForm: {},
			rules: {
				nameServer: [{ required: true, message: "请输入NameServer地址", trigger: "blur" }],
				producerGroup: [{ required: true, message: "请输入生产者组名", trigger: "blur" }],
				topic: [{ required: true, message: "请输入消息主题", trigger: "blur" }],
			},
		}
	},
	mounted() {
		this.fetchMqConfig()
	},
	methods: {
		async fetchMqConfig() {
			const { data } = await fetchMqConfig()
			this.ruleForm = data && data.length ? data[0] : {}
		},
		submitForm(formName) {
			this.$refs[formName].validate(async (valid) => {
				if (valid) {
					if (JSON.stringify(this.ruleForm) === '{}') {
						await addMqConfig(this.ruleForm)
					} else {
						await updateMqConfig(this.ruleForm)
					}
					this.$message.success("操作成功")
				}
			})
		},
	},
}
</script>

<style lang="scss" scoped>
.container {
	overflow: hidden;
	height: calc(100vh - 171px);

	.content {
		width: 100%;
		height: 100%;
		overflow-y: auto;

		.el-form {
			max-width: 1000px;
			margin: 0 auto;
			position: relative;
		}

		.mq_footer {
			display: flex;
			justify-content: center;
			margin-top: 40px;

			.el-button {
				width: 200px;
			}
		}
	}
}
</style>
