<template>
  <q-layout view="hHh lpR fFf">
    <q-header reveal elevated class="header">
      <q-toolbar>
        <q-toolbar-title>
          <q-btn flat @click="goHome()">
            <q-avatar>
              <div class="logo" :style="logo.image"></div>
            </q-avatar>
            <span class="ml-3">{{logo.title}}</span>
          </q-btn>
        </q-toolbar-title>
        <q-space/>
        <q-btn
          v-if="isAdmin"
          flat
          type="button"
          to="/admin"
          :label="$t('go_to_admin_panel')"
          class="ml-3"
          icon="airplay" :tabindex="0"/>
        <template v-if="!mobileDetect">
          <q-btn flat color="white" class="mr-3" @click="openUrl('http://aluzswlu.ort.uz/auth/login')">
            S.R.S
          </q-btn>
        </template>
        <q-select
          v-model="lang"
          :options="langOptions"
          emit-value
          map-options
          class="change_lang"
        />
        <q-btn
          flat
          dense
          round
          @click="rightDrawerOpen = !rightDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="rightDrawerOpen"
      content-class="sidebar"
      side="right"
      behavior="mobile"
    >
      <q-list>
        <q-scroll-area
          :thumb-style="thumbStyle"
          style="height: 100vh"
        >
          <q-item
            active-class="sidebar-menu__link"
            v-for="(item, i) in sidebarPages"
            :key="i"
            clickable
            :to="item"
          >
            <q-item-section avatar>
              <q-icon :name="item.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{item.title}}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable tag="a" v-if="mobileDetect" target="_blank" href="http://aluzswlu.ort.uz/auth/login">
          <q-item-section avatar>
            <q-icon name="school" />
          </q-item-section>
          <q-item-section>
            <q-item-label>S.R.S</q-item-label>
          </q-item-section>
        </q-item>
        </q-scroll-area>
      </q-list>
    </q-drawer>
    <q-page-container>
      <transition
        appear
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
      >
        <router-view />
      </transition>
    </q-page-container>
    <q-page-scroller position="bottom-right" :scroll-offset="600" :offset="[18, 18]">
      <q-btn fab style="color: #fff;height: 50px; width: 50px; background: linear-gradient(rgba(48, 73, 107, .9), rgba(48, 184, 210, .9));" icon="keyboard_arrow_up"/>
    </q-page-scroller>
    <footer class="footer">
      Footer
    </footer>
  </q-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import languages from 'quasar/lang/index.json'

export default {
  name: 'MyLayout',
  meta: {
    title: 'You site'
  },
  data () {
    return {
      logo: {
        image: '',
        title: ''
      },
      mainData: {},
      model: null,
      isAdmin: false,
      rightDrawerOpen: false,
      lang: this.$q.lang.isoName,
      languages: languages,
      langOptions: [
        { label: 'Ru', value: 'ru' },
        { label: 'En', value: 'en-us' },
        { label: 'Uz', value: 'uz' }
      ],
      sidebarPages: [
        { title: this.$t('sidebarPages').home, path: '/', icon: 'home' },
        { title: this.$t('sidebarPages').about_us, path: '/about-us', icon: 'pages' },
        { title: this.$t('sidebarPages').resident, path: '/resident', icon: 'pages' },
        { title: this.$t('sidebarPages').non_resident, path: '/non-resident', icon: 'pages' },
        { title: this.$t('sidebarPages').teachers, path: '/teachers', icon: 'pages' },
        { title: this.$t('sidebarPages').event, path: '/event', icon: 'pages' },
        { title: this.$t('sidebarPages').blog, path: '/blog', icon: 'pages' },
        { title: this.$t('sidebarPages').extra_classes, path: '/extra-classes', icon: 'pages' },
        { title: this.$t('sidebarPages').gallery, path: '/gallery', icon: 'pages' },
        { title: this.$t('sidebarPages').statistics, path: '/statistics', icon: 'pages' },
        { title: this.$t('sidebarPages').faq, path: '/faq', icon: 'pages' },
        { title: this.$t('sidebarPages').partners, path: '/partners', icon: 'pages' },
        { title: this.$t('sidebarPages').contests, path: '/contests', icon: 'pages' },
        { title: this.$t('sidebarPages').regulations, path: '/regulations', icon: 'pages' },
        { title: this.$t('sidebarPages').contacts, path: '/contacts', icon: 'pages' }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'getMainData',
      'getToken',
      'mobileDetect',
      'getLangPr'
    ]),
    thumbStyle () {
      return {
        right: '2px',
        borderRadius: '5px',
        backgroundColor: 'teal',
        width: '5px',
        opacity: 0.75
      }
    }
  },
  watch: {
    lang (lang) {
      import(`quasar/lang/${lang}`).then(lang => {
        this.$q.lang.set(lang.default)
      })
      this.changeLang(lang)
      this.$q.cookies.set('local_lang', lang)
      this.$i18n.locale = lang
      this.logo.title = this.mainData.logo[this.$t('prefix')]
      this.$q.notify({
        color: 'cyan',
        icon: 'check_circle',
        message: this.$t(lang),
        position: 'top',
        timeout: 200
      })
    }
  },
  beforeMount () {
    this.$axios.defaults.headers.Authorization = 'Bearer ' + this.getToken
    this.$axios.get('user').then(res => { if (res.data.is_admin === 1) this.isAdmin = true })
  },
  mounted () {
    // START changeLang
    if (!this.getLangPr) {
      this.changeLang(navigator.language.split('-')[0])
      import(`quasar/lang/${this.getLangPr}`).then(lang => this.$q.lang.set(lang.default))
      setTimeout(() => {
        console.log(this.$q.lang.isoName)
      }, 100)
    }
    this.$q.cookies.set('local_lang', this.getLangPr)
    this.$i18n.locale = this.getLangPr
    // END changeLang
    this.$store.subscribe((mutation, state) => {
      switch (mutation.type) {
        case 'SET_MAIN_DATA':
          this.mainData = this.getMainData
          this.logo.image = this.mainData.logo.bgimage
          this.logo.title = this.mainData.logo[this.$t('prefix')]
          break
      }
    })
  },
  methods: {
    ...mapActions([
      'openUrl',
      'changeLang'
    ]),
    goHome () {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="stylus" scope>
  .header
    background $linear_gradient
    .logo
      width: 60px
      height: 40px
      background-size: contain
      background-repeat no-repeat
    .q-field--standard .q-field__control:before
      border none
  .q-avatar__content
    border-radius unset
  .contact
    background #eee
    padding 20px
    text-align center
  .footer
    background $indigo-4
    padding 20px
  .change_lang
    .q-field__native, .q-field__append
      color #fff
  .sidebar
    background: $bg-grey-1
    &-menu__link:first-child
      background: none
      color: #000
    &-menu__link
      background: $cyan
      color: #fff
</style>
