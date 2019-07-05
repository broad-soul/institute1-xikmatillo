<template>
  <div class="row h-100vh reset__password__page q-pa-md">
    <div class="col-sm-8 col-md-6 col-lg-4 col-12" style="margin: auto;">
      <q-card
        class="reset__password__page-card text-grey-10"
      >
        <q-card-section class="reset__password__page-card__header">
          <span>Reset password</span>
        </q-card-section>
        <q-card-section>
          <q-form
            @submit="onSubmit"
            class="reset__password__page-card__form q-gutter-y-xs"
          >
            <q-input color="teal" clearable lazy-rules filled v-model.trim="password" label="Password" :type="type_password"
              :error-message="password_error_message"
              :error="error_password"
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
            >
              <template v-slot:prepend>
                <q-icon name="mdi-textbox-password" />
              </template>
            </q-input>
            <div class="btn__actions  q-gutter-y-sm">
              <q-btn label="Reset password" class="btn__actions-login" type="submit" color="cyan" :loading="loading"/>
              <br>
              <q-btn label="Cancel" to="/login" class="btn__actions-reset" color="amber" outline :disable="loading" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import store from '../store'

export default {
  name: 'PasswordReset',
  beforeRouteEnter (to, from, next) {
    store.dispatch('isAuthorized').then(res => {
      if (res.data.is_admin === 1) next('/admin')
      next()
    }).catch(() => next())
  },
  data () {
    return {
      token: null,
      error_password: false,
      show_hide_password_icon: 'mdi-eye-off',
      type_password: 'password',
      password_error_message: '',
      password_error: false,
      loading: false,
      password_confirmation: null,
      password: null
    }
  },
  computed: {
    ...mapGetters([
      'getRegExpEmail'
    ])
  },
  beforeMount () {
    this.token = this.$route.params.token
  },
  mounted () {
  },
  methods: {
    ...mapActions([
      'login'
    ]),
    onSubmit () {
      this.password_error_message = ''
      this.password_error = false

      if (this.password_confirmation !== this.password) {
        this.error_password = true
        this.password_error_message = 'Пароли не совпадают'
      } else {
        this.loading = true
        this.error_password = false
        this.password_error_message = ''
        let data = {
          token: this.token,
          password: this.password,
          password_confirmation: this.password_confirmation
        }
        console.log(data)
        this.$axios.post('password_reset', data).then(() => {
          this.$q.notify({
            color: 'teal',
            icon: 'check_circle',
            message: 'Password changed!',
            position: 'top',
            timeout: 3000,
            actions: [{
              icon: 'close',
              color: 'white'
            }]
          })
          setTimeout(() => {
            this.$router.push('/login')
          }, 3000)
        }).catch(() => {
          this.error_password = true
          this.password_error_message = this.$t('email_is_not_found')
        }).finally(() => { this.loading = false })
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

<style lang="stylus">
  .reset__password__page {
    &-card {
      &__header {
        background: $linear_gradient
        color: #fff
        font-size: 30px
      }
      &__form {
        padding-top: 20px
      }
    }
  }
</style>
