module.exports = {
  content: [
    './blog/.vuepress/components/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3eaf7c',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
