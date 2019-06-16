<template>
  <q-scroll-area
    :thumb-style="getThumbStyle"
    style="height: calc(100vh - 56px)"
  >
    <q-page class="admin__titles">
      <div class="q-pa-md">
        <q-breadcrumbs>
          <q-breadcrumbs-el icon="home" label="Home" to="/" />
          <q-breadcrumbs-el label="Dashboard" to="/admin" />
          <q-breadcrumbs-el label="Title" />
        </q-breadcrumbs>
      </div>
      <div class="q-pa-md">
        <q-btn color="secondary" @click="save">save</q-btn>
        <q-separator class="my-3"/>
        <h5 class="m-0">Logo title</h5>
        <q-tabs
          v-model="logo.titleTab"
          dense
          class="text-grey"
          active-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="lang-en" label="En" />
          <q-tab name="lang-ru" label="Ru" />
          <q-tab name="lang-uz" label="Uz" />
        </q-tabs>
        <q-separator class="mt-2" />
        <q-tab-panels v-model="logo.titleTab" animated>
          <q-tab-panel name="lang-en" class="px-0">
            <q-input v-model="logo.title.en" placeholder="title" filled clearable type="" />
          </q-tab-panel>
          <q-tab-panel name="lang-ru" class="px-0">
            <q-input v-model="logo.title.ru" placeholder="название" filled clearable type="" />
          </q-tab-panel>
          <q-tab-panel name="lang-uz" class="px-0">
            <q-input v-model="logo.title.uz" placeholder="номи" filled clearable type="" />
          </q-tab-panel>
        </q-tab-panels>
        <h5 class="m-0">Logo image</h5>
        <div class="image" :style="logo.image"></div>
        <q-uploader
          extensions=".jpg,.jpeg,.png"
          accept=".jpg, .jpeg, .png, image/jpeg"
          color="teal"
          flat
          bordered
          ref="uploader"
          :max-file-size="54857"
        >
          <template v-slot:header="scope">
            <div class="row no-wrap items-center q-pa-sm q-gutter-xs">
              <q-btn v-if="scope.queuedFiles.length > 0" icon="delete_sweep" @click="scope.removeQueuedFiles" round dense flat >
                <q-tooltip>Удалить</q-tooltip>
              </q-btn>
              <q-btn v-if="scope.uploadedFiles.length > 0" icon="done_all" @click="scope.removeUploadedFiles" round dense flat >
                <q-tooltip>Remove Uploaded Files</q-tooltip>
              </q-btn>
              <q-spinner v-if="scope.isUploading" class="q-uploader__spinner" />
              <div class="col">
                <div class="q-uploader__subtitle">{{ scope.uploadSizeLabel }}</div>
              </div>
              <q-btn v-if="scope.canAddFiles" type="a" icon="add_box" round dense flat>
                <q-uploader-add-trigger />
                <q-tooltip>Загрузить logo</q-tooltip>
              </q-btn>
              <q-btn v-if="scope.isUploading" icon="clear" @click="scope.abort" round dense flat >
                <q-tooltip>Abort Upload</q-tooltip>
              </q-btn>
            </div>
          </template>
        </q-uploader>
      </div>
    </q-page>
  </q-scroll-area>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Titles',
  data () {
    return {
      logo: {
        new_image: '',
        image: '',
        titleTab: 'lang-en',
        title: {
          en: '',
          ru: '',
          uz: ''
        }
      }
    }
  },
  computed: {
    ...mapGetters([
      'mobileDetect',
      'getThumbStyle'
    ])
  },
  mounted () {
    this.$axios.post('get_titles')
      .then(response => {
        let res = response.data.logo
        let image = res.bgimage
        if (image) this.logo.image = image
        if (res.en) this.logo.title.en = res.en
        if (res.ru) this.logo.title.ru = res.ru
        if (res.uz) this.logo.title.uz = res.uz
      })
  },
  methods: {
    save () {
      let elemImage = this.$(this.$refs.uploader.$el).find('.q-uploader__file')[0]
      let image = ''
      if (elemImage) {
        image = elemImage.style.cssText
        this.logo.new_image = image
      }
      this.$axios.post('titles_store', this.logo)
        .then(() => {
          if (image) this.logo.image = image
          this.$refs.uploader.reset()
          this.$q.notify({
            color: 'teal',
            icon: 'check_circle',
            message: 'Success',
            position: 'top',
            timeout: 200
          })
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .admin__titles
    .image
      overflow: hidden
      margin: 5px 0
      width: 100px
      height: 60px
      background-size: cover
      background-repeat: no-repeat
      border-radius: 3px
</style>
