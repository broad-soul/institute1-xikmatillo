<template>
  <q-scroll-area
    :thumb-style="getThumbStyle"
    style="height: calc(100vh - 56px)"
  >
    <q-page class="">
      <div class="q-pa-md">
        <q-breadcrumbs>
          <q-breadcrumbs-el icon="home" label="Home" to="/" />
          <q-breadcrumbs-el label="Dashboard" to="/admin" />
          <q-breadcrumbs-el label="Gallery" />
        </q-breadcrumbs>
      </div>
      <div class="q-pa-md q-gutter-y-md">
        <div class="row">
          <div class="col-12 col-md-7 col-lg-5">
            <q-uploader
              :disable="loading"
              extensions=".jpg,.jpeg,.png"
              accept=".jpg, .jpeg, .pdf, image/jpeg, .png"
              url="/api/new_image_gallery"
              :headers="[{name: 'Authorization', value: 'Bearer ' + getToken}]"
              label="Max file size (0.5 Mb)"
              multiple
              :max-file-size="500048"
              class="mb-3 uploader_image_gallery"
              ref="uploader_image_gallery"
              style="width: 100%"
              @uploaded="getImages"
            >
              <template v-slot:list="scope">
                <q-list separator>
                  <q-item v-for="file in scope.files" :key="file.name">
                    <q-item-section>
                      <q-item-label class="full-width ellipsis">
                        {{ file.name }}
                      </q-item-label>
                      <q-item-label caption>
                        Status:
                        <span
                          class="uploader_status_span"
                          :class="
                      file.__status === 'idle'
                      ? 'uploader_status_idle'
                      : file.__status === 'uploading'
                      ? 'uploader_status_uploading'
                      : file.__status === 'uploaded'
                      ? 'uploader_status_uploaded'
                      : 'uploader_status_failed'"
                        >
                      {{ file.__status }}
                    </span>
                      </q-item-label>
                      <q-item-label caption>
                        {{ file.__sizeLabel }} / {{ file.__progressLabel }}
                      </q-item-label>
                    </q-item-section>
                    <q-item-section
                      v-if="file.__img"
                      thumbnail
                      class="gt-xs"
                    >
                      <img :src="file.__img.src">
                    </q-item-section>
                    <q-item-section top side>
                      <q-btn
                        class="gt-xs"
                        size="12px"
                        flat
                        dense
                        round
                        icon="delete"
                        @click="scope.removeFile(file)"
                      />
                    </q-item-section>
                  </q-item>
                </q-list>
              </template>
            </q-uploader>
          </div>
        </div>
      </div>
      <div class="q-pa-md q-gutter-y-md">
        <h4 class="my-1">All images</h4>
      </div>
      <div class="q-pa-sm">
        <div class="row">
          <div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 q-pa-xs" v-for="item in this.images" :key="item.id">
            <q-img
              spinner-color="teal"
              transition="fade"
              :ratio="4/3"
              :src="getPath(item)"
              @dblclick="deleteImage(item)"
            >
              <template v-slot:error>
                <div class="absolute-full flex flex-center bg-cyan text-white">
                  Cannot load image
                </div>
              </template>
            </q-img>
          </div>
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
      loading: false,
      images: []
    }
  },
  computed: {
    ...mapGetters([
      'getToken',
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
    },
    deleteImage (file) {
      this.$q.dialog({
        title: 'Подтвердите',
        message: 'Вы точно хотите удалить?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$axios.post('delete_image_gallery', { id: file.id, namr: file.name }).then(() => {
          this.$q.notify({
            color: 'teal',
            icon: 'home',
            message: 'Image delited',
            position: 'center',
            timeout: 1500
          })
          this.images.forEach((elem, i) => {
            if (elem.id === file.id) return this.images.splice(i, 1)
          })
        })
      })
    }
  }
}
</script>

<style lang="stylus">
  .uploader_image_gallery
    .uploader_status_span
      font-size: 16px
    .uploader_status_idle
      color: $warning
    .uploader_status_uploading
      color: $primary
    .uploader_status_uploaded
      color: $positive
    .uploader_status_failed
      color: $negative
</style>
