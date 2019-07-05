<template>
  <div class="col-4">
    <div class="widget">
      <q-card square class="popular__posts py-4 mb-4">
        <h5 class="text-center mt-0 text-uppercase">{{$t('text_popular_posts')}}</h5>
        <div class="post px-4">
          <q-list>
            <template v-for="(item, i) in popular_posts">
              <q-item :key="i">
                <q-item-section>
                  <q-img :src="'storage/' + item.image" placeholder-src="/statics/photo2.png" :ratio="16/9" spinner-size="32px" class="cursor-pointer thumb" @click="goToPost(item.id)"/>
                  <q-item-label class="title mt-1">{{item['title_' + $t('prefix')]}}</q-item-label>
                  <q-item-label caption lines="2" class="desc" v-html="item['description_' + $t('prefix')]"></q-item-label>
                  <q-item-label caption lines="2" class="date"><i class="date">{{item.created_at}}</i></q-item-label>
                </q-item-section>
              </q-item>
              <q-separator spaced inset :key="i + '-separator'" v-if="i + 1 < popular_posts.length"/>
            </template>
          </q-list>
        </div>
      </q-card>
      <q-card square class="featured__posts py-4 mb-4">
        <h5 class="text-center mt-0 text-uppercase">{{$t('text_featured_posts')}}</h5>
        <div class="post px-4">
          <q-carousel
            animated
            v-model="slide"
            infinite
            swipeable
            style="height: auto;"
            autoplay
            arrows
          >
            <q-carousel-slide :name="1" class="column no-wrap flex-center"
              v-for="(item, i) in featured_posts" :key="i"
            >
              <q-img :src="'storage/' + item.image" placeholder-src="/statics/photo2.png" :ratio="16/9" spinner-size="32px" class="cursor-pointer" @click="goToPost(item.id)"/>
              <div class="post-content absolute custom-caption text-white">
                <h6 class="title m-0">{{item['title_' + $t('prefix')]}}</h6>
              </div>
            </q-carousel-slide>
          </q-carousel>
        </div>
      </q-card>
      <q-card square class="recent__posts py-4 mb-4">
        <h5 class="text-center mt-0 text-uppercase">{{$t('text_recent_posts')}}</h5>
        <div class="post px-4">
          <q-list>
            <template v-for="(item, i) in recent_posts">
              <q-item :key="i">
                <q-item-section>
                  <q-img :src="'storage/' + item.image" placeholder-src="/statics/photo2.png" :ratio="16/9" spinner-size="32px" class="cursor-pointer" @click="goToPost(item.id)"/>
                  <q-item-label class="title mt-1">{{item['title_' + $t('prefix')]}}</q-item-label>
                  <q-item-label caption lines="2" class="desc" v-html="item['description_' + $t('prefix')]"></q-item-label>
                  <q-item-label caption lines="2"><i class="date">{{item.created_at}}</i></q-item-label>
                </q-item-section>
              </q-item>
              <q-separator spaced inset :key="i + '-separator'" v-if="i + 1 < recent_posts.length"/>
            </template>
          </q-list>
        </div>
      </q-card>
      <q-card square class="categories py-4 mb-4">
        <h5 class="text-center mt-0 text-uppercase">{{$t('text_categories')}}</h5>
        <div class="px-4">
          <q-list>
            <template v-for="(item, i) in categories">
              <q-item :key="i">
                <q-item-section>
                  <q-item-label class="cursor-pointer" @click="goToCategory(item.category.id)">{{item.category['title_' + $t('prefix')]}} {{item.category.id}}</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-item-label caption>({{item.number_of_posts}})</q-item-label>
                </q-item-section>
              </q-item>
              <q-separator spaced inset :key="i + '-separator'" v-if="i + 1 < categories.length"/>
            </template>
          </q-list>
        </div>
      </q-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  props: {
    popular_posts: Array,
    categories: Array,
    featured_posts: Array,
    recent_posts: Array
  },
  data () {
    return {
      slide: 1
    }
  },
  methods: {
    goToPost (id) {
      this.$emit('goToPost', id)
    },
    goToCategory (id) {
      this.$emit('goToCategory', id)
      this.$('.q-scrollarea .scroll').delay(200).animate({ scrollTop: 0 }, 400)
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
