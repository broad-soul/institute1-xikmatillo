<template>
  <q-scroll-area
    :thumb-style="getThumbStyle"
    style="height: calc(100vh - 56px)"
  >
    <q-page class="wrap">
      <div class="q-pa-md">
        <h3 class="text-center">{{$t('faq_title')}}</h3>
        <q-expansion-item
          expand-separator
          icon="question_answer"
          :label="(i + 1) + ' - ' + item['question_' + $t('prefix')]"
          header-class="text-cyan-7"
          expand-icon-class="text-cyan-7"
          v-for="(item, i) in allQuestions"
          :key="item.id"
        >
          <q-card>
            <q-card-section>
               {{item['answer_' + $t('prefix')]}}
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </div>
    </q-page>
  </q-scroll-area>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Faq',
  meta: {
    titleTemplate: title => `${title} - Faq`,
    meta: {
      description: { name: 'description', content: 'Faq Page 1' },
      keywords: { name: 'keywords', content: 'Faq website' }
    }
  },
  data () {
    return {
      allQuestions: [1]
    }
  },
  computed: {
    ...mapGetters([
      'getThumbStyle',
      'mobileDetect'
    ])
  },
  beforeMount () {
    this.$axios.get('get_questions').then(res => {
      this.allQuestions = res.data
    })
  }
}
</script>

<style lang="stylus" scoped>
</style>
