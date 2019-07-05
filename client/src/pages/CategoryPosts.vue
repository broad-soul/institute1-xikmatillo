<template>
  <q-scroll-area
    :thumb-style="getThumbStyle"
    style="height: calc(100vh - 56px)"
  >
    <q-page class="blog">
      <div class="wrap">
        <div class="row mt-5 q-col-gutter-lg">
          <div class="col-8">
            <div class="row q-col-gutter-lg">
              <div class="col-6" v-for="post in paginatedPosts" :key="post.id">
                <q-card square class="mb-4 ctegories__client">
                  <q-img style="height: 100%" :src="'/storage/' + post.image" placeholder-src="/statics/photo2.png" :ratio="16/9"  spinner-size="32px" class="cursor-pointer main__posts-thumb" @click="goToPost(post.id)"/>
                  <div class="main__posts__content p-4 text-center">
                    <p class="main__posts__content-category m-0 text-cyan" @click="$router.push('/blog/category/' + post.category_id)">
                      <span class="cursor-pointer">{{post['category_' + $t('prefix')]}}</span>
                    </p>
                    <h4 class="main__posts__content-title mt-3 mb-4" @click="goToPost(post.id)">
                      <span class="cursor-pointer">{{post['title_' + $t('prefix')]}}</span>
                    </h4>
                    <q-separator class="mt-4 mb-4"/>
                    <div style="font-size: 12px;" class="date text-left"><i class="date">{{post.created_at}}</i></div>
                  </div>
                </q-card>
              </div>
            </div>
            <q-pagination
              v-model="pageNumber"
              color="cyan"
              :max="pageCount"
              :maxPages="6"
              :boundary-links="true"
              v-if="pageCount > 1"
            >
            </q-pagination>
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
    <PageScroller />
  </q-scroll-area>
</template>

<script>
import { mapGetters } from 'vuex'
import Sidebar from '../components/Sidebar'
import PageScroller from './../components/PageScroller'

export default {
  name: 'CategoryPosts',
  meta: {
    titleTemplate: title => `${title} - CategoryPosts`,
    meta: {
      description: { name: 'description', content: 'CategoryPosts Page' },
      keywords: { name: 'keywords', content: 'CategoryPosts website' }
    }
  },
  data () {
    return {
      category_id: null,
      perPage: 8,
      pageNumber: 1,
      categories: [],
      posts: [],
      popular_posts: [],
      featured_posts: [],
      recent_posts: []
    }
  },
  components: {
    Sidebar,
    PageScroller
  },
  computed: {
    ...mapGetters([
      'getThumbStyle',
      'mobileDetect'
    ]),
    paginatedPosts () {
      const start = (this.pageNumber - 1) * this.perPage
      const end = start + this.perPage
      return this.posts.slice(start, end)
    },
    pageCount () {
      if (this.posts) {
        let l = this.posts.length,
          s = this.perPage
        return Math.ceil(l / s)
      }
      return 0
    }
  },
  beforeMount () {
    this.category_id = this.$route.params.id
    this.getPosts(this.category_id)
  },
  methods: {
    getPosts (id) {
      this.$axios.get('get_category_posts/' + id).then(res => {
        let data = res.data
        this.posts = data.posts
        this.popular_posts = data.sidebar.popular_posts
        this.featured_posts = data.sidebar.featured_posts
        this.recent_posts = data.sidebar.recent_posts
        this.categories = data.sidebar.categories
      }).catch(() => {
        this.$router.push('/blog')
      })
    },
    goToPost (id) {
      this.$router.push('/blog/post/' + id)
      this.$axios.get('views_post/' + id)
    },
    goToCategory (id) {
      if (this.category_id !== id) {}
      console.log(id)
      this.getPosts(id)
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
