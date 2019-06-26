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
          <q-breadcrumbs-el label="Main" />
        </q-breadcrumbs>
      </div>
      <div class="q-pa-md q-gutter-y-md">
        <q-btn color="secondary" @click="saveMain">save</q-btn>
        <q-card class="q-pa-md q-gutter-y-md">
          <q-tabs
            v-model="aboutUsTab"
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
          <q-tab-panels v-model="aboutUsTab" animated>
            <q-tab-panel name="lang-en" class="p-0">
              <vue-editor
                :customModules="customModulesForEditor"
                :editorOptions="editorSettings"
                v-model="aboutUsEditor.en"
              />
            </q-tab-panel>
            <q-tab-panel name="lang-ru" class="p-0">
              <vue-editor
                :customModules="customModulesForEditor"
                :editorOptions="editorSettings"
                v-model="aboutUsEditor.ru"
              />
            </q-tab-panel>
            <q-tab-panel name="lang-uz" class="p-0">
              <vue-editor
                :customModules="customModulesForEditor"
                :editorOptions="editorSettings"
                v-model="aboutUsEditor.uz"
              />
            </q-tab-panel>
          </q-tab-panels>
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
      tab: 'about-us',
      aboutUsTab: 'lang-en',
      aboutUsEditor: {
        visible: true,
        bgimage: null,
        en: '',
        ru: '',
        uz: ''
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
    this.$axios.get('get_about_us').then(res => {
      console.log(res.data)
      let [aboutUs] = res.data
      this.aboutUsEditor.en = aboutUs.en
      this.aboutUsEditor.ru = aboutUs.ru
      this.aboutUsEditor.uz = aboutUs.uz
      this.aboutUsEditor.visible = !!aboutUs.visible
    })
  },
  mounted () {
  },
  methods: {
    saveMain () {
      this.$axios.post('about_us_create', this.aboutUsEditor).then(() => {
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

<style lang="stylus">
</style>
