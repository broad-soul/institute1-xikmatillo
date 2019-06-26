<template>
  <q-page-scroller ref="scroll" position="bottom-right" :offset="[18, 18]">
    <q-btn @click="() => { this.$('.q-scrollarea .scroll').animate({ scrollTop: 0 }, 500) }" fab style="color: #fff;height: 40px; width: 40px; background: linear-gradient(rgba(48, 73, 107, .9), rgba(48, 184, 210, .9));" icon="keyboard_arrow_up"/>
  </q-page-scroller>
</template>

<script>
export default {
  name: 'PageScroller',
  mounted () {
    let th = this
    this.$('.q-scrollarea .scroll').on('scroll', function (e) {
      if (this.scrollTop > 200) {
        th.$refs.scroll.showing = true
      } else {
        th.$refs.scroll.showing = false
      }
    })
  }
}
</script>

<style lang="stylus" scoped>

</style>
