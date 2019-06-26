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
          <q-breadcrumbs-el label="Faq" />
        </q-breadcrumbs>
      </div>
      <div class="q-pa-md q-gutter-y-md">
        <q-btn class="mb-3" color="teal" to="/admin/faq/create">Add question</q-btn>
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
                          <div class="col-10">{{item.answer_en}}</div>
                          <div class="col-2">
                            <div class="row">
                              <q-btn class="ml-auto" size="12px" dense round flat color="info" to="/faq"><q-icon name="remove_red_eye" />
                                <q-tooltip>Views</q-tooltip>
                              </q-btn>
                              <q-btn class="mx-2" size="12px" dense round flat color="warning" :to="'/admin/faq/edit/' + item.id"><q-icon name="edit" />
                                <q-tooltip>Edit question</q-tooltip>
                              </q-btn>
                              <q-btn class="" size="12px" dense round flat color="negative" @click="deletQuestion(item.id)"><q-icon name="delete_forever" />
                                <q-tooltip>Delete question</q-tooltip>
                              </q-btn>
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
    </q-page>
  </q-scroll-area>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Faq',
  data () {
    return {
      allQuestions: [],
      allQuestionsTab: 'lang-en'
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
    this.$axios.get('get_questions').then(res => {
      this.allQuestions = res.data
    })
  },
  mounted () {
  },
  methods: {
    deletQuestion (id) {
      this.$q.dialog({
        title: 'Подтвердите',
        message: 'Вы точно хотите удалить?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$axios.post('delete_question/' + id).then(() => {
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
