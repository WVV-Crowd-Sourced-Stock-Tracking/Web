<template>
  <div class="fixed flex flex-col justify-center w-screen h-screen z-10" style="background-color: rgba(0, 0, 0, 0.6);">

    <LocationPrompt
      v-on:closed="$emit('closed', $event);"
      v-if="type == 'location'"
    />

    <ThankYouPrompt
      v-on:closed="$emit('closed', $event);"
      v-else-if="type == 'thankyou'"
    />

    <ErrorPrompt
      v-on:closed="$emit('closed', $event);"
      v-else-if="type == 'error'"
    />
    
  </div>
</template>

<script>

import LocationPrompt from '@/components/prompts/LocationPrompt.vue';
import ThankYouPrompt from '@/components/prompts/ThankYouPrompt.vue';
import ErrorPrompt from '@/components/prompts/ErrorPrompt.vue';

export default {
  name: 'Prompt',
  components: {
    LocationPrompt,
    ThankYouPrompt,
    ErrorPrompt
  },
  props: {
    type: String,
  }
}
</script>
