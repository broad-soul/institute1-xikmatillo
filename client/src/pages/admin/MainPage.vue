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
          <q-breadcrumbs-el label="Main" />
        </q-breadcrumbs>
      </div>
      <div class="q-pa-md">
        <div class="q-gutter-y-md">
          <div class="row">
            <q-btn color="secondary" @click="saveMain">save</q-btn>
          </div>
          <q-card>
            <q-tabs
              v-model="tab"
              dense
              class="text-grey"
              active-color="primary"
              align="justify"
              narrow-indicator
            >
              <q-tab name="about-us" label="About Us" />
              <q-tab name="teachers" label="Teachers" />
              <q-tab name="movies" label="Movies" />
              <q-tab name="movies" label="Movies" />
              <q-tab name="movies" label="Movies" />
              <q-tab name="movies" label="Movies" />
              <q-tab name="movies" label="Movies" />
            </q-tabs>
            <q-separator />
            <q-tab-panels v-model="tab" animated>
              <q-tab-panel name="about-us" class="p-0 admin__main-about__us">
                <div class="row q-pa-md">
                  <q-toggle
                    v-model="aboutUsEditor.visible"
                    checked-icon="check"
                    label="Visible"
                    unchecked-icon="clear"
                    class="ml-auto"
                  />
                </div>
                <q-separator />
                <q-tabs
                  v-model="aboutUsTab"
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
              </q-tab-panel>
              <q-tab-panel name="teachers">
                <div class="text-h6">teachers</div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </q-tab-panel>
              <q-tab-panel name="movies">
                <div class="text-h6">Movies</div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </q-tab-panel>
            </q-tab-panels>
          </q-card>
        </div>
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
  name: 'PageIndex',
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
    this.$axios.post('main_get')
      .then(res => {
        let aboutUs = res.data.about_us
        this.aboutUsEditor.en = aboutUs.en
        this.aboutUsEditor.ru = aboutUs.ru
        this.aboutUsEditor.uz = aboutUs.uz
        this.aboutUsEditor.visible = !!aboutUs.visible
      })
  },
  mounted () {
  },
  methods: {
    async saveMain () {
      let data = {
        'about_us': {
          'visible': this.aboutUsEditor.visible,
          'bgimage': this.aboutUsEditor.bgimage,
          'en': this.aboutUsEditor.en,
          'ru': this.aboutUsEditor.ru,
          'uz': this.aboutUsEditor.uz
        }
      }
      let res = await this.$axios.post('main_store', data)
      if (res.data) {
        this.$q.notify({
          color: 'teal',
          icon: 'check_circle',
          message: 'Success',
          position: 'top',
          timeout: 200
        })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .admin__main
    &-about__us
      .q-panel.scroll
        overflow: visible
</style>
