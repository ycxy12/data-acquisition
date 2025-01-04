<template>
	<div class="conversation card">
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
	.button {
		display: flex;
		justify-content: center;
		align-items: center;
		color: #409eff;
		background: rgba(0, 84, 251, 0.2);
		border: 1px solid #70a0ff;
		padding: 10px 20px;
		border-radius: 4px;
		cursor: pointer;
		font-size: 14px;
		i {
			margin-right: 10px;
		}
		&:hover {
			color: #409eff;
			background: rgba(0, 84, 251, 0.2);
			border: 1px solid #70a0ff;
		}
	}
	h3 {
		font-weight: 500;
		margin: 20px 0 10px;
		font-size: 16px;
		color: #fff;
		font-weight: 600;
	}
	.record {
		height: calc(100vh - 181px);
		overflow-y: auto;
		.item:nth-child(even) {
			background-color: rgba(14, 95, 255, 0.2);
		}
		.item {
			display: flex;
			align-items: center;
			padding: 10px 5px;
			border-radius: 4px;
			cursor: pointer;
			color: #fff;
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
