<template>
  <q-page class="main smooth" v-touch-swipe.mouse="handleSwipe">
    <section class="main__section main__about__us cursor-pointer" v-if="aboutUs.visible" @click="$router.push('/about-us')">
      <div class="wrap">
        <div class="content" v-html="aboutUs.content"></div>
      </div>
    </section>
    <section class="main__section main__teachers cursor-pointer flex items-center" @click="$router.push('/teachers')">
      <div class="wrap">
        <div class="content row q-col-gutter-md q-pa-md">
          <div class="col-12"><h3 class="text-center mb-2 mt-5">Our teachers</h3></div>
          <div class="col-10 col-sm-4 col-md-3 m-auto m-sm-0" v-for="teacher in teachers" :key="teacher.id">
            <q-card class="my-card">
              <q-img class="cursor-pointer" @click="$router.push('/teacher/show/' + teacher.id)" placeholder-src="/statics/avatar04.png" contain :src="'/storage/' + teacher.photo" :ratio="1" transition="fade" spinner-color="cyan"></q-img>
              <q-card-section>
                <div class="text-h6">{{teacher.name}}</div>
                <div class="text-h6">{{teacher.surname}}</div>
                <div class="text-subtitle2">Age: {{teacher.age}}</div>
                <div class="text-subtitle2">{{teacher['subject_' + $t('prefix')]}}</div>
              </q-card-section>
              <q-card-section>
                {{teacher['about_me_' + $t('prefix')]}}
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </section>
    <section class="main__section main__events cursor-pointer" @click="$router.push('/events')" v-if="event.visible">
      <div class="wrap">
        <div class="content" v-html="event.content"></div>
      </div>
    </section>
    <section class="main__section main__gallery flex items-center">
      <div class="content w-100p">
        <h3 class="text-center mt-5">Gallery</h3>
        <carousel-3d :height="500" :width="800">
          <slide v-for="(image, i) in galleryImages" :key="i" :index="i">
            <img :src="'/storage/' + image.name" alt="">
          </slide>
        </carousel-3d>
      </div>
    </section>
    <section class="main__section main__faq">
      <div class="wrap">
        <h3 class="text-center mt-5 cursor-pointer" @click="$router.push('/faq')">FAQ</h3>
        <div class="content w-100p">
          <q-expansion-item
            expand-separator
            icon="question_answer"
            :label="(i + 1) + ' - ' + item['question_' + $t('prefix')]"
            header-class="text-white"
            expand-icon-class="text-white"
            v-for="(item, i) in questions"
            :key="item.id"
          >
            <q-card>
              <q-card-section>
                {{item['answer_' + $t('prefix')]}}
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </div>
      </div>
    </section>
    <section class="main__section main__partners cursor-pointer" @click="$router.push('/partners')">
      <div class="row">
        <div class="col-12 col-md-6" v-if="!mobileDetect"><img width="100%" src="~assets/partners.jpg" alt=""></div>
        <div class="col-12 col-md-6">
          <div class="content" v-html="partners.content"></div>
        </div>
      </div>
    </section>
    <section class="main__section main__contact">
      <div class="row">
        <div class="col-12 col-md-8 contact__text">
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
        <iframe class="main__map" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1499.0585282501243!2d69.2538643!3d41.2845568!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8aed1bc42aad%3A0x100df44c6fc28ef8!2z0JDQutCw0LTQtdC80LjRh9C10YHQutC40Lkg0LvQuNGG0LXQuSDihJYyINC_0YDQuCDQo9C30JPQo9Cc0K8!5e0!3m2!1sru!2s!4v1560718949192!5m2!1sru!2s" width="100%" frameborder="0" style="border:0; height: 70vh;" allowfullscreen></iframe>
      </div>
    </section>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { Carousel3d, Slide } from 'vue-carousel-3d'
