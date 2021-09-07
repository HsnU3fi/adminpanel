<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="4">
                <v-card class="elevation-12" color="#F4F4F4">
                    <v-toolbar color="#35495e" dark dir="rtl" >
                        <v-toolbar-title>ایجاد سفارش</v-toolbar-title>
                        <v-spacer/>
                    </v-toolbar>
                    <v-card-text>
                        <v-form v-model="valid" lazy-validation dir="rtl">
                            <v-autocomplete
                                    dir="rtl"
                                    v-model="SelectUsers"
                                    :items="users"
                                    item-text="name"
                                    item-value="id"
                                    placeholder="نام"
                                    solo dense
                                    required
                            />

                            <v-text-field
                                    v-model="address_id"
                                    type="text"
                                    placeholder="آدرس"
                                    required
                                    dense
                                    solo
                            />
                            <v-text-field
                                    v-model="total_amount"
                                    type="text"
                                    placeholder="مبلغ"
                                    required
                                    solo dense
                            />
                            <v-autocomplete
                                    v-model="SelectPaymentType"
                                    :items="payment_type"
                                    type="text"
                                    placeholder="نوع پرداخت"
                                    required
                                    solo dense
                            />
                            <div class="form-group"  v-for="(input,k) in inputs" :key="k">
                            <v-sheet color="#D9D9D9">
                                <v-container class="fill-height" fluid>

                                <v-autocomplete
                                    dir="rtl"
                                    v-model="input.product_id"
                                    :items="products"
                                    item-text="name"
                                    item-value="id"
                                    placeholder="محصولات"
                                    solo dense
                                    required
                            />
                                </v-container>
                            </v-sheet>
                                <span/>
                                <i @click='remove(k)' v-show=" k|| (!k && inputs.length > 1)"><v-icon color="red"> mdi-minus-circle</v-icon></i>
                                <i @click='add(k)' v-show="k === inputs.length-1"><v-icon color="green"> mdi-plus-circle</v-icon></i>
                            </div>
                        </v-form>
                    </v-card-text>
                    <v-card-actions  dir="rtl">
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
                <v-alert
                        dir="rtl"
                        :value="alert"
                        type="success"
                        transition="scale-transition"
                        dismissible
                >
                    ایجاد  سفارش با موفقیت انجام شد.
                </v-alert>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
  export default {

    data: () => ({
      inputs:[{

      }],
      valid: true,
      alert: false,
      users:undefined,
      products:undefined,
      total_amount:undefined,
      SelectUsers:undefined,
      product_id:undefined,
      payment_type:[
        {
          text:"wallet",
          value:"wallet"
        },
        {
          text:"Ipg",
          value:"Ipg"
        }
      ],
      SelectPaymentType:undefined,
      admin_id:undefined,
      address_id: undefined

    }),
    methods: {
      add() {
        this.inputs.push({})
      },
      remove(index) {
        this.inputs.splice(index,1)

      },
      async porducts_() {
        const url = `${BASE_URL}v1/product`;
        const res = await this.axios.get(url);
        console.log(res)
        if (res.status === 200) {
          this.products = res.data.result.result;

        }
      },
      async User() {
        const url = `${BASE_URL}v1/user`;
        const res = await this.axios.get(url);
        console.log(res)
        if (res.status === 200) {
          this.users = res.data.result.result;

        }
      },
      async submit() {
        console.log(this.inputs)
        const res= await this.axios.post(`${BASE_URL}v1/order`, {
          user_id: this.SelectUsers,
          address_id:this.address_id,
          total_amount:parseInt(this.total_amount),
          payment_type:this.SelectPaymentType,
          products:this.inputs,
        });
        if (res.status===201) {
          this.alert=true
        }
      },

    },
    created() {
      this.User();
      this.porducts_()
    }

  }
</script>

