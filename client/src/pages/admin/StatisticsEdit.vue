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
          <q-breadcrumbs-el label="Statistics" to="/admin/statistics" />
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
              v-model="statisticsTab"
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
            <q-tab-panels v-model="statisticsTab" animated>
              <q-tab-panel name="lang-en" class="p-0">
                <q-input
                  color="teal"
                  filled
                  label="Title"
                  v-model.lazy.trim="statistics.title_en"
                  type="text"
                  clearable
                  lazy-rules
                  :disable="loading"
                />
                <div class="text-subtitle1 text-grey-8 mt-3">Description</div>
                <vue-editor
                  :customModules="customModulesForEditor"
                  :editorOptions="editorSettings"
                  v-model="statistics.description_en"
                />
                <div class="text-subtitle1 text-grey-8 mt-3">Content</div>
                <vue-editor
                  :customModules="customModulesForEditor"
                  :editorOptions="editorSettings"
                  v-model="statistics.content_en"
                />
              </q-tab-panel>
              <q-tab-panel name="lang-ru" class="p-0">
                <q-input
                  color="teal"
                  filled
                  label="Название"
                  v-model.lazy.trim="statistics.title_ru"
                  type="text"
                  clearable
                  lazy-rules
                  :disable="loading"
                />
                <div class="text-subtitle1 text-grey-8 mt-3">Описание</div>
                <vue-editor
                  :customModules="customModulesForEditor"
                  :editorOptions="editorSettings"
                  v-model="statistics.description_ru"
                />
                <div class="text-subtitle1 text-grey-8 mt-3">Контент</div>
                <vue-editor
                  :customModules="customModulesForEditor"
                  :editorOptions="editorSettings"
                  v-model="statistics.content_ru"
                />
              </q-tab-panel>
              <q-tab-panel name="lang-uz" class="p-0">
                <q-input
                  color="teal"
                  filled
                  label="Nomi"
                  v-model.lazy.trim="statistics.title_uz"
                  type="text"
                  clearable
                  lazy-rules
                  :disable="loading"
                />
                <div class="text-subtitle1 text-grey-8 mt-3">Ta'rifi</div>
                <vue-editor
                  :customModules="customModulesForEditor"
                  :editorOptions="editorSettings"
                  v-model="statistics.description_uz"
                />
                <div class="text-subtitle1 text-grey-8 mt-3">Kontent</div>
                <vue-editor
                  :customModules="customModulesForEditor"
                  :editorOptions="editorSettings"
                  v-model="statistics.content_uz"
                />
              </q-tab-panel>
            </q-tab-panels>
            <q-btn color="teal mr-3" type="submit" :loading="loading" :disable="loading">Update</q-btn>
            <q-btn :disable="loading" to="/admin/statistics">Cancel</q-btn>
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
  name: 'ContestsEditAdmin',
  data () {
    return {
      statisticsTab: 'lang-en',
      loading: false,
      uploader_color: 'teal',
      image: '',
      statistics: {
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
    this.statistics_id = this.$route.params.id
    this.$axios.get('statistics/show/' + this.statistics_id).then(res => {
      let statistics = res.data
      this.image = statistics.image
      this.statistics.id = this.statistics_id
      this.statistics.title_en = statistics.title_en
      this.statistics.title_ru = statistics.title_ru
      this.statistics.title_uz = statistics.title_uz
      this.statistics.description_en = statistics.description_en
      this.statistics.description_ru = statistics.description_ru
      this.statistics.description_uz = statistics.description_uz
      this.statistics.content_en = statistics.content_en
      this.statistics.content_ru = statistics.content_ru
      this.statistics.content_uz = statistics.content_uz
    })
  },
  mounted () {
  },
  methods: {
    updateEvent () {
      let error = false
      for (let [, value] of Object.entries(this.statistics)) {
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
      Object.keys(this.statistics).forEach(key => { formData.append(key, this.statistics[key]) })
      this.$axios.post('update_statistics', formData).then(() => {
        this.$q.notify({
          color: 'teal',
          icon: 'check_circle',
          message: 'Event updated',
          position: 'top',
          timeout: 200
        })
        this.$router.push('/admin/statistics')
      }).finally(() => { this.loading = false })
    }
  }
}
</script>

<style lang="stylus">
</style>
