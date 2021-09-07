<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="6">
                <v-card class="elevation-12" color="#F4F4F4">
                    <v-toolbar color="#35495e" dark flat dir="rtl">
                        <v-toolbar-title>ایجاد کاربر</v-toolbar-title>
                        <v-spacer/>
                    </v-toolbar>
                    <v-card-text>
                        <v-form v-model="valid" lazy-validation dir="rtl">
                            <!--                            <v-row align="center" justify="center">-->
                            <v-text-field
                              v-model="name"
                              type="text"
                              placeholder="نام"
                              required
                              solo
                              dense
                            />
                            <!--                            </v-row>-->
                            <!--                            <v-row align="center" justify="center">-->
                            <v-text-field
                              v-model="phone_number"
                              type="text"
                              placeholder="شماره موبایل"
                              required
                              solo
                              dense
                            />
                            <!--                            </v-row>-->
                            <div v-for="(input,k) in inputs" :key="k">
                                <v-sheet color="#D9D9D9">
                                    <v-container class="fill-height" fluid>
                                        <v-row>
                                            <v-text-field
                                              v-model="input.address"
                                              type="text"
                                              placeholder="آدرس"
                                              required
                                              solo
                                              dense
                                            />
                                        </v-row>
                                    </v-container>
                                </v-sheet>
                                <span/>

                                <i @click='remove(k)' v-show=" k|| (!k && inputs.length > 1)">
                                    <v-icon color="red"> mdi-minus-circle</v-icon>
                                </i>
                                <i @click='add(k)' v-show="k === inputs.length-1">
                                    <v-icon color="green"> mdi-plus-circle</v-icon>
                                </i>


                            </div>
                        </v-form>
                    </v-card-text>
                    <v-card-actions dir="rtl">
                        <v-spacer/>
                        <v-btn
                          :disabled="!valid"
                          color="green"
                          class="mr-6"
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
      inputs: [{}],
      valid: true,
      alert: false,
      name: undefined,
      items: undefined,
      address: undefined,
      phone_number: undefined,
      country: "ایران"
    }),
    methods: {
      add() {
        this.inputs.push({})
      },
      remove(index) {
        this.inputs.splice(index, 1)

      },
      async submit() {
        if (res.status === 201) {
          const res = await this.axios.post(`${BASE_URL}v1/user`, {
            name: this.name,
            phone_number: this.phone_number,
            country_code: 1,
            addresses: this.inputs,
            // lat:"",
            // lng:"",
            // is_active:"
          });
          this.alert = true
        }
      },
    },
  }
</script>

<style>
    .country_field {
        max-width: 70px;
    }

    .form-inline {
        display: flex;
        flex-flow: row wrap;
        align-items: center;
    }

    .addres_field {
        width: 400px;
    }

    .marg-country {
        margin-right: 15px;
    }

    .marg-addres {
        margin-right: 8px;
    }
</style>
