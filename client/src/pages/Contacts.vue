<template>
  <q-scroll-area
    :thumb-style="getThumbStyle"
    style="height: calc(100vh - 56px)"
  >
    <q-page class="contacts__page">
      <div class="wrap">
        <q-card>
        <div class="row q-pa-md">
          <div class="col-12 col-md-4">
            <h5 class="my-3">{{contacts['title_' + $t('prefix')]}}</h5>
            <div v-html="contacts['content_' + $t('prefix')]"></div>
            <a :href="'tel:' + contacts.phone1" style="text-decoration: none;color: #333;">
              <q-icon name="phone" /> {{contacts.phone1}}
            </a>
          </div>
          <div class="col-12 col-md-8">
            <div v-html="contacts.map_iframe"></div>
          </div>
        </div>
        </q-card>
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
  name: 'Contacts',
  meta: {
    titleTemplate: title => `${title} - Contacts`,
    meta: {
      description: { name: 'description', content: 'Contacts Page 1' },
      keywords: { name: 'keywords', content: 'Contacts website' }
    }
  },
  components: {
    PageScroller
  },
  data () {
    return {
      contacts: []
    }
  },
  computed: {
    ...mapGetters([
      'mobileDetect',
      'getThumbStyle'
    ])
  },
  beforeMount () {
    this.$axios.get('get_contacts').then(res => {
      if (res.data.length > 0) {
        [this.contacts] = res.data
        this.setWidthImages()
        console.log(this.contacts)
      }
    })
  },
  methods: {
    ...mapActions([
      'setWidthImages'
    ])
  }
}
</script>

<style lang="stylus" scoped>
  .contacts__page
    display: flex
    flex-direction: column
    footer
      margin-top: auto
      padding: 20px
      background-color: #ccc

</style>
