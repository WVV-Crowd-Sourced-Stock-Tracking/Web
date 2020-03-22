


<script>
export default {
  name: 'Market',
  data() {
    return {
      id: this._id,
      name: this._name,
      city: this._city,
      street: this._street,
      gpsLength: this._gpsLength,
      gpsWidth: this._gpsWidth
    }
  },
  props: {
    _id: String,
    _name: String,
    _city: String,
    _street: String,
    _gpsLength: Number,
    _gpsWidth: Number
  },
  methods: {
    getHeader() {
      return `${this.name} (${this.city})`;
    },

    getBody() {
    }
  }
}
</script>
