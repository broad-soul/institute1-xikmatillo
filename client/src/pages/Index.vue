<template>
  <q-page class="main">
    <div class="row about__us__row">
      <div class="col">
        <div class="about__us">
          <h1>{{$t('aboutUs')}}</h1>
          <p>Принимаем выпускников 9-х классов</p>
          <p>В нашем академическом лицее можно получить подготовку в вузы Узбекистана и международные вузы по следующим направлениям:</p>
          <p>- Социально-гуманитарные науки.</p>
          <p>- Точные науки.</p>
          <p>Условие поступления: тестирование. Предметы тестирования зависят от направления подготовки.</p>

          <p>Срок  обучения  в академическом лицее- 2 года</p>
          <p>1-курс по программе SТЕАМ   -  (S - science, T - technology, E - engineering, A - art и M – mathematics-естественные науки, технология, инженерное искусство, творчество, математика)</p>
          <p>2-курс по программе  IFP - (подготовительные курсы  в вузы)</p>
          <p>Языки обучения в лицее: узбекский, русский и английский.</p>
          <p>Основные иностранные языки: английский, немецкий, французский.</p>
          <p>Дополнительные иностранные языки:  китайский, корейский,  которые преподаются начиная со второго курса обучения  по программе  IFP - подготовительные курсы  в вузы.</p>
        </div>
      </div>
    </div>
    <div class="row partners">
      <div class="col"><img src="~assets/partners.jpg" alt=""></div>
      <div class="col">
        <div class="text">
          <h3>ПАРТНЕРЫ</h3>
          <p>НАЦИОНАЛЬНЫЙ УНИВЕРСИТЕТ ИМЕНИ МИРЗО УЛУГБЕКА;</p>
          <p>ТАШКЕНТСКИЙ ГОСУДАРСТВЕННЫЙ ПЕДАГОГИЧЕСКИЙ УНИВЕРСИТЕТ ИМЕНИ НИЗАМИ</p>
          <p>ГЕРМАНСКИЙ ЦЕНТР ZFA “ SCHULMANAGEMENT WELWEIT. ZENTRALSTELLE FUR DAS AUSLANDSSCHULWESEN”</p>
          <p>ЦЕНТРЫ КУЛЬТУРЫ ГЕРМАНИИ И ФРАНЦИИ</p>
          <p>АССОЦИАЦИЯ ПРЕПОДАВАТЕЛЕЙ АНГЛИЙСКОГО ЯЗЫКА УЗБЕКИСТАНА</p>
        </div>
      </div>
    </div>
    <q-carousel
      animated
      v-model="slide"
      infinite
      :autoplay="10000"
      swipeable
    >
      <q-carousel-slide :name="1" img-src="https://cdn.quasar.dev/img/mountains.jpg" />
      <q-carousel-slide :name="2" img-src="https://cdn.quasar.dev/img/parallax1.jpg" />
    </q-carousel>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'PageIndex',
  data () {
    return {
      slide: 1
    }
  },
  computed: {
    ...mapGetters(['mobileDetect'])
  }
}
</script>

<style lang="stylus" scope>
  .main
    min-height 100vh !important
    .q-carousel
      height 100vh
  .about__us__row
    background url('~assets/partners.jpg') no-repeat
    background-size 150%
  .about__us
    background $indigo
    padding 50px 80px
    padding-top 1px
    margin 80px
    color #fff
    h1
      text-transform uppercase
      color #fff
  .partners
      background $indigo
      img
        height 100%
    .text
      padding-top 170px
      max-width 400px
      margin auto
      height 100%
      color #fff
      h3
        color #fff
      p
        margin-bottom 50px
</style>
