<template>
  <div class="fixed-center text-center">
    <p>
      <img
        src="~assets/sad.svg"
        style="width:30vw;max-width:150px;"
      >
    </p>
    <p class="text-faded">Sorry, nothing here...<strong>(404)</strong></p>
    <q-btn
      color="secondary"
      style="width:200px; margin-right: 20px"
      @click="goBack()"
    >Go back</q-btn>
    <q-btn
      color="secondary"
      style="width:200px;"
      @click="goHome()"
    >Go home</q-btn>
  </div>
</template>

<script>
export default {
  name: 'Error404',
  meta: {
    titleTemplate: title => `${title} - Not found`,
    meta: {
      description: { name: 'description', content: 'Not found Page 1' },
      keywords: { name: 'keywords', content: 'Not found website' }
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    goHome () {
      this.$router.push('/')
    }
  }
}
</script>
