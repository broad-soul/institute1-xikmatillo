<template>
  <q-scroll-area
    :thumb-style="getThumbStyle"
    style="height: calc(100vh - 56px)"
  >
    <q-page class="regulations__show__page">
      <div class="row q-pa-md q-col-gutter-md justify-center">
        <div class="col-11">
          <q-img placeholder-src="/statics/photo2.png" :ratio="16/9" :src="'/storage/' + regulations.image"></q-img>
        </div>
        <div class="col-11 py-5">
          <h3>{{regulations['title_' + $t('prefix')]}}</h3>
          <div class="content" v-html="regulations['content_' + $t('prefix')]"></div>
        </div>
      </div>
      <footer>footer</footer>
    </q-page>
  </q-scroll-area>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'RegulationsShow',
  meta: {
    titleTemplate: title => `${title} - Regulations`,
    meta: {
      description: { name: 'description', content: 'Regulations Page 1' },
      keywords: { name: 'keywords', content: 'Regulations website' }
    }
  },
  data () {
    return {
      regulations: []
    }
  },
  computed: {
    ...mapGetters([
      'getThumbStyle',
      'mobileDetect'
    ])
  },
  beforeMount () {
    this.regulations_id = this.$route.params.id
    this.$axios.get('regulations/show/' + this.regulations_id).then(res => {
      this.regulations = res.data
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
  .regulations__show__page
    display: flex
    flex-direction: column
    footer
      margin-top: auto
      padding: 20px
      background-color: #ccc
</style>
