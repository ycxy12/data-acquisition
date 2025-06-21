<!-- ChatSuggest.vue -->
<template>
    <div class="chat-suggest" @click.stop>
        <div v-for="(item, index) in suggestionList" :key="index" @click="selectSuggestion(item)">
            {{ item.accurateSearch }}
        </div>
    </div>
</template>

<script>
export default {
    props: {
        suggestionList: {
            type: Array,
            default: () => [],
        },
    },
    methods: {
        selectSuggestion(item) {
            this.$emit("select", item)
        },
    },
}
</script>

<style scoped lang="scss">
.chat-suggest {
    max-width: 1000px;
    width: 100%;
    position: fixed;
    bottom: 185px;
    left: 50%;
    transform: translateX(-50%);
    max-height: 200px;
    overflow-y: auto;
    z-index: 10;
    padding: 15px;
    background: rgba(0, 84, 251, 0.2);
    box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.16);
    border-radius: 10px 10px 10px 10px;
    box-sizing: border-box;
    color: #fff;

    div {
        line-height: 32px;
        cursor: pointer;
    }

    div:hover {
        color: #409eff;
    }
}
</style>
