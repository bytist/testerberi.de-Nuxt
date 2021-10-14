<template>
  <div>
    <div
      id="navbar-component"
      class="navbar-wrapper bg-tb-primary w-full px-3 z-40 fixed top-0 transition duration-100"
      :class="$route.name != 'Product' && navbarSticky && 'tb-shadow-navbar'"
      :style="`height: ${navbarHeightUpdated}px;`"
    >
      <div class="mx-auto h-full container relative">
        <div class="grid grid-cols-12 items-center h-full">
          <div class="navbar-logo-wrapper items-center pr-3 col-span-3">
            <NuxtLink to="/">
              <img
                src="~/assets/images/site-logo.svg"
                alt
                class="logo-checkbox max-w-full"
                :style="`height: ${logoHeightUpdated}px;`"
              />
            </NuxtLink>
          </div>
          <div
            class="navbar-search-wrapper col-span-6 px-1 xl:px-2 flex justify-center items-center"
          >
            <WidgetSearchWidget
              class="w-full z-20"
              @showSearch="showSearch = true"
            />
          </div>
          <div class="navbar-cat-btn-wrapper col-span-2 px-2 xl:px-4">
            <div
              ref="categoryOnBtn"
              v-on:click="toggleCategory"
              v-bind:class="[
                showMenu ? 'bg-white' : 'bg-tb-blue hover:bg-tb-blue-dark',
              ]"
              class="cat-btn rounded-full px-5 xl:px-8 flex items-center justify-center cursor-pointer select-none transition lg:py-2"
            >
              <span class="menu-ico-wrapper">
                <span v-if="showMenu" class="icon-menu-blue"></span>
                <span v-else class="icon-menu"></span>
              </span>
              <span
                v-bind:class="[showMenu ? 'text-tb-blue' : 'text-white']"
                class="font-normal text-base xl:text-lg ml-2"
                >Categories</span
              >
            </div>
          </div>
          <client-only>
            <div v-if="!isLoggedin" class="navbar-login-btn-wrapper">
              <NuxtLink to="/login">
                <div class="login-btn flex items-center">
                  <span class="icn-login icomoon-blue"></span>
                  <span class="text-tb-blue font-normal text-lg ml-1"
                    >Login</span
                  >
                </div>
              </NuxtLink>
            </div>
            <div
              v-else
              @mouseenter="userDropDownOpen = true"
              @mouseleave="userDropDownOpen = false"
              class="navbar-user-btn-wrapper relative"
            >
              <div
                ref="userDropdownBtn"
                class="user-btn flex items-center cursor-pointer justify-end"
              >
                <span
                  v-if="userData.photoURL"
                  class="user-ico-wrapper rounded-full"
                  :style="`background-image: url('${userData.photoURL}')`"
                ></span>
                <div
                  v-else
                  class="user-ico-wrapper flex items-center justify-center text-tb-energy-f font-bold bg-white rounded-full leading-none overflow-hidden pt-px"
                >
                  {{ (userData.displayName || userData.email).slice(0, 2).toUpperCase() }}
                </div>
                <span class="text-tb-blue text-lg ml-2 truncate">{{
                  userData.displayName || userData.email
                }}</span>
                <img src="~/assets/images/arrow-blue.svg" class="ml-1" alt />
              </div>
              <WidgetUserDropdown
                v-if="userDropDownOpen === true"
                :userBtnRef="$refs.userDropdownBtn"
                @logout="
                  logoutUser();
                  userDropDownOpen = false;
                "
                @close="userDropDownOpen = false"
                class="absolute right-0 transform pt-3 -translate-y-px z-30"
              />
            </div>
          </client-only>
        </div>
        <transition name="fade">
          <WidgetCategoryMenu
            v-if="showMenu"
            :open="showMenu"
            @close="showMenu = false"
            :mainRef="$refs.categoryOnBtn"
            :categoryData="categoryData"
            class="megamenu absolute top-0 left-0 transform translate-y-20 mt-1 xl:mt-2 z-20"
          ></WidgetCategoryMenu>
        </transition>
      </div>
    </div>
    <transition name="fade">
      <WidgetSearchLightbox v-if="showSearch" @close="showSearch = false" />
    </transition>
  </div>
</template>

