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
    <section class="main__section main__extra__classes flex items-center relative-position">
      <div class="wrap">
        <h3 class="text-center mt-0 absolute" style="top: 50px;z-index: 9999;left: 50%;transform:translate(-50%)">Extra classes</h3>
        <div class="content">
          <carousel :paginationEnabled="false" :per-page="1" :perPageCustom="[[768, 1], [992, 2], [1200, 3]]">
            <slide v-for="(item, i) in extraClasses" :key="i" class="p-3">
              <q-img class="cursor-pointer" placeholder-src="/statics/avatar04.png" contain :src="'/storage/' + item.image" :ratio="1" transition="fade" spinner-color="cyan" @click="$router.push('/extra-classes')"></q-img>
              <div class="desc" v-html="item['description_' + $t('prefix')]"></div>
            </slide>
          </carousel>
        </div>
      </div>
    </section>
    <section class="main__section main__gallery flex items-center relative-position">
      <h3 class="text-center mt-0 absolute" style="top: 50px;z-index: 9999;left: 50%;transform:translate(-50%)">Gallery</h3>
      <div class="content w-100p">
        <carousel :paginationEnabled="false" :per-page="1" :perPageCustom="[[768, 2], [992, 3], [1200, 4]]">
          <slide v-for="(image, i) in galleryImages" :key="i">
            <q-img class="cursor-pointer" placeholder-src="/statics/avatar04.png" contain :src="'/storage/' + image.name" :ratio="1" transition="fade" spinner-color="cyan"></q-img>
          </slide>
        </carousel>
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
            <h5 class="my-3">{{contacts['title_' + $t('prefix')]}}</h5>
            <div v-html="contacts['content_' + $t('prefix')]"></div>
            <a :href="'tel:' + contacts.phone1" style="text-decoration: none;color: #333;">
              <q-icon name="phone" /> {{contacts.phone1}}
            </a>
          </div>
        </div>
        <div class="col-12 col-md-4">
          <div class="image_main_contact" style="width: 100%;height: 100%;background-size: 100% 100%;background-repeat: no-repeat"></div>
        </div>
      </div>
      <div class="row">
        <div class="main__map" v-html="contacts.map_iframe"></div>
      </div>
    </section>
  </q-page>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'PageIndex',
  meta: {
    meta: {
      description: { name: 'description', content: 'Home Page 1' },
      keywords: { name: 'keywords', content: 'Home website' }
    }
  },
  components: {
    Carousel,
    Slide
  },
  data () {
    return {
      contacts: [],
      extraClasses: [],
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
      [this.contacts] = this.getMainData.contacts
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
      this.extraClasses = this.getMainData.extra_classes
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
      .contact__text
        background $cyan-1
        display flex
        height 30vh
      &.main
        &__teachers
          background $linear_gradient
          h3
            color: #fff
            margin-top: 100px
        &__events
          background $linear_gradient
          color: #fff
          h3
            color: #fff
            margin-top: 100px
        &__extra__classes
          background $linear_gradient
          color: #fff
          h3
            color: #fff
            margin-top: 100px
        &__gallery
          background $linear_gradient
          h3
            color: #fff
            margin-top: 100px
        &__faq
          background $linear_gradient
          h3
            color: #fff
            margin-top: 100px
        &__contact
          .image_main_contact
            background-image: url('~assets/contact.jpg')
          .main__map
            width: 100%
            iframe
              width: 100%
              height: 70vh
              padding: 0
        &__about__us
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
        &__partners
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
