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
          <q-breadcrumbs-el label="Categories" to="/admin/categories" />
          <q-breadcrumbs-el label="Create" />
        </q-breadcrumbs>
      </div>
      <div class="q-pa-md q-gutter-y-md">
        <q-card class="q-pa-md q-gutter-y-md">
          <q-form
            @submit="create"
            ref="form"
            class="q-gutter-y-md"
          >
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
                  v-model.lazy.trim="category.title_en"
                  type="text"
                  clearable
                  lazy-rules
                  :disable="loading"
                  :rules="[val => !!val || '* Fields should be filled obligatory!']"
                />
              </q-tab-panel>
              <q-tab-panel name="lang-ru" class="p-0">
                <q-input
                  color="teal"
                  filled
                  label="Название"
                  v-model.lazy.trim="category.title_ru"
                  type="text"
                  clearable
                  lazy-rules
                  :disable="loading"
                  :rules="[val => !!val || '* Поля - обязательны для заполнения!']"
                />
              </q-tab-panel>
              <q-tab-panel name="lang-uz" class="p-0">
                <q-input
                  color="teal"
                  filled
                  label="Nomi"
                  v-model.lazy.trim="category.title_uz"
                  type="text"
                  clearable
                  lazy-rules
                  :disable="loading"
                  :rules="[val => !!val || '* Maydonlar - to\'ldirilishi shart!']"
                />
              </q-tab-panel>
            </q-tab-panels>
            <q-btn color="teal mr-3" type="submit" :loading="loading" :disable="loading">Create</q-btn>
            <q-btn :disable="loading" to="/admin/categories">Cancel</q-btn>
          </q-form>
        </q-card>
      </div>
    </q-page>
  </q-scroll-area>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'CategoryCreate',
  data () {
    return {
      tab: 'lang-en',
      loading: false,
      category: {
        title_en: null,
        title_ru: null,
        title_uz: null
      }
    }
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
    create () {
      this.loading = true
      this.$axios.post('create_category', this.category).then(() => {
        this.$q.notify({
          color: 'teal',
          icon: 'check_circle',
          message: 'Event created',
          position: 'top',
          timeout: 200
        })
        this.$router.push('/admin/categories')
      }).finally(() => { this.loading = false })
    }
  }
}
</script>

<style lang="stylus">
</style>
