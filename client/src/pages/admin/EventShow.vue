<template>
  <q-scroll-area
    :thumb-style="getThumbStyle"
    style="height: calc(100vh - 56px)"
  >
    <q-page class="admin__main">
      <div class="q-pa-md">
        <q-breadcrumbs>
          <q-breadcrumbs-el icon="home" label="Home" to="/" />
          <q-breadcrumbs-el label="Dashboard" to="/admin" />
          <q-breadcrumbs-el label="Events" />
        </q-breadcrumbs>
      </div>
      <div class="q-pa-md q-gutter-y-md">
        <q-btn color="secondary" to="/admin/event/create">Add event</q-btn>
        <q-card>
          <q-list bordered class="rounded-borders">
            <q-item-label header>Events</q-item-label>
            <q-item v-for="(event, i) in events" :key="i">
              <q-item-section avatar top>
                <q-icon name="mdi-calendar" color="black" size="34px" />
              </q-item-section>
              <q-item-section top class="col-2 gt-sm">
                <q-item-label class="q-mt-sm">Event - {{i + 1}}</q-item-label>
              </q-item-section>
              <q-space/>
              <q-item-section top side>
                <div class="text-grey-8 q-gutter-xs">
                  <q-btn class="ml-auto" size="12px" dense round flat color="info" :to="'/event/show/' + event.id"><q-icon name="remove_red_eye" />
                    <q-tooltip>Views</q-tooltip>
                  </q-btn>
                  <q-btn class="mx-2" size="12px" dense round flat color="warning" :to="'/admin/event/edit/' + event.id"><q-icon name="edit" />
                    <q-tooltip>Edit event</q-tooltip>
                  </q-btn>
                  <q-btn class="" size="12px" dense round flat color="negative" @click="deletEvent(event.id)"><q-icon name="delete_forever" />
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
      events: []
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
    this.$axios.get('get_events').then(res => {
      this.events = res.data
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
        this.$axios.post('delete_event/' + id).then(() => {
          this.events.forEach((elem, i) => {
            if (elem.id === id) return this.events.splice(i, 1)
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
