<template>
  <div class="row h-100vh login_page">
    <div class="col-sm-6 col-xs-6 col-12" style="margin: auto;max-width: 550px;">
      <q-card
        class="my_card text-grey-10"
      >
        <q-card-section class="header">
          <span>Site name</span>
        </q-card-section>
        <q-card-section>
          <q-form
            @submit="onSubmit"
            @reset="onReset"
            class="login_form"
          >
            <q-input
              :disable="loading"
              filled
              v-model="form.email"
              label="Your email *"
              lazy-rules
              color="grey-10"
              bg-color="teal-24"
              type="email"
              clearable
              :rules="[ val => val && val.length > 0 || 'Email is required']"
            >
              <template v-slot:prepend>
                <q-icon name="event" />
              </template>
            </q-input>
            <q-input
              :disable="loading"
              filled
              type="password"
              v-model="form.password"
              label="Your password *"
              lazy-rules
              color="grey-10"
              bg-color="teal-24"
              clearable
              counter
              :rules="[
                val => val !== null && val !== '' || 'Password is required',
                val => val.length > 5 || 'Password must be less than 6 characters'
              ]"
            >
              <template v-slot:prepend>
                <q-icon name="event" />
              </template>
            </q-input>
            <q-toggle v-model="form.remember_me" color="light-blue" label="Remember me" :loading="loading" />
            <div class="btn__actions">
              <q-btn label="Log in" class="btn__actions-login mt-1" type="submit" color="light-blue" :loading="loading"/>
              <q-btn label="Reset" type="reset" class="mt-1 ml-2 btn__actions-reset" color="light-blue" outline :disable="loading" />
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
  name: 'Login',
  beforeRouteEnter (to, from, next) {
    store.dispatch('isAuthorized')
      .then(() => next('/admin'))
      .catch(() => next())
  },
  data () {
    return {
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
      this.login(this.form)
        .then(token => {
          this.$axios.defaults.headers.Authorization = 'Bearer ' + token
          this.$router.push('/admin')
        })
        .finally(() => {
          setTimeout(() => { this.loading = false }, 500)
        })
    },
    onReset () {
      this.form.email = null
      this.form.password = null
      this.form.remember_me = false
    }
  }
}
</script>

<style lang="stylus">
  .login_page {
    .my_card {
      .header {
        background: linear-gradient(#239FE9,#44D5F3)
        color: #fff
        text-transform: lowercase
        font-size: 30px
      }
      .login_form {
        padding-top: 20px
      }
      .btn__actions {
        &-login {
          .q-btn__content {
          }
        }
        &-reset {}
      }
    }
  }
</style>
