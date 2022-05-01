module.exports = {
  jit: true,
  content: ['src/**/*.{ts,tsx}'],
  theme: {
    extend: {},
  },
  experimental: {
    optimizeUniversalDefaults: true
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
  prefix: 'eiromplaysui-'
}