<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="4">
                <v-card class="elevation-12" color="#F4F4F4">
                    <v-toolbar color="#35495e" dark dir="rtl">
                        <v-toolbar-title>ایجاد تامین کننده</v-toolbar-title>
                        <v-spacer/>
                    </v-toolbar>
                    <v-card-text>
                        <v-form v-model="valid" lazy-validation dir="rtl">
                            <v-text-field
                              v-model="name"
                              type="text"
                              placeholder="نام"
                              required
                              dense
                              solo
                            />
                            <v-text-field
                              v-model="merchant_wallet_id"
                              type="text"
                              placeholder="آی دی کیف پول پذیرنده"
                              required
                              dense
                              solo
                            />
                            <v-form v-model="valid" lazy-validation dir="rtl">
                                <v-text-field
                                  v-model="address"
                                  type="text"
                                  :rules="rules"
                                  placeholder="آدرس"
                                  required
                                  solo dense
                                />
                            </v-form>

                            <v-autocomplete
                              dir="rtl"
                              v-model="SelectAdmin"
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
                    <v-card-actions dir="rtl">
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
      name: undefined,
      merchant_wallet_id: undefined,
      admin_id: undefined,
      SelectAdmin: undefined,
      address: undefined,
      rules: [
        v => !!v || 'آدرس را وارد کنید',
        (v) => v && v.length <= 300
      ],
      admin: undefined

    }),
    methods: {
      async AdminSupplier() {
        const url = `${BASE_URL}v1/user`;
        const res = await this.axios.get(url);
        console.log(res)
        if (res.status === 200) {
          this.admin = res.data.result.result;

        }
      },
      async submit(divar) {
        if (this.address == null) {
          return divar
        }
        const res = await this.axios.post(`${BASE_URL}v1/supplier`, {
          name: this.name,
          merchant_wallet_id: this.merchant_wallet_id,
          address: this.address,
          admin_id: this.SelectAdmin,
        });
        if (res.status === 201) {
          this.alert = true
        }
      },

    },
    created() {
      this.AdminSupplier();
    }

  }
</script>

