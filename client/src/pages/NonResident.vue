<template>
  <q-scroll-area
    :thumb-style="getThumbStyle"
    style="height: calc(100vh - 56px)"
  >
    <q-page class="client__non_resident">
      <div class="text-center">
        <h3>{{$t('regTextOpen')}}</h3>
        <p>{{$t('registrationWillTakePlace')}}</p>
      </div>
      <div class="row justify-center application">
        <div class="col-lg-5 col-12">
          <h3 class="pl-3 p-md-0 my-0 my-md-4 title">{{$t('profileText')}}</h3>
          <q-card class="my-card" style="margin-bottom: 50px;">
            <q-card-section>
              <q-form
                @submit="onSubmit"
                @reset="onReset"
                class="q-gutter-md"
                ref="form"
              >
                <q-select v-model="form.direction_code"
                  :options="[
                    { label: $t('foreign_philology'), value: '3940001', },
                    { label: $t('exact_sciences'), value: '3910001', }
                  ]"
                  filled
                  :label="$t('direction') + ' *'"
                  clearable
                  lazy-rules
                  :disable="loading"
                  :rules="[
                    val => val || $t('required_fields')
                  ]"
                />
                <q-input
                  filled
                  :label="$t('name') + ' *'"
                  v-model="form.name"
                  type="text"
                  clearable
                  lazy-rules
                  :disable="loading"
                  :rules="[
                    val => !!val || $t('required_fields'),
                    val => val.length > 1 || 'Please use min 2',
                  ]"
                />
                <q-input
                  filled
                  :label="$t('surname') + ' *'"
                  v-model="form.surname"
                  type="text"
                  clearable
                  lazy-rules
                  :disable="loading"
                  :rules="[
                    val => !!val || $t('required_fields'),
                    val => val.length > 1 || 'Please use min 2',
                  ]"
                />
                <q-input
                  filled
                  :label="$t('father_name')"
                  v-model="form.father_name"
                  type="text"
                  clearable
                  lazy-rules
                  :disable="loading"
                />
                <q-input
                  filled
                  :label="$t('date_of_birth') + ' *'"
                  v-model="form.date_of_birth"
                  lazy-rules
                  clearable
                  :disable="loading"
                  mask="##/##/####"
                  :rules="[val => !!val || $t('required_fields')]"
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy ref="qDateProxy1">
                        <q-date
                          mask="DD/MM/YYYY"
                          minimal
                          v-model="form.date_of_birth"
                          @input="() => $refs.qDateProxy1.hide()"
                        />
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
                <q-input
                  filled
                  :label="$t('citizenship') + ' *'"
                  v-model="form.citizenship"
                  type="text"
                  clearable
                  lazy-rules
                  :disable="loading"
                  :rules="[
                    val => !!val || $t('required_fields'),
                    val => val.length > 1 || 'Please use min 2',
                  ]"
                />
                <q-input
                  filled
                  :label="$t('client_requisite') + ' *'"
                  v-model="form.client_requisite"
                  type="text"
                  clearable
                  lazy-rules
                  :disable="loading"
                  :rules="[
                    val => !!val || $t('required_fields'),
                    val => val.length > 1 || 'Please use min 2',
                  ]"
                />
                <q-input
                  filled
                  :label="$t('residential_address') + ' *'"
                  v-model="form.residential_address"
                  type="text"
                  clearable
                  lazy-rules
                  :disable="loading"
                  :rules="[
                    val => !!val || $t('required_fields'),
                    val => val.length > 1 || 'Please use min 2',
                  ]"
                />
                <q-select filled
                  :disable="loading"
                  v-model="form.education_language"
                  :label="$t('education_language') + ' *'"
                  :options="$t('education_language_select')"
                  lazy-rules
                  :rules="[val => !!val || $t('required_fields')]"
                />
                <q-input
                  filled
                  :label="$t('phone') + ' *'"
                  v-model="form.phone"
                  type="text"
                  clearable
                  lazy-rules
                  :disable="loading"
                  :rules="[
                    val => !!val || $t('required_fields'),
                    val => val.length > 1 || 'Please use min 2',
                  ]"
                />
                <q-uploader
                  extensions=".jpg,.jpeg,.png,.doc,.exel"
                  accept=".jpg, .jpeg, .pdf, .png image/jpeg, .pdf, .doc, .docx, .xls, .xlsx, .txt"
                  :max-file-size="3048576"
                  :max-total-size="10248576"
                  @added="addFile"
                  multiple
                  :color="uploader_color"
                  class="resident_client_q_uploader"
                  ref="uploader"
                >
                  <template v-slot:header="scope">
                    <div class="row no-wrap items-center q-pa-sm q-gutter-xs">
                      <q-btn v-if="scope.queuedFiles.length > 0" icon="delete_sweep" @click="scope.removeQueuedFiles" round dense flat >
                        <q-tooltip>Clear All</q-tooltip>
                      </q-btn>
                      <q-btn v-if="scope.uploadedFiles.length > 0" icon="done_all" @click="scope.removeUploadedFiles" round dense flat >
                        <q-tooltip>Remove Uploaded Files</q-tooltip>
                      </q-btn>
                      <q-spinner v-if="scope.isUploading" class="q-uploader__spinner" />
                      <div class="col">
                        <div class="q-uploader__title">{{$t('documents_graduate_9_grade')}} *</div>
                        <div class="q-uploader__subtitle">{{ scope.uploadSizeLabel }}</div>
                      </div>
                      <q-btn v-if="scope.canAddFiles" type="a" flat>
                        <q-uploader-add-trigger />
                        <q-icon name="add_box" class="ml-2" />
                        <q-tooltip>{{$t('attach_documents')}}</q-tooltip>
                      </q-btn>
                      <q-btn v-if="scope.isUploading" icon="clear" @click="scope.abort" round dense flat >
                        <q-tooltip>Abort Upload</q-tooltip>
                      </q-btn>
                    </div>
                  </template>
                  <template v-slot:list="scope">
                    <q-list separator>
                      <q-item v-for="file in scope.files" :key="file.name">
                        <q-item-section>
                          <q-item-label class="full-width ellipsis">
                            {{ file.name }}
                          </q-item-label>
                        </q-item-section>
                        <q-item-section
                          v-if="file.__img"
                          thumbnail
                          class="gt-xs"
                        >
                          <img :src="file.__img.src">
                        </q-item-section>
                        <q-item-section top side>
                          <q-btn
                            class="gt-xs"
                            size="12px"
                            flat
                            dense
                            round
                            icon="delete"
                            @click="scope.removeFile(file)"
                          />
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </template>
                </q-uploader>
                <div v-if="showCheckboxNotRobot" class="ml-3" :class="'text-'+colorCheckbox">Подтвердите что вы не робот</div>
                <q-checkbox
                  v-model="checkboxNotRobot"
                  :disable="checkboxNotRobot"
                  v-if="showCheckboxNotRobot"
                  label="Я не робот"
                  :color="colorCheckbox"
                  class="mt-0"
                  :keep-color="true"/>
                <div class="action__btn">
                  <q-btn
                    color="secondary"
                    class="upload pl-2"
                    :loading="loading"
                    type="submit"
                  >
                    <q-icon name="home" class="icon mr-2" />
                    Загрузить
                  </q-btn>
                  <q-btn
                    outline
                    type="reset"
                    class="clear ml-3"
                    color="secondary"
                    :disable="loading"
                  >
                    Очистить
                  </q-btn>
                </div>
              </q-form>
            </q-card-section>
          </q-card>
        </div>
      </div>
      <footer>footer</footer>
    </q-page>
  </q-scroll-area>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'NonResident',
  meta: {
    titleTemplate: title => `${title} - NonResident`,
    meta: {
      description: { name: 'description', content: 'NonResident Page 1' },
      keywords: { name: 'keywords', content: 'NonResident website' }
    }
  },
  data () {
    return {
      colorCheckbox: 'negative',
      checkboxNotRobot: false,
      showCheckboxNotRobot: false,
      documentsMultiple: [],
      files: [],
      uploader_color: 'secondary',
      errors: false,
      loading: false,
      form: {
        place_of_education: null,
        direction_code: null,
        name: null,
        surname: null,
        father_name: null,
        date_of_birth: null,
        citizenship: null,
        client_requisite: null,
        residential_address: null,
        school_region: null,
        school_district: null,
        school_number_or_name: null,
        graduation_year: null,
        education_language: null,
        certificate_number: null,
        act_number: null,
        documents_graduate_9_grade: null,
        phone: null,
        files: []
      }
    }
  },
  computed: {
    ...mapGetters([
      'getThumbStyle',
      'mobileDetect'
    ])
  },
  watch: {
    checkboxNotRobot (val) {
      this.colorCheckbox = val ? 'teal' : 'negative'
    }
  },
  mounted () {
  },
  methods: {
    ...mapActions([
      'recaptchaToken'
    ]),
    addFile () {
      this.uploader_color = 'secondary'
    },
    onButtonClick () {
      this.$refs.fupload.click()
      this.errors = {}
    },
    async onSubmit () {
      let files = this.$refs['uploader'].files
      if (files.length > 0) {
        this.uploader_color = 'secondary'
        this.loading = true
        let token = await this.recaptchaToken()
        this.$axios.post('check_recaptcha', {
          recaptcha_token: token,
          'checkbox': this.checkboxNotRobot
        })
          .then(() => {
            this.form.direction_code = this.form.direction_code.value
            let formData = new FormData()
            files.forEach((file, i) => { formData.append(`files[${i}]`, file) })
            Object.keys(this.form).forEach(key => {
              formData.append(key, this.form[key])
            })
            this.$axios.post('new_non_resident', formData).then(res => {
              this.loading = false
              this.$axios.post('remove_files', res.data.files)
              this.$refs['uploader'].files = []
              this.$refs.form.reset()
              this.$('.scroll').animate({ scrollTop: 0 }, 400)
              this.$q.notify({
                color: 'teal',
                icon: 'home',
                message: 'Success',
                position: 'center',
                timeout: 1500
              })
            })
              .finally(() => { this.loading = false })
          })
          .catch(error => {
            console.log(error.response.data)
            this.showCheckboxNotRobot = true
          })
          .finally(() => { this.loading = false })
      } else {
        this.uploader_color = 'negative'
        this.$q.notify({
          color: 'negative',
          icon: 'home',
          message: 'Прикрепите документы!',
          position: 'center',
          timeout: 800
        })
      }
    },
    onReset () {
      Object.keys(this.form).forEach(key => {
        this.form[key] = null
      })
      this.form.files = []
      this.$refs['uploader'].files = []
      this.files = []
      this.uploader_color = 'secondary'
      this.showCheckboxNotRobot = false
      this.checkboxNotRobot = false
    },
    deleteOneFile (e) {
      this.all_files.splice(e.index, 1)
      this.all_files_name.splice(e.index, 1)
      this.all_files_with_size.splice(e.index, 1)
    }
  }
}
</script>

<style lang="stylus" scoped>
  footer
    margin-top: auto
    padding: 20px
    background-color: #ccc
  .resident_client_q_uploader
    width: auto !important
  .client__non_resident
    display: flex
    flex-direction: column
    @media (max-width: 992px)
      p
        font-size: 16px
      h3
        font-size 26px
        line-height: 26px
      .application
        .q-card
          box-shadow none
</style>
