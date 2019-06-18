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
          <q-breadcrumbs-el label="Faq" to="/admin/faq" />
          <q-breadcrumbs-el label="Edit" />
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
            <q-btn color="teal mr-3" @click="updateQuestion" :loading="loading" :disable="loading">update Question</q-btn>
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
  name: 'FaqEdit',
  data () {
    return {
      faqTab: 'lang-en',
      loading: false,
      edit_question_id: null,
      faq: {
        question_en: '',
        answer_en: '',
        question_ru: '',
        answer_ru: '',
        question_uz: '',
        answer_uz: ''
      }
    }
  },
  components: {
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
    this.edit_question_id = this.$route.params.id
    this.$axios.get('get_question/' + this.edit_question_id).then(res => {
      let data = res.data
      this.faq = {
        question_en: data.question_en,
        answer_en: data.answer_en,
        question_ru: data.question_ru,
        answer_ru: data.answer_ru,
        question_uz: data.question_uz,
        answer_uz: data.answer_uz
      }
    })
  },
  mounted () {
  },
  methods: {
    openAddNewQuestion () {
      this.visible_add_new_question = true
    },
    updateQuestion () {
      this.loading = true
      this.$axios.post('update_question', { id: this.edit_question_id, faq: this.faq }).then(() => {
        this.$q.notify({
          color: 'teal',
          icon: 'check_circle',
          message: 'Changed successfully',
          position: 'top',
          timeout: 200
        })
        setTimeout(() => {
          this.$router.push('/admin/faq')
        }, 300)
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
