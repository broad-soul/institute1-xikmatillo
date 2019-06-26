<template>
  <q-scroll-area
    :thumb-style="getThumbStyle"
    style="height: calc(100vh - 56px)"
  >
    <q-page class="admin__main">
      <div class="q-pa-md">
         <q-breadcrumbs  active-color="teal">
          <q-breadcrumbs-el icon="home" label="Home" to="/" />
          <q-breadcrumbs-el label="Dashboard" to="/admin" />
          <q-breadcrumbs-el label="Events" to="/admin/partner" />
          <q-breadcrumbs-el label="Edit" />
        </q-breadcrumbs>
      </div>
      <div class="q-pa-md q-gutter-y-md">
        <q-card class="q-pa-md q-gutter-y-md">
          <q-img style="width: 300px;" placeholder-src="/statics/avatar04.png" :ratio="1" :src="'/storage/' + image"></q-img>
          <q-form
            @submit="updateEvent"
            ref="form"
            class="q-gutter-y-md"
          >
            <q-uploader
              :disable="loading"
              extensions=".jpg,.jpeg,.png"
              accept=".jpg, .jpeg, .pdf, image/jpeg, .png"
              :max-file-size="3048576"
              :max-total-size="10248576"
              :color="uploader_color"
              ref="uploader"
              style="width: 100%;"
            >
              <template v-slot:header="scope">
                <div class="row no-wrap items-center q-pa-sm q-gutter-xs">
                  <q-btn v-if="scope.uploadedFiles.length > 0" icon="done_all" @click="scope.removeUploadedFiles" round dense flat >
                    <q-tooltip>Remove Uploaded Files</q-tooltip>
                  </q-btn>
                  <q-spinner v-if="scope.isUploading" class="q-uploader__spinner" />
                  <div class="col">
                    <div class="q-uploader__title">Image</div>
                    <div class="q-uploader__subtitle">{{ scope.uploadSizeLabel }}</div>
                  </div>
                  <q-btn v-if="scope.canAddFiles" type="a" icon="add_box" round dense flat>
                    <q-uploader-add-trigger />
                    <q-tooltip>{{$t('attach_documents')}}</q-tooltip>
                  </q-btn>
                  <q-btn v-if="scope.isUploading" icon="clear" @click="scope.abort" round dense flat >
                    <q-tooltip>Abort Upload</q-tooltip>
                  </q-btn>
                </div>
              </template>
              <template v-slot:list="scope">
                <q-list separator>
                  <q-item v-for="file in scope.files" :key="file.name">
                    <q-item-section>
                      <q-item-label class="full-width ellipsis">
                        {{ file.name }}
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
            <q-tabs
              v-model="partnerTab"
              dense
              class="text-grey"
              active-color="teal"
              align="justify"
              narrow-indicator
            >
              <q-tab name="lang-en" label="En" />
              <q-tab name="lang-ru" label="Ru" />
              <q-tab name="lang-uz" label="Uz" />
            </q-tabs>
            <q-separator />
            <q-tab-panels v-model="partnerTab" animated>
              <q-tab-panel name="lang-en" class="p-0">
                <q-input
                  color="teal"
                  filled
                  label="Title"
                  v-model.lazy.trim="partner.title_en"
                  type="text"
                  clearable
                  lazy-rules
                  :disable="loading"
                />
                <div class="text-subtitle1 text-grey-8 mt-3">Description</div>
                <vue-editor
                  :customModules="customModulesForEditor"
                  :editorOptions="editorSettings"
                  v-model="partner.description_en"
                />
                <div class="text-subtitle1 text-grey-8 mt-3">Content</div>
                <vue-editor
                  :customModules="customModulesForEditor"
                  :editorOptions="editorSettings"
                  v-model="partner.content_en"
                />
              </q-tab-panel>
              <q-tab-panel name="lang-ru" class="p-0">
                <q-input
                  color="teal"
                  filled
                  label="Название"
                  v-model.lazy.trim="partner.title_ru"
                  type="text"
                  clearable
                  lazy-rules
                  :disable="loading"
                />
                <div class="text-subtitle1 text-grey-8 mt-3">Описание</div>
                <vue-editor
                  :customModules="customModulesForEditor"
                  :editorOptions="editorSettings"
                  v-model="partner.description_ru"
                />
                <div class="text-subtitle1 text-grey-8 mt-3">Контент</div>
                <vue-editor
                  :customModules="customModulesForEditor"
                  :editorOptions="editorSettings"
                  v-model="partner.content_ru"
                />
              </q-tab-panel>
              <q-tab-panel name="lang-uz" class="p-0">
                <q-input
                  color="teal"
                  filled
                  label="Nomi"
                  v-model.lazy.trim="partner.title_uz"
                  type="text"
                  clearable
                  lazy-rules
                  :disable="loading"
                />
                <div class="text-subtitle1 text-grey-8 mt-3">Ta'rifi</div>
                <vue-editor
                  :customModules="customModulesForEditor"
                  :editorOptions="editorSettings"
                  v-model="partner.description_uz"
                />
                <div class="text-subtitle1 text-grey-8 mt-3">Kontent</div>
                <vue-editor
                  :customModules="customModulesForEditor"
                  :editorOptions="editorSettings"
                  v-model="partner.content_uz"
                />
              </q-tab-panel>
            </q-tab-panels>
            <q-btn color="teal mr-3" type="submit" :loading="loading" :disable="loading">Update</q-btn>
            <q-btn :disable="loading" to="/admin/partner">Cancel</q-btn>
          </q-form>
        </q-card>
      </div>
    </q-page>
  </q-scroll-area>
