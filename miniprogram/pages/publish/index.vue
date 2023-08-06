<template>
	<view class="wrapper">

		<uni-notice-bar text="注意:填写随意或者证据不充分可能会导致审核不通过!" />
		<uni-forms class="form" ref="formRef" :modelValue="form" label-position="alignment" label-width="80px" 
			:rules="rules">
			<uni-forms-item label="标题" name="title" required>
				<uni-easyinput type="text" v-model="form.title" maxlength="100" placeholder="请输入标题" />
			</uni-forms-item>
			<uni-forms-item label="uid" name="uid" required>
				<uni-easyinput type="number" v-model="form.uid" placeholder="请输入uid" maxlength="12" />
			</uni-forms-item>
			<uni-forms-item label="wx" name="wx">
				<uni-easyinput type="text" maxlength="20" v-model="form.wx" placeholder="请输入wx" />
			</uni-forms-item>
			<uni-forms-item label="qq" name="qq">
				<uni-easyinput type="number" maxlength="12" v-model="form.qq" placeholder="请输入qq" />
			</uni-forms-item>
			<uni-forms-item label="name" name="name">
				<uni-easyinput type="text" maxlength="6" v-model="form.name" placeholder="请输入真实姓名" />
			</uni-forms-item>
			<uni-forms-item label="账号状态">
				<uni-data-checkbox v-model="form.status" :localdata="dicts.dict['survivalStatus']">
				</uni-data-checkbox>
			</uni-forms-item>
			<uni-forms-item label="描述">
				<uni-easyinput type="textarea" maxlength="5000" v-model="form.describe" placeholder="请补全详细内容" />
			</uni-forms-item>
			<uni-file-picker v-model="form.fileList" limit="9" title="最多选择9张图片"></uni-file-picker>
			<button class="submit-btn" type="primary" size="default" form-type="submit" @click="handleSubmit">提交</button>
		</uni-forms>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					title: "",
					wx: "",
					qq: "",
					name: "",
					status: "0",
					describe: "",
					fileList: []
				},
				rules: {
					title: {
						rules: [{
							required: true,
							errorMessage: "标题不能为空"
						}]
					},
					uid: {
						rules: [{
								required: true,
								errorMessage: "uid不能为空"
							},
							{
								validateFunction: function(rule, value, data, callback) {
									if (value.length < 6) {
										callback("uid最少是6位数")
									} else {
										return true
									}
								}
							}
						]
					},
					wx: {
						rules: [{
							validateFunction: function(rule, value, data, callback) {
								if (value) {
									if (/^[a-zA-Z0-9_-]{6,20}$/.test(value)) {
										return true
									} else {
										callback("微信号必须是6-20位字符")
									}
								}
							}
						}]
					}
				}
			}
		},
		onLoad() {

		},
		methods: {
			handleSubmit() {
				this.$refs.formRef.validate().then(res => {
					console.log(res);
				}).catch(err => {
					console.log(err);
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wrapper {
		.form {
			padding: 12px;
			.submit-btn{
				margin-top: 10px;
			}
		}
	}
</style>