<template>
  <div class="w-auto h-full mx-6 my-64 bg-white rounded-md shadow-md p-6 text-center text-gray-900 max-w-lg mx-auto">
      
    <div class="w-full font-bold mb-4">
      Danke!
    </div>

    <img src="@/assets/icons/Check.svg" alt="Check" class="inline-block h-12 mb-4">

    <div>
      Deine Daten wurden übermittelt.
    </div>

    <div class="mt-2">
      Durch deine Mithilfe ermöglichst du Anderen, sicher Einkaufen zu gehen!
    </div>

    <!-- <div>
      Durch deine Mithilfe ermöglichst du es Anderen, sicher einkaufen zu gehen!
    </div>

    <div class="mt-2">
      Ohne <span class="font-bold">Dich</span> würde <span class="font-bold">WhatsLeft</span> nicht funktionieren!
    </div> -->

    <button @click="$emit('closed', true);" class="block w-full h-16 text-xl font-bold text-gray-100 rounded tracking-wide mt-6" style="background-color: #006BAB;">
      Gerne!
    </button>
      
  </div>
</template>

<script>
export default {
  name: 'ThankYouPrompt',
}
</script>