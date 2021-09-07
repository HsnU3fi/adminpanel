<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="4">
                <v-card class="elevation-12">
                    <v-toolbar color="#35495e" dark flat dir="rtl" >
                        <v-toolbar-title>ورود</v-toolbar-title>
                        <v-spacer/>
                    </v-toolbar>
                    <v-card-text>
                        <v-form v-model="valid" lazy-validation dir="rtl">
                            <v-text-field
                              v-model="mobile_phone"
                              :rules="rules"
                              type="text"
                              placeholder="شماره تلفن همراه"
                              required
                            />
                        </v-form>
                    </v-card-text>
                    <v-card-actions  dir="rtl">
                        <v-spacer/>
                        <v-btn
                          :disabled="!valid"
                          color="green"
                          dark
                          block
                          @click="submit()"
                        >
                            ورود
                        </v-btn>
                    </v-card-actions>
                </v-card>
                <v-alert id="login_alert" type="error"
                         v-model="alert"
                         border="right"
                         close-text="Close Alert"
                         dark
                         dismissible
                >
                    {{errorMessage}}
                </v-alert>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
  export default {
    props: {
      source: String,
    },
    data: () => ({
      valid: true,
      alert: false,
      mobile_phone: null,
      errorMessage: null,
      rules: [
        v => !!v || 'شماره تلفن همراه خود را وارد کنید',
        v => /^0+9+\d{9}$/.test(v) || 'شماره تلفن همراه باید با 09 شروع شود و باید 11 رقم باشد',
      ],
    }),
    methods: {
      submit() {
        localStorage.removeItem('mobilePhone')
        localStorage.setItem('mobilePhone', this.mobile_phone)
        const res= this.axios.post('Https://qrwallshop.paygear.ir/v1/auth/otp', {
          mobile_phone: this.mobile_phone
        });
        if (res.status===undefined) {
          this.$router.push('/confirm')
        }
      },
    }
  }
</script>

<style>
    #login_alert {
        direction: rtl;
        margin-top: 2%;
    }
</style>
