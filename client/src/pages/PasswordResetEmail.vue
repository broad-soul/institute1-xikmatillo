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
            <q-input
              :disable="loading"
              filled
              v-model.trim="email"
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
            <div class="btn__actions  q-gutter-y-sm">
              <q-btn label="Send password reset link" class="btn__actions-login" type="submit" color="cyan" :loading="loading"/>
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
  name: 'PasswordResetEmail',
  beforeRouteEnter (to, from, next) {
    store.dispatch('isAuthorized').then(res => {
      if (res.data.is_admin === 1) next('/admin')
      next()
    }).catch(() => next())
  },
  data () {
    return {
      email_error_message: '',
      email_error: false,
      loading: false,
      email: null
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
      this.$axios.post('password_reset_email', { email: this.email }).then(res => {
        if (res.data.code === 1) {
          this.$q.notify({
            color: 'warning',
            icon: 'warning',
            message: 'Письмо уже отправлено!',
            position: 'top',
            timeout: 1000
          })
        } else {
          this.$q.notify({
            color: 'teal',
            icon: 'check_circle',
            message: 'На Вашу почту было отправленно письмо для сброса пароля!',
            position: 'top',
            timeout: 20000,
            actions: [{ icon: 'close', color: 'white' }]
          })
        }
      }).catch(() => {
        this.email_error_message = this.$t('email_is_not_found')
        this.email_error = true
      }).finally(() => { this.loading = false })
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
