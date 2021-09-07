<template>
  <v-footer
      height="50"
      dark
      v-if="islogin"
      padless
  >

  </v-footer>

</template>
<script>
  export default {
    data: () => ({
      islogin: false

    }),
    methods: {
      is_login() {
        let auth = JSON.parse(localStorage.getItem('userData'));
        if (auth != null) {
          this.islogin = true
        }
      }
    },
    created() {
      this.is_login()
    }
  }
</script>
