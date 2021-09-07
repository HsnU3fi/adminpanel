<template>
    <div class="black">
        <v-navigation-drawer
          v-model="drawer"
          v-if="islogin"
          color="#35495e"
          touchless
          dark
          width="200"
          app
          right
        >

            <template v-slot:prepend>
                <v-list-item two-line>
                    <v-list-item-avatar>
                        <img src="QQ.jpg">
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-toolbar-title>
                            Hsn Yousefi
                        </v-toolbar-title>
                    </v-list-item-content>
                </v-list-item>
            </template>

            <hr class="new1"/>
            <v-list-item-group>
                <v-list
                  expand
                  nav

                >
                    <v-list-item class="v-list-item__title" href="/getUsers">
                        <v-list-item-title title="کاربران" dir="rtl">
                            کاربران
                        </v-list-item-title>
                        <v-list-item-icon>
                            <v-icon>mdi-account-multiple</v-icon>
                        </v-list-item-icon>
                    </v-list-item>
                    <hr class="new1"/>


                    <v-list-group
                      sub-group
                      no-action
                    >
                        <template v-slot:activator>
                            <v-list-item-content class="v-application">
                                <v-list-item-title dir="rtl">مدیریت کالا</v-list-item-title>
                            </v-list-item-content>
                            <v-list-item-icon>
                                <v-icon>mdi-view-dashboard</v-icon>
                            </v-list-item-icon>
                        </template>
                        <v-list-item
                          v-for="i in Management"
                          :key="i"
                          :href="i.to"
                        >
                            <v-list-item-title dir="rtl">
                                <h>{{i.text}}</h>
                            </v-list-item-title>
                        </v-list-item>
                    </v-list-group>
                    <hr class="new1"/>
                    <v-list-item href="/getOrder">
                        <v-list-item-title title="سفارشات" dir="rtl">سفارشات</v-list-item-title>
                        <v-list-item-icon>
                            <v-icon>mdi-border-all</v-icon>
                        </v-list-item-icon>
                    </v-list-item>
                    <hr class="new1"/>
                    <v-list-item href="/getRole">
                        <v-list-item-title title="نقش" dir="rtl">دسترسی</v-list-item-title>
                        <v-list-item-icon>
                            <v-icon>mdi-border-all</v-icon>
                        </v-list-item-icon>
                    </v-list-item>
                  <hr class="new1"/>
                  <v-list-item href="/getPage">
                    <v-list-item-title title="صفحه" dir="rtl">صفحه</v-list-item-title>
                    <v-list-item-icon>
                      <v-icon>mdi-view-dashboard</v-icon>
                    </v-list-item-icon>
                  </v-list-item>
                    <hr class="new1"/>
                    <v-list-item href="/getGroup">
                        <v-list-item-title title="گروه" dir="rtl">گروه</v-list-item-title>
                        <v-list-item-icon>
                            <v-icon>mdi-group</v-icon>
                        </v-list-item-icon>
                    </v-list-item>
                    <hr class="new1"/>
                    <v-list-item href="/getQr">
                        <v-list-item-title title="کیوآرها" dir="rtl">کیوآرها</v-list-item-title>
                        <v-list-item-icon>
                            <v-icon>mdi-qrcode</v-icon>
                        </v-list-item-icon>
                    </v-list-item>
                    <hr class="new1"/>
                </v-list>
            </v-list-item-group>
            <v-switch @click="darkMode()"></v-switch>
        </v-navigation-drawer>
        <v-app-bar
          v-if="islogin"
          height="70"
          color="#002850"
          style="filter: blur(0.1px);
                        box-shadow: 1px 7px 10px gray;"
          app

        >
            <menu>
                <v-btn
                  color="#ffffff"
                  class="zoom"
                  title="LogOut"
                  icon
                  @click="logout()"
                >
                    <v-icon>mdi-export</v-icon>
                </v-btn>
            </menu>

            <v-spacer/>
            <v-toolbar-title><a  style="font-size: 20px;">QR Wallshop</a></v-toolbar-title>
            <v-app-bar-nav-icon style="color:white " @click.stop="drawer = !drawer"/>
        </v-app-bar>
    </div>
</template>


<script>
  // import jwt_decode from 'jwt-decode';
  export default {

    props: {
      source: String,

    },
    data: () => ({


      drawer: true,
      islogin: false,

      Management: [
        {text: "دسته‌بندی کالا", to: "/getCategory"},
        {text: "تامین کنندگان", to: "/getSupplier"},
        {text: "لیست محصولات", to: "/getProducts"},
      ],

    }),

    methods: {
      darkMode() {
        this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
        localStorage.setItem("dark_mode", this.$vuetify.theme.dark.toString())
      },

      logout() {
        localStorage.removeItem('userData')
        window.location.href = "/login"
      },
      toshe() {
        let auth = JSON.parse(localStorage.getItem('userData'));
        if (auth) {
          this.islogin = true
        }
      },
    },
    created() {
      this.toshe()
    },
    mounted() {
      const theme = localStorage.getItem("dark_mode")
      if (theme === "true") {
        this.$vuetify.theme.dark = true
        this.theme = true
      } else {
        this.$vuetify.theme.dark = false
        this.theme = false
      }
    },

  }

</script>
<style scoped>

    .v-application .primary--text {
        color: #ffffff !important;
        caret-color: #ffffff !important;
    }

    hr.new1 {
        border-top: 0.5px solid ;
        opacity: 0.2;
    }

    .v-application a {
        color: #eff1f4;
    }

    a.ex2:hover {
        color: red;
    }

    .zoom:hover {
        transform: scale(1.1);
        background: red;
    }

</style>
