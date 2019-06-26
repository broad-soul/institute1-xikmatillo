<template>
  <q-scroll-area
    :thumb-style="getThumbStyle"
    style="height: calc(100vh - 56px)"
  >
    <q-page class="teachers">
      <div class="teachers-header">
        <div class="wrap">
          <h3 class="m-0 mb-3">Teachers</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque dolor eius eum facere magnam nihil odit perferendis quas ratione unde.</p>
        </div>
      </div>
      <div class="wrap">
        <div class="row q-col-gutter-md">
          <div class="col-10 col-sm-6 col-md-3 m-auto m-sm-0" v-for="teacher in teachers" :key="teacher.id">
            <q-card class="my-card">
              <!--class="cursor-pointer" @click="$router.push('/teacher/show/' + teacher.id)"-->
              <q-img placeholder-src="/statics/avatar04.png" contain :src="'/storage/' + teacher.photo" :ratio="1" transition="fade" spinner-color="cyan"></q-img>
              <q-card-section>
                <div class="text-h6">{{teacher.name}}</div>
                <div class="text-h6">{{teacher.surname}}</div>
                <div class="text-subtitle2">Age: {{teacher.age}}</div>
                <div class="text-subtitle2">{{teacher['subject_' + $t('prefix')]}}</div>
              </q-card-section>
              <q-card-section>
                {{teacher['about_me_' + $t('prefix')]}}
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
      <footer class="mt-5">footer</footer>
    </q-page>
  </q-scroll-area>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Teachers',
  meta: {
    titleTemplate: title => `${title} - Teachers`,
    meta: {
      description: { name: 'description', content: 'Teachers Page 1' },
      keywords: { name: 'keywords', content: 'Teachers website' }
    }
  },
  data () {
    return {
      teachers: []
    }
  },
  computed: {
    ...mapGetters([
      'getThumbStyle',
      'mobileDetect'
    ])
  },
  beforeMount () {
    this.$axios.get('get_teachers').then(res => {
      this.teachers = res.data
    })
  }
}
</script>

<style lang="stylus" scoped>
  .teachers
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
</style>
