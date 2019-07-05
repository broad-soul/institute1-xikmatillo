<template>
  <q-scroll-area
    :thumb-style="getThumbStyle"
    style="height: calc(100vh - 56px)"
  >
    <q-page class="blog">
      <div class="wrap">
        <div class="row mt-5 q-col-gutter-lg">
          <div class="col-8">
            <q-card square class="mb-4 main__post">
              <q-img style="height: 100%" :src="'/storage/' + post.image" placeholder-src="/statics/photo2.png" :ratio="16/9"  spinner-size="32px" class="main__post-thumb"/>
              <div class="main__post__content p-4 text-center">
                <p class="main__post__content-category m-0 text-cyan cursor-pointer" @click="goToCategory(post.category_id)">
                  {{post['category_' + $t('prefix')]}}
                </p>
                <h4 class="main__post__content-title mt-3 mb-4">
                  {{post['title_' + $t('prefix')]}}
                </h4>
                <div v-html="post['content_' + $t('prefix')]"></div>
                <div class="q-gutter-x-md text-left">
                  <q-btn v-for="item in post.tags" outline :key="item.id" type="" @click="$router.push('/blog/tag/' + item.id)" :label="item['title_' + $t('prefix')]" color="cyan" text-color="" :percentage="10" />
                </div>
                <q-separator class="mt-4 mb-4"/>
                <div style="font-size: 12px;" class="date text-left"><i class="date">{{post.created_at}}</i></div>
              </div>
            </q-card>
          </div>
          <Sidebar
            :popular_posts="popular_posts"
            :categories="categories"
            :featured_posts="featured_posts"
            :recent_posts="recent_posts"
            @goToCategory="goToCategory"
            @goToPost="goToPost"
          />
        </div>
      </div>
      <footer>footer</footer>
    </q-page>
  </q-scroll-area>
</template>

<script>
import { mapGetters } from 'vuex'
import Sidebar from '../components/Sidebar'

export default {
  name: 'Blog',
  meta: {
    titleTemplate: title => `${title} - Blog`,
    meta: {
      description: { name: 'description', content: 'Blog Page 1' },
      keywords: { name: 'keywords', content: 'Blog website' }
    }
  },
  data () {
    return {
      categories: [],
      post: [],
      popular_posts: [],
      featured_posts: [],
      recent_posts: []
    }
  },
  computed: {
    ...mapGetters([
      'getThumbStyle',
      'mobileDetect'
    ])
  },
  beforeMount () {
    this.id = this.$route.params.id
    this.$axios.get('show_post_client/' + this.id).then(res => {
      let data = res.data
      this.post = data.post
      this.popular_posts = data.sidebar.popular_posts
      this.featured_posts = data.sidebar.featured_posts
      this.recent_posts = data.sidebar.recent_posts
      this.categories = data.sidebar.categories
    })
  },
  components: {
    Sidebar
  },
  methods: {
    goToPost (id) {
      this.$router.push('/blog/post/' + id)
      this.$axios.get('views_post/' + id)
      this.$axios.get('show_post_client/' + id).then(res => {
        let data = res.data
        this.post = data.post
        this.popular_posts = data.sidebar.popular_posts
        this.featured_posts = data.sidebar.featured_posts
        this.recent_posts = data.sidebar.recent_posts
        this.categories = data.sidebar.categories
      })
    },
    goToCategory (id) {
      this.$router.push('/blog/category/' + id)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .blog
    display: flex
    flex-direction: column
    footer
      margin-top: auto
      padding: 20px
      background-color: #ccc
</style>
