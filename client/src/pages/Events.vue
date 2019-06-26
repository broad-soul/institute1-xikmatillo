<template>
  <q-scroll-area
    :thumb-style="getThumbStyle"
    style="height: calc(100vh - 56px)"
  >
    <q-page class="event__page">
      <div class="event__page-header">
        <div class="wrap">
          <h3 class="mb-2 mt-0">Event</h3>
          <i>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium adipisci aut cumque debitis, distinctio ea earum eius ex inventore.</i>
        </div>
      </div>
      <div class="row">
        <div class="col-12 col-lg-10 m-auto">
          <div class="row q-pa-md q-col-gutter-md" v-for="event in events" :key="event.id">
            <div class="col-md-4 col-sm-6 col-12">
              <q-img @click="$router.push('/event/show/' + event.id)" placeholder-src="/statics/photo2.png" contain :ratio="16/11" position="top" :src="'/storage/' + event.image" class="cursor-pointer"></q-img>
            </div>
            <div class="col-md-8 col-sm-6 col-12">
              <div class="content" v-html="event['description_' + $t('prefix')]"></div>
              <q-btn :to="'/event/show/' + event.id" flat label="Show more"/>
            </div>
            <div class="col-12">
              <hr>
              <q-space />
            </div>
          </div>
        </div>
      </div>
      <footer>footer</footer>
    </q-page>
  </q-scroll-area>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Events',
  meta: {
    titleTemplate: title => `${title} - Event`,
    meta: {
      description: { name: 'description', content: 'Event Page 1' },
      keywords: { name: 'keywords', content: 'Event website' }
    }
  },
  data () {
    return {
      events: []
    }
  },
  computed: {
    ...mapGetters([
      'getThumbStyle',
      'mobileDetect'
    ])
  },
  beforeMount () {
    this.$axios.get('get_events').then(res => {
      this.events = res.data
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
  .event__page
    display: flex
    flex-direction: column
    &-header
      background: url(../statics/bg.jpg)
      color: #fff
      height: 250px
      display: flex
      align-items: center
      margin-bottom: 50px
    footer
      margin-top: auto
      padding: 20px
      background-color: #ccc
    .content
      h4
        margin-top: 0
        margin-bottom: 20px
</style>
