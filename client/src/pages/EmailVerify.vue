<template>
  <q-page class="wrap q-gutter-y-md">
    <q-card class="q-pa-lg mt-4 bg-green-11 text-green-9" v-if="verified">
      Спасибо! Вы <q-icon name="mdi-check"/> подтвердили свою почту!
    </q-card>
    <q-card class="q-pa-lg mt-4 bg-red-2 text-pink-10" v-if="error_verify">
      <q-icon name="mdi-alert-circle" size="25px"/> {{error_text}}
    </q-card>
    <q-btn v-if="verified" to="/admin/settings" label="Go to admin settings" icon="mdi-settings" color="teal" />
    <q-btn v-if="error_verify" to="/" label="Go home" icon="mdi-home" color="teal" />
  </q-page>
</template>

<script>
export default {
  name: 'EmailVerify',
  data () {
    return {
      token: null,
      verified: false,
      error_verify: false,
      error_text: ''
    }
  },
  beforeMount () {
    this.token = this.$route.params.token
    this.$axios.get('email_confirmation/' + this.token).then(() => {
      // this.$router.push('/admin/settings')
      this.verified = true
    }).catch(() => {
      this.error_verify = true
      this.error_text = 'Токен не найден или время токена истекло!'
    })
  }
}
</script>

<style lang="stylus" scoped>

</style>
