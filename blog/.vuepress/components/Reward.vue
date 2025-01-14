<template>
  <div class="reward-wrapper">
    <div class="reward-qrcode theme-default-content">
      <!-- <div class="reward-title">赞赏作者</div> -->
      <div class="qr-list">
        <div class="qr-item">
          <img 
            :src="$withBase('/assets/wechat-qr.png')" 
            alt="微信赞赏码"
          >
          <p>微信赞赏</p>
        </div>
        <!-- <div class="qr-item">
          <img 
            :src="$withBase('/assets/alipay.png')" 
            alt="支付宝赞赏码"
          >
          <p>支付宝赞赏</p>
        </div> -->
      </div>
      <p class="reward-message">您的支持是我继续创作的动力 ❤️</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Reward',
  data() {
    return {
      isShowQRCode: false
    }
  },
  computed: {
    // 可以添加计算属性来处理图片路径
    imageUrls() {
      return {
        wechat: this.$withBase('/assets/reward/wechat.png'),
        alipay: this.$withBase('/assets/reward/alipay.png')
      }
    }
  }
}
</script>

<style lang="stylus">
.reward-wrapper
  padding: 2rem 0
  margin: 2rem 0
  text-align: center
  border-top: 1px solid var(--border-color)
  border-bottom: 1px solid var(--border-color)

  .reward-qrcode
    .reward-title
      font-size: 1.4rem
      font-weight: 600
      color: var(--text-color)
      margin-bottom: 1.5rem
    
    .qr-list
      display: flex
      justify-content: center
      gap: 3rem
      flex-wrap: wrap
      padding: 1rem
      
      .qr-item
        text-align: center
        
        img
          width: 240px
          height: 240px
          padding: 0.75rem
          border: 1px solid var(--border-color)
          border-radius: 8px
          background: #fff
          transition: all 0.3s ease
          box-shadow: 0 2px 12px rgba(0,0,0,0.05)
          
          &:hover
            transform: scale(1.02)
            box-shadow: 0 4px 20px rgba(0,0,0,0.1)
        
        p
          margin: 0.75rem 0
          color: var(--text-color-light)
          font-size: 1rem
          font-weight: 500
    
    .reward-message
      margin-top: 1.5rem
      color: var(--text-color-light)
      font-size: 1rem

// 移动端适配
@media (max-width: 719px)
  .reward-wrapper
    .reward-qrcode
      .qr-list
        gap: 2rem
        
        .qr-item
          img
            width: 200px
            height: 200px

// 小屏幕适配
@media (max-width: 419px)
  .reward-wrapper
    .reward-qrcode
      .qr-list
        gap: 1.5rem
        
        .qr-item
          img
            width: 180px
            height: 180px
            padding: 0.5rem
      
      .reward-title
        font-size: 1.2rem
        margin-bottom: 1rem
</style>