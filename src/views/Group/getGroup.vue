<template>
    <div>
        <v-btn
          v-if="Table"
          class="sizebtn"
          fab
          dark
          title="ایجاد گروه"
          color="green"
          href="/group"
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
          ">گروه ها
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
                      :items="group"
                      :headers="headers"
                      hide-default-footer
                      loading-text="... لظفا صبر کنید"

                      class="elevation-1"
                    >
                        <template v-slot:item.is_active="{ item }">
                            <v-chip :color="getColor(item.is_active)" dark>{{ active(item.is_active)}}</v-chip>
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
                      :items="group2"
                      :headers="headers"
                      class="elevation-1"
                    >

                        <template v-slot:item.is_active="{ item }">
                            <v-chip :color="getColor(item.is_active)" dark>{{ active(item.is_active)}}</v-chip>
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
                </v-col>
            </v-row>

        </v-container>
    </div>
</template>
<script>
  // import * as moment from "jalali-moment";
  export default {
    name: "users",
    data() {
      return {
        page: 1,
        group: undefined,
        group2: undefined,
        ChangeTable: false,
        Table: true,
        seleced: [],
        dialogDelete: false,
        alertdel: false,
        loading: true,
        headers: [
          {text: 'ویرایش', value: 'actions', sortable: false},
          {text: 'وضعیت', value: 'is_active'},
          {text: 'نام', value: 'name'},
          {text: 'آی‌‌دی', value: 'id'},
        ],
      }
    },
    methods: {
      async GetGroup() {
        const url = 'https://qrwallshop.paygear.ir/v1/group?page=' + this.page;
        const res = await this.axios.get(url);
        if (res.status === 200) {
          this.group = res.data.result.result.Groups;
          this.loading = false
        }
      },
      // persianDate(value){
      //   return moment(value).format('jYYYY/jM/jD ساعت HH:mm')
      // },
      async Item(item) {
        const url = 'https://qrwallshop.paygear.ir/v1/group/' + item.id;
        await this.axios.get(url).then((data) => {
          if (data.status === 200) {
            this.group2 = [data.data.result];
            this.ChangeTable = true;
            this.Table = false;
            this.loading = false
          }

        });
        // if (res.status === 200) {
        //   console.log(res.data.result)
        //   this.ChangeTable = true;
        //   this.Table = false;
        //   this.loading = false
        // }
      },

      editItem(item) {
        this.$router.push('/updateGroup/' + item.id)
      },
      BtnBack() {
        this.ChangeTable = false;
        this.Table = true
      },

      active(value) {
        if (value === 1) {
          value = 'فعال'
        }
        if (value === 0) {
          value = 'غیرفعال'
        }
        if (value === null) {
          value = 'ندارد'
        }
        return value
      },
      onPageChange() {
        this.GetGroup();
      },
      getColor(value) {
        if (value === 1) return 'green';
        else if (value === 0) return 'red'
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
      this.GetGroup()
    }
  }
</script>
<style>

    .sizebtn {
        margin-left: 10px;
        margin-top: 10px;

    }
</style>
