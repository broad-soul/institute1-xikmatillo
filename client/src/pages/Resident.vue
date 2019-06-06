<template>
  <q-page class="">
    <div class="text-center">
      <h3>{{$t('regTextOpen')}}</h3>
      <p>{{$t('registrationWillTakePlace')}}</p>
    </div>
    <div class="row justify-center profile">
      <div class="col-lg-4">
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
                label="Наименование Учебного заведения *"
                v-model="form.place_of_education"
                type="text"
                clearable
                lazy-rules
                :rules="[
                  val => !!val || 'Please type something',
                  val => val.length > 1 || 'Please use min 2',
                ]"
              />
              <q-input
                label="Имя *"
                v-model="form.name"
                type="text"
                clearable
                lazy-rules
                :rules="[
                  val => !!val || 'Please type something',
                  val => val.length > 1 || 'Please use min 2',
                ]"
              />
              <q-input
                label="Фамилия *"
                v-model="form.surname"
                type="text"
                clearable
                lazy-rules
                :rules="[
                  val => !!val || 'Please type something',
                  val => val.length > 1 || 'Please use min 2',
                ]"
              />
              <q-input
                label="Отчество *"
                v-model="form.father_name"
                type="text"
                clearable
                lazy-rules
                :rules="[
                  val => !!val || 'Please type something',
                  val => val.length > 1 || 'Please use min 2',
                ]"
              />
              <q-input
                label="Дата рождения *"
                v-model="form.date_of_birth"
                lazy-rules
                clearable
                mask="##/##/####"
                :rules="[val => !!val || 'Please type something']">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy ref="qDateProxy">
                      <q-date
                        mask="DD/MM/YYYY"
                        minimal
                        v-model="form.date_of_birth"
                        @input="() => $refs.qDateProxy.hide()"
                      />
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
              <q-input
                label="Гражданство *"
                v-model="form.citizenship"
                type="text"
                clearable
                lazy-rules
                :rules="[
                  val => !!val || 'Please type something',
                  val => val.length > 1 || 'Please use min 2',
                ]"
              />
              <q-input
                label="Серия и номер паспорта/ свидетельство о рождения *"
                v-model="form.client_requisite"
                type="text"
                clearable
                lazy-rules
                :rules="[
                  val => !!val || 'Please type something',
                  val => val.length > 1 || 'Please use min 2',
                ]"
              />
              <q-input
                label="Адрес проживания *"
                v-model="form.residential_address"
                type="text"
                clearable
                lazy-rules
                :rules="[
                  val => !!val || 'Please type something',
                  val => val.length > 1 || 'Please use min 2',
                ]"
              />
              <q-input
                label="Школа Регион (Город / Область) *"
                v-model="form.school_region"
                type="text"
                clearable
                lazy-rules
                :rules="[
                  val => !!val || 'Please type something',
                  val => val.length > 1 || 'Please use min 2',
                ]"
              />
              <q-input
                label="Школа (Район / город) *"
                v-model="form.school_district"
                type="text"
                clearable
                lazy-rules
                :rules="[
                  val => !!val || 'Please type something',
                  val => val.length > 1 || 'Please use min 2',
                ]"
              />
              <q-input
                label="Номер или название школы *"
                v-model="form.school_number_or_name"
                type="text"
                clearable
                lazy-rules
                :rules="[
                  val => !!val || 'Please type something',
                  val => val.length > 1 || 'Please use min 2',
                ]"
              />
              <q-input
                label="Год окончания школы *"
                v-model="form.graduation_year"
                lazy-rules
                clearable
                mask="##/##/####"
                :rules="[val => !!val || 'Please type something']">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy ref="qDateProxy">
                      <q-date
                        mask="DD/MM/YYYY"
                        minimal
                        v-model="form.graduation_year"
                        @input="() => $refs.qDateProxy.hide()"
                      />
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
              <q-input
                label="Язык обучения *"
                v-model="form.education_language"
                type="text"
                clearable
                lazy-rules
                :rules="[
                  val => !!val || 'Please type something',
                  val => val.length > 1 || 'Please use min 2',
                ]"
              />
              <q-input
                label="Номер аттестата *"
                v-model="form.certificate_number"
                type="number"
                clearable
                lazy-rules
                :rules="[
                  val => !!val || 'Please type something',
                  val => val.length > 1 || 'Please use min 2',
                ]"
              />
              <q-input
                label="Номер акта *"
                v-model="form.act_number"
                type="number"
                clearable
                lazy-rules
                :rules="[
                  val => !!val || 'Please type something',
                  val => val.length > 1 || 'Please use min 2',
                ]"
              />
              <q-input
                label="Номер телефона *"
                v-model="form.phone"
                type="text"
                clearable
                lazy-rules
                :rules="[
                  val => !!val || 'Please type something',
                  val => val.length > 1 || 'Please use min 2',
                ]"
              />
              <q-input
                label="Документы выпускника 9 класса *"
                v-model="form.documents_graduate_9_grade"
                type="text"
                clearable
                lazy-rules
                :rules="[
                  val => !!val || 'Please type something',
                  val => val.length > 1 || 'Please use min 2',
                ]"
              />
              <template v-if="all_files_with_size.length > 0">
                <p class="mt-3 mb-0">Документы ({{ all_files_with_size.length }})</p>
                <ol class="pl-4 mt-1 mb-0">
                  <li v-for="(name, index) in all_files_with_size" :key="index">
                    {{ name }}
                    <q-icon
                      name="close"
                      color="red"
                      class="cursor-pointer"
                      @click="deleteOneFile(index)"
                    />
                  </li>
                </ol>
              </template>
              <input type="file" multiple style="display: none" ref="fupload" @change="onFileChange">
              <q-btn color="blue-grey" @click.stop="onButtonClick()" class="my-3 pl-2" :loading="select_loading">
                <q-icon name="home" class="mr-2"/>
                Прикрепить Документы
              </q-btn>
              <div class="action__btn">
                <q-btn
                  color="blue"
                  class="upload pl-2"
                  :loading="btn_loading"
                  type="submit"
                >
                  <q-icon name="home" class="icon mr-2" />
                  Загрузить
                </q-btn>
                <q-btn type="reset" class="clear ml-3">Очистить</q-btn>
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'
// :rules="[ val => val && val.length > 0 || 'Please type something']"

