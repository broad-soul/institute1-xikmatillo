<template>
  <q-scroll-area
    :thumb-style="getThumbStyle"
    style="height: calc(100vh - 56px)"
  >
    <q-page class="page__residents">
      <div class="q-pa-md">
        <q-breadcrumbs>
          <q-breadcrumbs-el icon="home" label="Home" to="/" />
          <q-breadcrumbs-el label="Dashboard" to="/admin" />
          <q-breadcrumbs-el label="Residents" />
        </q-breadcrumbs>
      </div>
      <div class="row justify-center profile">
        <div class="col-12 q-pa-md">
          <q-table
            class="page__residents__table"
            :data="residents"
            :columns="columns"
            row-key="id"
            flat
            bordered
            :visible-columns="visibleColumns"
            :filter="filter"
            :loading="loading"
          >
            <template v-slot:top="props">
              <div class="col-2 q-table__title">Residents</div>
              <q-space />
              <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
              <q-btn flat @click="downloadExel">Download exel</q-btn>
              <q-select
                v-model="visibleColumns"
                class="ml-1"
                multiple
                borderless
                dense
                options-dense
                :display-value="$q.lang.table.columns"
                emit-value
                map-options
                style="min-width: 50px"
                :options="columns"
                option-value="name"
                options-selected-class="page__residents__table-columns__select"
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
              <q-td key="place_of_education" :props="props">{{props.row.place_of_education}}</q-td>
              <q-td key="direction_code" :props="props">{{+props.row.direction_code === 3940001 ? $t('foreign_philology') : $t('exact_sciences')}}</q-td>
              <q-td key="name" :props="props">{{props.row.name}}</q-td>
              <q-td key="surname" :props="props">{{props.row.surname}}</q-td>
              <q-td key="father_name" :props="props">{{props.row.father_name}}</q-td>
              <q-td key="date_of_birth" :props="props">{{props.row.date_of_birth}}</q-td>
              <q-td key="citizenship" :props="props">{{props.row.citizenship}}</q-td>
              <q-td key="client_requisite" :props="props">{{props.row.client_requisite}}</q-td>
              <q-td key="residential_address" :props="props">{{props.row.residential_address}}</q-td>
              <q-td key="school_region" :props="props">{{props.row.school_region}}</q-td>
              <q-td key="school_district" :props="props">{{props.row.school_district}}</q-td>
              <q-td key="school_number_or_name" :props="props">{{props.row.school_number_or_name}}</q-td>
              <q-td key="graduation_year" :props="props">{{props.row.graduation_year}}</q-td>
              <q-td key="education_language" :props="props">{{props.row.education_language}}</q-td>
              <q-td key="certificate_number" :props="props">{{props.row.certificate_number}}</q-td>
              <q-td key="act_number" :props="props">{{props.row.act_number}}</q-td>
              <q-td key="phone" :props="props">{{props.row.phone}}</q-td>
              <q-td key="documents_graduate_9_grade" :props="props">{{props.row.documents_graduate_9_grade}}</q-td>
              <q-td key="created_at" :props="props">{{props.row.created_at}}</q-td>
              <q-td key="actions" :props="props">
                <q-btn color="red" @click="deleteResident(props.row.id)">
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
  </q-scroll-area>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import saveAs from 'file-saver'

