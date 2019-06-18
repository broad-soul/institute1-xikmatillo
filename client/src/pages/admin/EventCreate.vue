<template>
  <q-scroll-area
    :thumb-style="getThumbStyle"
    style="height: calc(100vh - 56px)"
  >
    <q-page class="admin__main">
      <div class="q-pa-md">
        <q-breadcrumbs>
          <q-breadcrumbs-el icon="home" label="Home" to="/" />
          <q-breadcrumbs-el label="Dashboard" to="/admin" />
          <q-breadcrumbs-el label="Events" to="/admin/event" />
          <q-breadcrumbs-el label="Create" />
        </q-breadcrumbs>
      </div>
      <div class="q-pa-md q-gutter-y-md">
        <q-card>
          <q-tabs
            v-model="eventTab"
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
          <q-separator />
          <q-tab-panels v-model="eventTab" animated>
            <q-tab-panel name="lang-en" class="p-0">
              <vue-editor
                :customModules="customModulesForEditor"
                :editorOptions="editorSettings"
                v-model="eventEditor.content_en"
              />
            </q-tab-panel>
            <q-tab-panel name="lang-ru" class="p-0">
              <vue-editor
                :customModules="customModulesForEditor"
                :editorOptions="editorSettings"
                v-model="eventEditor.content_ru"
              />
            </q-tab-panel>
            <q-tab-panel name="lang-uz" class="p-0">
              <vue-editor
                :customModules="customModulesForEditor"
                :editorOptions="editorSettings"
                v-model="eventEditor.content_uz"
              />
            </q-tab-panel>
          </q-tab-panels>
          <div class="p-3">
            <q-btn color="teal mr-3" @click="createEvent" :loading="loading" :disable="loading">Create</q-btn>
            <q-btn to="/admin/event">Cancel</q-btn>
          </div>
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
  name: 'AboutUs',
  data () {
    return {
      eventTab: 'lang-en',
      loading: false,
      eventEditor: {
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
  },
  mounted () {
  },
  methods: {
    createEvent () {
      let error = false
      for (let [, value] of Object.entries(this.eventEditor)) {
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
      this.loading = true
      this.$axios.post('event_store', this.eventEditor).then(() => {
        this.$q.notify({
          color: 'teal',
          icon: 'check_circle',
          message: 'Event created',
          position: 'top',
          timeout: 200
        })
        setTimeout(() => {
          this.$router.push('/admin/event')
        }, 300)
      }).finally(() => { this.loading = true })
    }
  }
}
</script>

<style lang="stylus">
</style>
