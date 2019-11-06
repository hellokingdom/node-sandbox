import Vue from 'vue'
import Router from 'vue-router'
import SubMenu from './views/SubMenu.vue'
import Home from './views/Home.vue'
import menu from './menu.json'
import _ from 'lodash'

Vue.use(Router)

const addPathToMenu = (obj, path, level) => {
  level++
  _.mapKeys(obj, function(value, key) {
    var newPath = level > 0 ? path + slugify(value.label) + '/' : ''
    value.path = newPath
    value.hasChildren = !!value.children
    if (value.children) {
      addPathToMenu(value.children, newPath, level)
    }
  })
}

addPathToMenu(menu, '', -1)

function slugify(string) {
  const a = 'àáäâãåèéëêìíïîòóöôùúüûñçßÿœæŕśńṕẃǵǹḿǘẍźḧ·/_,:;'
  const b = 'aaaaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh------'
  const p = new RegExp(a.split('').join('|'), 'g')

  return string
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text
}

function* processData(data, path, level, parent, rootLabel, next, prev) {
  if (!data) {
    return
  }
  level++
  for (var i = 0; i < data.length; i++) {
    var val = data[i]
    var newPath = level > 0 ? path + slugify(val.label) + '/' : '/'

    // Set the root label
    if (level === 1) {
      rootLabel = val.label
      next = i + 1
      prev = i - 1
    }
    yield {
      parentLabel: level < 3 ? 'Back' : parent.label || val.label,
      parent: parent || val,
      rootLabel: rootLabel,
      label: val.label,
      link: val.link,
      image: val.image,
      path: newPath,
      level: level,
      children: val.hasChildren ? val.children : null,
      banner: val.banner,
      hasChildren: val.hasChildren,
      prevSibling: menu[0].children[prev] || false,
      nextSibling: menu[0].children[next] || false,
    }
    if (val.children) {
      yield* processData(
        val.children,
        newPath,
        level,
        val,
        rootLabel,
        next,
        prev
      )
    }
  }
}

let it = processData(menu, '', -1, '', '', 0, 0)
let res = it.next()
let routesArray = []

while (!res.done) {
  routesArray.push({
    path: res.value.path,
    component: res.value.level == 0 ? Home : SubMenu,
    props: {
      root: menu[0].children,
      path: res.value.path,
      level: res.value.level,
      children: res.value.children,
      hasChildren: res.value.hasChildren,
      banner: res.value.banner,
      label: res.value.label,
      link: res.value.link,
      imageName: res.value.image,
      parentLabel: res.value.parentLabel,
      parent: res.value.parent,
      rootLabel: res.value.rootLabel,
      prevSibling: res.value.prevSibling,
      nextSibling: res.value.nextSibling,
    },
  })
  res = it.next()
}

let webpackRoutes = []

routesArray.forEach(function(value) {
  webpackRoutes.push(value.path)
})

window.SISroutes = '"' + webpackRoutes.join('","') + '"'

export default new Router({
  routes: routesArray,
  mode: process.env.NODE_ENV === 'development' ? 'hash' : 'history',
})
