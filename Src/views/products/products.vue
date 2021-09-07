<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8">
        <v-card class="elevation-12" color="#F4F4F4">
          <v-toolbar color="#35495e" dark dir="rtl">
            <v-toolbar-title>ایجاد محصولات</v-toolbar-title>
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
              <v-autocomplete
                  dir="rtl"
                  v-model="SelectCategory"
                  :items="category"
                  item-text="name"
                  item-value="id"
                  placeholder="دسته‌بندی"
                  solo dense
                  required
              />
              <v-autocomplete
                  dir="rtl"
                  v-model="SelectSupplier"
                  :items="supplier"
                  item-text="name"
                  item-value="id"
                  placeholder="تامین‌ کننده"
                  solo dense
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
          ">گروه
                      </b3>
                    </v-row>
                    <v-autocomplete
                        dir="rtl"
                        v-model="input.id"
                        :items="groups"
                        item-text="name"
                        item-value="id"
                        placeholder="گروه"
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
                <div v-for="(input1,k) in inputs1" :key="k">

                  <v-container class="fill-height" fluid>
                    <v-row
                        align="center"
                        justify="center"
                    >
                      <b3 style="
                                            font-size: 15px;
                                            font-weight: bold;
                                            ">ویژگی های محصول
                      </b3>
                    </v-row>
                    <v-text-field
                        v-model="input1.name"
                        dir="rtl"
                        placeholder="نام"
                        solo dense
                        required
                    />
                    <v-text-field
                        v-model="input1.value"
                        dir="rtl"
                        placeholder="مقدار"
                        solo dense
                        required
                    />

                    <i @click='remove1(k)' v-show="k">
                      <v-icon style="margin-left: -26px" color="red"> mdi-minus-circle</v-icon>
                    </i>
                    <i @click='add1(k)'>
                      <v-icon style="margin-top: -36px" color="green"> mdi-plus-circle</v-icon>
                    </i>

                  </v-container>
                  <span/>
                </div>
                <div class="form-group" v-for="(input2,k) in inputs2" :key="k">

                  <v-container class="fill-height" fluid>
                    <v-row
                        align="center"
                        justify="center"
                    >
                      <b3 style="
          font-size: 15px;
          font-weight: bold;
          ">ویژگی های تامین کننده محصول
                      </b3>
                    </v-row>
                    <v-text-field
                        v-model="input2.name"
                        dir="rtl"
                        placeholder="نام"
                        solo dense
                        required
                    />
                    <v-text-field
                        v-model="input2.value"
                        dir="rtl"
                        placeholder="مقدار"
                        solo dense
                        required
                    />

                    <i @click='remove2(k)' v-show="k">
                      <v-icon style="margin-left: -26px" color="red"> mdi-minus-circle</v-icon>
                    </i>
                    <i @click='add2 (k)'>
                      <v-icon style="margin-top: -36px" color="green"> mdi-plus-circle</v-icon>
                    </i>

                  </v-container>
                  <span/>
                </div>
              </v-sheet>
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
              ایجاد محصولات با موفقیت انجام شد.
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
      inputs1: [{}],
      inputs2: [{}],
      valid: true,
      alert: false,
      SelectCategory: undefined,
      SelectSupplier: undefined,
      products: undefined,
      id: undefined,
      groups: [],
      category: undefined,
      total_amount: undefined,
      SelectProducts: undefined,
      admin_id: undefined,
      address_id: undefined,
      product_attributes: [],
      product_supplier_meta_attribute: []

    }),
    methods: {
      add() {
        this.inputs.push({})
      },
      remove(index) {
        this.inputs.splice(index, 1)

      },
      add1() {
        this.inputs1.push({})
      },
      remove1(index) {
        this.inputs1.splice(index, 1)

      },
      add2() {
        this.inputs2.push({})
      },
      remove2(index) {
        this.inputs2.splice(index, 1)

      },
      async porducts_() {
        const url = `${BASE_URL}v1/product`;
        const res = await this.axios.get(url);
        if (res.status === 200) {
          this.products = res.data.result.result;

        }
      },
      async category_() {
        const url = `${BASE_URL}v1/category`;
        const res = await this.axios.get(url);
        if (res.status === 200) {
          this.category = res.data.result.result;

        }
      },
      async group_() {
        const url = `${BASE_URL}v1/group`;
        const res = await this.axios.get(url);
        if (res.status === 200) {
          this.groups = res.data.result.result.Groups;


        }
      },
      async supplier_() {
        const url = `${BASE_URL}v1/supplier`;
        const res = await this.axios.get(url);
        if (res.status === 200) {
          this.supplier = res.data.result.result;
        }
      },

      async submit() {
        const res = await this.axios.post(`${BASE_URL}v1/product`, {
          name: this.name,
          category_id: this.SelectCategory,
          groups: this.inputs,
          product_attributes: this.inputs1,
          supplier_data: [
            {
              supplier_id: this.SelectSupplier,
              product_supplier_meta_attribute: this.inputs2,
            }
          ]
        });
        if (res.status === 201) {
          this.alert = true
        }
      },

    },
    created() {
      this.category_();
      this.porducts_();
      this.supplier_();
      this.group_();
    }

  }
</script>
<style scoped>
  .form-inline {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
  }
</style>

