<template>
  <q-page class="main">
    <div class="row">
      <div class="col">
        <div class="q-pa-md">
          <h3>Admin home</h3>
          <h6>Статистика</h6>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'PageIndex',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters(['mobileDetect'])
  }
}
</script>

<style lang="stylus" scope>
</style>
