<template>
	<view>
		<!-- 顶部选项卡 -->
		<scroll-view id="nav-bar" class="nav-bar" scroll-x scroll-with-animation :scroll-left="scrollLeft">
			<view v-for="(item,index) in tagsList" :key="item.id" class="nav-item" :class="{current: index === tabCurrentIndex}"
			 :id="item.id" @click="changeTag(index)">{{item.name}}</view>
		</scroll-view>

		<view>
			<template v-for="(item,index) in contents">
				<view :key="index">
					<view class="item-box">
						{{item.title}}
					</view>
				</view>
			</template>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tagsList: [], //标签列表
				tabCurrentIndex: 0, //当前选项卡索引
				scrollLeft: 0, //顶部选项卡左滑距离,
				tagActiveId: '400548885618571', //默认标签id-全部

				userId: '',

				contents: [],		//内容列表
				
				//上拉加载 ---分页
				offset: 0,
				count: 10,
				page: 1,
				pageOver: false,	//还能不能分页
				
				

			}
		},
		onLoad() {  // created() mounted()
			
			if (!uni.getStorageSync('userId')) {
				uni.setStorageSync('userId', '1234567890')
			}
			
			this.userId = uni.getStorageSync('userId')
			
			console.log(this.$constData)
			/* 获取标签列表*/
			let cnt = {
				module: this.$constData.module, // String 隶属
				status: this.$constData.tagStatus[1].key, // Byte 标签状态
				keyword: '首页', // String 标签
				count: 500, // Integer 
				offset: 0, // Integer 
			}
			this.getTagsList(cnt)

			/* 根据默认标签获取内容列表*/
			let cnt1 = {
				userId: this.userId, // Long 用户编号
				module: this.$constData.module, // String 所属模块
				// tags: this.tagActiveId,
				status: this.$constData.contentStatus[4].key,
				count: this.count,
				offset: this.offset
			}
			this.getContentsByTag(cnt1)


		},
		methods: {

			/* 获取标签列表*/
			getTagsList(cnt) {
				this.$api.getTags(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
					this.tagsList= this.$util.tryParseJson(res.data.c)
					} else {
					this.tagsList= []
					}
				})
			},
			/*根据标签获取内容列表*/
			getContentsByTag(cnt) {
				this.$api.getContents(cnt, (res) => {
					let list = []
					if (res.data.rc == this.$util.RC.SUCCESS) {
						list = this.$util.tryParseJson(res.data.c)
						
						this.tryDataList(list)
						
						
					} else {
						list = []
					}
					if(list.length && list.length<this.count){
						this.pageOver = true
					}else{
						this.pageOver = false
					}
				
					this.contents.push(list)
					console.log('1111')
					console.log(this.contents)
				})

			},

			/* 触发改变选中标签*/
			changeTag(_index) {
				this.tabCurrentIndex = _index
			}
		}
	}
</script>

<style lang="scss">
	page,
	.content {
		background-color: #f8f8f8;
		height: 100%;
		overflow: hidden;
	}

	/* 顶部tabbar */
	.nav-bar {
		position: relative;
		z-index: 10;
		height: 90upx;
		white-space: nowrap;
		box-shadow: 0 2upx 8upx rgba(0, 0, 0, .06);
		background-color: #fff;

		.nav-item {
			display: inline-block;
			width: 150upx;
			height: 90upx;
			text-align: center;
			line-height: 90upx;
			font-size: 30upx;
			color: #303133;
			position: relative;

			&:after {
				content: '';
				width: 0;
				height: 0;
				border-bottom: 4upx solid #007aff;
				position: absolute;
				left: 50%;
				bottom: 0;
				transform: translateX(-50%);
				transition: .3s;
			}
		}

		.current {
			color: #007aff;

			&:after {
				width: 50%;
			}
		}
	}
	.item-box{
		width: 750rpx;
		height: 200rpx;
		background: #fff;
		margin-top: 10rpx;
	}
</style>
