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
        <q-select
          v-model="lang"
          :options="langOptions"
          emit-value
          map-options
          class="change_lang"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      content-class="bg-cyan"
      side="left"
      class="admin__sidebar"
    >
      <q-list>
        <q-item clickable to="/admin/resident">
          <q-item-section avatar>
            <q-icon name="school" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Анкета(Resident)</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <transition name="fade">
        <router-view />
      </transition>
    </q-page-container>
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
      this.$cookies.set('local_lang', lang)
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
    // START changeLang
    if (!this.getLangPr) {
      this.changeLang(navigator.language.split('-')[0])
      import(`quasar/lang/${this.getLangPr}`).then(lang => {
        this.$q.lang.set(lang.default)
      })
    }
    this.$cookies.set('local_lang', this.getLangPr)
    this.$i18n.locale = this.getLangPr
    // END changeLang
  },
  created () {
  },
  methods: {
    ...mapActions([
      'openUrl',
      'changeLang'
    ])
  }
}
</script>

<style lang="stylus" scope>
  .admin__header
    background linear-gradient(-180deg,$cyan 11%,$indigo 75%) !important
  .change_lang
    .q-field__native, .q-field__append
      color #fff
  .admin__sidebar
    .q-list
      height 100%
      color $grey-1
</style>
