<template>
  <q-scroll-area
    :thumb-style="getThumbStyle"
    style="height: calc(100vh - 56px)"
  >
    <q-page class="">
      <div class="row">
        <div class="col-12">
          About us
        </div>
      </div>
    </q-page>
  </q-scroll-area>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AboutUs',
  meta: {
    titleTemplate: title => `${title} - About Us`,
    meta: {
      description: { name: 'description', content: 'About Us Page 1' },
      keywords: { name: 'keywords', content: 'About Us website' }
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
