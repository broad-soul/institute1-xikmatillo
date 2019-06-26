<template>
  <q-scroll-area
    :thumb-style="getThumbStyle"
    style="height: calc(100vh - 56px)"
  >
    <q-page class="main">
      <div class="q-pa-md">
         <q-breadcrumbs  active-color="teal">
          <q-breadcrumbs-el icon="home" label="Home" to="/" />
          <q-breadcrumbs-el label="Dashboard" />
        </q-breadcrumbs>
      </div>
      <div class="row">
        <div class="col">
          <div class="q-pa-md">
            <h3>Admin home</h3>
            <h6>Статистика</h6>
          </div>
        </div>
      </div>
    </q-page>
  </q-scroll-area>
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
    ...mapGetters([
      'mobileDetect',
      'getThumbStyle'
    ])
  }
}
</script>

<style lang="stylus" scope>
</style>
