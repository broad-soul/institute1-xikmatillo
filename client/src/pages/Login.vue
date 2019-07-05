<template>
  <div class="row h-100vh login__page q-pa-md">
    <div class="col-sm-8 col-md-6 col-lg-4 col-12" style="margin: auto;">
      <q-card
        class="login__page-card text-grey-10"
      >
        <q-card-section class="login__page-card__header">
          <span>aluzswlu.uz</span>
        </q-card-section>
        <q-card-section>
          <q-form
            @submit="onSubmit"
            @reset="onReset"
            class="login__page-card__form q-gutter-y-xs"
          >
            <q-input
              :disable="loading"
              filled
              v-model.trim="form.email"
              label="Your email *"
              lazy-rules
              color="grey-10"
              bg-color="teal-24"
              clearable
              :rules="[
                val => !!val || $t('required_fields'),
                val => getRegExpEmail.test(val) || this.$t('email_must_be_valid')
              ]"
              :error-message="email_error_message"
              :error="email_error"
            >
              <template v-slot:prepend>
                <q-icon name="mdi-email" />
              </template>
            </q-input>
            <q-input
              :disable="loading"
              filled
              :type="type_password"
              v-model.trim="form.password"
              label="Your password *"
              lazy-rules
              color="grey-10"
              bg-color="teal-24"
              clearable
              counter
              :rules="[
                val => val !== null && val !== '' || $t('required_fields'),
              ]"
              :error="password_error"
            >
              <template v-slot:prepend>
                <q-icon name="mdi-textbox-password" />
              </template>
              <template v-slot:append>
                <q-icon v-if="form.password" class="cursor-pointer" :name="show_hide_password_icon" @click="toggleShowPassword"/>
              </template>
            </q-input>
            <q-toggle v-model="form.remember_me" color="cyan" label="Remember me" :loading="loading" />
            <div class="btn__actions  q-gutter-x-sm">
              <q-btn label="Log in" class="btn__actions-login" type="submit" color="cyan" :loading="loading"/>
              <q-btn label="Cancel" to="/" class="btn__actions-reset" color="amber" outline :disable="loading" />
            </div>
          </q-form>
          <div class="row">
            <q-btn :label="$t('forgot_password')" to="/password/reset" class="mt-2 ml-auto" color="cyan" flat :disable="loading" />
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import store from '../store'

export default {
  name: 'Login',
  beforeRouteEnter (to, from, next) {
    store.dispatch('isAuthorized').then(res => {
      if (res.data.is_admin === 1) next('/admin')
      next()
    }).catch(() => next())
  },
  data () {
    return {
      show_hide_password_icon: 'mdi-eye-off',
      type_password: 'password',
      email_error_message: '',
      email_error: false,
      password_error: false,
      loading: false,
      form: {
        email: null,
        password: null,
        remember_me: false
      }
    }
  },
  computed: {
    ...mapGetters([
      'getRegExpEmail'
    ])
  },
  mounted () {
  },
  methods: {
    ...mapActions([
      'login'
    ]),
    onSubmit () {
      this.loading = true
      this.email_error_message = ''
      this.email_error = false
      this.password_error_message = ''
      this.password_error = false
      this.login(this.form).then(token => {
        this.$axios.defaults.headers.Authorization = 'Bearer ' + token
        this.$router.push('/admin')
      }).finally(() => { setTimeout(() => { this.loading = false }, 500) }).catch(() => {
        this.email_error_message = 'Email or password is wrong'
        this.email_error = true
        this.password_error = true
      })
    },
    onReset () {
      this.form.email = null
      this.form.password = null
      this.form.remember_me = false
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

<style lang="stylus">
  .login__page {
    &-card {
      &__header {
        background: $linear_gradient
        color: #fff
        text-transform: lowercase
        font-size: 30px
      }
      &__form {
        padding-top: 20px
      }
    }
  }
</style>
