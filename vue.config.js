module.exports = {
  css: {
    extract: false,
  },
  baseUrl: '/', // This must be set to / when building scribe else it cannot load the JS (it looks for it in the root of each sub dir)
  //When building for testing on planogram the url needs to added ---- '/planogram/2019/your-sis/'
  outputDir: undefined,
  assetsDir: undefined,
  runtimeCompiler: undefined,
  productionSourceMap: undefined,
  parallel: undefined,
}
