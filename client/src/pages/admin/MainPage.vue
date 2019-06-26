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
            v-model="tab"
            dense
            class="text-grey"
            active-color="teal"
            align="justify"
            narrow-indicator
          >
            <q-tab name="about-us" :label="$t('sidebarPagesAdmin').about_us" />
            <q-tab name="event" :label="$t('sidebarPagesAdmin').event" />
            <q-tab name="partners" :label="$t('sidebarPagesAdmin').partners" />
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
                  color="teal"
                />
              </div>
              <q-separator />
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
            </q-tab-panel>
            <q-tab-panel name="event" class="p-0 admin__main-event__us">
              <div class="row q-pa-md">
                <q-toggle
                  v-model="eventEditor.visible"
                  checked-icon="check"
                  label="Visible"
                  unchecked-icon="clear"
                  class="ml-auto"
                  color="teal"
                />
              </div>
              <q-separator />
              <q-tabs
                v-model="eventTab"
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
              <q-tab-panels v-model="eventTab" animated>
                <q-tab-panel name="lang-en" class="p-0">
                  <vue-editor
                    :customModules="customModulesForEditor"
                    :editorOptions="editorSettings"
                    v-model="eventEditor.en"
                  />
                </q-tab-panel>
                <q-tab-panel name="lang-ru" class="p-0">
                  <vue-editor
                    :customModules="customModulesForEditor"
                    :editorOptions="editorSettings"
                    v-model="eventEditor.ru"
                  />
                </q-tab-panel>
                <q-tab-panel name="lang-uz" class="p-0">
                  <vue-editor
                    :customModules="customModulesForEditor"
                    :editorOptions="editorSettings"
                    v-model="eventEditor.uz"
                  />
                </q-tab-panel>
              </q-tab-panels>
            </q-tab-panel>
            <q-tab-panel name="partners">
              <div class="row q-pa-md">
                <q-toggle
                  v-model="partnersEditor.visible"
                  checked-icon="check"
                  label="Visible"
                  unchecked-icon="clear"
                  class="ml-auto"
                  color="teal"
                />
              </div>
              <q-separator />
              <q-tabs
                v-model="partnersTab"
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
              <q-tab-panels v-model="partnersTab" animated>
                <q-tab-panel name="lang-en" class="p-0">
                  <vue-editor
                    :customModules="customModulesForEditor"
                    :editorOptions="editorSettings"
                    v-model="partnersEditor.content_en"
                  />
                </q-tab-panel>
                <q-tab-panel name="lang-ru" class="p-0">
                  <vue-editor
                    :customModules="customModulesForEditor"
                    :editorOptions="editorSettings"
                    v-model="partnersEditor.content_ru"
                  />
                </q-tab-panel>
                <q-tab-panel name="lang-uz" class="p-0">
                  <vue-editor
                    :customModules="customModulesForEditor"
                    :editorOptions="editorSettings"
                    v-model="partnersEditor.content_uz"
                  />
                </q-tab-panel>
              </q-tab-panels>
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
  name: 'MainPage',
  data () {
    return {
      tab: 'about-us',
      aboutUsTab: 'lang-en',
      eventTab: 'lang-en',
      partnersTab: 'lang-en',
      partnersEditor: {
        id: null,
        visible: true,
        bgimage: null,
        content_en: '',
        content_ru: '',
        content_uz: ''
      },
      aboutUsEditor: {
        id: null,
        visible: true,
        bgimage: null,
        en: '',
        ru: '',
        uz: ''
      },
      eventEditor: {
        id: null,
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
    this.$axios.post('get_main_page_admin').then(res => {
      let { about_us: aboutUs, event, partners } = res.data
      this.aboutUsEditor = aboutUs[0] || this.aboutUsEditor
      this.eventEditor = event[0] || this.eventEditor
      this.partnersEditor = partners[0] || this.partnersEditor
      this.aboutUsEditor.visible = !!this.aboutUsEditor.visible
      this.eventEditor.visible = !!this.eventEditor.visible
      this.partnersEditor.visible = !!this.partnersEditor.visible
    })
  },
  mounted () {
  },
  methods: {
    saveMain () {
      let data = {
        'about_us': this.aboutUsEditor,
        'event': this.eventEditor,
        'partners': this.partnersEditor
      }
      this.$axios.post('main_store', data).then(res => {
        let { about_us: aboutUs, event, partners } = res.data
        this.aboutUsEditor = aboutUs[0] || this.aboutUsEditor
        this.eventEditor = event[0] || this.eventEditor
        this.partnersEditor = partners[0] || this.partnersEditor
        this.aboutUsEditor.visible = !!this.aboutUsEditor.visible
        this.eventEditor.visible = !!this.eventEditor.visible
        this.partnersEditor.visible = !!this.partnersEditor.visible
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
