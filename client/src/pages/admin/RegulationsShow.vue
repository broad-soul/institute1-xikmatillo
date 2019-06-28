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
          <q-breadcrumbs-el label="Regulations" />
        </q-breadcrumbs>
      </div>
      <div class="q-pa-md q-gutter-y-md">
        <q-btn color="secondary" to="/admin/regulations/create">Add Regulations</q-btn>
        <q-card>
          <q-list bordered class="rounded-borders">
            <q-item-label header>Regulations</q-item-label>
            <q-item v-for="(item, i) in regulations" :key="i">
              <q-item-section avatar top>
                <q-icon name="mdi-file-document-edit-outline" color="black" size="34px" />
              </q-item-section>
              <q-item-section top class="col-2 gt-sm">
                <q-item-label class="q-mt-sm">{{i+1}}.{{item['title_' + $t('prefix')]}}</q-item-label>
              </q-item-section>
              <q-space/>
              <q-item-section top side>
                <div class="text-grey-8 q-gutter-xs">
                  <q-btn class="ml-auto" size="12px" dense round flat color="info" :to="'/regulations/show/' + item.id"><q-icon name="remove_red_eye" />
                    <q-tooltip>Views</q-tooltip>
                  </q-btn>
                  <q-btn class="mx-2" size="12px" dense round flat color="warning" :to="'/admin/regulations/edit/' + item.id"><q-icon name="edit" />
                    <q-tooltip>Edit</q-tooltip>
                  </q-btn>
                  <q-btn class="" size="12px" dense round flat color="negative" @click="deletePartner(item.id)"><q-icon name="delete_forever" />
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
  name: 'RegulationsShowAdmin',
  data () {
    return {
      regulations: []
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
    this.$axios.get('regulations/all').then(res => {
      this.regulations = res.data
    })
  },
  mounted () {
  },
  methods: {
    deletePartner (id) {
      this.$q.dialog({
        title: 'Подтвердите',
        message: 'Вы точно хотите удалить?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$axios.post('delete_regulations/' + id).then(() => {
          this.regulations.forEach((elem, i) => {
            if (elem.id === id) return this.regulations.splice(i, 1)
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
