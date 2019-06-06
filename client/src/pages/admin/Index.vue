<template>
  <q-page class="main">
    <div class="row">
      <div class="col">
        <div class="">
          <h1>{{$t('aboutUs')}}</h1>
          <p>Принимаем выпускников 9-х классов</p>
          <p>В нашем академическом Узбекистана и международные вузы по следующим направлениям:</p>
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
