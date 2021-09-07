<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12" color="#F4F4F4">
          <v-toolbar color="#35495e" dark dir="rtl">
            <v-toolbar-title>ویرایش گروه</v-toolbar-title>
            <v-spacer/>
          </v-toolbar>
          <v-card-text>
            <v-form v-model="valid" lazy-validation dir="rtl">
              <label style="padding: 8px;">
                نام گروه
              </label>
              <v-text-field
                  v-model="items.name"
                  type="text"
                  placeholder="نام گروه"
                  required
                  solo
                  dense
              />
              <label style="padding: 8px;">
                سطح
              </label>
              <v-text-field
                  solo
                  v-model="items.level"
                  dense
                  type="number"
                  placeholder="سطح"
                  required
              />
              <v-sheet color="#D6D3D3">
                <div v-for="(v,i) in itemPage" :key="v">
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
                        v-model="itemPage[i].id"
                        :items="pages"
                        item-text="title"
                        item-value="id"
                        placeholder="گروه"
                        solo dense
                        required
                    />

                    <i @click='remove(i)'
                       v-show="i">
                      <v-icon style="margin-left: -26px" color="red"> mdi-minus-circle</v-icon>
                    </i>
                    <i @click='add(v)'>
                      <v-icon style="margin-top: -36px" color="green"> mdi-plus-circle</v-icon>
                    </i>
                  </v-container>
                </div>
              </v-sheet>
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
              گروه با موفقیت ویرایش شد.
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
      pages: undefined,
      itemPage: undefined,
      level: undefined,
      is_active: false,
      items: undefined,
      isactive: undefined
    }),
    methods: {
      add() {
        this.itemPage.push({})
      },
      remove(index) {
        this.itemPage.splice(index, 1)
      },
      async submit() {
        if (this.items.is_active === false) {
          this.items.is_active = 0
        }
        if (this.items.is_active === true) {
          this.items.is_active = 1
        }
        let listId = [];
        for (let i in this.itemPage) {
          listId.push({id: this.itemPage[i].id})
        }
        const res = await this.axios.put(`${BASE_URL}v1/group`, {
          id: parseInt(this.$route.params.id),
          name: this.items.name,
          pages: listId,
          level: parseInt(this.items.level),
          is_active: this.items.is_active,
        });
        if (res.status === 200) {
          this.alert = true
        }
      },
      async get() {
        const url = `${BASE_URL}v1/group` + this.$route.params.id;
        const res = await this.axios.get(url);
        if (res.status === 200) {
          this.items = res.data.result;
          this.isactive = this.items.is_active;
          this.itemPage = this.items.pages;
        }
      },
      async GetPage() {
        const url = `${BASE_URL}v1/page`;
        const res = await this.axios.get(url);
        if (res.status === 200) {
          this.pages = res.data.result.result;
        }
      },
    },
    created() {
      this.get();
      this.GetPage()
    }

  }
</script>

