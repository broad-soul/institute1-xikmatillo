<template>
  <q-layout view="hHh lpR fFf">
    <q-header reveal elevated class="admin__header">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          color="white"
        >
          <q-icon name="menu" />
        </q-btn>
        <q-toolbar-title>
          <q-btn flat to="/admin">
            <q-avatar>
              <img src="~assets/logo.png" alt="logo">
            </q-avatar>
          </q-btn>
        </q-toolbar-title>
        <q-space/>
        <q-btn
          flat
          type="button"
          to="/"
          label="Go to site"
          class="mr-3"
          icon="home" :tabindex="0"/>
        <q-select
          v-model="lang"
          :options="langOptions"
          emit-value
          map-options
          class="change_lang"
        />
        <q-btn
          flat
          type="button"
          @click="logOut"
          label="Logout"
          class="ml-3"
          icon="home" :tabindex="0"/>
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="leftDrawerOpen"
      content-class="bg-cyan-3"
      side="left"
      class="admin__sidebar"
    >
      <q-list class="pt-3">
        <q-item clickable to="/admin/residents">
          <q-item-section avatar>
            <q-icon name="supervisor_account" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Residents</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable to="/admin/non-residents">
          <q-item-section avatar>
            <q-icon name="supervisor_account" />
          </q-item-section>
          <q-item-section>
            <q-item-label>NonResidents</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>
    <q-page-container>
      <transition name="fade">
        <keep-alive :include="['AdminResidents', 'AdminShowResident']">
          <router-view />
        </keep-alive>
      </transition>
    </q-page-container>
    <q-page-scroller position="bottom-right" :scroll-offset="600" :offset="[18, 18]">
      <q-btn fab style="color: #fff;height: 50px; width: 50px; background: linear-gradient(rgba(48, 73, 107, .9), rgba(48, 184, 210, .9));" icon="keyboard_arrow_up"/>
    </q-page-scroller>
  </q-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import languages from 'quasar/lang/index.json'

export default {
  name: 'MyLayout',
  meta: {
    title: 'Admin'
  },
  data () {
    return {
      model: null,
      leftDrawerOpen: true,
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
        position: 'center',
        timeout: 200
      })
    },
    navbarMenu (val) {
      this.$router.push(val)
    }
  },
  computed: {
    ...mapGetters([
      'mobileDetect',
      'getLangPr',
      'getToken'
    ])
  },
  created () {
  },
  mounted () {
    // START changeLang
    if (!this.getLangPr) {
      this.changeLang(navigator.language.split('-')[0])
      import(`quasar/lang/${this.getLangPr}`).then(lang => {
        this.$q.lang.set(lang.default)
      })
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
    logOut () {
      this.$axios.defaults.headers.Authorization = 'Bearer ' + this.getToken
      this.$axios.post('logout').then(() => {
        localStorage.removeItem('access_token')
        this.$router.push('/')
      })
    }
  }
}
</script>

<style lang="stylus" scope>
  .admin__header
    background $linear_gradient
  .change_lang
    .q-field__native, .q-field__append
      color #fff
  .admin__sidebar
    .q-list
      height 100%
      color $grey-1
</style>
