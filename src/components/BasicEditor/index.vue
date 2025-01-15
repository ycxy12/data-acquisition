<template>
	<div class="basic_editor">
		<Toolbar :editor="editorRef" :defaultConfig="toolbarConfig" class="toolbar" />
		<Editor
			:defaultConfig="editorConfig"
			v-model="valueHtml"
			class="editor"
			@onCreated="handleCreated"
			@onChange="handleChange"
			@onDestroyed="handleDestroyed"
			@onFocus="handleFocus"
			@onBlur="handleBlur"
			@customAlert="customAlert"
			@customPaste="customPaste"
		/>
	</div>
</template>

<script>
import "@wangeditor/editor/dist/css/style.css"
import { Editor, Toolbar } from "@wangeditor/editor-for-vue"

export default {
	components: { Editor, Toolbar },
	props: {
		value: {
			type: String,
			default: "",
		},
	},
	data() {
		return {
			// 编辑器实例
			editorRef: null,
			// // 内容 HTML
			// valueHtml: "",
			// 工具栏配置
			toolbarConfig: {},
			// 编辑器配置
			editorConfig: { placeholder: "请输入内容..." },
		}
	},
	computed: {
		valueHtml: {
			get() {
				return this.value
			},
			set(val) {
				this.$emit("input", val)
			},
		},
	},
	mounted() {
		// 在组件挂载后进行编辑器初始化
		const editor = this.editorRef
		if (editor) {
			editor.on("created", this.handleCreated)
			editor.on("change", this.handleChange)
			editor.on("destroyed", this.handleDestroyed)
			editor.on("focus", this.handleFocus)
			editor.on("blur", this.handleBlur)
			editor.on("customAlert", this.customAlert)
			editor.on("customPaste", this.customPaste)
		}
	},
	beforeDestroy() {
		// 组件销毁时销毁编辑器实例
		const editor = this.editorRef
		if (editor) {
			editor.destroy()
		}
	},
	methods: {
		handleCreated(editor) {
			console.log("created", editor)
			this.editorRef = editor // 记录 editor 实例
		},
		handleChange(editor) {
			console.log("change:", editor.getHtml())
		},
		handleDestroyed(editor) {
			console.log("destroyed", editor)
		},
		handleFocus(editor) {
			console.log("focus", editor)
		},
		handleBlur(editor) {
			console.log("blur", editor)
		},
		customAlert(info, type) {
			alert(`【自定义提示】${type} - ${info}`)
		},
		customPaste(editor, event, callback) {
			console.log("ClipboardEvent 粘贴事件对象", event)

			// 自定义插入内容
			// editor.insertText("xxx")

			// 返回值（注意，vue 事件的返回值，不能用 return）
			callback(true) // 返回 true ，继续默认的粘贴行为
		},
		insertText() {
			const editor = this.editorRef
			if (!editor) return
			editor.insertText("hello world")
		},
		printHtml() {
			const editor = this.editorRef
			if (!editor) return
			console.log(editor.getHtml())
		},
		disable() {
			const editor = this.editorRef
			if (!editor) return
			editor.disable()
		},
	},
}
</script>
<style lang="scss">
.basic_editor {
	.toolbar {
		border-bottom: 1px solid rgb(112, 160, 255);
	}
	.editor {
		height: 400px;
		overflow-y: hidden;
	}
}
.w-e-bar {
	color: #fff;
	background-color: rgba(0, 84, 251, 0.2);
}

.w-e-text-container {
	color: #fff;
	background-color: rgba(0, 84, 251, 0.2);
}
.w-e-bar-item button {
	// color: rgb(112, 160, 255);
}
.w-e-bar-item .disabled {
	// color: rgb(112, 160, 255);
}
.w-e-bar-item .disabled:hover {
	// background-color: rgba(0, 84, 251, 0.2);
}
.w-e-bar-item button:hover {
	color: rgb(112, 160, 255);
	background-color: rgba(0, 84, 251, 0.2);
}
</style>
