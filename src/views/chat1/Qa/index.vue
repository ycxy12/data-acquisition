<template>
	<div class="content">
		<div class="qa_chat">
			<div>
				<template v-for="item in lists">
					<ChatQuestion :question="item.question" :key="'question-' + item.id" />
					<ChatAnswer :answer="item.answer" :key="'answer-' + item.id" />
				</template>
			</div>
		</div>
		<ChatInput v-model="message" :loading="loading" @send="handleSend" />
		<!-- 返回顶部 -->
		<el-backtop target=".qa_chat"></el-backtop>
	</div>
</template>

<script>
import ChatInput from "../components/chatInput.vue"
import ChatQuestion from "./ChatQuestion.vue"
import ChatAnswer from "./ChatAnswer.vue"

export default {
	components: { ChatInput, ChatQuestion, ChatAnswer },
	data() {
		return {
			loading: false,
			message: "",
			lists: Array.from({ length: 1 }).map((_, i) => ({
				id: i,
				question: `里根号航母的性能参数${i + 1}`,
				answer: `武器装备：改进型海麻雀导弹 RIM-116滚体导弹 密集阵近程防御武器系统

续航距离：无限距离；20-25年

动力：2座西屋A4W核反应堆 4座蒸汽涡轮发动机 4轴 260,000马力（194兆瓦）

舰载机：90架标准舰载机与直升机

侦搜系统：AN/SPS-48E 3-D空中搜索雷达 AN/SPS-49(V)5 2-D空中搜索雷达 AN/SPQ-9B目标截获雷达 2 × AN/SPN-46空中管制雷达 AN/SPN-43C空中管制雷达 AN/SPN-41着陆辅助雷达 3 × Mk 91 NSSM引导系统 3 × Mk 95雷达

最高速度：30节以上（56千米每小时以上；35英里每小时以上）

吃水：最大：37英尺（11.3米） 限制：41英尺（12.5米）

传感与处理系统：SPS-48E三维空中搜索雷达sps - 49a (V)1二维空中搜索雷达spq - 9b火控雷达2 × SPN-46空中交通管制雷达spn - 43c空中交通管制雷达spn -41仪表着陆系统雷达3 × Mk 91 NSSM制导系统3 × Mk 95雷达

排水量：101,400长吨（113,600短吨）

全长：全长：1,092英尺（332.8米） 水线：1,040英尺（317.0米）

全宽：全长：252英尺（76.8米） 水线：134英尺（40.8米）

推进力：2 ×WestinghouseA4W核反应堆(HEU93.5%)4 ×steam涡轮4 ×轴26万shp (194 MW)${i + 1}`,
			})),
		}
	},
	methods: {
		// 发送消息
		handleSend(message) {
			console.log(message)
			this.message = message
		},
	},
}
</script>

<style lang="scss" scoped>
.content {
	width: 100%;
}
.qa_chat {
	width: 100%;
	height: calc(100vh - 244px);
	box-sizing: border-box;
	padding-bottom: 50px;
	overflow-y: auto;
	& > div {
		margin: 0 auto;
		width: 100%;
		max-width: 1000px;
		padding: 0 52px;
	}
	&::-webkit-scrollbar {
		display: none;
	}
}
</style>
