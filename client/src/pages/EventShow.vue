<template>
  <q-scroll-area
    :thumb-style="getThumbStyle"
    style="height: calc(100vh - 56px)"
  >
    <q-page class="event__show__page">
      <div class="row q-pa-md q-col-gutter-md justify-center">
        <div class="col-11">
          <q-img placeholder-src="/statics/photo2.png" :ratio="16/9" :src="'/storage/' + event.image"></q-img>
        </div>
        <div class="col-11 py-5">
          <h3>{{event['title_' + $t('prefix')]}}</h3>
          <div class="content" v-html="event['content_' + $t('prefix')]"></div>
        </div>
      </div>
      <footer>footer</footer>
    </q-page>
  </q-scroll-area>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Event',
  meta: {
    titleTemplate: title => `${title} - Event`,
    meta: {
      description: { name: 'description', content: 'Event Page 1' },
      keywords: { name: 'keywords', content: 'Event website' }
    }
  },
  data () {
    return {
      event: []
    }
  },
  computed: {
    ...mapGetters([
      'getThumbStyle',
      'mobileDetect'
    ])
  },
  beforeMount () {
    this.event_id = this.$route.params.id
    this.$axios.get('get_event/' + this.event_id).then(res => {
      this.event = res.data
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
  .event__show__page
    display: flex
    flex-direction: column
    footer
      margin-top: auto
      padding: 20px
      background-color: #ccc
</style>
