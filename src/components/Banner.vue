<template>
   <img class="c-sis-subpageBanner__bg" :src="imageSrc">
</template>

<script>
export default {
  name: 'Banner',
  props: {
    data: Object,
    image: String
  },
  computed: {
    imageSrc () {
      return 'assets/images/' + this.image
    }
  }
}
</script>
