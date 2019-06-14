<template>
  <q-layout view="hHh lpR fFf">
    <q-header reveal class="admin__header">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          color="black"
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
        <q-btn
          flat
          type="button"
          @click="logOut"
          label="Logout"
          class="ml-3"
          icon="logout"
          :tabindex="0"/>
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="leftDrawerOpen"
      content-class="admin__sidebar"
      side="left"
      :width="220"
      style="font-size: 12px;"
    >
      <q-scroll-area
        :thumb-style="thumbStyle"
        style="height: calc(100vh - 60px)"
      >
        <q-list class="pt-3">
          <q-item clickable to="/admin" class="text-cyan-1">
            <q-item-section avatar>
              <q-icon name="dashboard" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Dashboard</q-item-label>
            </q-item-section>
          </q-item>
          <q-expansion-item
            expand-separator
            icon="bookmark"
            :label="$t('pages')"
            group="somegroup"
            header-class="text-teal"
            class="expand"
          >
            <q-item clickable to="/admin/main" active-class="admin__sidebar-menu__link">
              <q-item-section avatar>
                <q-icon name="bookmark_border" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{$t('sidebarPagesAdmin')[0]}}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable to="/admin/about-us" active-class="admin__sidebar-menu__link">
              <q-item-section avatar>
                <q-icon name="bookmark_border" />
              </q-item-section>
              <q-item-section>
                <q-item-label>About us</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable to="/admin/residents" active-class="admin__sidebar-menu__link">
              <q-item-section avatar>
                <q-icon name="bookmark_border" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{$t('sidebarPagesAdmin')[1]}}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable to="/admin/non-residents" active-class="admin__sidebar-menu__link">
                  <q-item-section avatar>
                    <q-icon name="bookmark_border" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{$t('sidebarPagesAdmin')[2]}}</q-item-label>
                  </q-item-section>
                </q-item>
          </q-expansion-item>
          <q-item clickable to="/admin/titles" active-class="admin__sidebar-menu__link">
            <q-item-section avatar>
              <q-icon name="supervisor_account" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Titles</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
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
        color: 'teal',
        icon: 'check_circle',
        message: 'Язык переключен на ' + lang,
        position: 'top',
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
    ]),
    thumbStyle () {
      return {
        right: '2px',
        borderRadius: '5px',
        backgroundColor: 'teal',
        width: '5px',
        opacity: 0.75,
        top: '50px'
      }
    }
  },
  beforeMount () {
    this.$axios.defaults.headers.Authorization = 'Bearer ' + this.getToken
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

<style lang="stylus">
  .admin__header
    background #fff
    color: #000
    border-bottom: 1px solid #ccc
    .q-field--standard .q-field__control:before
      border none
  .admin__sidebar
    background: $blue-grey-10
    .expand .q-expansion-item__content
      background: $blue-grey-9
    &-menu__link
      background: $teal-8
    .q-list
      height 100%
      color $grey-1
</style>
