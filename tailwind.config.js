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
        green: "#a4ffb1",
        action: '#F87171',    // Action
        adventure: '#60A5FA', // Adventure
        comedy: '#34D399',    // Comedy
        drama: '#A78BFA',      // Drama
        fantasy: '#FBBF24',    // Fantasy
        magic: '#EC4899',      // Magic
        mecha: '#6EE7B7',      // Mecha
        music: '#9333EA',      // Music
        mystery: '#F472B6',    // Mystery
        psychological: '#10B981', // Psychological
        romance: '#FB923C',    // Romance
        school: '#7C3AED',     // School
        future: '#8B5CF6',      // Sci-Fi
        sliceOfLife: '#60A5FA', // Slice of Life
        sports: '#14B8A6',     // Sports
        shounen: '#FBBF24', // Supernatural
        thriller: '#DC2626',   // Thriller
        all: '#EC4899',    // Vampire
      },
      backgroundImage: {
        texturedBg: "linear-gradient(to right, rgba(245, 245, 245, .8), rgb(255 221 214 / 80%)), url(https://d33wubrfki0l68.cloudfront.net/daac8858fd4a0ccea44f59dfd079c3c16c263f33/c157c/assets/svg/common-bg.svg);",
        texturedBgDark: "linear-gradient(to right, #1b1b1b, rgb(0, 0, 0, 0.75)), url(https://d33wubrfki0l68.cloudfront.net/daac8858fd4a0ccea44f59dfd079c3c16c263f33/c157c/assets/svg/common-bg.svg);",
        themeBgDark: "linear-gradient(to right, #1b1b1b, rgb(0, 0, 0, 0.75)), url(https://aniwatch.to/images/anw-min.webp);",
        gradientMd: 'linear-gradient(90deg, rgba(0,0,0,0.891281512605042) 22%, rgba(78,78,91,0) 56%, rgba(28,23,23,1) 100%)',
        gradientMobile: 'linear-gradient(90deg, rgba(0,0,0,0.891281512605042) 4%, rgba(78,78,91,0) 50%, rgba(28,23,23,0.9585084033613446) 98%)',
        gradientBoxColor: 'linear-gradient(90deg, rgba(29,0,48,1) 0%, rgba(6,0,69,1) 32%, rgba(45,3,79,1) 78%, rgba(0,0,0,1) 98%)',
        pinkBlue: 'linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)',
        redBlack: 'linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)'
      },
    },
  },
  plugins: [],
}
