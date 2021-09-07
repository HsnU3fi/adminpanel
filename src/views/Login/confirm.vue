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
                                    v-model="otpToken"
                                    :rules="rules"
                                    type="text"
                                    placeholder="کد ارسال شده"
                                    required
                            />
                        </v-form>
                    </v-card-text>
                    <v-card-actions  dir="rtl">
                        <v-spacer/>
                        <v-btn
                                :disabled="!valid"
                                color="#1C8D0A"
                                dark
                                @click="submit"
                                block
                            >
                            تایید
                        </v-btn>
                    </v-card-actions>
                </v-card>

                <!--        <v-alert id="login_alert" type="error"-->
                <!--                 v-model="alert"-->
                <!--                 border="right"-->
                <!--                 close-text="Close Alert"-->
                <!--                 dark-->
                <!--                 dismissible-->
                <!--        >-->
                <!--          {{errorMessage}}-->
                <!--        </v-alert>-->
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
  export default {

    data: () => ({
      valid: true,
      alert: false,
      otpToken: null,
      errorMessage: '',
      rules: [
        v => !!v || 'کد را وارد کنید',
        v => /^\d{4}$/.test(v) || 'کد باید 4 رقم باشد',
      ],
    }),
    methods: {
      submit() {
          let mobilePhone = localStorage.getItem('mobilePhone')
          this.axios.post(`'${BASE_URL}v1/auth/otp/verify'`, {
              mobile_phone: mobilePhone,
              otp: this.otpToken
          }).then(function (response) {
              if (response.status === 200) {
                  let authData = response.data
                  console.log(authData)
                  localStorage.removeItem('userData')
                  localStorage.setItem('userData', JSON.stringify(authData))
                  window.location.replace('/Home')
              }
          }).catch(function (error) {
              this.errorMessage = error.response.data.message;
              this.alert = true;
          });
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
