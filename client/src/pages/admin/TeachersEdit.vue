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
          <q-breadcrumbs-el label="Тeachers" to="/admin/teachers" />
          <q-breadcrumbs-el label="Edit" />
        </q-breadcrumbs>
      </div>
      <div class="q-pa-md q-gutter-y-md">
        <q-card class="q-pa-md q-gutter-y-md">
          <q-form
            @submit="changeTeacher"
            ref="form"
            class="q-gutter-y-md"
          >
            <q-img :placeholder-src="'/statics/avatar04.png'" :src="'/storage/' + teacher.image" contain style="max-width: 300px; height: 300px;" :ratio="4/3" />
            <q-uploader
              :disable="loading"
              extensions=".jpg,.jpeg,.png"
              accept=".jpg, .jpeg, .pdf, image/jpeg, .png"
              :max-file-size="3048576"
              :max-total-size="10248576"
              @added="addFile"
              :color="uploader_color"
              ref="uploader"
              style="width: 100%;"
            >
              <template v-slot:header="scope">
                <div class="row no-wrap items-center q-pa-sm q-gutter-xs">
                  <q-btn v-if="scope.uploadedFiles.length > 0" icon="done_all" @click="scope.removeUploadedFiles" round dense flat >
                    <q-tooltip>Remove Uploaded Files</q-tooltip>
                  </q-btn>
                  <q-spinner v-if="scope.isUploading" class="q-uploader__spinner" />
                  <div class="col">
                    <div class="q-uploader__title">Photo</div>
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
            <q-input
              color="teal"
              filled
              label="Name"
              v-model.lazy.trim="teacher.name"
              type="text"
              clearable
              lazy-rules
              :disable="loading"
              :rules="[val => !!val || $t('required_fields')]"
            />
            <q-input
              color="teal"
              filled
              label="Surname"
              v-model.lazy.trim="teacher.surname"
              type="text"
              clearable
              lazy-rules
              :disable="loading"
              :rules="[val => !!val || $t('required_fields')]"
            />
            <q-input
              color="teal"
              filled
              label="Age"
              v-model.lazy.trim="teacher.age"
              type="text"
              clearable
              lazy-rules
              class="mt-2"
              :disable="loading"
              :rules="[val => !!val || $t('required_fields')]"
            />
            <q-tabs
              color="teal"
              v-model="teacherTab"
              dense
              class="text-grey"
              active-color="teal"
              align="justify"
              narrow-indicator
              indicator-color="teal"
            >
              <q-tab name="lang-en" label="En" />
              <q-tab name="lang-ru" label="Ru" />
              <q-tab name="lang-uz" label="Uz" />
            </q-tabs>
            <q-tab-panels v-model="teacherTab" animated class="m-0">
              <q-tab-panel name="lang-en" class="px-0 q-gutter-y-md">
                <q-input color="teal" clearable lazy-rules filled v-model="teacher.subject_en" label="Subject"></q-input>
                <q-input color="teal" clearable lazy-rules filled type="textarea" v-model="teacher.about_me_en" label="About me"></q-input>
              </q-tab-panel>
              <q-tab-panel name="lang-ru" class="px-0 q-gutter-y-md">
                <q-input color="teal" clearable lazy-rules filled v-model="teacher.subject_ru" label="Предмет"></q-input>
                <q-input color="teal" clearable lazy-rules filled type="textarea" v-model="teacher.about_me_ru" label="Обо мне"></q-input>
              </q-tab-panel>
              <q-tab-panel name="lang-uz" class="px-0 q-gutter-y-md">
                <q-input color="teal" clearable lazy-rules filled v-model="teacher.subject_uz" label="Fan"></q-input>
                <q-input color="teal" clearable lazy-rules filled type="textarea" v-model="teacher.about_me_uz" label="Men xaqimda"></q-input>
              </q-tab-panel>
            </q-tab-panels>
            <q-toggle v-model.number="teacher.is_visible" color="teal" label="Visible on the main page" :loading="loading" />
            <div class="q-gutter-md">
              <q-btn color="teal" type="submit" :loading="loading" :disable="loading">Update</q-btn>
              <q-btn to="/admin/teachers">Cancel</q-btn>
            </div>
          </q-form>
        </q-card>
      </div>
    </q-page>
  </q-scroll-area>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'FaqCreate',
  data () {
    return {
      uploader_color: 'secondary',
      teacher_id: null,
      loading: false,
      teacher: {
        id: null,
        name: null,
        image: '/statics/avatar04.png',
        surname: null,
        age: null,
        subject_en: null,
        subject_ru: null,
        subject_uz: null,
        about_me_en: null,
        about_me_ru: null,
        about_me_uz: null,
        is_visible: 0
      },
      teacherTab: 'lang-en'
    }
  },
  computed: {
    ...mapGetters([
      'mobileDetect',
      'getThumbStyle'
    ])
  },
  mounted () {
    this.teacher_id = this.$route.params.id
    this.$axios.get('get_teacher/' + this.teacher_id).then(res => {
      let data = res.data
      this.teacher = {
        id: data.id,
        name: data.name,
        image: data.photo,
        surname: data.surname,
        age: data.age,
        subject_en: data.subject_en === 'null' ? '' : data.subject_en,
        subject_ru: data.subject_ru === 'null' ? '' : data.subject_ru,
        subject_uz: data.subject_uz === 'null' ? '' : data.subject_uz,
        about_me_en: data.about_me_en === 'null' ? '' : data.about_me_en,
        about_me_ru: data.about_me_ru === 'null' ? '' : data.about_me_ru,
        about_me_uz: data.about_me_uz === 'null' ? '' : data.about_me_uz,
        is_visible: data.is_visible !== 'true' ? null : true
      }
    })
  },
  methods: {
    changeTeacher () {
      this.loading = true
      let formData = new FormData()
      formData.append('photo', this.$refs.uploader.files[0])
      Object.keys(this.teacher).forEach(key => { formData.append(key, this.teacher[key]) })
      this.$axios.post('change_teacher', formData).then(() => {
        this.$q.notify({
          color: 'teal',
          icon: 'check_circle',
          message: 'Changed successfully',
          position: 'top',
          timeout: 200
        })
        setTimeout(() => {
          this.$router.push('/admin/teachers')
        }, 300)
      }).finally(() => { this.loading = false })
    },
    addFile () {
      this.uploader_color = 'secondary'
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
