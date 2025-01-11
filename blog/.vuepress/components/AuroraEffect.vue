<template>
  <div class="aurora-container">
    <div class="stars-container">
      <div class="stars"></div>
      <div class="stars2"></div>
      <div class="stars3"></div>
    </div>
    <!-- 添加文字容器 -->
    <div class="welcome-text">
      <div class="main-text">Welcome to</div>
      <div class="highlight-text">Ethan's Fun Space!</div>
      <div class="chinese-text">欢迎光临 Ethan的乐趣空间！</div>
    </div>
    <ClientOnly>
      <canvas ref="auroraCanvas" 
              class="aurora-canvas"
              @mousemove="handleMouseMove"
              @mouseleave="handleMouseLeave">
      </canvas>
    </ClientOnly>
  </div>
</template>

<script>
export default {
  name: 'AuroraEffect',
  data() {
    return {
      canvas: null,
      ctx: null,
      particles: [],
      mouseX: 0,
      mouseY: 0,
      isMouseOver: false,
      animationFrame: null,
      lastTime: 0,
      particleColors: [
        { r: 255, g: 182, b: 193, a: 0.7 },    // 粉色
        { r: 135, g: 206, b: 235, a: 0.7 },    // 天蓝色
        { r: 176, g: 224, b: 230, a: 0.7 },    // 粉蓝色
        { r: 221, g: 160, b: 221, a: 0.7 },    // 梅红色
        { r: 255, g: 218, b: 185, a: 0.7 }     // 桃色
      ]
    }
  },
  mounted() {
    console.log('AuroraEffect mounted')
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
      this.canvas = this.$refs.auroraCanvas
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
      
      // 创建新的粒子
      for (let i = 0; i < 2; i++) {
        this.createParticle(
          this.mouseX + (Math.random() - 0.5) * 20,
          this.mouseY + (Math.random() - 0.5) * 20
        )
      }
    },
    handleMouseLeave() {
      this.isMouseOver = false
    },
    createParticle(x, y) {
      const color = this.particleColors[Math.floor(Math.random() * this.particleColors.length)]
      const particle = {
        x: x,
        y: y,
        size: Math.random() * 3 + 2,
        speedX: (Math.random() - 0.5) * 2,
        speedY: Math.random() * 2 + 1,
        life: 1,
        color: color,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        sinOffset: Math.random() * Math.PI * 2,
        sinSpeed: 0.03,
        trail: [],
        maxTrailLength: 8
      }
      this.particles.push(particle)
    },
    updateParticles() {
      for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i]
        
        // 更新位置
        p.rotation += p.rotationSpeed
        p.x += p.speedX + Math.sin(p.sinOffset) * 0.5
        p.y += p.speedY
        p.sinOffset += p.sinSpeed
        
        // 记录轨迹
        p.trail.unshift({ x: p.x, y: p.y })
        if (p.trail.length > p.maxTrailLength) {
          p.trail.pop()
        }
        
        // 减少生命值
        p.life -= 0.005
        
        // 如果粒子消失或离开画布，则移除
        if (p.life <= 0 || p.y > this.canvas.height) {
          this.particles.splice(i, 1)
        }
      }
      
      // 自动创建粒子
      if (this.isMouseOver && Math.random() < 0.3) {
        this.createParticle(this.mouseX, this.mouseY)
      }
    },
    drawParticles() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      
      this.particles.forEach(p => {
        // 绘制轨迹
        if (p.trail.length > 1) {
          this.ctx.beginPath()
          this.ctx.moveTo(p.trail[0].x, p.trail[0].y)
          
          for (let i = 1; i < p.trail.length; i++) {
            const point = p.trail[i]
            const prevPoint = p.trail[i - 1]
            const xc = (point.x + prevPoint.x) / 2
            const yc = (point.y + prevPoint.y) / 2
            this.ctx.quadraticCurveTo(prevPoint.x, prevPoint.y, xc, yc)
          }
          
          this.ctx.strokeStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${p.color.a * p.life * 0.5})`
          this.ctx.lineWidth = p.size * 0.5
          this.ctx.lineCap = 'round'
          this.ctx.stroke()
        }
        
        // 绘制粒子
        this.ctx.save()
        this.ctx.translate(p.x, p.y)
        this.ctx.rotate(p.rotation)
        
        // 创建星形粒子
        this.ctx.beginPath()
        for (let i = 0; i < 5; i++) {
          const angle = (i * Math.PI * 2) / 5
          const radius = p.size * (i % 2 ? 0.5 : 1)
          this.ctx.lineTo(
            Math.cos(angle) * radius,
            Math.sin(angle) * radius
          )
        }
        this.ctx.closePath()
        
        // 添加发光效果
        const gradient = this.ctx.createRadialGradient(0, 0, 0, 0, 0, p.size)
        gradient.addColorStop(0, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${p.color.a * p.life})`)
        gradient.addColorStop(1, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, 0)`)
        
        this.ctx.fillStyle = gradient
        this.ctx.fill()
        this.ctx.restore()
      })
    },
    animate() {
      this.updateParticles()
      this.drawParticles()
      this.animationFrame = requestAnimationFrame(this.animate)
    }
  }
}
</script>

<style scoped>
.aurora-container {
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

.aurora-canvas {
  display: block;
  width: 100%;
  height: 100%;
  pointer-events: auto;
}

/* 文字样式 */
.welcome-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 2;
  pointer-events: none;
  width: 100%;
}

.main-text {
  font-size: 2rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 0.5rem;
  font-weight: 300;
  letter-spacing: 4px;
  animation: fadeInUp 1s ease-out;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}

.highlight-text {
  font-size: 3.5rem;
  font-weight: bold;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96e6a1);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 1rem;
  animation: fadeInUp 1s ease-out 0.3s backwards;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
}

.chinese-text {
  font-size: 1.8rem;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 300;
  letter-spacing: 2px;
  animation: fadeInUp 1s ease-out 0.6s backwards;
  text-shadow: 0 0 15px rgba(255, 255, 255, 0.3);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 添加悬浮发光效果 */
.welcome-text div {
  transition: all 0.3s ease;
}

.welcome-text div:hover {
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.8);
  transform: scale(1.05);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .main-text {
    font-size: 1.5rem;
  }
  
  .highlight-text {
    font-size: 2.5rem;
  }
  
  .chinese-text {
    font-size: 1.3rem;
  }
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