<template  class="active">
    <v-app id="inspire" style="background:#E0E0E0">
        <Toolbar/>
        <v-app>
        <v-content>
            <router-view>
            </router-view>
            <v-row align="center" justify="center">
                 <v-btn
                         dir="rtl"
                         v-scroll="onScroll"
                         v-show="fab"
                         fab
                         dark
                         left
                         fixed
                         bottom
                         color="primary"
                         @click="toTop"
                 >
                     <v-icon>mdi-chevron-up</v-icon>
                 </v-btn>
            </v-row>
        </v-content>
        </v-app>
        <Footer/>
    </v-app>
</template>


<script>
  import Toolbar from "./components/Toolbar";
  import Footer from "./components/Footer";

  export default {
    islogin: true,
    props: {
      source: String,
    },
    components: {Toolbar, Footer},
    data: () => ({
        fab: false
      }),

      methods: {
        onScroll (e) {
          if (typeof window === 'undefined') return
          const top = window.pageYOffset ||   e.target.scrollTop || 0
          this.fab = top > 20
        },
        toTop () {
          this.$vuetify.goTo(0)
        }
      }


  }
</script>


<style lang="scss">
    @import url('https://fonts.googleapis.com/css?family=Roboto+Condensed');

    html, body {
        font-family: 'Roboto Condensed', sans-serif;
    }

    #app {
        font-family: 'Roboto Condensed', sans-serif;
    }

    #nav {
        padding: 30px;

        a {
            font-weight: bold;
            color: #2c3e50;

            &.router-link-exact-active {
                color: #42b983;
            }
        }
    }
</style>
