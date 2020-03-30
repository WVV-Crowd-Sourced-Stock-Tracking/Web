<template>
  <div class="fixed flex flex-col justify-center w-screen h-screen z-10" style="background-color: rgba(0, 0, 0, 0.6);">

    <LocationPrompt
      v-if="type == 'location'"
    />
    
  </div>
</template>

<script>

import LocationPrompt from '@/components/prompts/LocationPrompt.vue';

export default {
  name: 'Prompt',
  components: {
    LocationPrompt,
  },
  props: {
    type: String,
  }
}
</script>
