<template>
  <q-page class="main smooth" v-touch-swipe.mouse="handleSwipe">
    <section id="page1" class="main__section about__us" v-if="aboutUs.visible">
      <div class="content" v-html="aboutUs.content"></div>
    </section>
    <section id="page2" class="main__section partners">
      <div class="row">
        <div class="col-12 col-md-6" v-if="!mobileDetect"><img src="~assets/partners.jpg" alt=""></div>
        <div class="col-12 col-md-6">
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
      </div>
    </section>
    <section class="main__section contact">
      <div class="row">
        <div class="col-12 col-md-8" style="display: flex; height: 30vh;background: #eaf5f7;">
          <div class="contact__info m-auto text-center" style="max-width: 400px;">
            <h5 class="my-3">АДРЕС</h5>
            ул. Бобура 55, Ташкент, 100100 Узбекистан
            <br>
            Aluswlu@gmail.com
            <br>
            <a href="tel:+998712527752" style="text-decoration: none;color: #333;"><q-icon name="phone" />+ 998 71 2527752</a>
          </div>
        </div>
        <div class="col-12 col-md-4">
          <div class="image_main_contact" style="width: 100%;height: 100%;background-size: 100% 100%;background-repeat: no-repeat"></div>
        </div>
      </div>
      <div class="row">
        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1499.0585282501243!2d69.2538643!3d41.2845568!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8aed1bc42aad%3A0x100df44c6fc28ef8!2z0JDQutCw0LTQtdC80LjRh9C10YHQutC40Lkg0LvQuNGG0LXQuSDihJYyINC_0YDQuCDQo9C30JPQo9Cc0K8!5e0!3m2!1sru!2s!4v1560718949192!5m2!1sru!2s" width="100%" frameborder="0" style="border:0; height: 70vh;" allowfullscreen></iframe>
      </div>
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
      scrollAnimated: true,
      scrollInt: 0
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
    await this.mainGetData()
    if (this.getMainData) {
      let aboutUs = this.getMainData.about_us
      let logo = this.getMainData.logo
      this.aboutUs.content = aboutUs[this.$t('prefix')]
      this.aboutUs.visible = aboutUs[this.$t('prefix')]
      this.logo.image = logo.bgimage
      this.logo.title = logo[this.$t('prefix')]
    }
  },
  mounted () {
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
            this.aboutUs.content = this.getMainData.about_us[this.$t('prefix')]
          }, 100)
          break
      }
    })
  },
  beforeDestroy () {
  },
  methods: {
    ...mapActions([
      'mainGetData'
    ]),
    handleSwipe ({ evt, ...info }) {
      if (this.mobileDetect && evt.touches.length === 1 && info.distance.y >= 8) {
        let sections = this.$('.main__section')
        if (info.direction === 'up' && (this.scrollInt < sections.length - 1)) {
          this.scrollInt++
          this.$('html, body').off().animate({
            scrollTop: this.$(sections[this.scrollInt]).offset().top
          }, 600)
        }
        if (info.direction === 'down' && (this.scrollInt > 0)) {
          this.scrollInt--
          this.$('html, body').off().animate({
            scrollTop: this.$(sections[this.scrollInt]).offset().top
          }, 600)
        }
      }
    }
  }
}
</script>

<style lang='stylus'>
  .main__section
    height: 100vh
    overflow: hidden
    &.contact
      .image_main_contact
        background-image: url('~assets/contact.jpg')
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
      h1
        margin-bottom: 30px
      @media (max-width: 1200px)
        padding: 15px
        h1
          font-size: 40px
          line-height: 40px
          margin-top: 50px
          margin-bottom: 15px
        p
          font-size: 13px
          margin-bottom: 7px
    h1
      text-transform uppercase
      color #fff
  .partners
      background $linear_gradient
      img
        height 100%
    .text
      padding-top 10px
      max-width 400px
      margin auto
      height 100%
      color #fff
      h3
        color #fff
      p
        margin-bottom 30px
      @media (max-width: 1200px)
        padding: 30px
        h3
          font-size: 30px
        p
          font-size: 14px
</style>
