<template>
  <q-scroll-area
    :thumb-style="getThumbStyle"
    style="height: calc(100vh - 56px)"
  >
    <q-page class="q-pa-sm">
      <h4 class="text-center my-3">Gallery</h4>
      <div class="row">
        <div class="col-12 col-sm-6 col-md-4 col-lg-3 q-pa-xs" v-for="item in this.images" :key="item.id">
          <q-img
            spinner-color="teal"
            transition="fade"
            :ratio="4/3"
            :src="getPath(item)"
          >
            <template v-slot:error>
              <div class="absolute-full flex flex-center bg-cyan text-white">
                Cannot load image
              </div>
            </template>
          </q-img>
        </div>
      </div>
    </q-page>
  </q-scroll-area>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Gallery',
  meta: {
    titleTemplate: title => `${title} - Gallery`,
    meta: {
      description: { name: 'description', content: 'Gallery Page 1' },
      keywords: { name: 'keywords', content: 'Gallery website' }
    }
  },
  data () {
    return {
      images: []
    }
  },
  computed: {
    ...mapGetters([
      'getThumbStyle',
      'mobileDetect'
    ])
  },
  beforeMount () {
    this.getImages()
  },
  mounted () {
  },
  methods: {
    getPath (file) {
      return '/storage/' + file.name
    },
    getImages () {
      this.$axios.get('get_image_gallery').then(res => {
        this.images = res.data
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