</template>

<script>
import { mapGetters } from 'vuex'
import { VueEditor } from 'vue2-editor'
import { ImageDrop } from 'quill-image-drop-module'
import ImageResize from 'quill-image-resize-module'

export default {
  name: 'ExtraClassesEditAdmin',
  data () {
    return {
      partnerTab: 'lang-en',
      loading: false,
      uploader_color: 'teal',
      image: '',
      partner: {
        title_en: '',
        title_ru: '',
        title_uz: '',
        description_en: '',
        description_ru: '',
        description_uz: '',
        content_en: '',
        content_ru: '',
        content_uz: ''
      },
      customModulesForEditor: [
        { alias: 'imageDrop', module: ImageDrop },
        { alias: 'imageResize', module: ImageResize }
      ],
      editorSettings: {
        modules: {
          imageDrop: true,
          imageResize: true
        }
      }
    }
  },
  components: {
    VueEditor
  },
  computed: {
    ...mapGetters([
      'mobileDetect',
      'getThumbStyle'
    ])
  },
  watch: {
  },
  beforeMount () {
    this.partner_id = this.$route.params.id
    this.$axios.get('partners/show/' + this.partner_id).then(res => {
      let partner = res.data
      this.image = partner.image
      this.partner.id = this.partner_id
      this.partner.title_en = partner.title_en
      this.partner.title_ru = partner.title_ru
      this.partner.title_uz = partner.title_uz
      this.partner.description_en = partner.description_en
      this.partner.description_ru = partner.description_ru
      this.partner.description_uz = partner.description_uz
      this.partner.content_en = partner.content_en
      this.partner.content_ru = partner.content_ru
      this.partner.content_uz = partner.content_uz
    })
  },
  mounted () {
  },
  methods: {
    updateEvent () {
      let error = false
      for (let [, value] of Object.entries(this.partner)) {
        if (!value) error = true
      }
      if (error) {
        this.$q.notify({
          color: 'negative',
          icon: 'error',
          message: 'Заполни все поля!',
          position: 'top',
          timeout: 200
        })
        return
      }
      this.loading = false
      let formData = new FormData()
      let file = this.$refs['uploader'].files[0]
      formData.append('image', file)
      Object.keys(this.partner).forEach(key => { formData.append(key, this.partner[key]) })
      this.$axios.post('update_partner', formData).then(() => {
        this.$q.notify({
          color: 'teal',
          icon: 'check_circle',
          message: 'Event updated',
          position: 'top',
          timeout: 200
        })
        this.$router.push('/admin/partners')
      }).finally(() => { this.loading = false })
    }
  }
}
</script>

<style lang="stylus">
</style>
