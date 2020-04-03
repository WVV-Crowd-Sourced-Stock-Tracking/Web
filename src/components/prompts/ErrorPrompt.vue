<template>
  <div class="w-auto h-full mx-6 my-64 bg-white rounded-md shadow-md p-6 text-center text-gray-900 max-w-lg mx-auto">
      
    <div class="w-full font-bold mb-4">
      Fehler!
    </div>

    <img src="@/assets/icons/Error.svg" alt="Error" class="inline-block h-12 mb-4">

    <div>
      Beim Übermitteln deiner Daten ist ein Fehler aufgetreten.
    </div>

    <div class="mt-2">
      Bitte versuche es später erneut!
    </div>

    <!-- <div>
      Durch deine Mithilfe ermöglichst du es Anderen, sicher einkaufen zu gehen!
    </div>

    <div class="mt-2">
      Ohne <span class="font-bold">Dich</span> würde <span class="font-bold">WhatsLeft</span> nicht funktionieren!
    </div> -->

    <button @click="$emit('closed', true);" class="block w-full h-16 text-xl font-bold text-gray-100 rounded tracking-wide mt-6" style="background-color: #006BAB;">
      Okay!
    </button>
      
  </div>
</template>

<script>
export default {
  name: 'ErrorPrompt'
}
</script>