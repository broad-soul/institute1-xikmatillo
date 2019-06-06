<template>
  <q-page class="">
    <h1>NotResident {{$t('regTextOpen')}}</h1>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'NotResident',
  data () {
    return {
      slide: 1
    }
  },
  computed: {
    ...mapGetters(['mobileDetect'])
  }
}
</script>

<style lang="stylus" scope>
</style>
