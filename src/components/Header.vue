<template>
  <nav
    class="flex flex-row w-full items-center bg-white shadow-md rounded"
  >
    <div class="w-1/2 flex items-center flex-shrink-0 p-1">
      <!-- <span class="font-semibold text-xl tracking-tight">Logo</span> -->
      <div class="w-auto h-auto hover:shadow-md p-1">
        <router-link
          :to="{
            name: 'Home',
          }"
          class="h-10"
        >
          <img src="/media/WhatsleftLogo.svg" alt="WhatsLeft Logo" class="w-10 h-10 rounded" />
        </router-link>
      </div>
    </div>
    <div class="w-1/2 flex flex-row-reverse p-1">
      <!-- Settings -->
      <a
        href="#"
        class="inline-block text-sm p-3 rounded hover:shadow-md text-black border-white"
      >
        <img src="@/assets/icons/Settings_Dark.svg" alt="Einstellungen" class="w-6 h-6">
      </a>
      <!-- Filter -->
      <a
        href="#"
        class="inline-block text-sm px-3 py-3 rounded hover:shadow-md text-black border-white"
      >
        <img src="@/assets/icons/Filter_Dark.svg" alt="Nach Produkten filtern" class="w-6 h-6">
      </a>
      <!-- Shopping Bag -->
      <a
        href="#"
        class="inline-block text-sm px-3 py-3 rounded hover:shadow-md text-black border-white"
      >
        <img src="@/assets/icons/Mall_Dark.svg" alt="Einkaufsliste" class="w-6 h-6">
      </a>
    </div>
  </nav>
</template>

<script>

export default {

};

</script>
