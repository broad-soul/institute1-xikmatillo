<template>
  <q-scroll-area
    :thumb-style="getThumbStyle"
    style="height: calc(100vh - 56px)"
  >
    <q-page class="page__residents">
      <div class="q-pa-md">
        <q-breadcrumbs  active-color="teal">
          <q-breadcrumbs-el icon="home" label="Home" to="/" />
          <q-breadcrumbs-el label="Dashboard" to="/admin" />
          <q-breadcrumbs-el label="Residents" to="/admin/residents" />
          <q-breadcrumbs-el label="Instruction" />
        </q-breadcrumbs>
      </div>
      <div class="q-pa-md q-gutter-y-md">
        <q-card class="q-pa-md q-gutter-y-md">
          <q-form
            @submit="saveInstruction"
            ref="form"
            class="q-gutter-y-md"
          >
            <q-tabs
              color="teal"
              v-model="tab"
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
            <q-tab-panels v-model="tab" animated class="m-0">
              <q-tab-panel name="lang-en" class="px-0 q-gutter-y-md">
                <q-input
                  color="teal"
                  filled
                  label="Title *"
                  v-model.lazy.trim="instruction_app.title_en"
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
                  v-model="instruction_app.content_en"
                />
              </q-tab-panel>
              <q-tab-panel name="lang-ru" class="px-0 q-gutter-y-md">
                <q-input
                  color="teal"
                  filled
                  label="Название *"
                  v-model.lazy.trim="instruction_app.title_ru"
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
                  v-model="instruction_app.content_ru"
                />
              </q-tab-panel>
              <q-tab-panel name="lang-uz" class="px-0 q-gutter-y-md">
                <q-input
                  color="teal"
                  filled
                  label="Nomi *"
                  v-model.lazy.trim="instruction_app.title_uz"
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
                  v-model="instruction_app.content_uz"
                />
              </q-tab-panel>
            </q-tab-panels>
            <div class="q-gutter-md">
              <q-btn color="teal" type="submit" :loading="loading" :disable="loading">Ok</q-btn>
              <q-btn to="/admin/residents">Cancel</q-btn>
            </div>
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
  name: 'InstructionResidents',
  data () {
    return {
      loading: false,
      tab: 'lang-en',
      instruction_app: {
        title_en: '',
        title_ru: '',
        title_uz: '',
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
  beforeMount () {
    this.$axios.get('get_resident_instruction').then(res => {
      if (res.data.length > 0) {
        [this.instruction_app] = res.data
      }
    })
  },
  computed: {
    ...mapGetters([
      'mobileDetect',
      'getThumbStyle'
    ])
  },
  methods: {
    saveInstruction () {
      let error = false
      for (let [, value] of Object.entries(this.instruction_app)) {
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
      this.$axios.post('update_resident_instruction', this.instruction_app).then(() => {
        this.$q.notify({
          color: 'teal',
          icon: 'check_circle',
          message: 'Success',
          position: 'top',
          timeout: 200
        })
        this.$router.push('/admin/residents')
      }).finally(() => { this.loading = false })
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
