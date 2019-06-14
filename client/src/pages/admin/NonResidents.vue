<template>
  <q-page class="page__residents">
    <div class="row justify-center profile">
      <div class="col-12 q-pa-md">
        <q-table
          class="page__nonresidents__table"
          :data="non_residents"
          :columns="columns"
          row-key="id"
          flat
          bordered
          :visible-columns="visibleColumns"
          :filter="filter"
          :loading="loading"
        >
          <template v-slot:top="props">
            <div class="col-2 q-table__title">Non Residents</div>
            <q-space />
            <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
            <q-select
              v-model="visibleColumns"
              class="ml-4"
              multiple
              borderless
              dense
              options-dense
              :display-value="$q.lang.table.columns"
              emit-value
              map-options
              :options="columns"
              option-value="name"
              options-selected-class="page__nonresidents__table-columns__select"
              style="min-width: 50px"
            />
            <q-toggle v-model="changeVisibleColumns" color="light-blue" label="Показать все" />
            <q-btn
              flat round dense
              :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
              @click="props.toggleFullscreen"
              class="q-ml-md"
            />
          </template>
          <q-tr :id="props.id" slot="body" slot-scope="props" :props="props" class="cursor-pointer">
            <q-td key="id" :props="props">{{props.row.id}}</q-td>
            <q-td key="direction_code" :props="props">{{props.row.direction_code}}</q-td>
            <q-td key="name" :props="props">{{props.row.name}}</q-td>
            <q-td key="surname" :props="props">{{props.row.surname}}</q-td>
            <q-td key="father_name" :props="props">{{props.row.father_name}}</q-td>
            <q-td key="date_of_birth" :props="props">{{props.row.date_of_birth}}</q-td>
            <q-td key="citizenship" :props="props">{{props.row.citizenship}}</q-td>
            <q-td key="client_requisite" :props="props">{{props.row.client_requisite}}</q-td>
            <q-td key="residential_address" :props="props">{{props.row.residential_address}}</q-td>
            <q-td key="education_language" :props="props">{{props.row.education_language}}</q-td>
            <q-td key="phone" :props="props">{{props.row.phone}}</q-td>
            <q-td key="documents_graduate_9_grade" :props="props">{{props.row.documents_graduate_9_grade}}</q-td>
            <q-td key="created_at" :props="props">{{props.row.created_at}}</q-td>
            <q-td key="actions" :props="props">
              <q-btn color="red" @click="deleteNonResident(props.row.id)">
                <q-icon name="delete_forever" color="white" />
              </q-btn>
              <q-btn color="info" class="ml-2" @click="viewResident(props.row.id)">
                <q-icon name="remove_red_eye" color="white" />
              </q-btn>
              <q-btn color="secondary" class="ml-2" @click="download(props.row.name_archive_with_data)">
                <q-icon name="cloud_download" color="white" />
              </q-btn>
            </q-td>
          </q-tr>
        </q-table>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'AdminResidents',
  meta: {
    titleTemplate: title => `${title} - Residents`,
    meta: {
      description: { name: 'description', content: 'Residents Page 1' },
      keywords: { name: 'keywords', content: 'Residents website' }
    }
  },
  created () {
    this.$axios.defaults.headers.Authorization = 'Bearer ' + this.getToken
    this.visibleColumns = this.getVisibleColumnsNonResident
    this.loading = true
    this.$axios.get('get_non_residents')
      .then(res => {
        this.non_residents = res.data.non_residents
      })
      .finally(() => { this.loading = false })
  },
  mounted () {
  },
  activated () {
    // keep-alive
  },
  deactivated () {
    // keep-alive
  },
  data () {
    return {
      changeVisibleColumns: false,
      loading: false,
      filter: '',
      visibleColumns: [],
      non_residents: [],
      resident: []
    }
  },
  computed: {
    ...mapGetters([
      'getToken',
      'getVisibleColumnsNonResident',
      'getAllColumnsNonResident'
    ]),
    columns () {
      return [
        { align: 'left', name: 'id', label: 'Id', field: row => row.id, format: val => `${val}`, sortable: true },
        { align: 'left', name: 'direction_code', label: this.$t('direction'), field: 'direction_code', sortable: true },
        { align: 'left', name: 'name', label: this.$t('name'), field: 'name', sortable: true },
        { align: 'left', name: 'surname', label: this.$t('surname'), field: 'surname', sortable: true },
        { align: 'left', name: 'father_name', label: this.$t('father_name'), field: 'father_name', sortable: true },
        { align: 'left', name: 'date_of_birth', label: this.$t('date_of_birth'), field: 'date_of_birth', sortable: true },
        { align: 'left', name: 'citizenship', label: this.$t('citizenship'), field: 'citizenship', sortable: true },
        { align: 'left', name: 'client_requisite', label: this.$t('client_requisite'), field: 'client_requisite', sortable: true },
        { align: 'left', name: 'residential_address', label: this.$t('residential_address'), field: 'residential_address', sortable: true },
        { align: 'left', name: 'education_language', label: this.$t('education_language'), field: 'education_language', sortable: true },
        { align: 'left', name: 'actions', label: this.$t('table_actions'), field: 'actions' },
        { align: 'left', name: 'phone', label: this.$t('phone'), field: 'phone', sortable: true },
        { align: 'left', name: 'created_at', label: this.$t('table_created_at'), field: 'created_at', sortable: true }
      ]
    }
  },
  watch: {
    changeVisibleColumns (val) {
      this.visibleColumns = val
        ? this.getAllColumnsNonResident
        : this.getVisibleColumnsNonResident
    }
  },
  methods: {
    ...mapActions([
      'downloadFile'
    ]),
    deleteNonResident (id) {
      this.$q.dialog({
        title: 'Подтвердите',
        message: 'Вы точно хотите удалить?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$axios.post('delete_non_resident', { id: id })
          .then(() => {
            this.$q.notify({
              color: 'teal',
              icon: 'home',
              message: 'Не Резидент удалён',
              position: 'center',
              timeout: 1500
            })
            this.non_residents.forEach((elem, i) => {
              if (elem.id === id) return this.non_residents.splice(i, 1)
            })
          })
      })
    },
    viewResident (id) {
      this.$router.push('/admin/non-residents/show/' + id)
    },
    download (fileName) {
      this.loading = true
      this.downloadFile(fileName)
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style lang="stylus" scope>
  .page__nonresidents__table
    .q-table__top,
    .q-table__bottom,
    thead tr:first-child th
      opacity 1
    th
      &:first-child
        min-width: 80px !important
      min-width: 150px !important
      white-space initial !important
</style>
<style lang="stylus">
  .page__nonresidents__table-columns__select
    color: $teal-5
</style>
