<template>
    <div>
        <v-btn
          v-if="Table"
          class="sizebtn"
          fab
          dark
          title="ایجاد Qr"
          color="green"
          href="/Qr"
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
          ">کیوآرها
                </b3>
            </v-row>
            <v-row
              align="center"
              justify="center"
            >
                <v-col class="text-center">
                    <v-data-table
                      v-if="Table"
                      :items="qr"
                      :headers="headers"
                      hide-default-footer
                      loading-text="... لظفا صبر کنید"

                      class="elevation-1"
                    >
                        <template v-slot:item.is_active="{ item }">
                            <v-chip :color="getColor(item.is_active)" dark>{{ active(item.is_active)}}</v-chip>
                        </template>
                        <template v-slot:item.generateQRs="{ item }">
                            <v-btn
                            fab
                            color="black"
                            style="width: 28px;
                              height: 28px;"
                            >
                                <v-icon
                                  color="#ffffff"
                                  small
                                  @click="generateQR(item) , DialogQrs = true"
                                >
                                    mdi-eye
                                </v-icon>

                            </v-btn>
                        </template>
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
                      :items="qr2"
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
                    <v-dialog
                      v-model="DialogQrs"
                      max-width="330"
                    >
                        <v-card
                          height="320px"
                        >
                            <v-row align="center" justify="center">
                                <div style="margin-top: 20px;margin-left: 15px; background: #ffffff">

                                    <qrcode-vue :value="value" :size="size" level="H"/>

                                </div>
                            </v-row>
<!--                            <v-row align="center" justify="center">-->
<!--                                <v-btn-->
<!--                                  style="margin-top: 40px;"-->
<!--                                  color="blue"-->
<!--                                  dark-->
<!--                                  @click="downoad"-->
<!--                                >-->
<!--                                    save-->
<!--                                </v-btn>-->
<!--                            </v-row>-->
                        </v-card>

                    </v-dialog>

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
  import QrcodeVue from 'qrcode.vue'
  // import * as moment from "jalali-moment";

  export default {
    components: {
      QrcodeVue,
    },
    data() {
      return {
        page: 1,
        dialog: true,
        qr: undefined,
        qr2: [],
        DialogQrs: false,
        ChangeTable: false,
        seleced: [],
        value: '',
        size: 200,
        dialogDelete: false,
        alertdel: false,
        Table: true,
        loading: true,
        headers: [
          {text: 'ویرایش', value: 'actions', sortable: false},
          {text: 'تولید کیوآر', value: 'generateQRs', sortable: false},
          {text: 'نوع', value: 'type'},
          {text: 'کیوآر', value: 'qr'},
          {text: 'مقدار', value: 'value'},
          {text: 'آی‌دی', value: 'id'},
        ],
      }
    },

    methods: {
      async GetQr() {
        const url = 'https://qrwallshop.paygear.ir/v1/qr?page=' + this.page;
        const res = await this.axios.get(url);
        if (res.status === 200) {
          this.qr = res.data.result.result;
          this.loading = false
        }
      },

      // persianDate(value){
      //   return moment(value).format('jYYYY/jM/jD ساعت HH:mm')
      // },
      download() {

      },
      async Item(item) {
        const url = 'https://qrwallshop.paygear.ir/v1/qr/' + item.id;
        const res = await this.axios.get(url);
        if (res.status === 200) {
          this.qr2 = [res.data.result];
          this.ChangeTable = true;
          this.Table = false;
          this.loading = false
        }
      },
      editItem(item) {
        this.$router.push('/updateQr/' + item.id);
      },
      BtnBack() {
        this.ChangeTable = false;
        this.Table = true
      },
      generateQR(item) {
        this.value = item.qr
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
        this.GetQr();
      },
      getColor(value) {
        if (value === true) return 'green';
        else if (value === false) return 'red';
        else if (value === null) return 'black'
      },
      deleteItem() {
        this.dialogDelete = true
      },

      closeDelete() {
        this.dialogDelete = false
      },
      downoad() {
        var download = document.getElementById("download");
        var image = document.getElementById("myCanvas").toDataURL("image/png")
          .replace("image/png", "image/octet-stream");
        download.setAttribute("href", image);
//      download.setAttribute("download","archive.png");
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
      this.GetQr()
    }
  }
</script>
<style>
    .sizebtn {
        margin-left: 10px;
        margin-top: 10px;

    }
</style>
