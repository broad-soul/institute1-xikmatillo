<template>
  <q-scroll-area
    :thumb-style="getThumbStyle"
    style="height: calc(100vh - 56px)"
  >
    <q-page class="admin__contacts__page">
      <div class="q-pa-md">
        <q-breadcrumbs  active-color="teal">
          <q-breadcrumbs-el icon="home" label="Home" to="/" />
          <q-breadcrumbs-el label="Dashboard" to="/admin" />
          <q-breadcrumbs-el label="Contacts" />
        </q-breadcrumbs>
      </div>
      <div class="q-pa-md q-gutter-y-md">
        <q-card class="q-pa-md q-gutter-y-md">
          <q-form
            @submit="saveContact"
            ref="form"
            class="q-gutter-y-md"
          >
            <q-input color="teal" type="textarea" clearable lazy-rules filled v-model="contacts.map_iframe" label="Tag Iframe"></q-input>
            <q-input color="teal" clearable lazy-rules filled v-model="contacts.phone1" label="Phone"></q-input>
            <q-tabs
              color="teal"
              v-model="contactsTab"
              dense
              class="text-grey"
              active-color="teal"
              align="justify"
              narrow-indicator
              indicator-color="teal"
            >
              <q-tab name="lang-en" label="En" />
              <q-tab name="lang-ru" label="Ru" />
              <q-tab name="lang-uz" label="Uz" />
            </q-tabs>
            <q-tab-panels v-model="contactsTab" animated class="m-0">
              <q-tab-panel name="lang-en" class="px-0 q-gutter-y-md">
                <q-input color="teal" clearable lazy-rules filled v-model="contacts.title_en" label="Title"></q-input>
                <div class="text-subtitle1 text-grey-8 mt-3">Content</div>
                <vue-editor
                  :customModules="customModulesForEditor"
                  :editorOptions="editorSettings"
                  v-model="contacts.content_en"
                />
              </q-tab-panel>
              <q-tab-panel name="lang-ru" class="px-0 q-gutter-y-md">
                <q-input color="teal" clearable lazy-rules filled v-model="contacts.title_ru" label="Название"></q-input>
                <div class="text-subtitle1 text-grey-8 mt-3">Описание</div>
                <vue-editor
                  :customModules="customModulesForEditor"
                  :editorOptions="editorSettings"
                  v-model="contacts.content_ru"
                />
              </q-tab-panel>
              <q-tab-panel name="lang-uz" class="px-0 q-gutter-y-md">
                <q-input color="teal" clearable lazy-rules filled v-model="contacts.title_uz" label="Nomi"></q-input>
                <div class="text-subtitle1 text-grey-8 mt-3">Ta'rifi</div>
                <vue-editor
                  :customModules="customModulesForEditor"
                  :editorOptions="editorSettings"
                  v-model="contacts.content_uz"
                />
              </q-tab-panel>
            </q-tab-panels>
            <q-toggle v-model.number="contacts.is_visible" color="teal" label="Visible on the page" :loading="loading" />
            <div class="q-gutter-md">
              <q-btn color="teal" type="submit" :loading="loading" :disable="loading">Create</q-btn>
              <q-btn to="/admin/contactss">Cancel</q-btn>
            </div>
          </q-form>
        </q-card>
      </div>
    </q-page>
  </q-scroll-area>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { VueEditor } from 'vue2-editor'
import { ImageDrop } from 'quill-image-drop-module'
import ImageResize from 'quill-image-resize-module'
export default {
  name: 'ContactsAdmin',
  data () {
    return {
      loading: false,
      contactsTab: 'lang-en',
      contacts: {
        title_en: '',
        title_ru: '',
        title_uz: '',
        content_en: '',
        content_ru: '',
        content_uz: '',
        map_iframe: null,
        phone1: null,
        is_visible: true
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
  beforeMount () {
    this.$axios.get('get_contacts').then(res => {
      if (res.data.length > 0) {
        let [contacts] = res.data
        this.contacts.id = contacts.id
        this.contacts.title_en = contacts.title_en
        this.contacts.title_ru = contacts.title_ru
        this.contacts.title_uz = contacts.title_uz
        this.contacts.content_en = contacts.content_en
        this.contacts.content_ru = contacts.content_ru
        this.contacts.content_uz = contacts.content_uz
        this.contacts.map_iframe = contacts.map_iframe
        this.contacts.phone1 = contacts.phone1
        if (+contacts.is_visible === 1) this.contacts.is_visible = true
        else this.contacts.is_visible = false
      }
    })
  },
  methods: {
    ...mapActions([
    ]),
    saveContact () {
      let error = false
      for (let [, value] of Object.entries(this.contacts)) {
        if (+value === 1 || +value === 0) continue
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
      this.$axios.post('save_contacts', this.contacts).then(() => {
        this.$q.notify({
          color: 'teal',
          icon: 'check_circle',
          message: 'Event created',
          position: 'top',
          timeout: 200
        })
      }).finally(() => { this.loading = false })
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
