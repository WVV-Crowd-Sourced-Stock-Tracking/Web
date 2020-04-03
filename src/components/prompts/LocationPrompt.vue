<template>
  <div class="w-auto h-full mx-6 my-56 bg-white rounded-md shadow-md p-6 text-center text-gray-900 max-w-lg mx-auto">
      
    <div class="w-full font-bold mb-4">
      Wo bist du?
    </div>

    <img src="@/assets/icons/Pin.svg" alt="Pin" class="inline-block h-12 mb-4">

    <div>
      Um Supermärkte in deiner Nähe anzeigen zu können benötigt <span class="font-bold">WhatsLeft</span> deinen Standort
    </div>

    <div :class="'mt-2 font-bold transition-all duration-500 overflow-hidden ' + [help ? 'h-20' : 'h-0']">
      Bitte stelle sicher, dass du den GPS-Standort deines Gerätes aktiviert hast!
    </div>

    <button @click="help ? hideHelp() : showHelp();" class="underline text-md focus:outline-none">
      {{help ? 'Hilfe schließen' : 'Da klappt was nicht?'}}
    </button>

    <button @click="$emit('closed', true);" class="block w-full h-16 text-xl font-bold text-gray-100 rounded tracking-wide my-6" style="background-color: #006BAB;">
      Standort freigeben
    </button>

    <button @click="$emit('closed', false);" class="underline text-md">
      Jetzt nicht
    </button>
      
  </div>
</template>

<script>
export default {
  name: 'LocationPrompt',
  data() {
    return {
      help: false,
    }
  },
  methods: {
    showHelp() {
      this.help = true;
    },
    hideHelp() {
      this.help = false;
    }
  }
}
</script>
