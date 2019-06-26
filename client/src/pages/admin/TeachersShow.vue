<template>
  <q-scroll-area
    :thumb-style="getThumbStyle"
    style="height: calc(100vh - 56px)"
  >
    <q-page class="admin__main">
      <div class="q-pa-md">
        <q-breadcrumbs  active-color="teal">
          <q-breadcrumbs-el icon="home" label="Home" to="/" />
          <q-breadcrumbs-el label="Dashboard" to="/admin" />
          <q-breadcrumbs-el label="Тeachers" />
        </q-breadcrumbs>
      </div>
      <div class="q-pa-md q-gutter-y-md">
        <q-btn color="secondary" to="/admin/teachers/create">Add teacher</q-btn>
        <q-card>
          <q-list bordered class="rounded-borders">
            <q-item-label header>Тeachers</q-item-label>
            <q-item v-for="(teacher, i) in teachers" :key="i">
              <q-item-section avatar top>
                <q-img placeholder-src="/statics/avatar04.png" :ratio="1" :src="'/storage/' + teacher.photo" width="30"></q-img>
              </q-item-section>
              <q-item-section top class="col-2 gt-sm">
                <q-item-label class="q-mt-sm">{{teacher.name}}</q-item-label>
              </q-item-section>
              <q-space/>
              <q-item-section top side>
                <div class="text-grey-8 q-gutter-xs">
                  <q-btn class="ml-auto" size="12px" dense round flat color="info" :to="'/teacher/show/' + teacher.id"><q-icon name="remove_red_eye" />
                    <q-tooltip>Views</q-tooltip>
                  </q-btn>
                  <q-btn class="mx-2" size="12px" dense round flat color="warning" :to="'/admin/teachers/edit/' + teacher.id"><q-icon name="edit" />
                    <q-tooltip>Edit event</q-tooltip>
                  </q-btn>
                  <q-btn class="" size="12px" dense round flat color="negative" @click="deletEvent(teacher.id)"><q-icon name="delete_forever" />
                    <q-tooltip>Delete event</q-tooltip>
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
  name: 'event',
  data () {
    return {
      teachers: []
    }
  },
  components: {
  },
  computed: {
    ...mapGetters([
      'mobileDetect',
      'getThumbStyle'
    ])
  },
  watch: {
  },
  beforeMount () {
    this.$axios.get('get_teachers').then(res => {
      this.teachers = res.data
    })
  },
  mounted () {
  },
  methods: {
    deletEvent (id) {
      this.$q.dialog({
        title: 'Подтвердите',
        message: 'Вы точно хотите удалить?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$axios.post('delete_teacher/' + id).then(() => {
          this.teachers.forEach((elem, i) => {
            if (elem.id === id) return this.teachers.splice(i, 1)
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

<style lang="stylus">
</style>