export default {
  name: 'PageIndex',
  meta: {
    meta: {
      description: { name: 'description', content: 'Home Page 1' },
      keywords: { name: 'keywords', content: 'Home website' }
    }
  },
  components: {
    Carousel3d,
    Slide
  },
  data () {
    return {
      slide: 1,
      scrollInt: 0,
      teachers: [],
      galleryImages: [],
      questions: [],
      aboutUs: {
        visible: true,
        content: ''
      },
      event: {
        visible: true,
        content: ''
      },
      partners: {
        visible: true,
        content: ''
      },
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
    await this.mainGetData()
    if (this.getMainData) {
      let [aboutUs] = this.getMainData.about_us
      this.aboutUs.content = aboutUs[this.$t('prefix')]
      this.aboutUs.visible = aboutUs.visible
      let [event] = this.getMainData.event
      this.event.content = event[this.$t('prefix')]
      this.event.visible = event.visible
      this.teachers = this.getMainData.teachers
      let [partners] = this.getMainData.partners
      this.partners.content = partners['content_' + this.$t('prefix')]
      this.partners.visible = partners.visible
      this.galleryImages = this.getMainData.gallery
      this.questions = this.getMainData.questions
      this.setWidthImages()
    }
  },
  mounted () {
    // smooth scroll
    let sections = this.$('.main__section')
    let th = this
    document.querySelector('.smooth').addEventListener('wheel', function (e) {
      let deltaY = e.deltaY || e.detail || e.wheelDelta
      if (deltaY > 0) {
        // вниз
        if (th.scrollInt < sections.length - 1 && th.scrollAnimated) {
          th.scrollInt++
          th.scrollAnimated = false
          th.$('html, body').off().animate({
            scrollTop: th.$(sections[th.scrollInt]).offset().top
          }, 600, function () {
            th.scrollAnimated = true
          })
        }
      } else {
        // вверх
        if (th.scrollInt > 0 && th.scrollAnimated) {
          th.scrollAnimated = false
          th.scrollInt--
          th.$('html, body').off().animate({
            scrollTop: th.$(sections[th.scrollInt]).offset().top
          }, 600, function () {
            th.scrollAnimated = true
          })
        }
      }
    })
    // End smooth scroll
    this.$store.subscribeAction((action, state) => {
      switch (action.type) {
        case 'refreshScrollIntIndex':
          this.scrollInt = 0
          break
      }
    })
    this.$store.subscribe((mutation, state) => {
      switch (mutation.type) {
        case 'CHANGE_LANG':
          let [aboutUs] = this.getMainData.about_us
          let [event] = this.getMainData.event
          let [partners] = this.getMainData.partners
          setTimeout(() => {
            this.aboutUs.content = aboutUs[this.$t('prefix')]
            this.event.content = event[this.$t('prefix')]
            this.partners.content = partners['content_' + this.$t('prefix')]
          }, 100)
          break
      }
    })
  },
  beforeDestroy () {
  },
  methods: {
    ...mapActions([
      'setWidthImages',
      'refreshScrollIntIndex',
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
  .main
    min-height 100vh !important
    .q-carousel
      height 100vh
    .main__section
      height: 100vh
      overflow: hidden
      &.main__teachers
        background $linear_gradient
        h3
          color: #fff
          margin-top: 100px
      &.main__events
        background $linear_gradient
        color: #fff
        h3
          color: #fff
          margin-top: 100px
      &.main__gallery
        background $linear_gradient
        h3
          color: #fff
          margin-top: 100px
      &.main__faq
        background $linear_gradient
        h3
          color: #fff
          margin-top: 100px
      .contact__text
        background $cyan-1
        display flex
        height 30vh
      &.main__contact
        .image_main_contact
          background-image: url('~assets/contact.jpg')
      &.main__about__us
        background $linear_gradient
        color #fff
        height: 100vh
        .content
          padding: 20px 0
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
      &.main__partners
        background $linear_gradient
        img
          height 100%
        .content
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
