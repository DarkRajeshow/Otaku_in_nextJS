/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        light: "#f5f5f5",
        dark: "#1b1b1b",
        primary: "#B63E96", // 240,86,199
        primaryDark: "#58E6D9", // 80,230,217
      },
      backgroundImage: {
        texturedBg: "linear-gradient(to right, rgba(245, 245, 245, .8), rgb(255 221 214 / 80%)), url(https://d33wubrfki0l68.cloudfront.net/daac8858fd4a0ccea44f59dfd079c3c16c263f33/c157c/assets/svg/common-bg.svg);",
        texturedBgDark: "linear-gradient(to right, #1b1b1b, rgb(0, 0, 0, 0.75)), url(https://d33wubrfki0l68.cloudfront.net/daac8858fd4a0ccea44f59dfd079c3c16c263f33/c157c/assets/svg/common-bg.svg);",
        gradientMd: 'linear-gradient(90deg, rgba(0,0,0,0.891281512605042) 22%, rgba(78,78,91,0) 56%, rgba(28,23,23,1) 100%)',
        gradientMobile: 'linear-gradient(90deg, rgba(0,0,0,0.891281512605042) 4%, rgba(78,78,91,0) 50%, rgba(28,23,23,0.9585084033613446) 98%)'
      },
    },
  },
  plugins: [],
}