export default {
  name: 'Resident',
  data () {
    return {
      all_files: [],
      all_files_name: [],
      all_files_with_size: [],
      errors: false,
      select_loading: false,
      btn_loading: false,
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
  methods: {
    onButtonClick () {
      this.$refs.fupload.click()
      this.errors = {}
    },
    onFileChange (e) {
      this.all_files = Array.from(e.target.files)
      if (this.all_files.length > 0) {
        for (let file of this.all_files) {
          if (this.all_files_name.indexOf(file.name) === -1) {
            this.all_files_name.push(file.name)
            this.all_files_with_size.push(file.name + ' (' + this.calcSize(file.size) + ')')
          }
        }
      }
    },
    onSubmit () {
      this.loading = true
      // this.form.direction_code = this.form.direction_code.value
      let formData = new FormData()
      this.all_files.forEach((file, i) => {
        formData.append(`files[${i}]`, file)
      })
      Object.keys(this.form).forEach(key => {
        formData.append(key, this.form[key])
      })
      this.$axios.post('new_application', formData).then(res => {
        this.loading = false
        this.$axios.post('remove_files', res.data.files)
        this.$refs.form.reset()
      }).catch(error => {
        console.log(error.response.data)
      })
    },
    onReset () {
      Object.keys(this.form).forEach(key => {
        this.form[key] = null
      })
      this.form.files = []
      this.all_files = []
      this.all_files_name = []
      this.all_files_with_size = []
    },
    calcSize (size) {
      size = size / 1024 // kb
      if (size <= 1000) {
        return Math.round(size) + 'Kb'
      } else if (size > 1000 && size <= 1048506) {
        return (size / 1024).toFixed(2) + 'Mb'
      } else {
        return (size / 1024 / 1000).toFixed(2) + 'Gb'
      }
    },
    deleteOneFile (index) {
      this.all_files.splice(index, 1)
      this.all_files_name.splice(index, 1)
      this.all_files_with_size.splice(index, 1)
    }
  }
}
</script>

<style lang="stylus" scope>
</style>
