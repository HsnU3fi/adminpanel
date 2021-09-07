<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12" color="#F4F4F4">
          <v-toolbar color="#35495e" dark dir="rtl">
            <v-toolbar-title>ایجاد گروه</v-toolbar-title>
            <v-spacer/>
          </v-toolbar>
          <v-card-text>
            <v-form v-model="valid" lazy-validation dir="rtl">
              <v-text-field
                  v-model="name"
                  type="text"
                  placeholder="نام گروه"
                  required
                  solo
                  dense
              />
              <v-text-field
                  solo
                  v-model="level"
                  dense
                  type="number"
                  placeholder="سطح"
                  required
              />
              <v-sheet color="#D6D3D3">
                <div v-for="(input,k) in inputs" :key="k">
                  <v-container class="fill-height" fluid>
                    <v-row
                        align="center"
                        justify="center"
                    >
                      <b3 style="
          font-size: 15px;
          font-weight: bold;
          ">صفحه
                      </b3>
                    </v-row>
                    <v-autocomplete
                        dir="rtl"
                        v-model="input.id"
                        :items="items"
                        item-text="title"
                        item-value="id"
                        placeholder="صفحه"
                        solo dense
                        required
                    />
                    <i @click='remove(k)'
                       v-show="k">
                      <v-icon style="margin-left: -26px" color="red"> mdi-minus-circle</v-icon>
                    </i>
                    <i @click='add(k)'>
                      <v-icon style="margin-top: -36px" color="green"> mdi-plus-circle</v-icon>
                    </i>
                  </v-container>
                  <span/>
                </div>
              </v-sheet>
            </v-form>
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
              گروه با موفقیت ایجاد شد.
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
      inputs:[{}],
      valid: true,
      alert: false,
      name: undefined,
      pages: undefined,
      level: undefined,
      items:undefined,
      is_active: undefined

    }),

    methods: {
      add() {
        this.inputs.push({})
      },
      remove(index) {
        this.inputs.splice(index, 1)
      },
        async submit() {
        if (this.is_active === false) {
          this.is_active = 0
        }
        if (this.is_active === true) {
          this.is_active = 1
        }
        const res = await this.axios.post('https://qrwallshop.paygear.ir/v1/group', {
          name: this.name,
          level: parseInt(this.level),
          Pages: this.inputs,
          is_active: this.is_active,
        });
        if (res.status === 201) {
          this.alert = true
        }
      },
      async getPage() {
        const url = 'https://qrwallshop.paygear.ir/v1/page';
        const res = await this.axios.get(url);
        if (res.status === 200) {
          this.items = res.data.result.result;
        }
      },
    },
    created() {
      this.getPage()
    }
  }
</script>

