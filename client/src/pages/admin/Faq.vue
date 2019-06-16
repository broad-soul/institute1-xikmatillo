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
          <q-breadcrumbs-el label="Faq" />
        </q-breadcrumbs>
      </div>
      <div class="q-pa-md">
        <div class="q-gutter-y-md">
          <q-btn v-if="!visible_add_new_question" class="mb-3" @click="openAddNewQuestion">Add new question</q-btn>
          <q-card>
            <q-slide-transition>
              <div v-if="visible_add_new_question">
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
                  <q-btn color="teal mr-3" @click="save" :loading="loading" :disable="loading" v-if="!validateErrors">Ok</q-btn>
                  <q-btn @click="onReset">Cancel</q-btn>
                </div>
              </div>
            </q-slide-transition>
          </q-card>
          <template v-if="allQuestions.length > 0">
            <q-separator />
            <h5 class="mb-2">Quantity questions - {{allQuestions.length}}</h5>
            <q-card>
              <q-tabs
                v-model="allQuestionsTab"
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
              <q-tab-panels v-model="allQuestionsTab" animated>
                <q-tab-panel name="lang-en" class="">
                  <q-expansion-item
                    expand-separator
                    icon="question_answer"
                    :label="(i + 1) + ' - ' + item.question_en"
                    header-class="text-teal"
                    v-for="(item, i) in allQuestions"
                    :key="item.id"
                  >
                    <q-card>
                      <q-card-section>
                        <div class="row">
                          <div class="col-11">{{item.answer_en}}</div>
                          <div class="col-1">
                            <div class="row">
                              <q-btn class="ml-auto" flat color="negative" @click="deletQuestion(item.id)"><q-icon name="delete_forever" /></q-btn>
                            </div>
                          </div>
                        </div>
                      </q-card-section>
                    </q-card>
                  </q-expansion-item>
                </q-tab-panel>
                <q-tab-panel name="lang-ru" class="">
                  <q-expansion-item
                    expand-separator
                    icon="question_answer"
                    :label="(i + 1) + ' - ' + item.question_ru"
                    header-class="text-teal"
                    v-for="(item, i) in allQuestions"
                    :key="item.id"
                  >
                    <q-card>
                      <q-card-section>
                        {{item.answer_ru}}
                      </q-card-section>
                    </q-card>
                  </q-expansion-item>
                </q-tab-panel>
                <q-tab-panel name="lang-uz" class="">
                  <q-expansion-item
                    expand-separator
                    icon="question_answer"
                    :label="(i + 1) + ' - ' + item.question_uz"
                    header-class="text-teal"
                    v-for="(item, i) in allQuestions"
                    :key="item.id"
                  >
                    <q-card>
                      <q-card-section>
                        {{item.answer_uz}}
                      </q-card-section>
                    </q-card>
                  </q-expansion-item>
                </q-tab-panel>
              </q-tab-panels>
            </q-card>
          </template>
        </div>
      </div>
    </q-page>
  </q-scroll-area>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Faq',
  data () {
    return {
      visible_add_new_question: false,
      allQuestions: [],
      allQuestionsTab: 'lang-en',
      faqTab: 'lang-en',
      loading: false,
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
    ]),
    validateErrors () {
      for (let [, value] of Object.entries(this.faq)) {
        if (!value) return true
      }
      return false
    }
  },
  watch: {
  },
  beforeMount () {
    this.$axios.get('get_questions').then(res => {
      this.allQuestions = res.data
    })
  },
  mounted () {
  },
  methods: {
    openAddNewQuestion () {
      this.visible_add_new_question = true
    },
    save () {
      this.loading = true
      this.$axios.post('new_question', this.faq).then(res => {
        this.allQuestions = res.data
        this.onReset()
        setTimeout(() => {
          this.$q.notify({
            color: 'teal',
            icon: 'check_circle',
            message: 'Success',
            position: 'top',
            timeout: 200
          })
        }, 300)
      }).finally(() => { this.loading = false })
    },
    onReset () {
      this.visible_add_new_question = false
      this.faq = {
        question_en: '',
        answer_en: '',
        question_ru: '',
        answer_ru: '',
        question_uz: '',
        answer_uz: ''
      }
    },
    deletQuestion (id) {
      this.$q.dialog({
        title: 'Подтвердите',
        message: 'Вы точно хотите удалить?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$axios.post('delete_question/' + id, this.faq).then(() => {
          this.allQuestions.forEach((elem, i) => {
            if (elem.id === id) return this.allQuestions.splice(i, 1)
          })
          this.$q.notify({
            color: 'teal',
            icon: 'check_circle',
            message: 'Deleted',
            position: 'top',
            timeout: 200
          })
        })
      })
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
