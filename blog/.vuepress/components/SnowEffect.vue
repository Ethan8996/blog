<template>
    <div class="snow-container">
      <div class="stars-container">
        <div class="stars"></div>
        <div class="stars2"></div>
        <div class="stars3"></div>
      </div>
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
        autoSnowInterval: 50 // 控制自动在鼠标位置产生雪花的间隔
      }
    },
    mounted() {
      console.log('SnowEffect mounted')
      this.$nextTick(() => {
        this.initCanvas()
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
        
        // 鼠标移动时创建雪花
        for (let i = 0; i < 2; i++) {
          this.createSnowflake(
            this.mouseX + (Math.random() - 0.5) * 20, // 在鼠标周围小范围随机
            this.mouseY - 10
          )
        }
      },
      handleMouseLeave() {
        this.isMouseOver = false
      },
      createSnowflake(x, y) {
        const snowflake = {
          x: x,
          y: y,
          radius: Math.random() * 3 + 1,
          speed: Math.random() * 1.5 + 0.5,
          wind: Math.random() * 1 - 0.5,
          opacity: Math.random() * 0.6 + 0.4,
          wobble: Math.random() * Math.PI * 2,
          wobbleSpeed: 0.02 + Math.random() * 0.05
        }
        this.snowflakes.push(snowflake)
      },
      updateSnowflakes() {
        // 如果鼠标在画布上，自动在鼠标位置产生雪花
        if (this.isMouseOver && this.lastTime % this.autoSnowInterval === 0) {
          this.createSnowflake(
            this.mouseX + (Math.random() - 0.5) * 20,
            this.mouseY - 10
          )
        }
        this.lastTime++
  
        for (let i = this.snowflakes.length - 1; i >= 0; i--) {
          const snowflake = this.snowflakes[i]
          
          snowflake.wobble += snowflake.wobbleSpeed
          snowflake.x += Math.sin(snowflake.wobble) * 0.3
          snowflake.y += snowflake.speed
          snowflake.x += snowflake.wind
          
          snowflake.wind += (Math.random() - 0.5) * 0.05
          snowflake.wind = Math.max(Math.min(snowflake.wind, 1), -1)
          
          // 如果雪花落出画布或距离鼠标太远，则移除
          if (snowflake.y > this.canvas.height || 
              snowflake.y < 0 || 
              snowflake.x < 0 || 
              snowflake.x > this.canvas.width ||
              Math.abs(snowflake.x - this.mouseX) > 200 || // 限制水平距离
              Math.abs(snowflake.y - this.mouseY) > 400) { // 限制垂直距离
            this.snowflakes.splice(i, 1)
          }
        }
      },
      drawSnowflakes() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        
        this.snowflakes.forEach(snowflake => {
          this.ctx.beginPath()
          const gradient = this.ctx.createRadialGradient(
            snowflake.x, snowflake.y, 0,
            snowflake.x, snowflake.y, snowflake.radius
          )
          gradient.addColorStop(0, `rgba(255, 255, 255, ${snowflake.opacity})`)
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
          
          this.ctx.arc(snowflake.x, snowflake.y, snowflake.radius, 0, Math.PI * 2)
          this.ctx.fillStyle = gradient
          this.ctx.fill()
        })
      },
      animate() {
        this.updateSnowflakes()
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
  z-index: 1;
  pointer-events: none;
  background: radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%);
  overflow: hidden;
}

.snow-canvas {
  display: block;
  width: 100%;
  height: 100%;
  pointer-events: auto;
}

/* 星空效果 */
@keyframes animStar {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-2000px);
  }
}

.stars-container {
  position: absolute;
  width: 100%;
  height: 100%;
}

.stars {
  width: 1px;
  height: 1px;
  background: transparent;
  box-shadow: 1644px 1352px #fff,819px 1788px #fff,1661px 468px #fff,
              581px 543px #fff,1280px 1767px #fff,1368px 367px #fff,
              273px 1075px #fff,1100px 761px #fff,1600px 1311px #fff,
              1743px 1382px #fff,1189px 967px #fff,1140px 746px #fff,
              857px 1658px #fff,1333px 1641px #fff,1129px 1434px #fff,
              1172px 1794px #fff,1949px 1424px #fff,1579px 438px #fff;
  animation: animStar 50s linear infinite;
}

.stars:after {
  content: " ";
  position: absolute;
  top: 2000px;
  width: 1px;
  height: 1px;
  background: transparent;
  box-shadow: 1644px 1352px #fff,819px 1788px #fff,1661px 468px #fff,
              581px 543px #fff,1280px 1767px #fff,1368px 367px #fff,
              273px 1075px #fff,1100px 761px #fff,1600px 1311px #fff,
              1743px 1382px #fff,1189px 967px #fff,1140px 746px #fff,
              857px 1658px #fff,1333px 1641px #fff,1129px 1434px #fff,
              1172px 1794px #fff,1949px 1424px #fff,1579px 438px #fff;
}

.stars2 {
  width: 2px;
  height: 2px;
  background: transparent;
  box-shadow: 1558px 1049px #fff,1044px 865px #fff,1735px 1457px #fff,
              1026px 1687px #fff,1440px 1929px #fff,1331px 1167px #fff,
              1661px 1122px #fff,1572px 1921px #fff,1897px 1401px #fff,
              1274px 1769px #fff,1103px 1632px #fff,1267px 1378px #fff;
  animation: animStar 100s linear infinite;
}

.stars2:after {
  content: " ";
  position: absolute;
  top: 2000px;
  width: 2px;
  height: 2px;
  background: transparent;
  box-shadow: 1558px 1049px #fff,1044px 865px #fff,1735px 1457px #fff,
              1026px 1687px #fff,1440px 1929px #fff,1331px 1167px #fff,
              1661px 1122px #fff,1572px 1921px #fff,1897px 1401px #fff,
              1274px 1769px #fff,1103px 1632px #fff,1267px 1378px #fff;
}

.stars3 {
  width: 3px;
  height: 3px;
  background: transparent;
  box-shadow: 1819px 777px #fff,1184px 1793px #fff,1422px 1684px #fff,
              472px 1029px #fff,1772px 1044px #fff,1743px 1929px #fff,
              1623px 1842px #fff,1678px 1558px #fff,1639px 1179px #fff,
              1382px 1907px #fff;
  animation: animStar 150s linear infinite;
}

.stars3:after {
  content: " ";
  position: absolute;
  top: 2000px;
  width: 3px;
  height: 3px;
  background: transparent;
  box-shadow: 1819px 777px #fff,1184px 1793px #fff,1422px 1684px #fff,
              472px 1029px #fff,1772px 1044px #fff,1743px 1929px #fff,
              1623px 1842px #fff,1678px 1558px #fff,1639px 1179px #fff,
              1382px 1907px #fff;
}

/* 添加微妙的背景渐变动画 */
@keyframes gradientBG {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.snow-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, 
    rgba(27, 39, 53, 0.5) 0%,
    rgba(9, 10, 15, 0.5) 100%
  );
  filter: blur(5px);
  z-index: -1;
  animation: gradientBG 15s ease infinite;
  background-size: 200% 200%;
}
</style>