<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12" color="#F4F4F4">
          <v-toolbar color="#35495e" dark dir="rtl">
            <v-toolbar-title>ویرایش صفحه</v-toolbar-title>
            <v-spacer/>
          </v-toolbar>
          <v-card-text>
            <v-form v-model="valid" lazy-validation dir="rtl">
              <v-text-field
                  solo
                  dense
                  v-model="items.title"
                  placeholder="عنوان"
                  required
              />
              <v-text-field
                  solo
                  dense
                  v-model="items.level"
                  type="number"
                  placeholder="سطح"
                  required
              />
            </v-form>

            <div>
              <label>
                وضعیت
              </label>
              <v-switch
                  style="margin-top: -9px;margin-left: -4px;"
                  v-model="items.is_active"
              />
            </div>
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
              با موفقیت انجام شد.
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
      level: undefined,
      title: undefined,
      is_active: false,
      items: undefined,

    }),
    methods: {
      async submit() {
        if (this.items.is_active === true) {
          this.items.is_active = 1
        }
        if (this.items.is_active === false) {
          this.items.is_active = 0
        }
        const res = await this.axios.put('https://qrwallshop.paygear.ir/v1/page', {
          id: parseInt(this.$route.params.id),
          title: this.items.title,
          level: this.items.level,
          is_active: this.items.is_active
        });
        if (res.status === 200) {
          this.alert = true
        }
      },
      async get() {
        const url = 'https://qrwallshop.paygear.ir/v1/page/' + this.$route.params.id;
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

