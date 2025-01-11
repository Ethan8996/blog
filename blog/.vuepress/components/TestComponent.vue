<!-- .vuepress/components/TestComponent.vue -->
<template>
    <div class="test-component">
      <h2>测试组件</h2>
      <p>如果你看到这段文字，说明组件系统工作正常。</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'TestComponent'  // 确保有name属性
  }
  </script>
  
  <style scoped>
  .test-component {
    padding: 20px;
    border: 1px solid #eee;
    border-radius: 4px;
    margin: 20px 0;
  }
  </style>