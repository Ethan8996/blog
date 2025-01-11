<template>
  <div class="snow-container">
    <ClientOnly>
      <canvas ref="snowCanvas" 
              class="snow-canvas"
              @mousemove="handleMouseMove"
              @mouseleave="handleMouseLeave">
      </canvas>
    </ClientOnly>
  </div>
</template>

<script>
export default {
  name: 'SnowEffect',
  data() {
    return {
      canvas: null,
      ctx: null,
      snowflakes: [],
      mouseX: 0,
      mouseY: 0,
      isMouseOver: false,
      animationFrame: null,
      lastTime: 0,
      snowflakeInterval: 50 // 控制自动产生雪花的间隔
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initCanvas()
      this.createInitialSnowflakes()
      this.animate()
      window.addEventListener('resize', this.handleResize)
    })
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
    cancelAnimationFrame(this.animationFrame)
  },
  methods: {
    initCanvas() {
      this.canvas = this.$refs.snowCanvas
      this.ctx = this.canvas.getContext('2d')
      this.resizeCanvas()
    },
    resizeCanvas() {
      if (!this.canvas) return
      this.canvas.width = window.innerWidth
      this.canvas.height = window.innerHeight
    },
    handleResize() {
      this.resizeCanvas()
    },
    handleMouseMove(e) {
      this.isMouseOver = true
      this.mouseX = e.clientX
      this.mouseY = e.clientY
      
      // 鼠标移动时创建更多雪花
      for (let i = 0; i < 2; i++) {
        this.createSnowflake(this.mouseX, this.mouseY - 20)
      }
    },
    handleMouseLeave() {
      this.isMouseOver = false
    },
    createInitialSnowflakes() {
      // 初始创建更多雪花
      for (let i = 0; i < 200; i++) {
        this.createSnowflake(
          Math.random() * this.canvas.width,
          Math.random() * this.canvas.height
        )
      }
    },
    createSnowflake(x, y) {
      const snowflake = {
        x: x || Math.random() * this.canvas.width,
        y: y || -10,
        radius: Math.random() * 4 + 1, // 增加雪花大小变化范围
        speed: Math.random() * 1.5 + 0.5,
        wind: Math.random() * 1 - 0.5,
        opacity: Math.random() * 0.5 + 0.5,
        wobble: Math.random() * Math.PI * 2, // 添加摇摆效果
        wobbleSpeed: 0.02 + Math.random() * 0.08 // 摇摆速度
      }
      this.snowflakes.push(snowflake)
    },
    updateSnowflakes(deltaTime) {
      // 自动创建新雪花
      if (this.lastTime % this.snowflakeInterval === 0) {
        this.createSnowflake()
      }
      this.lastTime++

      for (let i = this.snowflakes.length - 1; i >= 0; i--) {
        const snowflake = this.snowflakes[i]
        
        // 更新摇摆效果
        snowflake.wobble += snowflake.wobbleSpeed
        snowflake.x += Math.sin(snowflake.wobble) * 0.3
        
        // 更新位置
        snowflake.y += snowflake.speed
        snowflake.x += snowflake.wind
        
        // 添加风的变化
        snowflake.wind += (Math.random() - 0.5) * 0.05
        snowflake.wind = Math.max(Math.min(snowflake.wind, 1), -1)
        
        // 如果雪花落出画布，重新从顶部开始
        if (snowflake.y > this.canvas.height) {
          // 70%的概率重新从顶部开始，30%的概率移除
          if (Math.random() > 0.3) {
            snowflake.y = -10
            snowflake.x = Math.random() * this.canvas.width
          } else {
            this.snowflakes.splice(i, 1)
          }
        }
        
        // 处理水平边界
        if (snowflake.x < 0) snowflake.x = this.canvas.width
        if (snowflake.x > this.canvas.width) snowflake.x = 0
      }
    },
    drawSnowflakes() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      
      this.snowflakes.forEach(snowflake => {
        this.ctx.beginPath()
        
        // 创建径向渐变
        const gradient = this.ctx.createRadialGradient(
          snowflake.x, snowflake.y, 0,
          snowflake.x, snowflake.y, snowflake.radius
        )
        gradient.addColorStop(0, `rgba(255, 255, 255, ${snowflake.opacity})`)
        gradient.addColorStop(1, `rgba(255, 255, 255, 0)`)
        
        this.ctx.arc(snowflake.x, snowflake.y, snowflake.radius, 0, Math.PI * 2)
        this.ctx.fillStyle = gradient
        this.ctx.fill()
      })
    },
    animate(timestamp) {
      const deltaTime = timestamp - (this.lastFrameTime || timestamp)
      this.lastFrameTime = timestamp
      
      this.updateSnowflakes(deltaTime)
      this.drawSnowflakes()
      this.animationFrame = requestAnimationFrame(this.animate)
    }
  }
}
</script>

<style scoped>
.snow-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 100;
  pointer-events: none;
  background: linear-gradient(
    to bottom,
    #1a1f35 0%,
    #2a3149 100%
  );
}

.snow-canvas {
  display: block;
  width: 100%;
  height: 100%;
  pointer-events: auto;
}
</style>