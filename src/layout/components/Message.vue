<template>
    <el-popover placement="bottom" width="310" trigger="click" popper-class="message_popover">
        <el-badge :value="messageNum" slot="reference" class="badge">
            <svg-icon name="message" />
        </el-badge>
        <div class="message_list">
            <p v-for="item in list" :key="item.id" @click="handleMessage(item.id)">{{ item.title }}</p>
        </div>
    </el-popover>
</template>
<script>
import { mapGetters, } from "vuex"
import { publishedCount, publishedArticles, readMsg } from "@/api/topic/wiki.js"
export default {
    data() {
        return {
            messageNum: 0,
            list: []
        }
    },
    computed: {
        ...mapGetters(["getUserInfo", "getUserId"]),
    },
    mounted() {
        this.getPublishedCount()
        this.getPublishedArticles()
    },
    methods: {
        async handleMessage(id) {
            this.$router.push(`/topic/news/${id}`)
            let userId = this.getUserId ? this.getUserId : this.getUserInfo.id
            await readMsg({ msgId: id, userId })
            this.getPublishedCount()
            this.getPublishedArticles()
        },
        async getPublishedCount() {
            let userId = this.getUserId ? this.getUserId : this.getUserInfo.id
            const { data } = await publishedCount(userId)
            this.messageNum = data
        },
        async getPublishedArticles() {
            let userId = this.getUserId ? this.getUserId : this.getUserInfo.id
            const { data } = await publishedArticles(userId, { isFilterRead: true })
            this.list = data
        }
    },
}
</script>

<style lang="scss">
.message_popover {
    background-color: #172034;
    border: 1px solid #172034;
    box-shadow: 0 2px 12px 0 rgba(255, 255, 255, .1);
}

.badge {
    .svg-icon {
        width: 24px;
        height: 24px;
        cursor: pointer;
    }
}

.message_list {
    color: #fff;

    p {
        cursor: pointer;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        &:hover {
            color: #409eff;
        }
    }
}
</style>