<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8">
        <v-card class="elevation-12" color="#F4F4F4">
          <v-toolbar color="#35495e" dark dir="rtl">
            <v-toolbar-title>ویرایش محصولات</v-toolbar-title>
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
                دسته‌بندی
              </label>
              <v-autocomplete
                  dir="rtl"
                  v-model="items.category_id"
                  :items="category"
                  item-text="name"
                  item-value="id"
                  placeholder="دسته‌بندی"
                  solo dense
                  required
              />
              <label style="padding: 8px;">
                تامین‌ کننده
              </label>

              <v-autocomplete
                  dir="rtl"
                  v-model="items.supplier_data[0].supplier.id"
                  :items="supplier"
                  item-text="name"
                  item-value="id"
                  placeholder="تامین‌ کننده"
                  solo dense
                  required
              />
              <v-sheet color="#D6D3D3">

                <div v-for="(v,i) in itemgroups" :key="v">
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
                        v-model="itemgroups[i].id"
                        :items="groups"
                        item-text="name"
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
                  <span/>
                </div>
                <div v-for="(v,i) in item_product" :key="v">
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
                        v-model="item_product[i].name"
                        dir="rtl"
                        placeholder="نام"
                        solo dense
                        required
                    />
                    <v-text-field
                        v-model="item_product[i].value"
                        dir="rtl"
                        placeholder="مقدار"
                        solo dense
                        required
                    />
                    <i @click='remove1(i)' v-show="i">
                      <v-icon style="margin-left: -26px" color="red"> mdi-minus-circle</v-icon>
                    </i>
                    <i @click='add1(i)'>
                      <v-icon style="margin-top: -36px" color="green"> mdi-plus-circle</v-icon>
                    </i>
                  </v-container>
                  <span/>
                </div>
                <div class="form-group" v-for="(v,i) in item_supplier_meta" :key="v">
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
                        v-model="item_supplier_meta[i].name"
                        dir="rtl"
                        placeholder="نام"
                        solo dense
                        required
                    />
                    <v-text-field
                        v-model="item_supplier_meta[i].value"
                        dir="rtl"
                        placeholder="مقدار"
                        solo dense
                        required
                    />
                    <i @click='remove2(i)' v-show=" i">
                      <v-icon style="margin-left: -26px" color="red"> mdi-minus-circle</v-icon>
                    </i>
                    <i @click='add2 (v)'>
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
              ویرایش محصولات با موفقیت انجام شد.
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
      sag: [],
      inputs1: [{}],
      inputs2: [{}],
      valid: true,
      alert: false,
      itemgroups: undefined,
      items: undefined,
      SelectCategory: undefined,
      SelectSupplier: undefined,
      products: undefined,
      id: undefined,
      groups: [],
      item_product: undefined,
      category: undefined,
      total_amount: undefined,
      SelectProducts: undefined,
      admin_id: undefined,
      address_id: undefined,
      item_supplier_meta: undefined,
      product_attributes: [],
      product_supplier_meta_attribute: []
    }),
    methods: {
      add() {
        this.itemgroups.push({})
      },
      remove(index) {
        this.itemgroups.splice(index, 1)

      },
      add1() {
        this.inputs1.push({})
      },
      remove1(index) {
        this.inputs1.splice(index, 1)

      },
      add2() {
        this.item_supplier_meta.push({})
      },
      remove2(index) {
        this.item_supplier_meta.splice(index, 1)

      },
      async porducts_() {
        const url = 'https://qrwallshop.paygear.ir/v1/product';
        const res = await this.axios.get(url);
        if (res.status === 200) {
          this.products = res.data.result.result;

        }
      },
      async category_() {
        const url = 'https://qrwallshop.paygear.ir/v1/category';
        const res = await this.axios.get(url);
        if (res.status === 200) {
          this.category = res.data.result.result;

        }
      },

      async group_() {
        const url = 'https://qrwallshop.paygear.ir/v1/group';
        const res = await this.axios.get(url);
        if (res.status === 200) {
          this.groups = res.data.result.result.Groups;
        }
      },
      async supplier_() {
        const url = 'https://qrwallshop.paygear.ir/v1/supplier';
        const res = await this.axios.get(url);
        if (res.status === 200) {
          this.supplier = res.data.result.result;
        }
      },

      async submit() {
        let listId = [];
        for (let i in this.itemgroups) {
          listId.push({id: this.itemgroups[i].id})
        }
        let ListSupplier = [];
        for (let i in this.item_supplier_meta) {
          ListSupplier.push({
            name: this.item_supplier_meta[i].name,
            value: this.item_supplier_meta[i].value
          })
        }
        let Listproduct = [];
        for (let i in this.item_product) {
          Listproduct.push({
            name: this.item_product[i].name,
            value: this.item_product[i].value
          })
        }
        const res = await this.axios.put('https://qrwallshop.paygear.ir/v1/product', {
          id: parseInt(this.$route.params.id),
          name: this.items.name,
          category_id: this.items.category_id,
          supplier_id: this.items.supplier_data[0].supplier.id,
          groups: listId,
          product_attributes: Listproduct,
          product_supplier_meta_attribute: ListSupplier,
        });
        if (res.status === 200) {
          this.alert = true
        }
      },
      async get() {
          const url = 'https://qrwallshop.paygear.ir/v1/product/' + this.$route.params.id;
          const res = await this.axios.get(url);
          if (res.status === 200) {
            this.items = res.data.result;
            this.itemgroups = res.data.result.groups;
            this.item_supplier_meta = res.data.result.supplier_data[0].supplier_meta;
            this.item_product = res.data.result.product_attributes;
            console.log(this.item_product)
            console.log(51156161651)
            console.log(5155151515)
          }
      }
    },

    created() {
      this.category_();
      this.porducts_();
      this.supplier_();
      this.group_();
      this.get()
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

