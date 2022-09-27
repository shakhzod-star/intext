<template>
  <div class="navbar">
    <div class="navBg">
      <div class="nav">
        <a href="#" class="logo"> <img src="@/assets/img/int.svg" alt="" /> </a>
        <ul class="navList">
          <li v-for="list in getCategories" :key="list.index">
            <a :href="'#'+ list.id ">  {{list[`name_${getLang}`]}}</a>
          </li>
        </ul>
        <div class="phone_social">
          <a class="phone" :href="`tel:${site.phone_number}`">{{site.phone_number}}</a>
          <a :href="site.telegram_link" target="_blank"
            ><img src="@/assets/img/social/telegram.svg" alt=""
          /></a>
          <a :href="site.instagram_link" target="_blank"
            ><img src="@/assets/img/social/instagram.svg" alt=""
          /></a>
          <div
            ref="lang"
            class="lang"
            @click="setLocale"
          >
            {{ this.$store.state.locale.toUpperCase() }}
          </div>
          <button class="burger" @click="BurgerActive = !BurgerActive">
            <img src="@/assets/img/Modal/burger.svg" alt="" />
          </button>
        </div>
      </div>
    </div>
    <div class="burgerMenu"  :class="{  active : BurgerActive  }">
      <a href="" class="intex"><img src="@/assets/img/int.svg" alt="" /></a>
      <ul class="navList">
        <li class="list" v-for="list in getCategories" :key="list.index">
          <a :href=" '#' + list.id" @click="BurgerActive = !BurgerActive"  >{{ list[`name_${getLang}`]   }}</a>
        </li>
      </ul>
      <div class="socials">
        <a class="phone" :href="`tel:${site.phone_number}`">
          <img src="@/assets/img/social/phonee.svg" alt="" /> {{ $t("call") }}
        </a>
        <a class="social" :href="site.telegram_link" target="_blank">
          <img src="@/assets/img/social/telegramm.svg" alt="" />
          {{ $t("telegram") }}
        </a>
        <a class="social" :href="site.instagram_link" target="_blank">
          <img src="@/assets/img/social/instagramm.svg" alt="" />
          {{ $t("instagram") }}
        </a>
      </div>
    </div>
    <div
      v-if="BurgerActive"
      class="bgModal"
      @click="BurgerActive = !BurgerActive"
    ></div>
  
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      BurgerActive: false,
      site: {},
      isActive: false,
      navList: [],
    };
  },
  computed: {
    ...mapGetters(["getSite","getCategories","getLang"]),
  },
  methods: {
    ...mapActions(["fetchSite","fetchCategories", "fetchLang"]),
    setLocale() {
      this.isActive = !this.isActive
      if (this.isActive && this.getLang != 'RU'  ){
          this.fetchLang('RU')
      }else{
            this.fetchLang('UZ')
      }
      this.$i18n.locale = this.getLang.toLowerCase();       
      localStorage.setItem('language',this.getLang)
    },
  },
   mounted() {
    let locale =  localStorage.getItem('language')
    this.fetchLang(locale)
    let site = JSON.parse(localStorage.getItem("siteInfo"));
    if( site == null){
   this.fetchSite().then((res) => {
        this.site = res[0];
        localStorage.setItem("siteInfo", JSON.stringify(this.site));
      }).catch((error)=>{
        console.log(error);
      } )
    }else{
  this.site = site;
    }
    
   
   
  },
  created() {
 
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  .navBg {
    background: #009398;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 999;
    .nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      max-width: 1440px;
      padding: 20px 66px;
      margin: 0 auto;

      .logo {
        text-decoration: none;
        font-family: "Signika-Bold";
        font-style: normal;
        font-weight: 600;
        font-size: 25px;
        line-height: 31px;
        color: #ffffff;
        text-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
        margin: 0 7px 0 0;
      }
      .navList {
        display: flex;
        margin: 0;
        align-items: center;
        li {
          margin: 0;
          list-style: none;
          a {
            text-decoration: none;
            font-family: "trebuchetms";
            font-style: normal;
            font-weight: 700;
            font-size: 22px;
            line-height: 26px;
            text-align: center;
            color: #ffffff;
            padding: 0 16px;
          }
        }
      }
      .phone_social {
        display: flex;
        align-items: center;
        a {
          max-height: 26px;
          font-family: "trebuchetms";
          font-style: normal;
          font-weight: 700;
          font-size: 20px;
          line-height: 23px;
          text-align: center;
          color: #ffffff;
          text-decoration: none;
          margin-right: 14px;
          img {
            width: 26px;
            height: 26px;
          }
        }
        a:last-child {
          margin-right: 0;
        }
        .lang {
          height: 26px;
          width: 26px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: "trebuchetms";
          font-style: normal;
          font-weight: 700;
          font-size: 14px;
          line-height: 16px;
          text-align: center;
          color: #00979c;
          background: #ffffff;
          border-radius: 3px;
          cursor: pointer;
        }
        .burger {
          display: none;
          border: none;
          background: none;
          margin-left: 16px;
        }
      }
    }
  }
  .burgerMenu {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed;
    left:  -500px;
    background: #009398;
    height: 100vh;
    width: 284px;
    z-index: 1001;
      transition: all 0.4s ease-in-out;
    overflow-y: scroll;
    &.active {
      left: 0; 
    }
    .intex {
      font-family: "Signika-Bold";
      font-style: normal;
      font-weight: 600;
      font-size: 25px;
      line-height: 31px;
      margin-top: 12px;
      text-align: center;
      color: #ffffff;
      text-decoration: none;
      text-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
      margin-bottom: 60px;
    }
    .navList {
      display: flex;
      flex-direction: column;
      margin-bottom: 30px;
      .list {
        display: flex;
        justify-content: center;
        margin-bottom: 30px;
        a {
          font-family: "Trebuchet MS";
          font-style: normal;
          font-weight: 700;
          font-size: 17px;
          line-height: 20px;
          color: #009398;
          background: #ffffff;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
          border-radius: 10px;
          width: 236px;
          padding: 17px 0;
          text-align: center;
        }
      }
    }
    .socials {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 30px;
      .phone {
        padding: 10px 30px;
        margin-bottom: 30px;
        width: 236px;
        display: flex;
        background: #139d4b;
        border-radius: 10px;
        font-family: "trebuchetms";
        font-style: normal;
        font-weight: 700;
        font-size: 21px;
        line-height: 24px;
        border: none;
        color: #ffffff;
        img {
          margin-right: 16px;
        }
      }
      .social {
        padding: 2px 30px;
        margin-bottom: 30px;
        width: 236px;
        font-family: "trebuchetms";
        font-style: normal;
        font-weight: 700;
        font-size: 21px;
        line-height: 24px;
        color: #009398;
        background: #ffffff;
        border-radius: 10px;

        img {
          margin-right: 7px;
        }
      }
      .social:nth-child(2) {
        padding: 10px 30px;
        img {
          margin-right: 27px;
        }
      }
    }
  }
  .burgerMenu::-webkit-scrollbar {
    width: 5px;
  }
  .burgerMenu::-webkit-scrollbar-track {
    box-shadow: inset 0 0 10px white;
    border-radius: 10px;
  }
  .burgerMenu::-webkit-scrollbar-thumb {
    background: #00979c;
    border-radius: 3px;
  }
  // .burgerMenu::-webkit-scrollbar-thumb:hover {
  //   background: white;
  // }
}

@media (max-width: 1250px) {
  .navbar {
    .navBg {
      .nav {
        .logo {
        }
        .navList {
          display: none;
          li {
            a {
            }
          }
        }
        .phone_social {
          .phone {
            display: none;
          }
          a {
            img {
            }
          }
          a:first-child {
          }
          a:last-child {
          }
          .lang {
          }
          .burger {
            display: block;
          }
        }
      }
    }
  }
}
@media (max-width: 500px) {
  .navbar {
    .navBg {
      .nav {
        padding: 18px 20px;
        .logo {
          font-size: 20px;
          line-height: 25px;
        }
        .navList {
          display: none;
          li {
            a {
            }
          }
        }
        .phone_social {
          .phone {
            display: none;
          }
          a {
            margin-right: 15px;
            img {
            }
          }
          a:first-child {
          }
          a:last-child {
            margin-right: 0;
          }
          .lang {
          }
          .burger {
          }
        }
      }
    }
  }
}
</style>
