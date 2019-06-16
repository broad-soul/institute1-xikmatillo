<template>
  <q-scroll-area
    :thumb-style="getThumbStyle"
    style="height: calc(100vh - 56px)"
  >
    <q-page class="">
      <div class="row">
        <div class="col-12">
          Blog
        </div>
      </div>
    </q-page>
  </q-scroll-area>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Blog',
  meta: {
    titleTemplate: title => `${title} - Blog`,
    meta: {
      description: { name: 'description', content: 'Blog Page 1' },
      keywords: { name: 'keywords', content: 'Blog website' }
    }
  },
  data () {
    return {
      slide: 1
    }
  },
  computed: {
    ...mapGetters([
      'getThumbStyle',
      'mobileDetect'
    ])
  }
}
</script>

<style lang="stylus" scoped>
</style>
