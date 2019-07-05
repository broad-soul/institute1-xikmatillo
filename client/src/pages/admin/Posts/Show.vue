<template>
  <q-scroll-area
    :thumb-style="getThumbStyle"
    style="height: calc(100vh - 56px)"
  >
    <q-page class="admin__page__posts">
      <div class="q-pa-md">
        <q-breadcrumbs  active-color="teal">
          <q-breadcrumbs-el icon="home" label="Home" to="/" />
          <q-breadcrumbs-el label="Dashboard" to="/admin" />
          <q-breadcrumbs-el label="Posts" />
        </q-breadcrumbs>
      </div>
      <div class="q-pa-md q-gutter-y-md">
        <q-btn color="secondary" to="/admin/posts/create">Add Post</q-btn>
        <q-card>
          <q-table
            class="admin__page__posts-table"
            :data="posts"
            :columns="columns"
            row-key="id"
            bordered
            :loading="loading"
            title="Posts"
          >
            <q-tr :id="props.id" slot="body" slot-scope="props" :props="props">
              <q-td key="title" :props="props">{{props.row['title_' + $t('prefix')]}}</q-td>
              <q-td key="category" :props="props">{{props.row['category_' + $t('prefix')]}}</q-td>
              <q-td key="tag" :props="props">{{props.row.tags[$t('prefix')]}}</q-td>
              <q-td key="image" :props="props"><q-img :ratio="16/9" :src="'/storage/' + props.row.image" placeholder-src="/statics/photo2.png"/></q-td>
              <q-td key="actions" :props="props">
                <q-btn class="ml-auto" size="12px" dense round flat color="info" @click="viewResident(props.row.id)"><q-icon name="remove_red_eye" />
                  <q-tooltip>Views</q-tooltip>
                </q-btn>
                <q-btn class="mx-2" size="12px" dense round flat color="warning" :to="'/admin/posts/edit/' + props.row.id"><q-icon name="edit" />
                  <q-tooltip>Edit</q-tooltip>
                </q-btn>
                <q-btn class="" size="12px" dense round flat color="negative" @click="deletePost(props.row.id)"><q-icon name="delete_forever" />
                  <q-tooltip>Delete</q-tooltip>
                </q-btn>
              </q-td>
            </q-tr>
          </q-table>
        </q-card>
      </div>
    </q-page>
  </q-scroll-area>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Blog',
  data () {
    return {
      loading: false,
      count: 1,
      columns: [
        { name: 'title', align: 'center', label: 'Title', field: 'title_' + this.$t('prefix'), sortable: true },
        { name: 'category', label: 'Categories', field: 'category_' + this.$t('prefix'), sortable: true },
        { name: 'tag', label: 'Tags', field: 'tags' },
        { name: 'image', label: 'Images', field: 'image' },
        { name: 'actions', label: 'Actions', field: 'action' }
      ],
      posts: []
    }
  },
  computed: {
    ...mapGetters([
      'mobileDetect',
      'getThumbStyle'
    ])
  },
  beforeMount () {
    this.$axios.get('get_posts').then(res => {
      this.posts = res.data
    })
  },
  mounted () {
  },
  methods: {
    deletePost (id) {
      this.$q.dialog({
        title: 'Подтвердите',
        message: 'Вы точно хотите удалить?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$axios.post('delete_post/' + id).then(() => {
          this.posts.forEach((elem, i) => {
            if (elem.id === id) return this.posts.splice(i, 1)
          })
          this.$q.notify({
            color: 'teal',
            icon: 'check_circle',
            message: 'Deleted',
            position: 'top',
            timeout: 200
          })
        })
      })
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