<script>
import { getPopularCategories } from "@/services/service";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Navbar",
  data() {
    return {
      showMenu: false,
      userDropDownOpen: false,
      categoryData: [],
      navbarHeight: this.windowInnerWidth < 1280 ? 80 : 96,
      navbarHeightUpdated: this.windowInnerWidth < 1280 ? 80 : 96,
      logoHeight: this.windowInnerWidth < 1280 ? 29.9 : 38,
      logoHeightUpdated: this.windowInnerWidth < 1280 ? 29.9 : 38,
      navbarSticky: false,
      showSearch: false,
    };
  },
  computed: {
    ...mapGetters("auth", ["isLoggedin", "userData"]),
    windowInnerWidth() {
      return process.client ? window.innerWidth : 1280;
    },
  },
  created() {
    this.getPopularCategories();
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    ...mapActions("categoryMenu", [
      "changeTotalMenuCategory",
      "changeNavbarMenuCategory",
    ]),
    ...mapActions("auth", ["logoutUser"]),
    toggleCategory: function () {
      this.showMenu = !this.showMenu;
    },
    toggleDropdown() {
      this.userDropDownOpen = this.userDropDownOpen ? false : true;
    },
    async getPopularCategories() {
      const data = await getPopularCategories();

      for (const index in data) {
        const item = data[index];

        let categoryItem = {
          name: item.kategorieName,
          url: item.kategorieURL,
          data: [],
        };

        if (item.kategorieName === "Computer & Hardware")
          categoryItem.icon = "pc";
        else if (item.kategorieName === "Telekommunikation")
          categoryItem.icon = "mobile";
        else if (item.kategorieName === "TV, Audio, Video, DVD")
          categoryItem.icon = "lcd";
        else if (item.kategorieName === "Foto Video")
          categoryItem.icon = "camera";
        else if (item.kategorieName === "Sport") categoryItem.icon = "bicycle";
        else if (item.kategorieName === "Gesundheit & Kosmetik")
          categoryItem.icon = "bottles";
        else if (item.kategorieName === "Baby & Kind")
          categoryItem.icon = "stroller";
        else if (item.kategorieName === "Mode") categoryItem.icon = "watch";
        else if (item.kategorieName === "Heimwerken & Garten")
          categoryItem.icon = "tools";
        else if (item.kategorieName === "Wohnen & Haushalt")
          categoryItem.icon = "washer";
        else if (item.kategorieName === "Essen & Trinken")
          categoryItem.icon = "calender";
        else if (item.kategorieName === "Spiele & Spielwaren")
          categoryItem.icon = "toys";
        else if (item.kategorieName === "Auto & Motorrad")
          categoryItem.icon = "tire";

        if (item.childs) {
          for (const childIndex in item.childs) {
            const subItem = item.childs[childIndex];

            let childCategoryItem = {
              name: subItem.kategorieName,
              url: subItem.kategorieURL,
              data: [],
            };

            if (subItem.childs) {
              subItem.childs = Object.entries(subItem.childs).sort(
                ([, a], [, b]) => a.lft - b.lft
              );

              for (const grandIndex of subItem.childs) {
                if (childCategoryItem.data.length < 5) {
                  const grandItem = grandIndex[1];
                  childCategoryItem.data.push({
                    kategorieName: grandItem.kategorieName,
                    kategorieURL: grandItem.kategorieURL,
                  });
                }
              }
            }
            categoryItem.data.push(childCategoryItem);
          }
        }

        this.categoryData.push(categoryItem);
      }

      this.changeTotalMenuCategory(data);
      this.changeNavbarMenuCategory(this.categoryData);
    },
    handleScroll() {
      let scrollPos = window.scrollY;
      if (scrollPos < 96) {
        this.navbarHeightUpdated = this.navbarHeight - scrollPos / 3;
        this.logoHeightUpdated =
          this.logoHeight - scrollPos / (this.logoHeight > 32 ? 12 : 16);
        this.navbarSticky = false;
      } else {
        this.navbarHeightUpdated = this.navbarHeight - 32;
        this.logoHeightUpdated =
          this.logoHeight - (this.logoHeight > 32 ? 8 : 6);
        this.navbarSticky = true;
      }
    },
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style scoped>
.fade-enter-active {
  transition: 0.2s;
  transition-delay: 0.1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transition: 0.2s;
  transition-delay: 0.1s;
  opacity: 0;
}
.navbar-cat-btn-wrapper .cat-btn {
  padding-bottom: 11px;
  padding-top: 10px;
}
.user-ico-wrapper {
  height: 26px;
  width: 26px;
  min-width: 26px;
  background-size: cover;
}
.tb-shadow-navbar {
  -webkit-filter: drop-shadow(0 0 2px rgba(0, 0, 0, 0.07));
  filter: drop-shadow(0 0 2px rgba(0, 0, 0, 0.07));
}
.menu-ico-wrapper {
  transform: translateY(2px);
}
@media (max-width: 1280px) {
  .navbar-cat-btn-wrapper .cat-btn {
    padding-top: 8px;
    padding-bottom: 7px;
  }
}
</style>
