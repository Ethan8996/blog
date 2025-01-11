<template>
  <div class="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
      <!-- 语言切换 -->
      <div class="absolute top-4 right-4">
        <button 
          @click="toggleLanguage" 
          class="px-4 py-2 rounded-full bg-gradient-to-r from-primary to-primary-light
                text-white font-medium transition duration-300 ease-in-out
                transform hover:scale-105 hover:shadow-lg
                focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
        >
          <div class="flex items-center space-x-2">
            <span class="material-icons text-sm">language</span>
            <span>{{ currentLang === 'en' ? '中文' : 'English' }}</span>
          </div>
        </button>
      </div>

      <!-- Header Section -->
      <div class="bg-gradient-to-r from-primary to-green-600 text-white px-4 py-6">
        <div class="max-w-2xl mx-auto">
          <h1 class="text-2xl font-bold">{{ resume.basics.name }}</h1>
          <p class="text-base mt-1 opacity-90">{{ resume.basics.title }}</p>
          <div class="mt-3 flex flex-wrap gap-3 text-sm">
            <a :href="'mailto:' + resume.basics.email" class="flex items-center text-white hover:text-gray-200 transition">
              <i class="fas fa-envelope mr-1"></i>
              <span>{{ resume.basics.email }}</span>
            </a>
            <a :href="resume.basics.github.url" target="_blank" class="flex items-center text-white hover:text-gray-200 transition">
              <i class="fab fa-github mr-1"></i>
              <span>{{ resume.basics.github.text }}</span>
            </a>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="px-6 py-6">
        <!-- About Section -->
        <section class="mb-6">
          <h2 class="text-xl font-bold text-gray-800 mb-3 border-b pb-2">{{ resume.about.title }}</h2>
          <p class="text-gray-600 leading-relaxed text-sm">
            {{ resume.about.content }}
          </p>
        </section>

        <!-- Skills Section -->
        <!-- Skills Section -->
<section class="mb-6">
  <h2 class="text-xl font-bold text-gray-800 mb-3 border-b pb-2">{{ resume.skills.title }}</h2>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div v-for="(category, index) in resume.skills.categories" 
         :key="index" 
         class="bg-gray-50 rounded-lg p-4 shadow-sm">
      <h3 class="font-semibold text-primary mb-3 text-sm">{{ category.name }}</h3>
      <ul class="space-y-2">
        <li v-for="(item, idx) in category.items" 
            :key="idx"
            class="flex items-center text-gray-600 text-sm">
          <span class="w-2 h-2 rounded-full bg-primary/60 mr-2"></span>
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</section>

        <!-- Experience Section -->
        <section class="mb-6">
          <h2 class="text-xl font-bold text-gray-800 mb-3 border-b pb-2">{{ resume.experience.title }}</h2>
          <div class="space-y-4">
            <div v-for="(exp, index) in resume.experience.items" :key="index">
              <h3 class="text-lg font-semibold text-gray-800">{{ exp.title }}</h3>
              <p class="text-gray-600 italic text-sm">{{ exp.company }} • {{ exp.period }}</p>
              <ul class="list-disc ml-5 mt-2 text-gray-600 space-y-1 text-sm">
                <li v-for="(achievement, idx) in exp.achievements" :key="idx">
                  {{ achievement }}
                </li>
              </ul>
            </div>
          </div>
        </section>

        <!-- Education Section -->
        <section class="mb-6">
          <h2 class="text-xl font-bold text-gray-800 mb-3 border-b pb-2">{{ resume.education.title }}</h2>
          <div v-for="(edu, index) in resume.education.items" :key="index">
            <h3 class="text-lg font-semibold text-gray-800">{{ edu.degree }}</h3>
            <p class="text-gray-600 italic text-sm">{{ edu.school }} • {{ edu.period }}</p>
          </div>
        </section>

        <!-- Projects Section -->
        <section>
          <h2 class="text-xl font-bold text-gray-800 mb-3 border-b pb-2">{{ resume.projects.title }}</h2>
          <div class="space-y-4">
            <div v-for="(project, index) in resume.projects.items" 
                 :key="index" 
                 class="bg-gray-50 p-3 rounded-lg shadow-sm">
              <h3 class="text-base font-semibold text-primary">{{ project.name }}</h3>
              <p class="text-gray-600 mt-1 text-sm">{{ project.description }}</p>
              <div class="mt-2 text-xs text-gray-500">{{ project.technologies }}</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import resumeData from '../data/resume.json'

export default {
  name: 'Resume',
  data() {
    return {
      currentLang: 'en',
      resumeData
    }
  },
  computed: {
    resume() {
      return this.resumeData[this.currentLang]
    }
  },
  methods: {
    toggleLanguage() {
      this.currentLang = this.currentLang === 'en' ? 'zh' : 'en'
    }
  },
  mounted() {
    // 在客户端环境下检查浏览器语言
    if (typeof window !== 'undefined') {
      const browserLang = navigator.language.toLowerCase()
      this.currentLang = browserLang.includes('zh') ? 'zh' : 'en'
    }
  }
}
</script>

<style>
/* 保持原有样式不变 */
.theme-container {
  max-width: 100%;
  margin: 0;
  padding: 0;
}

.theme-default-content {
  max-width: 100% !important;
  margin: 0 !important;
  padding: 0 !important;
}

.max-w-4xl {
  max-width: 48rem !important;
}

@media (min-width: 640px) {
  .max-w-4xl {
    max-width: 40rem !important;
  }
}

/* 添加过渡动画 */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>