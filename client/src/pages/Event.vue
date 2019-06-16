<template>
  <q-scroll-area
    :thumb-style="getThumbStyle"
    style="height: calc(100vh - 56px)"
  >
    <q-page class="">
      <div class="row">
        <div class="col-12">
          Event
        </div>
      </div>
    </q-page>
  </q-scroll-area>
</template>

<script>
import { mapGetters } from 'vuex'

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
