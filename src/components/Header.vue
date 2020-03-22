<template>
  <nav class="flex items-center justify-between flex-wrap bg-white shadow-md p-6">
    <div class="flex items-center flex-shrink-0 text-black mr-6">
      <!-- <span class="font-semibold text-xl tracking-tight">Logo</span> -->
      <img width="20%" src="media/logo-whats_left.png" alt srcset />
    </div>
    <div>
      <a
        href="#"
        class="inline-block text-sm px-4 py-2 leading-none border rounded text-black border-white hover:border-transparent hover:text-blue-400 hover:bg-white mt-4 lg:mt-0"
      >
        <Shopping />
      </a>
      <a
        href="#"
        class="inline-block text-sm px-4 py-2 leading-none border rounded text-black border-white hover:border-transparent hover:text-blue-400 hover:bg-white mt-4 lg:mt-0"
      >
        <Filter />
      </a>
      <a
        href="#"
        class="inline-block text-sm px-4 py-2 leading-none border rounded text-black border-white hover:border-transparent hover:text-blue-400 hover:bg-white mt-4 lg:mt-0"
      >
        <Settings />
      </a>
    </div>
  </nav>
</template>

<script>
import Settings from "vue-material-design-icons/SettingsOutline.vue";
import Filter from "./FilterIcon.vue";
import Shopping from "vue-material-design-icons/Shopping.vue";

export default {
  components: {
    Settings,
    Filter,
    Shopping
  }
};
</script>

<style lang="scss" scoped></style>
