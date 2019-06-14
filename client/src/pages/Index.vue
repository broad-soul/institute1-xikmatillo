<template>
  <q-page class="main smooth">
    <section id="page1" class="main__section about__us" v-if="aboutUs.visible">
      <div class="content" v-html="aboutUs.content"></div>
    </section>
    <section id="page2" class="main__section row partners">
      <div class="col"><img src="~assets/partners.jpg" alt=""></div>
      <div class="col">
        <div class="text">
          <template v-if="$t('prefix') === 'ru'">
            <h3>ПАРТНЕРЫ</h3>
            <p>НАЦИОНАЛЬНЫЙ УНИВЕРСИТЕТ ИМЕНИ МИРЗО УЛУГБЕКА</p>
            <p>ТАШКЕНТСКИЙ ГОСУДАРСТВЕННЫЙ ПЕДАГОГИЧЕСКИЙ УНИВЕРСИТЕТ ИМЕНИ НИЗАМИ</p>
            <p>ГЕРМАНСКИЙ ЦЕНТР ZFA “ SCHULMANAGEMENT WELWEIT. ZENTRALSTELLE FUR DAS AUSLANDSSCHULWESEN”</p>
            <p>ЦЕНТРЫ КУЛЬТУРЫ ГЕРМАНИИ И ФРАНЦИИ</p>
            <p>АССОЦИАЦИЯ ПРЕПОДАВАТЕЛЕЙ АНГЛИЙСКОГО ЯЗЫКА УЗБЕКИСТАНА</p>
          </template>
          <template v-else-if="$t('prefix') === 'en'">
            <h3>PARTNERS</h3>
            <p>NATIONAL UNIVERSITY NAMED AFTER MIRZO ULUGBEK</p>
            <p>TASHKENT STATE PEDAGOGICAL UNIVERSITY NAMED AFTER NIZAMI</p>
            <p>GERMAN CENTER ZFA “SCHULMANAGEMENT WELWEIT. ZENTRALSTELLE FUR DAS AUSLANDSSCHULWESEN”</p>
            <p>CENTERS OF CULTURE OF GERMANY AND FRANCE</p>
            <p>ASSOCIATION OF ENGLISH LANGUAGE TEACHERS OF UZBEKISTAN</p>
          </template>
          <template v-else-if="$t('prefix') === 'uz'">
            <h3>Hamkorlar</h3>
            <p>MIRZO ULUGBEK NOMIDAGI MILLIY UNIVERSITETI</p>
            <p>NIZAMI NOMIDAGI TOSHKENT DAVLAT PEDAGOGICAL UNIVERSITETI</p>
            <p>Germaniyaning ZFA markazi "SCHULMANAGEMENT WELWEIT. ZENTRALSTELLE FUR DAS AUSLANDSSCHULWESEN"</p>
            <p>GERMANIYA VA FRANSA MADANIYAT MARKAZLARI</p>
            <p>O'ZBEKISTON ENGLISH TILI O'QITUVCHILARI UYUSHMASI</p>
          </template>
        </div>
      </div>
    </section>
    <section id="page3" class="main__section">
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
    </section>
    <section class="main__section contact">
      <h3>{{$t('contact')}}</h3>
      <a href="tel:+998903500202"><q-icon name="mdi-phone" /> 998903500202</a>
      <br>
      <br>
      <a href="tel:+998955252323"><q-icon name="mdi-phone" /> 998955252323</a>
    </section>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'PageIndex',
  meta: {
    meta: {
      description: { name: 'description', content: 'Home Page 1' },
      keywords: { name: 'keywords', content: 'Home website' }
    }
  },
  data () {
    return {
      slide: 1,
      aboutUs: {
        visible: true,
        content: ''
      },
      logo: {
        image: '',
        title: ''
      },
      mainData: {},
      scrollAnimated: true
    }
  },
  computed: {
    ...mapGetters([
      'getMainData',
      'getLangPr',
      'mobileDetect'
    ])
  },
  async beforeMount () {
    this.mainData = await this.mainGetData()
    if (this.mainData) {
      let aboutUs = this.mainData.about_us
      let logo = this.mainData.logo
      this.aboutUs.content = aboutUs[this.$t('prefix')]
      this.aboutUs.visible = aboutUs[this.$t('prefix')]
      this.logo.image = logo.bgimage
      this.logo.title = logo[this.$t('prefix')]
    }
  },
  mounted () {
    this.$('body').css('overflow', 'hidden')
    // smooth scroll
    let sections = this.$('.main__section')
    let scrollInt = 0
    let th = this
    document.querySelector('.smooth').addEventListener('wheel', function (e) {
      let deltaY = e.deltaY || e.detail || e.wheelDelta
      if (deltaY > 0) {
        // вниз
        if (scrollInt < sections.length - 1 && th.scrollAnimated) {
          scrollInt++
          th.scrollAnimated = false
          th.$('html, body').off().animate({
            scrollTop: th.$(sections[scrollInt]).offset().top
          }, 600, function () {
            th.scrollAnimated = true
          })
        }
      } else {
        // вверх
        if (scrollInt > 0 && th.scrollAnimated) {
          th.scrollAnimated = false
          scrollInt--
          th.$('html, body').off().animate({
            scrollTop: th.$(sections[scrollInt]).offset().top
          }, 600, function () {
            th.scrollAnimated = true
          })
        }
      }
    })
    // End smooth scroll
    this.$store.subscribe((mutation, state) => {
      switch (mutation.type) {
        case 'CHANGE_LANG':
          setTimeout(() => {
            this.aboutUs.content = this.mainData.about_us[this.$t('prefix')]
          }, 100)
          break
      }
    })
  },
  beforeDestroy () {
    this.$('body').css('overflow', 'visible')
  },
  methods: {
    ...mapActions([
      'mainGetData'
    ])
  }
}
</script>

<style lang="stylus">
  .main__section
    height: 100vh
  .main
    min-height 100vh !important
    .q-carousel
      height 100vh
  .about__us
    background $linear_gradient
    color #fff
    height: 100vh
    .content
      padding: 20px 50px
      margin: auto
      @media (max-width: 1200px)
        display: none
    h1
      text-transform uppercase
      color #fff
  .partners
      background $linear_gradient
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
