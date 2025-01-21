<template>
	<div class="chat_input">
		<el-input v-model="message" :rows="4" type="textarea" placeholder="请输入你想问的问题" @keyup.enter.native="handleSend" />
		<div class="submit" @click="handleSend" :class="{ 'is-sending': loading }">
			<svg-icon :name="loading ? 'load' : 'submit'" />
		</div>
	</div>
</template>

<script>
export default {
	props: {
		value: {
			type: String,
			default: "",
		},
		loading: {
			type: Boolean,
			default: false,
		},
	},
	computed: {
		message: {
			get() {
				return this.value
			},
			set(val) {
				this.$emit("input", val)
			},
		},
	},
	methods: {
		handleSend() {
			if (!this.message) {
				return
			}
			this.$emit("send", this.message)
			this.message = ""
		},
	},
}
</script>

<style lang="scss" scoped>
.chat_input {
	max-width: 1000px;
	width: 100%;
	height: 130px;
	margin: 0 auto;
	display: flex;
	overflow: hidden;
	background: rgba(0, 84, 251, 0.2);
	box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.16);
	border-radius: 10px 10px 10px 10px;
	padding: 15px;
	box-sizing: border-box;
	::v-deep .el-textarea {
		flex: 1;
		.el-textarea__inner {
			box-shadow: none;
			border: none;
			font-size: 20px;
			background: transparent;
			&::placeholder {
				font-size: 16px;
				color: rgba(255, 255, 255, 0.5);
			}
		}
	}
	.submit {
		width: 80px;
		height: 40px;
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(270deg, #3b8ee2 0%, #0065cc 100%);
		border-radius: 10px 10px 10px 10px;
		align-self: flex-end;
		cursor: pointer;
		svg {
			fill: #fff;
		}
	}
	.is-sending {
		svg {
			animation: spin 2s linear infinite;
		}
	}
	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
}
</style>
