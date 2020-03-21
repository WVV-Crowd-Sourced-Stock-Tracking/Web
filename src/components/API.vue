<template>
  <div></div>
</template>

<script>
export default {
  name: 'API',
  data() {
    return {
      baseUrl: this._baseUrl
    }
  },
  props: {
    _baseUrl: String
  },
  methods: {
    async loadMarkets(gpsLength, gpsWidth, radius) {
      let response, result;

      try {
        response = await fetch(this.baseUrl + `/market`, {
          method: 'POST',
          body: JSON.stringify({
            gps_length: gpsLength,
            gps_width: gpsWidth,
            radius: radius,
          })
        })
      } catch (err) {
        console.error(err);
        return `An error occured during the request!`;
      }

      try {
        result = await response.json();
      } catch (err) {
        console.error(`The server's response was invalid: ${err} `);
        return `The server's response was invalid!`;
      }

      return result;
    }
  }
}
</script>
