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
        <template v-if="!mobileDetect">
          <q-btn-toggle
            v-model="navbarMenu"
            stretch
            flat
            toggle-color="teal-13"
            :options="[
              {label: $t('navbarName')[0], value: '/resident'},
              {label: $t('navbarName')[1], value: '/faq'},
              {label: $t('navbarName')[2], value: '/not-resident'}
            ]"
          />
          <q-btn flat color="white" @click="openUrl('http://aluzswlu.ort.uz/auth/login')">
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
      <transition name="fade">
        <router-view />
      </transition>
    </q-page-container>
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
  data () {
    return {
      model: null,
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
    },
    navbarMenu (val) {
      this.$router.push(val)
    }
  },
  computed: {
    ...mapGetters([
      'mobileDetect',
      'getLangPr'
    ])
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
  created () {
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
    background linear-gradient(145deg,$cyan-12 11%,$indigo 75%) !important
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
