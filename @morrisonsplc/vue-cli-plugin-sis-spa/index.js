const path = require('path')
const PrerenderSPAPlugin = require('prerender-spa-plugin')
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer

module.exports = (api, projectOptions) => {
  const fs = require('fs')
  const options = JSON.parse(
    fs.readFileSync(api.resolve('./.prerender-spa.json', { encoding: 'utf-8' }))
  )
  api.chainWebpack(config => {
    if (options.onlyProduction && process.env.NODE_ENV !== 'production') {
      return
    }
    let rendererConfig = {
      headless: options.headless,
      maxConcurrentRoutes: options.parallel ? 4 : 1
    }
    if (options.useRenderEvent) {
      rendererConfig['renderAfterDocumentEvent'] = 'x-app-rendered'
    }

    if (options.customRendererConfig) {
      Object.assign(rendererConfig, options.customRendererConfig)
    }

    config.plugin('pre-render').use(PrerenderSPAPlugin, [
      {
        outputDir: api.resolve(projectOptions.outputDir),
        staticDir: api.resolve(projectOptions.outputDir),
        assetsDir: api.resolve(
          path.join(projectOptions.outputDir, projectOptions.assetsDir)
        ),
        indexPath: api.resolve(
          path.join(projectOptions.outputDir, projectOptions.indexPath)
        ),
        routes: options.renderRoutes,
        postProcess (renderedRoute) {
          const regex = /<match>[\s\S]*<\/match>/g
          const regexCss = /<style type="text\/css">[\s\S]*<\/style>/g
          const str = renderedRoute.html
          let m = regex.exec(str)
          let s = regexCss.exec(str)

          renderedRoute.route = renderedRoute.originalRoute
          renderedRoute.html = s[0] + m[0]
          renderedRoute.html = renderedRoute.html.replace('<match><div id="app">', '')
          renderedRoute.html = renderedRoute.html.replace('</div></match>', '')
          return renderedRoute
        },
        minify: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          decodeEntities: true,
          keepClosingSlash: true,
          sortAttributes: true
        },
        renderer: new Renderer(rendererConfig)
      }
    ])
  })
}
