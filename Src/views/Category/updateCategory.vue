<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="4">
                <v-card class="elevation-12" color="#F4F4F4">
                    <v-toolbar color="#35495e" dark dir="rtl" src="public/bg.png">
                        <v-toolbar-title> ویرایش دسته بندی</v-toolbar-title>
                        <v-spacer/>
                    </v-toolbar>
                    <v-card-text>
                        <v-form v-model="valid" lazy-validation dir="rtl">
                          <label style="padding: 8px;">
                            نام
                          </label>
                            <v-text-field
                              solo
                              dense
                              v-model="items.name"
                              type="text"
                              label="عنوان"
                              required
                            />
                        </v-form>
<!--                        <v-autocomplete-->
<!--                          dir="rtl"-->
<!--                          v-model="items.parent_id"-->
<!--                          :items="parents"-->
<!--                          item-text="name"-->
<!--                          item-value="id"-->
<!--                          placeholder="ادمین"-->
<!--                          solo dense-->
<!--                          required-->
<!--                        >-->
<!--                        </v-autocomplete>-->
                        <div>
                            <label>
                                وضعیت
                            </label>
                            <v-switch
                              style="margin-top: -9px;margin-left: -4px;"
                              v-model="isactive"
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
                      دسته بندی با موفقیت ویرایش شد.
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
      isactive: true,
      items: undefined,
      parents: undefined,
      parent_id: undefined,
    }),
    methods: {
      async submit() {
        if (this.isactive === false) {
          this.isactive = 0
        }
        if (this.isactive === true) {
          this.isactive = 1
        }
        const res = await this.axios.put(`${BASE_URL}v1/category`, {
          id: parseInt(this.$route.params.id),
          name: this.items.name,
          is_active: this.isactive
        });
        if (res.status === 200) {
          this.alert = true
        }

      },
      async get() {
        const url = `${BASE_URL}v1/category/` + this.$route.params.id;
        const res = await this.axios.get(url);
        if (res.status === 200) {
          this.items = res.data.result;
          this.isactive = this.items.is_active;
          if (this.isactive === 0) {
            this.isactive = false
          }
          if (this.isactive === 1) {
            this.isactive = true
          }
        }
      },
      async Parent() {
        const url = `${BASE_URL}v1/user`;
        const res = await this.axios.get(url);
        console.log(res)
        if (res.status === 200) {
          this.parents = res.data.result.result;

        }
      },
    },
    created() {
      this.get();
      this.Parent()
    }

  }
</script>
