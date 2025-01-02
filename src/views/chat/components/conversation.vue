<template>
	<div class="conversation">
		<div class="button" @click="handleAdd"><i class="el-icon-plus"></i>新建会话</div>
		<h3>会话记录</h3>
		<div class="record">
			<div v-for="item in lists" :key="item.id" :class="{ active: active == item.id }" class="item" @click="handleChat(item)">
				<svg-icon name="conversation" />
				<span>{{ item.content }}</span>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			lists: Array.from({ length: 20 }, (v, k) => {
				return {
					id: k,
					name: "张三",
					time: "2021-01-01 12:00:00",
					content: "M1主战坦克性能参数",
				}
			}),
		}
	},
	computed: {
		// 当前会话
		active() {
			return this.$route.params.id
		},
	},
	methods: {
		// 新建会话
		handleAdd() {
			this.$router.push("/chat")
		},
		// 进入聊天
		handleChat(item) {
			this.$router.push({ path: `/chat/${item.id}` })
		},
	},
}
</script>

<style lang="scss" scoped>
.conversation {
	width: 270px;
	padding: 15px;
	flex-shrink: 0;
	background: rgba(255, 255, 255, 0.4);
	box-shadow: 0px 3px 8px 0px rgba(0, 0, 0, 0.16);
	.button {
		display: flex;
		justify-content: center;
		align-items: center;
		color: #333333;
		border: 1px solid #333333;
		padding: 10px 20px;
		border-radius: 4px;
		cursor: pointer;
		font-size: 14px;
		i {
			margin-right: 10px;
		}
		&:hover {
			color: #409eff;
			border: 1px solid #409eff;
			background-color: #f0f5ff;
		}
	}
	h3 {
		font-weight: 500;
		margin: 20px 0 10px;
		font-size: 16px;
		color: #409eff;
		font-weight: 600;
	}
	.record {
		height: calc(100vh - 180px);
		overflow-y: auto;
		.item {
			display: flex;
			align-items: center;
			padding: 10px 5px;
			border-radius: 4px;
			cursor: pointer;
			color: #333333;
			&:hover,
			&.active {
				color: #409eff;
				background-color: #f0f5ff;
			}
			svg {
				width: 20px;
				height: 20px;
				margin-right: 10px;
			}
			span {
				flex: 1;
				font-size: 14px;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}
	}
}
</style>
