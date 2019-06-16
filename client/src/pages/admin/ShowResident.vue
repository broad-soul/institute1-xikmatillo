<template>
  <q-scroll-area
    :thumb-style="getThumbStyle"
    style="height: calc(100vh - 56px)"
  >
    <q-page class="page__residents">
      <div class="q-pa-md">
        <q-btn label="Назад" to="/admin/residents" />
      </div>
      <h3 class="text-center">Информация о студенте</h3>
      <div class="row justify-center profile">
        <div class="col-12 q-pa-md">
          <q-list bordered separator v-if="showResidentData">
            <q-item clickable>
              <q-item-section>
                <q-item-label caption>Имя</q-item-label>
                <q-item-label>{{residentData.name}}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section>
                <q-item-label caption>Фамилия</q-item-label>
                <q-item-label>{{residentData.surname}}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section>
                <q-item-label caption>Отчество</q-item-label>
                <q-item-label>{{residentData.father_name}}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section>
                <q-item-label caption>Наименование Уч. Заведения</q-item-label>
                <q-item-label>{{residentData.place_of_education}}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section>
                <q-item-label caption>Направление</q-item-label>
                <q-item-label>
                  {{+residentData.direction_code === 3940001 ? $t('foreign_philology') : $t('exact_sciences')}}
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section>
                <q-item-label caption>Дата рождения</q-item-label>
                <q-item-label>{{residentData.date_of_birth}}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section>
                <q-item-label caption>Гражданство</q-item-label>
                <q-item-label>{{residentData.citizenship}}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section>
                <q-item-label caption>Пасспорт</q-item-label>
                <q-item-label>{{residentData.client_requisite}}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section>
                <q-item-label caption>Адрес проживания</q-item-label>
                <q-item-label>{{residentData.residential_address}}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section>
                <q-item-label caption>Школа(Регион-Район-Номер или название)</q-item-label>
                <q-item-label>{{residentData.school_number_or_name}}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section>
                <q-item-label caption>Год окончания школы</q-item-label>
                <q-item-label>{{residentData.graduation_year}}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section>
                <q-item-label caption>Язык обучения</q-item-label>
                <q-item-label>{{residentData.education_language}}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section>
                <q-item-label caption>Номер аттестата</q-item-label>
                <q-item-label>{{residentData.certificate_number}}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section>
                <q-item-label caption>Номер акта</q-item-label>
                <q-item-label>{{residentData.act_number}}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section>
                <q-item-label caption>Номер телефона</q-item-label>
                <q-item-label>{{residentData.phone}}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section>
                <q-item-label caption>Дата подачи документов</q-item-label>
                <q-item-label>{{residentData.created_at}}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section>
                <q-item-label caption>Адрес</q-item-label>
                <q-item-label>{{residentData.residential_address}}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label overline>Документы ученика(фото в архиве)</q-item-label>
                <q-item-label>
                  <q-btn type="button"
                    label="Скачать Архив с документами"
                    icon="cloud_download"
                    color="secondary"
                    :loading="loading"
                    @click="download(residentData.name_archive_with_data)"
                  />
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </div>
    </q-page>
  </q-scroll-area>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'AdminShowResident',
  meta: {
    titleTemplate: title => `${title} - Show Resident`,
    meta: {
      description: { name: 'description', content: 'Show Resident Page 1' },
      keywords: { name: 'keywords', content: 'Show Resident website' }
    }
  },
  created () {
    this.$axios.defaults.headers.Authorization = 'Bearer ' + this.getToken
  },
  mounted () {
  },
  activated () {
    // keep-alive
    this.residentId = this.$route.params.id
    if (this.residentData.id !== parseInt(this.residentId)) {
      this.residentData = {}
      this.showResidentData = false
      this.$axios.get('admin_show_resident/' + this.residentId)
        .then(res => {
          this.residentData = res.data
          this.showResidentData = true
        })
    }
  },
  deactivated () {
    // keep-alive
  },
  data () {
    return {
      loading: false,
      residentId: null,
      residentData: {},
      showResidentData: false
    }
  },
  computed: {
    ...mapGetters([
      'getToken',
      'getThumbStyle'
    ])
  },
  watch: {
  },
  methods: {
    ...mapActions([
      'getResidentsAtion',
      'downloadFile'
    ]),
    goBack () {
      this.$router.go(-1)
    },
    download (fileName) {
      this.loading = true
      this.downloadFile(fileName)
        .then(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style lang="stylus" scope>
</style>
