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
          <q-breadcrumbs-el label="Settings" />
       </q-breadcrumbs>
      </div>
      <div class="q-pa-md q-gutter-y-md">
        <q-card class="q-pa-md q-gutter-y-md">
          <q-tabs
            color="teal"
            v-model="tab"
            dense
            class="text-grey"
            active-color="teal"
            align="justify"
            narrow-indicator
            indicator-color="teal"
          >
            <q-tab name="email">
              <div class="row items-center">
                <q-icon name="mdi-account" color="" size="20px" class="mr-1"/>
                <span style="font-size: 14px;">Basic information</span>
              </div>
            </q-tab>
            <q-tab name="password">
              <div class="row items-center">
                <q-icon name="mdi-shield-lock-outline" color="" size="20px" class="mr-1"/>
                <span style="font-size: 14px;">Security</span>
              </div>
            </q-tab>
          </q-tabs>
          <q-tab-panels v-model="tab" animated class="m-0">
              <q-tab-panel name="email" class="px-0 q-gutter-y-md">
                <q-form
                  @submit="changeEmail"
                  ref="form"
                  class="q-gutter-y-md"
                >
                  <q-input color="teal" clearable lazy-rules filled v-model.trim="email" label="Email"
                    :rules="[
                      val => !!val || $t('required_fields'),
                      val => getRegExpEmail.test(val) || this.$t('email_must_be_valid')
                    ]"
                  />
                  <div class="q-gutter-md">
                    <q-btn color="teal" type="submit" :loading="loading" :disable="loading">Change email</q-btn>
                  </div>
                </q-form>
              </q-tab-panel>
              <q-tab-panel name="password" class="px-0 q-gutter-y-md">
                <q-form
                  @submit="changePaswword"
                  ref="form"
                  class="q-gutter-y-md"
                >
                  <q-input color="teal" clearable lazy-rules filled v-model.trim="password" label="Password" :type="type_password"
                    :rules="[
                      val => val !== null && val !== '' || $t('required_fields'),
                      val => val.length > 5 || 'Password must be less than 6 characters'
                    ]"
                  >
                    <template v-slot:prepend>
                      <q-icon name="mdi-textbox-password" />
                    </template>
                    <template v-slot:append>
                      <q-icon v-if="password" class="cursor-pointer" :name="show_hide_password_icon" @click="toggleShowPassword"/>
                    </template>
                  </q-input>
                  <q-input color="teal" clearable lazy-rules filled v-model.trim="password_confirmation" label="Confirm password" :type="type_password"
                    :rules="[val => !!val || $t('required_fields')]"
                    :error-message="error_message_password"
                    :error="error_password_confirmation"
                  >
                    <template v-slot:prepend>
                      <q-icon name="mdi-textbox-password" />
                    </template>
                  </q-input>
                  <div class="q-gutter-md">
                    <q-btn color="teal" type="submit" :loading="loading" :disable="loading">Change password</q-btn>
                  </div>
                </q-form>
              </q-tab-panel>
            </q-tab-panels>
        </q-card>
      </div>
    </q-page>
  </q-scroll-area>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Settings',
  data () {
    return {
      error_message_password: '',
      error_password_confirmation: false,
      show_hide_password_icon: 'mdi-eye-off',
      type_password: 'password',
      loading: false,
      email: null,
      user_id: null,
      password: null,
      password_confirmation: null,
      tab: 'email'
    }
  },
  computed: {
    ...mapGetters([
      'getRegExpEmail',
      'getUser',
      'mobileDetect',
      'getThumbStyle'
    ])
  },
  beforeMount () {
    this.email = this.getUser.email
    this.user_id = this.getUser.id
  },
  methods: {
    validateEmail () {
      console.log(11)
      return false
    },
    changeEmail () {
      let data = {
        id: this.user_id,
        email: this.email
      }
      this.$axios.post('change_email', data).then(res => {
        let data = res.data
        let code = data.code
        if (code === 1) {
          this.$q.notify({
            color: 'warning',
            icon: 'warning',
            message: 'Введите другой емайл',
            position: 'top',
            timeout: 300,
            actions: [{ icon: 'close', color: 'white' }]
          })
        } else if (code === 2) {
          this.$q.notify({
            color: 'warning',
            icon: 'warning',
            message: 'Письмо уже отправленно!',
            position: 'top',
            timeout: 300,
            actions: [{ icon: 'close', color: 'white' }]
          })
        } else {
          this.$q.notify({
            color: 'teal',
            icon: 'check_circle',
            message: 'На Вашу почту было отправленно письмо. Пожалуйста подтвердите почту для изменения!',
            position: 'top',
            timeout: 20000,
            actions: [{ icon: 'close', color: 'white' }]
          })
        }
      })
    },
    changePaswword () {
      if (this.password_confirmation !== this.password) {
        this.error_password_confirmation = true
        this.error_message_password = 'Пароли не совпадают'
      } else {
        this.error_password_confirmation = false
        this.error_message_password = ''
        let data = {
          id: this.user_id,
          password: this.password,
          password_confirmation: this.password_confirmation
        }
        this.$axios.post('change_password', data).then(() => {
          this.$q.notify({
            color: 'teal',
            icon: 'check_circle',
            message: 'Password changed',
            position: 'top',
            timeout: 200
          })
        })
      }
    },
    toggleShowPassword () {
      if (this.type_password === 'password') {
        this.type_password = 'text'
        this.show_hide_password_icon = 'mdi-eye'
      } else {
        this.show_hide_password_icon = 'mdi-eye-off'
        this.type_password = 'password'
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .admin__main
    &-about__us
      .q-panel.scroll
        overflow: visible
</style>
