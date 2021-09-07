<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="4">
                <v-card class="elevation-12" color="#F4F4F4">
                    <v-toolbar color="#35495e" dark dir="rtl" >
                        <v-toolbar-title>ویرایش تامین کننده</v-toolbar-title>
                        <v-spacer/>
                    </v-toolbar>
                    <v-card-text>
                        <v-form v-model="valid" lazy-validation dir="rtl">
                          <label style="padding: 8px;">
                            نام
                          </label>
                            <v-text-field
                              v-model="items.name"
                              type="text"
                              placeholder="نام"
                              required
                              dense
                              solo
                            />
                          <label style="padding: 8px;">
                            آی دی کیف پول پذیرنده
                          </label>
                            <v-text-field
                              v-model="items.merchant_wallet_id"
                              type="text"
                              placeholder="آی دی کیف پول پذیرنده"
                              required
                              dense
                              solo
                            />
                          <label style="padding: 8px;">
                            آدرس
                          </label>
                            <v-text-field
                              v-model="items.address"
                              type="text"
                              placeholder="آدرس"
                              required
                              solo dense
                            />
                          <label style="padding: 8px;">
                            ادمین
                          </label>
                            <v-autocomplete
                              dir="rtl"
                              v-model="items.admin_id"
                              :items="admin"
                              item-text="name"
                              item-value="id"
                              placeholder="ادمین"
                              solo dense
                              required
                            >
                            </v-autocomplete>
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
                    ایجاد تامین کننده با موفقیت انجام شد.
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
      name:undefined,
      merchant_wallet_id:undefined,
      admin_id:undefined,
      SelectAdmin:undefined,
      address: undefined,
      admin:undefined,
      items:undefined,

    }),
    methods: {
      async AdminSupplier() {
        console.log(1111)
        const url = 'https://qrwallshop.paygear.ir/v1/user';
        const res = await this.axios.get(url);
        console.log(res)
        if (res.status === 200) {
          this.admin = res.data.result.result;
        }
      },
      async submit() {
        const res= await this.axios.put('https://qrwallshop.paygear.ir/v1/supplier', {
          id:parseInt(this.$route.params.id),
          name: this.items.name,
          merchant_wallet_id:this.items.merchant_wallet_id,
          address:this.items.address,
          admin_id:this.items.admin_id,
        });
        if (res.status===200) {
          this.alert=true
        }
      },
      async get() {
        const url = 'https://qrwallshop.paygear.ir/v1/supplier/' + this.$route.params.id;
        const res = await this.axios.get(url);
        console.log(51651616151652651652)
        if (res.status === 200) {
          this.items = res.data.result;
          console.log(this.items)
        }
      },

    },
    created() {
     this.get();
      this.AdminSupplier();
    }

  }
</script>

