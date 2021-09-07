<template>
  <div>
    <v-btn
        v-if="Table"
        class="sizebtn"
        fab
        dark
        title="ایجاد محصولات"
        color="green"
        href="/products"
    >
      <v-icon dark>
        mdi-plus
      </v-icon>
    </v-btn>
    <v-btn
        v-if="ChangeTable"
        dark
        class="sizebtn"
        @click="BtnBack"
        color="indigo"
    >
      <v-icon dark>
        mdi-keyboard-backspace
      </v-icon>
    </v-btn>
    <v-container
        class="fill-height"
        fluid
    >
      <v-row
          align="center"
          justify="center"
      >
        <b3 style="
          font-size: 20px;
          font-weight: bold;
          ">محصولات
        </b3>
      </v-row>
      <v-row
          align="center"
          justify="center"
      >
        <v-col class="text-center">
          <v-data-table
              v-if="Table"
              @click:row="Item"
              :items="Products"
              :headers="headers"
              hide-default-footer
              loading-text="... لظفا صبر کنید"

              class="elevation-1"
          >
            <!--                    <template v-slot:item.is_active="{ item }">-->
            <!--                        <v-chip :color="getColor(item.is_active)" dark>{{ active(item.is_active)}}</v-chip>-->
            <!--                    </template>-->
            <template v-slot:item.actions="{ item }">
              <v-btn
                  style="width: 28px;
                              height: 28px;"
                  fab
                  color="#FFC300"
                  @click="editItem(item)"
              >
                <v-icon
                    style="font-size: 17px;"
                >
                  mdi-pencil
                </v-icon>
              </v-btn>
            </template>
              <!--                        <v-icon-->
              <!--                          small-->
              <!--                          class="del"-->
              <!--                          @click="deleteItem(item)"-->
              <!--                        >-->
              <!--                            mdi-delete-->
              <!--                        </v-icon>-->
            <template v-slot:item.created_at="{ item }">
              {{persianDate(item.created_at) }}
            </template>
          </v-data-table>
          <div class="text-center pt-2">
            <v-pagination
                v-if="Table"
                :length="1"
                v-model="page"
                :total-visible="7"
                circle
                @input="onPageChange"
            ></v-pagination>
          </div>

        </v-col>
      </v-row>
      <v-row
          align="center"
          justify="center"
      >
        <v-col class="text-center">
          <v-data-table
              v-if="ChangeTable"
              hide-default-footer
              loading-text="... لظفا صبر کنید"
              :items="Products2"
              :headers="headers"
              class="elevation-1"
          >

            <!--                    <template v-slot:item.is_active="{ item }">-->
            <!--                        <v-chip :color="getColor(item.is_active)" dark>{{ active(item.is_active)}}</v-chip>-->
            <!--                    </template>-->
            <template v-slot:item.actions="{ item }">
              <v-btn
                  style="width: 28px;
                              height: 28px;"
                  fab
                  color="#FFC300"
                  @click="editItem(item)"
              >
                <v-icon
                    style="font-size: 17px;"
                >
                  mdi-pencil
                </v-icon>
              </v-btn>
              <!--                        <v-icon-->
              <!--                          small-->
              <!--                          class="del"-->
              <!--                          @click="deleteItem(item)"-->
              <!--                        >-->
              <!--                            mdi-delete-->
              <!--                        </v-icon>-->
              <!--                        <v-dialog v-model="dialogDelete" max-width="300px">-->
              <!--                            <v-card>-->
              <!--                                <v-card-title class="headline"><v-row align="center" justify="center">آیا مطمئن هستید؟</v-row></v-card-title>-->
              <!--                                <v-card-actions>-->
              <!--                                    <v-spacer></v-spacer>-->
              <!--                                    <v-btn color="blue darken-1" text @click="closeDelete">خیر</v-btn>-->
              <!--                                    <v-btn color="blue darken-1" text @click="deleteItemConfirm(item)">بله</v-btn>-->
              <!--                                    <v-spacer></v-spacer>-->
              <!--                                </v-card-actions>-->
              <!--                            </v-card>-->
              <!--                        </v-dialog>-->
            </template>
          </v-data-table>
          <!--                <v-alert-->
          <!--                  dir="rtl"-->
          <!--                  :value="alertdel"-->
          <!--                  type="success"-->
          <!--                  transition="scale-transition"-->
          <!--                  dismissible-->
          <!--                >-->
          <!--                    با موفقیت حذف شد.-->
          <!--                </v-alert>-->

        </v-col>
      </v-row>

    </v-container>
  </div>
</template>
<script>
  import * as moment from "jalali-moment";

  export default {
    name: "users",
    data() {
      return {
        page: 1,
        Products: undefined,
        Products2: [],
        ChangeTable: false,
        Table: true,
        seleced: [],
        dialogDelete: false,
        alertdel: false,
        loading: true,
        headers: [
          {text: 'ویرایش', value: 'actions', sortable: false},
          {text: 'نام تامین کننده', value: 'supplier_data[0].supplier.name'},
          {text: 'نام دسته بندی', value: 'category.name'},
          {text: 'نام', value: 'name'},
          {text: 'تاریخ ایجاد', value: 'created_at'},
          {text: 'آی‌دی', value: 'id'},
        ],
      }
    },
    methods: {
      async GetProducts() {
        const url = `${BASE_URL}v1/product?page=` + this.page;
        const res = await this.axios.get(url);
        if (res.status === 200) {
          this.Products = res.data.result.result;
          this.loading = false
        }
      },
      persianDate(value) {
        return moment(value).format('jYYYY/jM/jD ساعت HH:mm')
      },
      async Item(item) {
        const url = `${BASE_URL}v1/product?page=` + item.id;
        const res = await this.axios.get(url);
        if (res.status === 200) {
          this.Products2 = [res.data.result];
          this.ChangeTable = true;
          this.Table = false;
          this.loading = false
        }
      },
      editItem(item) {
        this.$router.push('/updateProducts/' + item.id);
      },
      BtnBack() {
        this.ChangeTable = false;
        this.Table = true
      },

      active(value) {
        if (value === true) {
          value = 'فعال'
        }
        if (value === false) {
          value = 'غیرفعال'
        }
        if (value === null) {
          value = 'ندارد'
        }
        return value
      },
      onPageChange() {
        this.GetProducts();
      },
      getColor(value) {
        if (value === true) return 'green';
        else if (value === false) return 'red'
        else if (value === null) return 'black'
      },
      deleteItem() {
        this.dialogDelete = true
      },

      closeDelete() {
        this.dialogDelete = false
      },

      // async deleteItemConfirm(item) {
      //   const url = 'https://pooya.paygear.ir/account/v1/permission/' + item.id;
      //   const res = await this.axios.delete(url);
      //   if (res.status === 200) {
      //     this.dialogDelete=false
      //     this.alertdel = true
      //   }
      // },

    },
    created() {
      this.GetProducts();
    }
  }
</script>
<style>
  .sizebtn {
    margin-left: 10px;
    margin-top: 10px;

  }
</style>
