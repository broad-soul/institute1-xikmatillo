<template>
  <q-scroll-area
    :thumb-style="getThumbStyle"
    style="height: calc(100vh - 56px)"
  >
    <q-page class="client__resident">
      <div class="text-center">
        <h3>{{$t('regTextOpen')}}</h3>
        <p>{{$t('registrationWillTakePlace')}}</p>
      </div>
      <div class="row justify-center application">
        <div class="col-12 col-sm-9 col-md-7 col-lg-5 q-pa-sm">
          <q-expansion-item
            expand-separator
            icon="mdi-file-document"
            :label="instruction_app['title_' + $t('prefix')]"
            header-class="text-cyan"
          >
            <q-card>
              <q-card-section v-html="instruction_app['content_' + $t('prefix')]"></q-card-section>
            </q-card>
          </q-expansion-item>
        </div>
      </div>
      <div class="row justify-center application">
        <div class="col-12 col-sm-9 col-md-7 col-lg-5 q-pa-sm q-gutter-xs">
          <h3 class="pl-3 p-md-0 my-0 my-md-4 title">{{$t('profileText')}}</h3>
          <q-card class="my-card" style="margin-bottom: 50px;">
            <q-card-section>
              <q-form
                @submit="onSubmit"
                @reset="onReset"
                class="q-gutter-md"
                ref="form"
              >
                <q-input
                  filled
                  :label="$t('place_of_education') + ' *'"
                  v-model="form.place_of_education"
                  type="text"
                  clearable
                  lazy-rules
                  class="mt-4"
                  :disable="loading"
                  :rules="[val => !!val || $t('required_fields')]"
                />
                <q-select v-model="form.direction_code"
                  :options="[
                    { label: $t('foreign_philology'), value: '3940001', },
                    { label: $t('exact_sciences'), value: '3910001', }
                  ]"
                  filled
                  :label="$t('direction') + ' *'"
                  lazy-rules
                  :disable="loading"
                  :rules="[val => !!val || $t('required_fields')]"
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
                    val => !!val || $t('required_fields')
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
                  :rules="[val => !!val || $t('required_fields')]"
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
                  :rules="[val => !!val || $t('required_fields')]"
                />
                <q-input
                  filled
                  :label="$t('client_requisite') + ' *'"
                  v-model="form.client_requisite"
                  type="text"
                  clearable
                  lazy-rules
                  :disable="loading"
                  :rules="[val => !!val || $t('required_fields')]"
                />
                <q-input
                  filled
                  :label="$t('residential_address') + ' *'"
                  v-model="form.residential_address"
                  type="text"
                  clearable
                  lazy-rules
                  :disable="loading"
                  :rules="[val => !!val || $t('required_fields')]"
                />
                <q-input
                  filled
                  :label="$t('school_region') + ' *'"
                  v-model="form.school_region"
                  type="text"
                  clearable
                  lazy-rules
                  :disable="loading"
                  :rules="[val => !!val || $t('required_fields')]"
                />
                <q-input
                  filled
                  :label="$t('school_district') + ' *'"
                  v-model="form.school_district"
                  type="text"
                  clearable
                  lazy-rules
                  :disable="loading"
                  :rules="[val => !!val || $t('required_fields')]"
                />
                <q-input
                  filled
                  :label="$t('school_number_or_name') + ' *'"
                  v-model="form.school_number_or_name"
                  type="text"
                  clearable
                  lazy-rules
                  :disable="loading"
                  :rules="[val => !!val || $t('required_fields')]"
                />
                <q-select filled
                  :disable="loading"
                  v-model="form.graduation_year"
                  :label="$t('graduation_year') + ' *'"
                  :options="graduationYearSelect"
                  lazy-rules
                  :rules="[val => !!val || $t('required_fields')]"
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
                  :label="$t('certificate_number')"
                  v-model="form.certificate_number"
                  type="number"
                  clearable
                  lazy-rules
                  :disable="loading"
                />
                <q-input
                  filled
                  :label="$t('act_number') + ' *'"
                  v-model="form.act_number"
                  type="number"
                  clearable
                  lazy-rules
                  :disable="loading"
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
                  mask="(##) ### - ## - ##"
                  fill-mask
                  :rules="[val => !!val || $t('required_fields')]"
                />
                <q-uploader
                  :disable="loading"
                  extensions=".jpg,.jpeg,.png,.doc,.exel"
                  accept=".jpg, .jpeg, .png, .pdf, image/jpeg, .pdf, .doc, .docx, .xls, .xlsx, .txt"
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
                        <q-tooltip>Удалить все</q-tooltip>
                      </q-btn>
                      <q-btn v-if="scope.uploadedFiles.length > 0" icon="done_all" @click="scope.removeUploadedFiles" round dense flat >
                        <q-tooltip>Remove Uploaded Files</q-tooltip>
                      </q-btn>
                      <q-spinner v-if="scope.isUploading" class="q-uploader__spinner" />
                      <div class="col">
                        <div class="q-uploader__title">{{$t('documents_graduate_9_grade')}} *</div>
                        <div class="q-uploader__subtitle">{{ scope.uploadSizeLabel }}</div>
                      </div>
                      <q-btn v-if="scope.canAddFiles" type="a" icon="add_box" round dense flat>
                        <q-uploader-add-trigger />
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
                <div v-if="showCheckboxNotRobot" class="ml-3" :class="'text-'+colorCheckbox">
                  Подтвердите что вы не робот
                </div>
                <q-checkbox
                  v-model="checkboxNotRobot"
                  v-if="showCheckboxNotRobot"
                  label="Я не робот"
                  :color="colorCheckbox"
                  class="mt-0"
                  :keep-color="true"/>
                <div class="action__btn">
                  <q-btn
                    color="cyan"
                    class="upload pl-2"
                    :loading="loading"
                    type="submit"
                  >
                    {{$t('send')}}
                  </q-btn>
                  <q-btn
                    outline
                    type="reset"
                    class="clear ml-3"
                    color="grey"
                    :disable="loading"
                  >
                    {{$q.lang.label.clear}}
                  </q-btn>
                </div>
              </q-form>
            </q-card-section>
          </q-card>
        </div>
      </div>
      <footer>footer</footer>
    </q-page>
    <PageScroller />
  </q-scroll-area>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import PageScroller from './../components/PageScroller'
