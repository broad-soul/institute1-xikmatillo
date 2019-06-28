<template>
  <q-scroll-area
    :thumb-style="getThumbStyle"
    style="height: calc(100vh - 56px)"
  >
    <q-page class="extraClasses__show__page">
      <div class="row q-pa-md q-col-gutter-md justify-center">
        <div class="col-11">
          <q-img placeholder-src="/statics/photo2.png" :ratio="16/9" :src="'/storage/' + extraClasses.image"></q-img>
        </div>
        <div class="col-11 py-5">
          <h3>{{extraClasses['title_' + $t('prefix')]}}</h3>
          <div class="content" v-html="extraClasses['content_' + $t('prefix')]"></div>
        </div>
      </div>
      <footer>footer</footer>
    </q-page>
  </q-scroll-area>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'ExtraClassesShow',
  meta: {
    titleTemplate: title => `${title} - Event`,
    meta: {
      description: { name: 'description', content: 'Event Page 1' },
      keywords: { name: 'keywords', content: 'Event website' }
    }
  },
  data () {
    return {
      extraClasses: []
    }
  },
  computed: {
    ...mapGetters([
      'getThumbStyle',
      'mobileDetect'
    ])
  },
  beforeMount () {
    this.extraClasses_id = this.$route.params.id
    this.$axios.get('extra-classes/show/' + this.extraClasses_id).then(res => {
      this.extraClasses = res.data
      this.setWidthImages()
    })
  },
  methods: {
    ...mapActions([
      'setWidthImages'
    ])
  }
}
</script>

<style lang="stylus">
  .extraClasses__show__page
    display: flex
    flex-direction: column
    footer
      margin-top: auto
      padding: 20px
      background-color: #ccc
</style>
