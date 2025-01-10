<template>
  <div class="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
      <!-- Header Section -->
      <div class="bg-gradient-to-r from-primary to-green-600 text-white px-4 py-6">
        <div class="max-w-2xl mx-auto">
          <h1 class="text-2xl font-bold">Ethan Xiong</h1>
          <p class="text-base mt-1 opacity-90">Full Stack Developer</p>
          <div class="mt-3 flex flex-wrap gap-3 text-sm">
            <a href="mailto:why15874692787@163.com" class="flex items-center text-white hover:text-gray-200 transition">
              <i class="fas fa-envelope mr-1"></i>
              <span>why15874692787@163.com</span>
            </a>
            <a href="https://github.com/Ethan8996" target="_blank" class="flex items-center text-white hover:text-gray-200 transition">
              <i class="fab fa-github mr-1"></i>
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="px-6 py-6">
        <!-- About Section -->
        <section class="mb-6">
          <h2 class="text-xl font-bold text-gray-800 mb-3 border-b pb-2">About Me</h2>
          <p class="text-gray-600 leading-relaxed text-sm">
            A passionate full-stack developer with expertise in modern web technologies and a keen interest in building scalable applications. 
            Experienced in both frontend and backend development, with a focus on creating efficient and user-friendly solutions.
          </p>
        </section>

        <!-- Skills Section -->
        <section class="mb-6">
          <h2 class="text-xl font-bold text-gray-800 mb-3 border-b pb-2">Technical Skills</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-gray-50 rounded-lg p-3 shadow-sm">
              <h3 class="font-semibold text-primary mb-2 text-sm">Frontend Development</h3>
              <ul class="space-y-1 text-gray-600 text-sm">
                <li>• Vue.js / VuePress</li>
                <li>• React.js</li>
                <li>• JavaScript / TypeScript</li>
                <li>• HTML5 / CSS3 / Tailwind CSS</li>
              </ul>
            </div>
            <div class="bg-gray-50 rounded-lg p-3 shadow-sm">
              <h3 class="font-semibold text-primary mb-2 text-sm">Backend Development</h3>
              <ul class="space-y-1 text-gray-600 text-sm">
                <li>• Node.js</li>
                <li>• Python</li>
                <li>• RESTful APIs</li>
                <li>• Database Design</li>
              </ul>
            </div>
          </div>
        </section>

        <!-- Experience Section -->
        <section class="mb-6">
          <h2 class="text-xl font-bold text-gray-800 mb-3 border-b pb-2">Work Experience</h2>
          <div class="space-y-4">
            <div>
              <h3 class="text-lg font-semibold text-gray-800">Senior Developer</h3>
              <p class="text-gray-600 italic text-sm">Company Name • 2020 - Present</p>
              <ul class="list-disc ml-5 mt-2 text-gray-600 space-y-1 text-sm">
                <li>Led development of key features for enterprise applications</li>
                <li>Mentored junior developers and conducted code reviews</li>
                <li>Implemented CI/CD pipelines and improved deployment processes</li>
              </ul>
            </div>
          </div>
        </section>

        <!-- Education Section -->
        <section class="mb-6">
          <h2 class="text-xl font-bold text-gray-800 mb-3 border-b pb-2">Education</h2>
          <div>
            <h3 class="text-lg font-semibold text-gray-800">Bachelor's in Computer Science</h3>
            <p class="text-gray-600 italic text-sm">University Name • 2016 - 2020</p>
          </div>
        </section>

        <!-- Projects Section -->
        <section>
          <h2 class="text-xl font-bold text-gray-800 mb-3 border-b pb-2">Featured Projects</h2>
          <div class="space-y-4">
            <div class="bg-gray-50 p-3 rounded-lg shadow-sm">
              <h3 class="text-base font-semibold text-primary">Personal Blog</h3>
              <p class="text-gray-600 mt-1 text-sm">A bilingual blog built with VuePress, featuring both Chinese and English content.</p>
              <div class="mt-2 text-xs text-gray-500">Technologies: VuePress, Vue.js, Tailwind CSS</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Resume'
}
</script>

<style>
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

/* Add width constraint to resume content */
.max-w-4xl {
  max-width: 48rem !important;  /* Approximately 768px */
}

/* Make resume content more compact */
@media (min-width: 640px) {
  .max-w-4xl {
    max-width: 40rem !important;  /* Even more compact for larger screens */
  }
}
</style>
