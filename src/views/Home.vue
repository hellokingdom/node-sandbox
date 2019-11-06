<template>
  <div class="o-sis-container">
    <button v-if="env == 'development'" @click="realLinks = !realLinks">
      <span class="c-sis-helper" v-if="!realLinks">Show Shop links</span>
      <span class="c-sis-helper c-sis-helper__hover" v-else
        >Show Nav links</span
      >
    </button>
    <div class="o-sis-wrap">
      <ul class="c-sis-nav">
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
      </ul>
      <div class="c-sis-heroBanner">
        <img
          class="c-sis-heroBanner__bg"
          src="@/assets/images/christmas-2019--homepage-header.jpg"
        />
      </div>
      <div class="o-sis-innerWrap">
        <div class="o-sis-row">
          <div class="o-sis-col o-sis-col--half o-sis-col--noBottomPadding">
            <div class="o-sis-row">
              <div class="o-sis-col o-sis-col--full">
                <a
                  href="https://groceries.morrisons.com/browse/178793/178794"
                  class="c-sis-box"
                >
                  <span class="c-sis-box-cover">
                    <img
                      class="c-sis-box-cover-image"
                      src="@/assets/images/christmas-2019--homepage-chocolate.jpg"
                      alt="Chocolates and Advent Calendars"
                    />
                  </span>
                  <span class="c-sis-box-label"
                    >Chocolates &amp; Advent Calendars</span
                  >
                </a>
              </div>
              <div class="o-sis-col o-sis-col--half">
                <a
                  href="https://groceries.morrisons.com/browse/178793/178797"
                  class="c-sis-box"
                >
                  <span class="c-sis-box-cover">
                    <img
                      class="c-sis-box-cover-image"
                      src="@/assets/images/christmas-2019--homepage-drinks.jpg"
                      alt="Alcohol and Soft Drinks"
                    />
                  </span>
                  <span class="c-sis-box-label">Alcohol &amp; Soft Drinks</span>
                </a>
              </div>
              <div class="o-sis-col o-sis-col--half">
                <a
                  href="https://groceries.morrisons.com/browse/178793/178798"
                  class="c-sis-box"
                >
                  <span class="c-sis-box-cover">
                    <img
                      class="c-sis-box-cover-image"
                      src="@/assets/images/christmas-2019--homepage-mince_pies.jpg"
                      alt="Mince Pies and Cakes"
                    />
                  </span>
                  <span class="c-sis-box-label">Mince Pies &amp; Cakes</span>
                </a>
              </div>
              <div class="o-sis-col o-sis-col--full">
                <a
                  href="https://groceries.morrisons.com/webshop/recipeSearch.do?categories=32621,58279"
                  class="c-sis-box"
                >
                  <span class="c-sis-box-cover">
                    <img
                      class="c-sis-box-cover-image"
                      src="@/assets/images/christmas-2019--homepage-recipes.jpg"
                      alt="Christmas Recipes"
                    />
                  </span>
                  <span class="c-sis-box-label">Christmas Recipes</span>
                </a>
              </div>
            </div>
          </div>
          <div class="o-sis-col o-sis-col--half o-sis-col--noBottomPadding">
            <div class="o-sis-row">
              <div class="o-sis-col o-sis-col--half">
                <a
                  href="https://groceries.morrisons.com/browse/178793/178795"
                  class="c-sis-box"
                >
                  <span class="c-sis-box-cover">
                    <img
                      class="c-sis-box-cover-image"
                      src="@/assets/images/christmas-2019--homepage-party_food.jpg"
                      alt="Party Food"
                    />
                  </span>
                  <span class="c-sis-box-label">Party Food</span>
                </a>
              </div>
              <div class="o-sis-col o-sis-col--half">
                <a
                  href="https://groceries.morrisons.com/browse/178793/178796"
                  class="c-sis-box"
                >
                  <span class="c-sis-box-cover">
                    <img
                      class="c-sis-box-cover-image"
                      src="@/assets/images/christmas-2019--homepage-gift_ideas.jpg"
                      alt="Early Bird Gift Ideas"
                    />
                  </span>
                  <span class="c-sis-box-label">Early Bird Gift Ideas</span>
                </a>
              </div>
              <div class="o-sis-col o-sis-col--full">
                <a
                  href="https://groceries.morrisons.com/browse/178793/178799"
                  class="c-sis-box"
                >
                  <span class="c-sis-box-cover">
                    <img
                      class="c-sis-box-cover-image"
                      src="@/assets/images/christmas-2019--homepage-decorations.jpg"
                      alt="Decorations Cards and Wrap Accessories"
                    />
                  </span>
                  <span class="c-sis-box-label"
                    >Decorations, Cards &amp; Wrap Accessories</span
                  >
                </a>
              </div>
              <div class="o-sis-col o-sis-col--full">
                <a
                  href="https://groceries.morrisons.com/content/your-morrisons-christmas-delivery-42559"
                  class="c-sis-box"
                >
                  <span class="c-sis-box-cover">
                    <img
                      class="c-sis-box-cover-image"
                      src="@/assets/images/christmas-2019--homepage-deliveries.jpg"
                      alt="Christmas Delivery"
                    />
                  </span>
                  <span class="c-sis-box-label">Christmas Deliveries</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import menu from '@/menu.json'

export default {
  name: 'Home',
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
      if (this.realLinks) {
        return item.link
      }
      return process.env.NODE_ENV === 'production'
        ? '/' + item.path
        : '#/' + item.path
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
<style>
span.c-sis-helper {
  padding: 10px 20px 14px 20px;
  border-radius: 0 0 10px 0;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #004e37;
  min-width: 140px;
  color: #ffffff;
  z-index: 10;
  cursor: pointer;
  text-align: left;
  display: block;
}
span.c-sis-helper__hover {
  background-color: #00893f;
}
</style>
