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
          <q-breadcrumbs-el label="Posts" to="/admin/posts" />
          <q-breadcrumbs-el label="Edit" />
        </q-breadcrumbs>
      </div>
      <div class="q-pa-md q-gutter-y-md">
        <q-card class="q-pa-md q-gutter-y-md">
          <q-img :ratio="16/9" :src="'/storage/' + image" placeholder-src="/statics/photo2.png"/>
          <q-form
            @submit="update"
            ref="form"
            class="q-gutter-y-md"
          >
            <q-uploader
              :disable="loading"
              extensions=".jpg,.jpeg,.png"
              accept=".jpg, .jpeg, .pdf, image/jpeg, .png"
              :max-file-size="3048576"
              :max-total-size="10248576"
              @added="addFile"
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
                    <div class="q-uploader__title">Photo</div>
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
            <q-select
              filled
              :disable="loading"
              v-model="category"
              label="Categories"
              :options="options_categories"
              lazy-rules
              :rules="[val => !!val || $t('required_fields')]"
              color="teal"
            />
            <q-select
              filled
              :disable="loading"
              v-model="tags"
              label="Tags"
              :options="options_tags"
              lazy-rules
              color="teal"
              multiple
              use-chips
            />
            <q-tabs
              v-model="tab"
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
            <q-tab-panels v-model="tab" animated>
              <q-tab-panel name="lang-en" class="p-0">
                <q-input
                  color="teal"
                  filled
                  label="Title"
                  v-model.lazy.trim="posts.title_en"
                  type="text"
                  clearable
                  lazy-rules
                  :disable="loading"
                  :rules="[val => !!val || '* Fields should be filled obligatory!']"
                />
                <div class="text-subtitle1 text-grey-8 mt-3">Description</div>
                <vue-editor
                  :customModules="customModulesForEditor"
                  :editorOptions="editorSettings"
                  v-model="posts.description_en"
                />
                <div class="text-subtitle1 text-grey-8 mt-3">Content</div>
                <vue-editor
                  :customModules="customModulesForEditor"
                  :editorOptions="editorSettings"
                  v-model="posts.content_en"
                />
              </q-tab-panel>
              <q-tab-panel name="lang-ru" class="p-0">
                <q-input
                  color="teal"
                  filled
                  label="Название"
                  v-model.lazy.trim="posts.title_ru"
                  type="text"
                  clearable
                  lazy-rules
                  :disable="loading"
                  :rules="[val => !!val || '* Поля - обязательны для заполнения!']"
                />
                <div class="text-subtitle1 text-grey-8 mt-3">Описание</div>
                <vue-editor
                  :customModules="customModulesForEditor"
                  :editorOptions="editorSettings"
                  v-model="posts.description_ru"
                />
                <div class="text-subtitle1 text-grey-8 mt-3">Контент</div>
                <vue-editor
                  :customModules="customModulesForEditor"
                  :editorOptions="editorSettings"
                  v-model="posts.content_ru"
                />
              </q-tab-panel>
              <q-tab-panel name="lang-uz" class="p-0">
                <q-input
                  color="teal"
                  filled
                  label="Nomi"
                  v-model.lazy.trim="posts.title_uz"
                  type="text"
                  clearable
                  lazy-rules
                  :disable="loading"
                  :rules="[val => !!val || '* Maydonlar - to\'ldirilishi shart!']"
                />
                <div class="text-subtitle1 text-grey-8 mt-3">Ta'rifi</div>
                <vue-editor
                  :customModules="customModulesForEditor"
                  :editorOptions="editorSettings"
                  v-model="posts.description_uz"
                />
                <div class="text-subtitle1 text-grey-8 mt-3">Kontent</div>
                <vue-editor
                  :customModules="customModulesForEditor"
                  :editorOptions="editorSettings"
                  v-model="posts.content_uz"
                />
              </q-tab-panel>
            </q-tab-panels>
            <q-checkbox v-model="posts.is_featured" label="Recommend" color="teal" />
            <br>
            <q-checkbox v-model="posts.status" label="Draft" color="teal" />
            <br>
            <q-btn color="teal mr-3" type="submit" :loading="loading" :disable="loading">Update</q-btn>
            <q-btn :disable="loading" to="/admin/posts">Cancel</q-btn>
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
  name: 'CategoryEdit',
  data () {
    return {
      post_id: null,
      uploader_color: 'secondary',
      tab: 'lang-en',
      loading: false,
      category: [],
      tags: [],
      image: '',
      posts: {
        image: null,
        category_id: null,
        is_featured: false,
        status: false,
        title_en: null,
        title_ru: null,
        title_uz: null,
        content_en: null,
        content_ru: null,
        content_uz: null,
        description_en: null,
        description_ru: null,
        description_uz: null
      },
      options_categories: [],
      options_tags: [],
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
    this.post_id = this.$route.params.id
    this.$axios.get('edit_post/' + this.post_id).then(response => {
      let res = response.data
      this.category = { label: res['category_' + this.$t('prefix')], value: res.category_id }
      if (res.tags) {
        res.tags[this.$t('prefix')].map((el, i) => {
          this.tags.push({ label: el['title_' + this.$t('prefix')], value: el.id })
        })
      }
      res.categories_all.map((el, i) => {
        this.options_categories.push({ label: el['title_' + this.$t('prefix')], value: el.id })
      })
      res.tags_all.map((el, i) => {
        this.options_tags.push({ label: el['title_' + this.$t('prefix')], value: el.id })
      })
      //
      this.posts.id = res.id
      this.posts.category_id = res.category_id
      this.posts.title_en = res.title_en
      this.posts.title_ru = res.title_ru
      this.posts.title_uz = res.title_uz
      this.posts.description_en = res.description_en
      this.posts.description_ru = res.description_ru
      this.posts.description_uz = res.description_uz
      this.posts.content_en = res.content_en
      this.posts.content_ru = res.content_ru
      this.posts.content_uz = res.content_uz
      this.posts.is_featured = !!+res.is_featured
      this.posts.status = !!+res.status
      this.image = res.image
    })
  },
  mounted () {
  },
  methods: {
    update () {
      this.posts.category_id = this.category.value
      this.loading = true
      let formData = new FormData()
      formData.append('image', this.$refs.uploader.files[0])
      Object.keys(this.posts).forEach(key => { formData.append(key, this.posts[key]) })
      this.tags.map((el, i) => { formData.append('tags[]', el.value) })
      this.$axios.post('update_post', formData).then(() => {
        this.$q.notify({
          color: 'teal',
          icon: 'check_circle',
          message: 'Event created',
          position: 'top',
          timeout: 200
        })
        this.$router.push('/admin/posts')
      }).finally(() => { this.loading = false })
    },
    addFile () {
      this.uploader_color = 'secondary'
    }
  }
}
</script>

<style lang="stylus">
</style>
