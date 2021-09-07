<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="6">
                <v-card class="elevation-12" color="#F4F4F4">
                    <v-toolbar color="#35495e" dark flat dir="rtl">
                        <v-toolbar-title>ویرایش کاربر</v-toolbar-title>
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
                              solo
                              dense
                            />
                          <label style="padding: 8px;">
                            شماره موبایل
                          </label>
                            <v-text-field
                              v-model="items.phone_number"
                              type="text"
                              placeholder="شماره موبایل"
                              required
                              solo
                              dense
                            />

                            <div v-for="(v,i) in item" :key="v" v-show="item||!item">
                                <v-sheet color="#D9D9D9">
                                    <v-container class="fill-height" fluid>
                                      <label>
                                        آدرس
                                      </label>
                                        <v-row>
                                            <v-text-field
                                              v-model="item[i].address"
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

                                <i @click='remove(i)' v-show="i">
                                    <v-icon color="red"> mdi-minus-circle</v-icon>
                                </i>
                                <i @click='add(v)'>
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
                <v-alert
                  dir="rtl"
                  :value="alert"
                  type="success"
                  transition="scale-transition"
                  dismissible
                >
                    با موفقیت انجام شد.
                </v-alert>
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
      address: undefined,
      phone_number: undefined,
      country: "ایران",
      items: undefined,
      item: undefined
    }),
    methods: {
      add() {
        this.item.push({})
      },
      remove(index) {
        this.item.splice(index, 1)

      },
      async submit() {
        let list = [];
        for (let k in this.item) {
          list.push({address: this.item[k].address});
        }
        const res = await this.axios.put(`${BASE_URL}v1/user`, {
          id: parseInt(this.$route.params.id),
          name: this.items.name,
          phone_number: this.items.phone_number,
          country_code: 1,
          addresses: list
          //   [
          //   {
          //     address:"",
          //     lat:this.lat,
          //     lng:this.lng,
          //     is_active:this.is_active
          //   }
          //
          // ]
        });
        if (res.status === 200) {
          this.alert = true
        }
      },
      async get() {
        const url = `${BASE_URL}v1/user/` + this.$route.params.id;
        const res = await this.axios.get(url);
        if (res.status === 200) {
          this.items = res.data.result;
          this.item = res.data.result.addresses;
        }
      },
    },
    created() {
      this.get()
    }
  }
</script>

<style>
</style>
