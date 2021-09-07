<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12" color="#F4F4F4">
          <v-toolbar color="#35495e" dark dir="rtl" src="public/bg.png">
            <v-toolbar-title>دسته بندی</v-toolbar-title>
            <v-spacer/>
          </v-toolbar>
          <v-card-text>
            <v-form v-model="valid" lazy-validation dir="rtl">
              <v-text-field
                  solo
                  dense
                  v-model="name"
                  type="text"
                  placeholder="عنوان"
                  required
              />
            </v-form>
            <v-autocomplete
                dir="rtl"
                v-model="SelectParent"
                :items="parents"
                item-text="name"
                item-value="id"
                placeholder="منبع کتگوری"
                solo dense
                required
            >
            </v-autocomplete>
            <div>
              <label>
                وضعیت
              </label>
              <v-switch
                  style="margin-top: -9px;margin-left: -4px;"
                  v-model="is_active"
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
                @click="alert, submit()"
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
              دسته بندی با موفقیت انجام شد.
            </div>
          </v-row>
        </v-snackbar>
        <v-alert
            dir="rtl"
            :value="Error"
            type="Error"
            transition="scale-transition"
            dismissible
        >
          با خطا مواجه شد.
        </v-alert>
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
      SelectParent: undefined,
      parents: undefined,
      is_active: false,
      Error: false
    }),
    methods: {
      async submit() {
        if (this.is_active === false) {
          this.is_active = 0
        }
        if (this.is_active === true) {
          this.is_active = 1
        }
        const res = await this.axios.post(`${BASE_URL}v1/category`, {
          name: this.name,
          parent_id: this.SelectParent,
          is_active: this.is_active
        });
        if (res.status === 201) {
          this.alert = true
        } else {
          this.Error = true
        }
      },
      async Parent() {
        const url = `${BASE_URL}v1/category`;
        const res = await this.axios.get(url);
        if (res.status === 200) {
          this.parents = res.data.result.result;

        }
      },

    },
    created() {
      this.Parent()
    }

  }
</script>