export default {
  name: 'Resident',
  meta: {
    titleTemplate: title => `${title} - Resident`,
    meta: {
      description: { name: 'description', content: 'Resident Page 1' },
      keywords: { name: 'keywords', content: 'Resident website' }
    }
  },
  components: {
    PageScroller
  },
  data () {
    return {
      instruction_app: [],
      colorCheckbox: 'negative',
      checkboxNotRobot: false,
      showCheckboxNotRobot: false,
      documentsMultiple: [],
      files: [],
      uploader_color: 'cyan',
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
      'mobileDetect',
      'getThumbStyle'
    ]),
    graduationYearSelect () {
      let yearNow = new Date().getFullYear()
      let years = []
      for (; yearNow >= 1980; yearNow--) {
        years.push(yearNow)
      }
      return years
    }
  },
  watch: {
    checkboxNotRobot (val) {
      this.colorCheckbox = val ? 'teal' : 'negative'
    }
  },
  beforeMount () {
    this.$axios.get('get_resident_instruction').then(res => {
      if (res.data.length > 0) {
        [this.instruction_app] = res.data
        this.setWidthImages()
      }
    })
  },
  mounted () {
  },
  methods: {
    ...mapActions([
      'setWidthImages',
      'recaptchaToken',
      'mainGetData'
    ]),
    addFile () {
      this.uploader_color = 'cyan'
    },
    async onSubmit () {
      let files = this.$refs['uploader'].files
      if (files.length > 0) {
        this.uploader_color = 'cyan'
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
            Object.keys(this.form).forEach(key => { formData.append(key, this.form[key]) })
            formData.append('recaptcha_token', localStorage.getItem('reCAPTCHA'))
            this.$axios.post('new_resident', formData).then(res => {
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
      this.uploader_color = 'cyan'
      this.showCheckboxNotRobot = false
    }
  }
}
</script>

<style lang="stylus">
  .client__resident
    display: flex
    flex-direction: column
    @media (max-width: 992px)
      h3
        font-size 26px
        line-height: 26px
      .application
        .q-card
          box-shadow none
    footer
      margin-top: auto
      padding: 20px
      background-color: #ccc
  .resident_client_q_uploader
      width: auto !important
</style>
