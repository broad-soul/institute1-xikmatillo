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
          <q-breadcrumbs-el label="Faq" to="/admin/faq" />
          <q-breadcrumbs-el label="Create" />
        </q-breadcrumbs>
      </div>
      <div class="q-pa-md q-gutter-y-md">
        <q-card>
          <q-tabs
            v-model="faqTab"
            dense
            class="text-grey p-1"
            active-color="primary"
            align="justify"
            narrow-indicator
          >
            <q-tab name="lang-en" label="En" />
            <q-tab name="lang-ru" label="Ru" />
            <q-tab name="lang-uz" label="Uz" />
          </q-tabs>
          <q-separator />
          <q-tab-panels v-model="faqTab" animated>
            <q-tab-panel name="lang-en" class="pb-2">
              <q-input :error="false" clearable lazy-rules :rules="[val => !!val || '* Fields should be filled obligatory!']" filled type="textarea" v-model="faq.question_en" label="Question" class="mb-2"></q-input>
              <q-input clearable lazy-rules :rules="[val => !!val || '* Fields should be filled obligatory!']" filled type="textarea" v-model="faq.answer_en" label="Answer"></q-input>
            </q-tab-panel>
            <q-tab-panel name="lang-ru" class="pb-2">
              <q-input clearable lazy-rules :rules="[val => !!val || '* Поля - обязательны для заполнения!']" filled type="textarea" v-model="faq.question_ru" label="Вопрос" class="mb-2"></q-input>
              <q-input clearable lazy-rules :rules="[val => !!val || '* Поля - обязательны для заполнения!']" filled type="textarea" v-model="faq.answer_ru" label="Ответ"></q-input>
            </q-tab-panel>
            <q-tab-panel name="lang-uz" class="pb-2">
              <q-input clearable lazy-rules :rules="[val => !!val || '* Maydonlar - to\'ldirilishi shart!']" filled type="textarea" v-model="faq.question_uz" label="Savol" class="mb-2"></q-input>
              <q-input clearable lazy-rules :rules="[val => !!val || '* Maydonlar - to\'ldirilishi shart!']" filled type="textarea" v-model="faq.answer_uz" label="Javob"></q-input>
            </q-tab-panel>
          </q-tab-panels>
          <div class="pl-3 pb-3">
            <q-btn color="teal mr-3" @click="createQuestion" :loading="loading" :disable="loading">Create</q-btn>
            <q-btn to="/admin/faq">Cancel</q-btn>
          </div>
        </q-card>
      </div>
    </q-page>
  </q-scroll-area>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'FaqCreate',
  data () {
    return {
      loading: false,
      faq: {
        question_en: '',
        answer_en: '',
        question_ru: '',
        answer_ru: '',
        question_uz: '',
        answer_uz: ''
      },
      faqTab: 'lang-en'
    }
  },
  computed: {
    ...mapGetters([
      'mobileDetect',
      'getThumbStyle'
    ])
  },
  methods: {
    createQuestion () {
      let error = false
      for (let [, value] of Object.entries(this.faq)) {
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
      this.$axios.post('new_question', this.faq).then(res => {
        this.$q.notify({
          color: 'teal',
          icon: 'check_circle',
          message: 'Success',
          position: 'top',
          timeout: 200
        })
        this.$router.push('/admin/faq')
      }).finally(() => { this.loading = false })
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
