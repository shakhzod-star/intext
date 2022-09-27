import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);



export default new Vuex.Store({
  state: {
    categories: [],
    products: [],
    site: {},
    locale: "UZ",
    backend_url: "https://market-index.herokuapp.com/",
    botToken : 'https://api.telegram.org/bot5381011300:AAEq4uVHwZ99SE-cnFV63I0QRuV03T4Pzx4/',
    chatId : -723987438,
    // backend_url: 'http://31.44.6.77:5555/'
  },
  actions: {
    fetchBotOrder(ctx,data){
      let allUserInfo = `Name: ${data.name}   \n  Number: ${data.phoneNumber}   \n  Address: ${data.address} `
      return new Promise((resolve, reject) => {
        axios                          
          .post(this.state.botToken + `sendMessage?chat_id=${this.state.chatId}&text=${allUserInfo}`)
          .then((res) => {
            console.log(res);
            resolve(res);
          })
          .catch(() => {
            reject();
          });
      });
    },
    fetchBotConsultation(ctx,data){
      let allUserInfo = `Name: ${data.name} \n Number: ${data.phoneNumber} `
      return new Promise((resolve, reject) => {
        axios
          .post(this.state.botToken + `sendMessage?chat_id=${this.state.chatId}&text=${allUserInfo}`)
          .then((res) => {
            console.log(res);
            resolve(res);
          })
          .catch(() => {
            reject();
          });
      });
    },
    // async
    fetchCategories(ctx) {
      return new Promise((resolve, reject) => {
        axios
          .get(this.state.backend_url + "api/home/category")
          .then((res) => {
            ctx.commit("updateCategory", res.data.data);
            resolve(res.data.data);
          })
          .catch(() => {
            reject();
          });
      });
   
    },
    fetchProducts(ctx) {
      return new Promise((resolve, reject) => {
        axios
          .get(this.state.backend_url + "api/home/product")
          .then((res) => {
            ctx.commit("updateProduct", res.data.data);
            resolve(res.data.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    fetchSite(ctx) {
      return new Promise((resolve, reject) => {
        axios
          .get(this.state.backend_url + "api/home/site")
          .then((res) => {
            resolve(res.data.data);
            ctx.commit("updateSite", res.data.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    //POST Order
    fetchOrder(ctx, data) {
      return new Promise((resolve, reject) => {
        axios
          .post(this.state.backend_url + "api/home/order", data, {
            headers: {
              "content-type": "application/json",
            },
          })
          .then((res) => {
            resolve(res);
          })
          .catch(() => {
            reject();
          });
      });
    },
    // POST Consultation
    fetchConsultation(ctx, data) {
      return new Promise((resolve, reject) => {
        axios
          .post(this.state.backend_url + "api/home/consultation", data, {
            headers: {
              "content-type": "application/json",
            },
          })
          .then((res) => {
            // ctx.commit("updateCategory", res.data.data);
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    fetchLang({commit},data){
      commit("updateLang",data)
    }
  },
  mutations: {
    updateCategory(state, data) {
        state.categories = data;
    },
    updateProduct(state, data) {
      state.products = data;
    },
    updateSite(state, data) {
      state.site = data;
    },
    updateLang(state,data){
    state.locale = data
    }
  },
  getters: {
    getCategories(state) {
      return state.categories;
    },
    getProducts(state) {
      return state.products;
    },
    getSite(state) {
      return state.site;
    },
    getLang(state) {
      return state.locale.toLowerCase();
    },
  },
  modules: {}, /// normalli tegb
});
