<template>
  <q-scroll-area
    :thumb-style="getThumbStyle"
    style="height: calc(100vh - 56px)"
  >
    <q-page class="contests__page">
      <div class="contests__page-header">
        <div class="wrap">
          <h3 class="mb-2 mt-0">Contests</h3>
          <i>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium adipisci aut cumque debitis, distinctio ea earum eius ex inventore.</i>
        </div>
      </div>
      <div class="row">
        <div class="col-12 col-lg-10 m-auto">
          <div class="row q-pa-md q-col-gutter-md" v-for="item in contests" :key="item.id">
            <div class="col-md-4 col-sm-6 col-12">
              <q-img @click="$router.push('/contests/show/' + item.id)" placeholder-src="/statics/photo2.png" contain :ratio="16/11" position="top" :src="'/storage/' + item.image" class="cursor-pointer"></q-img>
            </div>
            <div class="col-md-8 col-sm-6 col-12">
              <div class="content" v-html="item['description_' + $t('prefix')]"></div>
              <q-btn :to="'/contests/show/' + item.id" flat label="Show more"/>
            </div>
            <div class="col-12">
              <hr>
              <q-space />
            </div>
          </div>
        </div>
      </div>
      <footer>footer</footer>
    </q-page>
    <PageScroller />
  </q-scroll-area>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import PageScroller from './../components/PageScroller'
export default {
  name: 'Contests',
  meta: {
    titleTemplate: title => `${title} - Contests`,
    meta: {
      description: { name: 'description', content: 'Contests Page 1' },
      keywords: { name: 'keywords', content: 'Contests website' }
    }
  },
  components: {
    PageScroller
  },
  data () {
    return {
      contests: []
    }
  },
  computed: {
    ...mapGetters([
      'mobileDetect',
      'getThumbStyle'
    ])
  },
  beforeMount () {
    this.$axios.get('contests/all').then(res => {
      if (res.data.length > 0) {
        this.contests = res.data
        this.setWidthImages()
      }
    })
  },
  methods: {
    ...mapActions([
      'setWidthImages',
      'recaptchaToken',
      'mainGetData'
    ])
  }
}
</script>

<style lang="stylus" scoped>
  .contests__page
    display: flex
    flex-direction: column
    &-header
      background: url(../statics/bg.jpg)
      color: #fff
      height: 250px
      display: flex
      align-items: center
      margin-bottom: 50px
    footer
      margin-top: auto
      padding: 20px
      background-color: #ccc
    .content
      h4
        margin-top: 0
        margin-bottom: 20px
</style>
