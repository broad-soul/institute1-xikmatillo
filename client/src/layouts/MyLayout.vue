<template>
  <q-layout view="hHh lpR fFf">
    <q-header reveal elevated class="header">
      <q-toolbar>
        <q-toolbar-title>
          <q-btn flat @click="goHome()">
            <q-avatar>
              <img src="~assets/logo.png" alt="logo">
            </q-avatar>
          </q-btn>
        </q-toolbar-title>
        <q-space/>
        <q-btn
          v-if="isAdmin"
          flat
          type="button"
          to="/admin"
          label="go to admin panel"
          class="ml-3"
          icon="home" :tabindex="0"/>
        <template v-if="!mobileDetect">
          <q-btn-toggle
            v-model="navbarMenu"
            stretch
            flat
            toggle-color="teal-13"
            :options="[
              {label: $t('navbarName')[0], value: '/resident'},
              {label: $t('navbarName')[2], value: '/non-resident'},
              {label: $t('navbarName')[1], value: '/faq'}
            ]"
          />
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
          v-if="mobileDetect"
        >
          <q-icon name="menu" />
        </q-btn>
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="rightDrawerOpen"
      content-class="bg-blue-3"
      side="right"
    >
      <q-list>
        <q-item clickable to="/resident">
          <q-item-section avatar>
            <q-icon name="school" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Анкета(Resident)</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable to="/faq">
          <q-item-section avatar>
            <q-icon name="school" />
          </q-item-section>
          <q-item-section>
            <q-item-label>F.A.Q</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable to="/no-resident">
          <q-item-section avatar>
            <q-icon name="school" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Анкета(NOT A Resident)</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_blank" href="http://aluzswlu.ort.uz/auth/login">
          <q-item-section avatar>
            <q-icon name="school" />
          </q-item-section>
          <q-item-section>
            <q-item-label>S.R.S</q-item-label>
          </q-item-section>
        </q-item>
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
    <div class="contact">
      <h3>CONTACT</h3>
      <a href="tel:+998903500202"><q-icon name="mdi-phone" /> 998903500202</a>
      <br>
      <br>
      <a href="tel:+998955252323"><q-icon name="mdi-phone" /> 998955252323</a>
    </div>
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
  computed: {
    ...mapGetters([
      'getToken',
      'mobileDetect',
      'getLangPr'
    ])
  },
  data () {
    return {
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
      navbarMenu: null
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
        color: 'secondary',
        icon: 'home',
        message: 'Язык переключен на ' + lang,
        position: 'top-right',
        timeout: 200
      })
    },
    navbarMenu (val) {
      this.$router.push(val)
    }
  },
  created () {
    this.$axios.defaults.headers.Authorization = 'Bearer ' + this.getToken
    this.$axios.get('user').then(res => { if (res.data.is_admin === 1) this.isAdmin = true })
  },
  mounted () {
    this.navbarMenu = this.$route.path
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
  },
  methods: {
    ...mapActions([
      'openUrl',
      'changeLang'
    ]),
    goHome () {
      this.navbarMenu = ''
      this.$router.push('/')
    }
  }
}
</script>

<style lang="stylus" scope>
  .header
    background $linear_gradient
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
</style>
