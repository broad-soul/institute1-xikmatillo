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
        style="height: calc(100vh - 56px)"
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
            <template v-for="(item, i) in sidebarPagesAdmin">
              <q-item clickable :to="item.path"
                active-class="admin__sidebar-menu__link"
                :key="i"
                dense
                v-if="item.path !== 'application'"
              >
                <q-item-section>
                  <q-item-label>{{item.title}}</q-item-label>
                </q-item-section>
              </q-item>
              <q-expansion-item
                dense-toggle
                :key="i"
                v-if="item.path === 'application'"
                expand-separator
                :label="item.title"
                class="expand"
                dense
              >
                <q-item clickable :to="elem.path"
                  active-class="admin__sidebar-menu__link"
                  v-for="(elem, i) in item.children"
                  :key="i"
                  style="padding-left: 30px;"
                  dense
                >
                  <q-item-section>
                    <q-item-label>{{elem.title}}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-expansion-item>
            </template>
          </q-expansion-item>
          <q-item clickable to="/admin/titles" active-class="admin__sidebar-menu__link">
            <q-item-section avatar>
              <q-icon name="supervisor_account" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Titles</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable to="/admin/categories" active-class="admin__sidebar-menu__link">
            <q-item-section avatar>
              <q-icon name="mdi-playlist-minus" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Categories</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable to="/admin/tags" active-class="admin__sidebar-menu__link">
            <q-item-section avatar>
              <q-icon name="mdi-pound" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Tags</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable to="/admin/settings" active-class="admin__sidebar-menu__link">
            <q-item-section avatar>
              <q-icon name="mdi-settings" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Settings</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>
    <q-page-container>
      <transition name="fade">
        <keep-alive :include="[]">
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
      this.$i18n.locale = lang
      this.$q.cookies.set('local_lang', this.$t('prefix'))
      this.$q.notify({
        color: 'teal',
        icon: 'check_circle',
        message: this.$t(lang),
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
    },
    sidebarPagesAdmin () {
      return [
        { title: this.$t('sidebarPagesAdmin').main, path: '/admin/main', icon: 'home' },
        { title: this.$t('sidebarPagesAdmin').about_us, path: '/admin/about-us', icon: 'bookmark_border' },
        {
          title: this.$t('sidebarPagesAdmin').application,
          path: 'application',
          children: [
            { title: this.$t('sidebarPagesAdmin').resident, path: '/admin/residents', icon: 'account_circle' },
            { title: this.$t('sidebarPagesAdmin').non_resident, path: '/admin/non-residents', icon: 'account_circle' }
          ]
        },
        { title: this.$t('sidebarPagesAdmin').teachers, path: '/admin/teachers', icon: 'bookmark_border' },
        { title: this.$t('sidebarPagesAdmin').event, path: '/admin/event', icon: 'bookmark_border' },
        { title: this.$t('sidebarPagesAdmin').posts, path: '/admin/posts', icon: 'bookmark_border' },
        { title: this.$t('sidebarPagesAdmin').extra_classes, path: '/admin/extra-classes', icon: 'bookmark_border' },
        { title: this.$t('sidebarPagesAdmin').gallery, path: '/admin/gallery', icon: 'bookmark_border' },
        { title: this.$t('sidebarPagesAdmin').statistics, path: '/admin/statistics', icon: 'bookmark_border' },
        { title: this.$t('sidebarPagesAdmin').faq, path: '/admin/faq', icon: 'bookmark_border' },
        { title: this.$t('sidebarPagesAdmin').partners, path: '/admin/partners', icon: 'bookmark_border' },
        { title: this.$t('sidebarPagesAdmin').contests, path: '/admin/contests', icon: 'bookmark_border' },
        { title: this.$t('sidebarPagesAdmin').regulations, path: '/admin/regulations', icon: 'bookmark_border' },
        { title: this.$t('sidebarPagesAdmin').contacts, path: '/admin/contacts', icon: 'bookmark_border' }
      ]
    }
  },
  beforeMount () {
    this.$axios.defaults.headers.Authorization = 'Bearer ' + this.getToken
    this.$('body').addClass('admin')
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
