<template>
  <q-layout view="hHh lpR fFf">
    <q-header reveal elevated class="header">
      <q-toolbar>
        <q-toolbar-title>
          <q-btn flat @click="goHome()" class="pl-0 pl-md-3">
            <q-avatar>
              <div class="logo" :style="logoImage"></div>
            </q-avatar>
          </q-btn>
          <span class="ml-3 logo__title" v-if="!mobileDetect">{{logoTitle}}</span>
        </q-toolbar-title>
        <q-space/>
        <template v-if="!mobileDetect">
          <q-btn
            v-if="isAdmin"
            type="button"
            color="deep-orange-6"
            to="/admin"
            :label="$t('go_to_admin_panel')"
            class="ml-3"
            icon="airplay" :tabindex="0"/>
          <q-btn color="light-green-13" outline class="mx-2 glossy" @click="openUrl('http://aluzswlu.ort.uz/auth/login')">
            {{$t('srs_btn')}}
          </q-btn>
        </template>
        <q-btn-dropdown color="yellow-12" :label="sidebarApplication.title" class="text-black">
          <q-list>
            <q-item clickable v-close-popup
              v-for="(elem, i) in sidebarApplication.children"
              :key="i"
              :to="elem.path"
              active-class="bg-cyan-6 text-white"
              dense
            >
              <q-item-section>
                <q-item-label>{{elem.title}}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
        <q-select
          v-model="lang"
          :options="langOptions"
          emit-value
          map-options
          class="change_lang ml-3 mr-2"
          color="cyan-13"
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
      :width="230"
      show-if-above
      @click.capture="rightDrawerOpen = false"
    >
      <q-list>
        <q-scroll-area
          :thumb-style="thumbStyle"
          style="height: 100vh"
        >
          <q-btn flat class="w-100p pl-2" to="/">
            <q-avatar class="mr-auto">
              <div class="logo" :style="logoImage" style="background-size: contain; width: 50px;height: 50px;"></div>
            </q-avatar>
          </q-btn>
          <q-item
            clickable
            to="/admin"
            v-if="isAdmin && mobileDetect"
            dense
          >
            <q-item-section avatar class="pr-0" style="min-width: 35px;">
              <q-icon name="airplay" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{$t('go_to_admin_panel')}}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            v-for="(item, i) in sidebarPages"
            dense
            active-class="sidebar-menu__link"
            :class="item.icon"
            :key="i"
            clickable
            :to="item"
          >
            <q-item-section>
              <q-item-label>{{item.title}}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable tag="a" v-if="mobileDetect" target="_blank" href="http://aluzswlu.ort.uz/auth/login">
            <q-item-section>
              <q-item-label>{{$t('srs_btn')}}</q-item-label>
            </q-item-section>
          </q-item>
        </q-scroll-area>
      </q-list>
      <div class="absolute" v-if="rightDrawerOpen" style="top: 55px; right: 218px; z-index: 9999;">
        <q-btn
          dense
          round
          class="glossy"
          color="deep-orange-6"
          icon="chevron_right"
          @click="rightDrawerOpen = false"
        />
      </div>
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
    <q-page-scroller @click="refreshScrollIntIndex" position="bottom-right" :scroll-offset="100" :offset="[18, 18]">
      <q-btn fab style="color: #fff;height: 40px; width: 40px; background: linear-gradient(rgba(48, 73, 107, .9), rgba(48, 184, 210, .9));" icon="keyboard_arrow_up"/>
    </q-page-scroller>
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
      getLogo: {},
      model: null,
      isAdmin: false,
      rightDrawerOpen: false,
      lang: this.$q.lang.isoName,
      languages: languages,
      langOptions: [
        { label: 'Ru', value: 'ru' },
        { label: 'En', value: 'en-us' },
        { label: 'Uz', value: 'uz' }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'getThumbStyle',
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
    },
    sidebarApplication () {
      return {
        title: this.$t('sidebarPages').application,
        path: 'application',
        children: [
          { title: this.$t('sidebarPages').resident, path: '/resident', icon: 'account_circle' },
          { title: this.$t('sidebarPages').non_resident, path: '/non-resident', icon: 'account_circle' }
        ]
      }
    },
    sidebarPages () {
      return [
        { title: this.$t('sidebarPages').about_us, path: '/about-us', icon: 'pages' },
        { title: this.$t('sidebarPages').teachers, path: '/teachers', icon: 'pages' },
        { title: this.$t('sidebarPages').event, path: '/events', icon: 'pages' },
        // { title: this.$t('sidebarPages').blog, path: '/blog', icon: 'pages' },
        { title: this.$t('sidebarPages').extra_classes, path: '/extra-classes', icon: 'pages' },
        { title: this.$t('sidebarPages').gallery, path: '/gallery', icon: 'pages' },
        // { title: this.$t('sidebarPages').statistics, path: '/statistics', icon: 'pages' },
        { title: this.$t('sidebarPages').faq, path: '/faq', icon: 'pages' },
        { title: this.$t('sidebarPages').partners, path: '/partners', icon: 'pages' }
        // { title: this.$t('sidebarPages').contests, path: '/contests', icon: 'pages' },
        // { title: this.$t('sidebarPages').regulations, path: '/regulations', icon: 'pages' },
        // { title: this.$t('sidebarPages').contacts, path: '/contacts', icon: 'pages' }
      ]
    },
    logoTitle () {
      return this.getLogo[this.$t('prefix')]
    },
    logoImage () {
      return this.getLogo.bgimage
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
      this.$q.notify({
        color: 'cyan',
        icon: 'check_circle',
        message: this.$t(lang),
        position: 'top',
        timeout: 200
      })
    }
  },
  async beforeMount () {
    let res = await this.$axios.post('get_logo')
    this.getLogo = res.data[0]
    this.$axios.defaults.headers.Authorization = 'Bearer ' + this.getToken
    this.$axios.get('user').then(res => {
      if (+res.data.is_admin === 1) this.isAdmin = true
    })
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
          break
      }
    })
  },
  methods: {
    ...mapActions([
      'refreshScrollIntIndex',
      'mainGetData',
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
    .q-toolbar__title
      flex: 1 1 15%
    .logo
      width: 60px
      height: 40px
      background-size: contain
      background-repeat no-repeat
    .logo__title
      font-size: 14px
    .q-field--standard .q-field__control:before
      border none
    .q-avatar__content
      border-radius unset
    .change_lang
      .q-field__native, .q-field__append
        color #fff
  .footer
    background $indigo-4
    padding 20px
  .sidebar
    background: $bg-grey-1
    &-menu__link.home
      background: none
      color: #000
    &-menu__link
      background: $cyan
      color: #fff
</style>
