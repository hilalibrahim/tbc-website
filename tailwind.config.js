/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Ghrathe', 'serif'],
        sans: ['Nexa', 'system-ui', 'sans-serif'],
      },
      colors: {
        background: '#ffffff',
        foreground: '#000000',
        accent: '#6366f1',
        'accent-hover': '#4f46e5',
        secondary: '#64748b',
        border: '#e2e8f0',
      },
      boxShadow: {
        'depth-1': '0 1px 3px rgba(0, 0, 0, 0.1)',
        'depth-2': '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
        'depth-3': '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
        'depth-4': '0 20px 25px rgba(0, 0, 0, 0.15), 0 10px 10px rgba(0, 0, 0, 0.04)',
        'depth-5': '0 25px 50px rgba(0, 0, 0, 0.2), 0 10px 15px rgba(0, 0, 0, 0.1)',
        'layered': '0 10px 30px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
}
