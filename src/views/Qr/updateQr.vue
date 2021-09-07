<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="4">
                <v-card class="elevation-12" color="#F4F4F4">
                    <v-toolbar color="#35495e" dark dir="rtl" >
                        <v-toolbar-title>ویرایش کیوآر</v-toolbar-title>
                        <v-spacer/>
                    </v-toolbar>
                    <v-card-text>
                        <v-form v-model="valid" lazy-validation dir="rtl">
                          <label style="padding: 8px;">
                            نوع
                          </label>
                            <v-text-field
                              solo
                              dense
                              v-model="items.type"
                              type="number"
                              placeholder="نوع"
                              required
                              :min="0"
                            />
                          <label style="padding: 8px;">
                            کیوآر
                          </label>

                          <v-text-field
                              solo
                              dense
                              v-model="items.qr"
                              type="text"
                              placeholder="کیوآر"
                              required
                            />
                          <label style="padding: 8px;">
                            سطح
                          </label>
                            <v-text-field
                              solo
                              dense
                              v-model="items.value"
                              type="text"
                              placeholder="سطح"
                              required
                            />
                        </v-form>
                    </v-card-text>
                    <v-card-actions  dir="rtl">
                        <v-spacer/>
                        <v-btn
                          :disabled="!valid"
                          color="green"
                          block
                          dark
                          @click="alert,submit()"
                        >
                            تایید
                        </v-btn>
                    </v-card-actions>
                </v-card>
              <v-snackbar
                  dir="rtl"
                  v-model="alert"
                  color="green"
                  timeout="5000">
                <v-row align="center" justify="center">
                  <div style="font-size: 15px; font-weight:bold ">
                    ویرایش با موفقیت انجام شد.
                  </div>
                </v-row>
              </v-snackbar>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
  export default {

    data: () => ({

      valid: true,
      alert: false,
      type:undefined,
      qr:undefined,
      value:undefined,
      items:undefined,

    }),
    methods: {
      async submit() {
        const res= await this.axios.put('https://qrwallshop.paygear.ir/v1/qr', {
          id:parseInt(this.$route.params.id) ,
          type:parseInt(this.items.type) ,
          qr:this.items.qr,
          value:this.items.value
        });
        if (res.status===200) {
          this.alert=true
        }
      },
      async get() {
        const url = 'https://qrwallshop.paygear.ir/v1/qr/' + this.$route.params.id;
        const res = await this.axios.get(url);
        if (res.status === 200) {
          this.items = res.data.result;
        }
      },

    },
    created() {
      this.get()
    }

  }
</script>

