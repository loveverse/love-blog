<template>
	<view class="wrapper">
		<uni-easyinput suffixIcon="search" focus :trim="true" v-model="content" placeholder="请输入uid/wx进行搜索"
			@iconClick="handleSearch">
		</uni-easyinput>
		<view class="comment-list">
			<view class="comment">
				<view class="user-info">
					<cover-image src="../../static/logo.png" class="img"></cover-image>
					<text class="nickname">昵称 || 匿名</text>
				</view>
				<text>标题内容</text>
				<view class="comment-info">
						<uni-fav :checked="like" :contentText="{contentDefault: '点赞',contentFav: '取消点赞'}" @click="like = !like" />
						<text>发布时间</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content: '',
				like: false
			}
		},
		onLoad() {

		},
		methods: {
			handleSearch() {
				console.log(this.content);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wrapper {
		.comment-list {
			.comment {
				/* width: 100%; */
				margin: 10px 12px;
				padding: 10px;
				/* background-color: #8f45dd; */
				border-radius: 8px;
				box-sizing: border-box;
				box-shadow: 18px 18px 30px rgba(0, 0, 0, 0.2), -18px -18px 30px rgb(255, 255, 255);

				.user-info {
					display: flex;
					align-items: center;

					.img {
						width: 30px;
						height: 30px;
						margin-right: 10px;
						border-radius: 50%;
					}

					.nickname {
						color: #666;
					}
				}
			}
		}
	}
</style>