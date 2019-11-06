<template>
  <div class="o-sis-container">
    <button v-if="env == 'development'" @click="realLinks = !realLinks">
      <span class="c-sis-helper" v-if="!realLinks">Show Shop links</span>
      <span class="c-sis-helper c-sis-helper__hover" v-else
        >Show Nav links</span
      >
    </button>
    <div class="o-sis-wrap">
      <ul class="c-sis-nav c-sis-nav-subpage">
        <li class="c-sis-nav__item c-sis-nav__item--icon">
          <a :href="routerLink(homeLink)">
            <img src="@/assets/images/ic_home.svg" />
          </a>
        </li>
        <li
          class="c-sis-nav__item"
          v-for="item in root"
          :key="item.label"
          :class="{ active: rootLabel == item.label }"
        >
          <a :href="routerLink(item)" :title="item.label" v-html="item.label">
            {{ item.label }}
          </a>
        </li>
        <li class="c-sis-nav__item c-sis-nav__item--icon"></li>
      </ul>
      <div class="c-sis-subpageBanner">
        <div class="c-sis-subpageBanner-overlay">
          <a
            :href="routerLink(parent)"
            class="c-sis-subpageBanner-overlay-back"
            v-if="level > 1"
            >{{ parentLabel }}</a
          >
          <a
            :href="routerLink(parent)"
            class="c-sis-subpageBanner-overlay-heading"
            v-html="rootLabel"
            >{{ rootLabel }}</a
          >
          <a class="c-sis-subpageBanner-overlay-subheading" v-if="level > 1">
            {{ label }}
          </a>
        </div>
        <div class="c-sis-subpageBanner-controls">
          <a
            :href="routerLink(nextSibling)"
            v-bind:class="[
              !nextSibling ? 'c-sis-subpageBanner-controls-btn--inactive' : '',
              'c-sis-subpageBanner-controls-btn c-sis-subpageBanner-controls-btn--forward',
            ]"
            :title="nextSibling.label"
            :aria-label="nextSibling.label"
          ></a>
          <a
            :href="routerLink(prevSibling)"
            v-bind:class="[
              !prevSibling ? 'c-sis-subpageBanner-controls-btn--inactive' : '',
              'c-sis-subpageBanner-controls-btn',
            ]"
            :title="prevSibling.label"
            :aria-label="prevSibling.label"
          ></a>
        </div>
        <img class="c-sis-subpageBanner__bg" :src="imageSrc" />
      </div>
      <ul class="c-sis-subpageNav" v-if="level < 4">
        <li
          class="c-sis-subpageNav__item"
          v-for="item in children"
          :key="item.label"
          v-if="
            level < 2 ||
              (level === 2 && hasChildren) ||
              (level === 3 && hasChildren)
          "
        >
          <a :href="routerLink(item)" v-html="item.label">{{ item.label }}</a>
        </li>
      </ul>
      <div style="margin-top:30px" v-if="banner">
        <a :href="banner" class="c-sis-xlBanner">
          <img class="c-sis-xlBanner-image" src="@/assets/images/BANNER.jpg" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import menu from '@/menu.json'

export default {
  name: 'SubMenu',
  props: {
    root: Array,
    path: String,
    parent: Object,
    children: Array,
    banner: String,
    hasChildren: Boolean,
    nextSibling: [Boolean, Object],
    prevSibling: [Boolean, Object],
    label: String,
    imageName: String,
    parentLabel: String,
    parentLink: String,
    rootLabel: String,
    level: Number,
  },
  data() {
    return {
      realLinks: process.env.NODE_ENV === 'production',
      env: process.env.NODE_ENV,
    }
  },
  methods: {
    routerLink(item) {
      const path = item.path === undefined ? '' : item.path

      if (this.realLinks) {
        return item.link
      }
      return process.env.NODE_ENV === 'production' ? '/' + path : '#/' + path
    },
  },
  computed: {
    homeLink() {
      return menu[0].link
    },
    imageSrc() {
      return require('@/assets/images/' + this.imageName)
    },
  },
}
</script>
