<template>
  <div id="q-app">
    <q-scroll-area
      :thumb-style="thumbStyle"
      style="height: 100vh"
    >
      <transition
        appear
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
      >
        <router-view />
      </transition>
    </q-scroll-area>
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    thumbStyle () {
      return {
        right: '2px',
        borderRadius: '5px',
        backgroundColor: 'teal',
        width: '5px',
        opacity: 0.75
      }
    }
  }
}
</script>

<style>
</style>
