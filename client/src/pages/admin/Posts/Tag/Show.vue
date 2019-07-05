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
          <q-breadcrumbs-el label="Tags" />
        </q-breadcrumbs>
      </div>
      <div class="q-pa-md q-gutter-y-md">
        <q-btn color="secondary" to="/admin/tags/create">Add Tag</q-btn>
        <q-card>
          <q-list bordered class="rounded-borders">
            <q-item-label header>Tags</q-item-label>
            <q-item v-for="(tag, i) in tags" :key="i">
              <q-item-section avatar top>
                <q-icon name="mdi-pound" color="black" size="34px" />
              </q-item-section>
              <q-item-section top class="col-2 gt-sm">
                <q-item-label class="q-mt-sm">{{tag['title_' + $t('prefix')]}}</q-item-label>
              </q-item-section>
              <q-space/>
              <q-item-section top side>
                <div class="text-grey-8 q-gutter-xs">
                  <q-btn class="mx-2" size="12px" dense round flat color="warning" :to="'/admin/tags/edit/' + tag.id"><q-icon name="edit" />
                    <q-tooltip>Edit</q-tooltip>
                  </q-btn>
                  <q-btn class="" size="12px" dense round flat color="negative" @click="deleteCategory(tag.id)"><q-icon name="delete_forever" />
                    <q-tooltip>Delete</q-tooltip>
                  </q-btn>
                </div>
              </q-item-section>
            </q-item>
            <q-separator spaced />
          </q-list>
        </q-card>
      </div>
    </q-page>
  </q-scroll-area>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'TagsShow',
  data () {
    return {
      loading: false,
      tags: []
    }
  },
  computed: {
    ...mapGetters([
      'mobileDetect',
      'getThumbStyle'
    ])
  },
  beforeMount () {
    this.$axios.get('get_tags').then(res => {
      this.tags = res.data
    })
  },
  mounted () {
  },
  methods: {
    deleteCategory (id) {
      this.$q.dialog({
        title: 'Подтвердите',
        message: 'Вы точно хотите удалить?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$axios.post('delete_tag/' + id).then(() => {
          this.tags.forEach((elem, i) => {
            if (elem.id === id) return this.tags.splice(i, 1)
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
