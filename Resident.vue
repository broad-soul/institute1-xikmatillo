<template>
  <q-page class="ssss">
    <div class="text-center">
      <h3>{{$t('regTextOpen')}}</h3>
      <p>{{$t('registrationWillTakePlace')}}</p>
    </div>
    <div class="row justify-center resident_client">
      <div class="col-lg-5">
        <h3>{{$t('profileText')}}</h3>
        <p>Академический лицей узбекского государственного университета мировых языков</p>
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
                label="Наименование Учебного заведения *"
                v-model="form.place_of_education"
                type="text"
                clearable
                lazy-rules
                class="mt-4"
                :disable="loading"
                :rules="[
                  val => !!val || 'Please type something',
                  val => val.length > 1 || 'Please use min 2',
                ]"
              />
              <q-select v-model="form.direction_code"
                :options="[
                  { label: 'Зарубежная филология', value: '3940001', },
                  { label: 'Точные науки', value: '3910001', }
                ]"
                filled
                label="Направление *"
                clearable
                lazy-rules
                :disable="loading"
                :rules="[
                  val => val || 'Please type something'
                ]"
              />
              <q-input
                filled
                label="Имя *"
                v-model="form.name"
                type="text"
                clearable
                lazy-rules
                :disable="loading"
                :rules="[
                  val => !!val || 'Please type something',
                  val => val.length > 1 || 'Please use min 2',
                ]"
              />
              <q-input
                filled
                label="Фамилия *"
                v-model="form.surname"
                type="text"
                clearable
                lazy-rules
                :disable="loading"
                :rules="[
                  val => !!val || 'Please type something',
                  val => val.length > 1 || 'Please use min 2',
                ]"
              />
              <q-input
                filled
                label="Отчество *"
                v-model="form.father_name"
                type="text"
                clearable
                lazy-rules
                :disable="loading"
                :rules="[
                  val => !!val || 'Please type something',
                  val => val.length > 1 || 'Please use min 2',
                ]"
              />
              <q-input
                filled
                label="Дата рождения *"
                v-model="form.date_of_birth"
                lazy-rules
                clearable
                :disable="loading"
                mask="##/##/####"
                :rules="[val => !!val || 'Please type something']"
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
                label="Гражданство *"
                v-model="form.citizenship"
                type="text"
                clearable
                lazy-rules
                :disable="loading"
                :rules="[
                  val => !!val || 'Please type something',
                  val => val.length > 1 || 'Please use min 2',
                ]"
              />
              <q-input
                filled
                label="Серия и номер паспорта/ свидетельство о рождения *"
                v-model="form.client_requisite"
                type="text"
                clearable
                lazy-rules
                :disable="loading"
                :rules="[
                  val => !!val || 'Please type something',
                  val => val.length > 1 || 'Please use min 2',
                ]"
              />
              <q-input
                filled
                label="Адрес проживания *"
                v-model="form.residential_address"
                type="text"
                clearable
                lazy-rules
                :disable="loading"
                :rules="[
                  val => !!val || 'Please type something',
                  val => val.length > 1 || 'Please use min 2',
                ]"
              />
              <q-input
                filled
                label="Школа Регион (Город / Область) *"
                v-model="form.school_region"
                type="text"
                clearable
                lazy-rules
                :disable="loading"
                :rules="[
                  val => !!val || 'Please type something',
                  val => val.length > 1 || 'Please use min 2',
                ]"
              />
              <q-input
                filled
                label="Школа (Район / город) *"
                v-model="form.school_district"
                type="text"
                clearable
                lazy-rules
                :disable="loading"
                :rules="[
                  val => !!val || 'Please type something',
                  val => val.length > 1 || 'Please use min 2',
                ]"
              />
              <q-input
                filled
                label="Номер или название школы *"
                v-model="form.school_number_or_name"
                type="text"
                clearable
                lazy-rules
                :disable="loading"
                :rules="[
                  val => !!val || 'Please type something',
                  val => val.length > 1 || 'Please use min 2',
                ]"
              />
              <q-input
                filled
                label="Год окончания школы *"
                v-model="form.graduation_year"
                lazy-rules
                :disable="loading"
                clearable
                mask="##/##/####"
                :rules="[val => !!val || 'Please type something']">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy ref="qDateProxy2">
                      <q-date
                        mask="DD/MM/YYYY"
                        minimal
                        v-model="form.graduation_year"
                        @input="() => $refs.qDateProxy2.hide()"
                      />
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
              <q-input
                filled
                label="Язык обучения *"
                v-model="form.education_language"
                type="text"
                clearable
                lazy-rules
                :disable="loading"
                :rules="[
                  val => !!val || 'Please type something',
                  val => val.length > 1 || 'Please use min 2',
                ]"
              />
              <q-input
                filled
                label="Номер аттестата *"
                v-model="form.certificate_number"
                type="number"
                clearable
                lazy-rules
                :disable="loading"
                :rules="[
                  val => !!val || 'Please type something',
                  val => val.length > 1 || 'Please use min 2',
                ]"
              />
              <q-input
                filled
                label="Номер акта *"
                v-model="form.act_number"
                type="number"
                clearable
                lazy-rules
                :disable="loading"
                :rules="[
                  val => !!val || 'Please type something',
                  val => val.length > 1 || 'Please use min 2',
                ]"
              />
              <q-input
                filled
                label="Номер телефона *"
                v-model="form.phone"
                type="text"
                clearable
                lazy-rules
                :disable="loading"
                :rules="[
                  val => !!val || 'Please type something',
                  val => val.length > 1 || 'Please use min 2',
                ]"
              />
              <q-uploader
                extensions=".jpg,.jpeg,.png,.doc,.exel"
                accept=".jpg, .jpeg, .pdf, image/jpeg, .pdf, .doc, .docx, .xls, .xlsx, .txt"
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
                    <q-btn v-if="scope.queuedFiles.length > 0" icon="clear_all" @click="scope.removeQueuedFiles" round dense flat >
                      <q-tooltip>Clear All</q-tooltip>
                    </q-btn>
                    <q-btn v-if="scope.uploadedFiles.length > 0" icon="done_all" @click="scope.removeUploadedFiles" round dense flat >
                      <q-tooltip>Remove Uploaded Files</q-tooltip>
                    </q-btn>
                    <q-spinner v-if="scope.isUploading" class="q-uploader__spinner" />
                    <div class="col">
                      <div class="q-uploader__title">Документы выпускника 9 класса *</div>
                      <div class="q-uploader__subtitle">{{ scope.uploadSizeLabel }}</div>
                    </div>
                    <q-btn v-if="scope.canAddFiles" type="a" flat>
                      <q-uploader-add-trigger />
                      <span>Добавить</span>
                      <q-icon name="add_box" class="ml-2" />
                      <q-tooltip>Прикрепить файлы</q-tooltip>
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
              <vue-recaptcha v-if="showRecaptchaV2" sitekey="6LeN96cUAAAAALd_TFioxHn86cOe0At0Na9h8KyX"></vue-recaptcha>
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
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import VueRecaptcha from 'vue-recaptcha'
// :rules="[ val => val && val.length > 0 || 'Please type something']"
export default {
  name: 'Resident',
  components: { VueRecaptcha },
  meta: {
    titleTemplate: title => `${title} - Resident`,
    meta: {
      description: { name: 'description', content: 'Resident Page 1' },
      keywords: { name: 'keywords', content: 'Resident website' }
    }
  },
  data () {
    return {
      showRecaptchaV2: false,
      verifiedRecaptcha: false,
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
    ...mapGetters(['mobileDetect'])
  },
  mounted () {
  },
  methods: {
    ...mapActions(['calcSize']),
    addFile () {
      this.uploader_color = 'secondary'
    },
    async onSubmit () {
      let files = this.$refs['uploader'].files
      if (files.length > 0) {
        this.uploader_color = 'secondary'
        this.loading = true
        if (!this.verifiedRecaptcha) {
          await this.$axios.post('https://www.google.com/recaptcha/api/siteverify', {
            'secret': '6LeN96cUAAAAAJHvcAo8pL2za_GVC0c7C_EFMYh6',
            'response': localStorage.getItem('reCAPTCHA')
          })
            .then(res => { this.verifiedRecaptcha = true })
        }
        if (this.verifiedRecaptcha) {
          this.form.direction_code = this.form.direction_code.value
          let formData = new FormData()
          files.forEach((file, i) => { formData.append(`files[${i}]`, file) })
          Object.keys(this.form).forEach(key => { formData.append(key, this.form[key]) })
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
          }).catch(error => {
            console.log(error.response.data)
            this.loading = false
          })
        } else {
          this.showRecaptchaV2 = true
          this.verifiedRecaptcha = false
        }
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
    }
  }
}
</script>

<style lang="stylus" scope>
  .resident_client_q_uploader
      width: auto !important
</style>