export default {
  name: 'AdminResidents',
  meta: {
    titleTemplate: title => `${title} - Residents`,
    meta: {
      description: { name: 'description', content: 'Residents Page 1' },
      keywords: { name: 'keywords', content: 'Residents website' }
    }
  },

  data () {
    return {
      changeVisibleColumns: false,
      loading: false,
      filter: '',
      visibleColumns: [],
      direction: 'sdsda',
      residents: [],
      resident: []
    }
  },
  computed: {
    ...mapGetters([
      'getThumbStyle',
      'getToken',
      'getVisibleColumnsResident',
      'getAllColumnsResident'
    ]),
    columns () {
      return [
        { align: 'left', name: 'id', label: 'Id', field: row => row.id, format: val => `${val}`, sortable: true },
        { align: 'left', name: 'place_of_education', label: this.$t('place_of_education'), field: 'place_of_education', format: val => `${val}`, sortable: true },
        { align: 'left', name: 'direction_code', label: this.$t('direction'), field: 'direction_code', sortable: true },
        { align: 'left', name: 'name', label: this.$t('name'), field: 'name', sortable: true },
        { align: 'left', name: 'surname', label: this.$t('surname'), field: 'surname', sortable: true },
        { align: 'left', name: 'father_name', label: this.$t('father_name'), field: 'father_name', sortable: true },
        { align: 'left', name: 'date_of_birth', label: this.$t('date_of_birth'), field: 'date_of_birth', sortable: true },
        { align: 'left', name: 'citizenship', label: this.$t('citizenship'), field: 'citizenship', sortable: true },
        { align: 'left', name: 'client_requisite', label: this.$t('client_requisite'), field: 'client_requisite', sortable: true },
        { align: 'left', name: 'residential_address', label: this.$t('residential_address'), field: 'residential_address', sortable: true },
        { align: 'left', name: 'school_region', label: this.$t('school_region'), field: 'school_region', sortable: true },
        { align: 'left', name: 'school_district', label: this.$t('school_district'), field: 'school_district', sortable: true },
        { align: 'left', name: 'school_number_or_name', label: this.$t('school_number_or_name'), field: 'school_number_or_name', sortable: true },
        { align: 'left', name: 'graduation_year', label: this.$t('graduation_year'), field: 'graduation_year', sortable: true },
        { align: 'left', name: 'education_language', label: this.$t('education_language'), field: 'education_language', sortable: true },
        { align: 'left', name: 'certificate_number', label: this.$t('certificate_number'), field: 'certificate_number', sortable: true },
        { align: 'left', name: 'actions', label: this.$t('table_actions'), field: 'actions' },
        { align: 'left', name: 'act_number', label: this.$t('act_number'), field: 'act_number', sortable: true },
        { align: 'left', name: 'phone', label: this.$t('phone'), field: 'phone', sortable: true },
        { align: 'left', name: 'documents_graduate_9_grade', label: this.$t('documents_graduate_9_grade'), field: 'documents_graduate_9_grade', sortable: true },
        { align: 'left', name: 'created_at', label: this.$t('table_created_at'), field: 'created_at', sortable: true }
      ]
    }
  },
  watch: {
    changeVisibleColumns (val) {
      this.visibleColumns = val
        ? this.getAllColumnsResident
        : this.getVisibleColumnsResident
    }
  },
  created () {
    this.$axios.defaults.headers.Authorization = 'Bearer ' + this.getToken
    this.visibleColumns = this.getVisibleColumnsResident
    this.loading = true
    this.$axios.get('get_residents')
      .then(res => {
        this.residents = res.data.residents
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
  methods: {
    ...mapActions([
      'downloadFile'
    ]),
    deleteResident (id) {
      this.$q.dialog({
        title: 'Подтвердите',
        message: 'Вы точно хотите удалить?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$axios.post('delete_resident', { id: id })
          .then(() => {
            this.$q.notify({
              color: 'teal',
              icon: 'home',
              message: 'Резидент удалён',
              position: 'center',
              timeout: 1500
            })
            this.residents.forEach((elem, i) => {
              if (elem.id === id) return this.residents.splice(i, 1)
            })
          })
      })
    },
    viewResident (id) {
      this.$router.push('/admin/residents/show/' + id)
    },
    download (fileName) {
      this.loading = true
      this.downloadFile(fileName)
        .finally(() => {
          this.loading = false
        })
    },
    downloadExel () {
      let lang = this.$t('prefix')
      this.$axios.post('download_residents', { lang }, { responseType: 'arraybuffer' })
        .then(response => {
          let blob = new Blob([response.data])
          saveAs(blob, 'residents_' + this.$t('prefix') + '.xlsx')
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .page__residents__table
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
  .page__residents__table-columns__select
    // color: $teal-5
</style>
