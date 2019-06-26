<template>
  <q-scroll-area
    :thumb-style="getThumbStyle"
    style="height: calc(100vh - 56px)"
  >
    <q-page class="about__us">
      <div class="wrap">
        <div class="row">
          <div class="col-12 q-pa-md" v-html="aboutUs[this.$t('prefix')]"></div>
        </div>
      </div>
    </q-page>
  </q-scroll-area>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

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
      aboutUs: {}
    }
  },
  computed: {
    ...mapGetters([
      'getThumbStyle',
      'mobileDetect'
    ])
  },
  beforeMount () {
    this.$axios.get('get_about_us').then(res => {
      let [aboutUs] = res.data
      this.aboutUs = aboutUs
      this.setWidthImages()
    })
  },
  mounted () {
  },
  methods: {
    ...mapActions([
      'setWidthImages'
    ])
  }
}
</script>

<style lang="stylus" scoped>
</style>
