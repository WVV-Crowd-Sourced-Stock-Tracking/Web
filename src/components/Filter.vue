<template>
  <div id="filter-overlay">
    <form id="filters">
      <ul id="filter-list">
        <!-- <li>
          <label for="category-0">Brot</label>
          <input id="category-0" type="checkbox" name="0" />
        </li>
        <li>
          <label for="category-1">Zucker</label>
          <input id="category-1" type="checkbox" name="1" />
        </li>
        <li>
          <label for="category-2">Milch</label>
          <input id="category-2" type="checkbox" name="2" />
        </li>
        <li>
          <label for="category-3">Mehl</label>
          <input id="category-3" type="checkbox" name="3" />
        </li> -->
      </ul>

      <input
        id="done-button"
        type="button"
        value="Fertig"
        onclick="filter.apply();"
      />
    </form>
  </div>

  <!-- <select id="filters" oninput="alert(this.value)" multiple>
    <option value="0">Brot</option>
    <option value="1">Zucker</option>
    <option value="2">Milch</option>
    <option value="3">Mehl</option>
  </select> -->
</template>

<script>
export default {
  name: 'AppFilter',
  data() {
    return {
      overlay: this._filterDropdown,
      buttons: [],
      list: this._list,
      categories: ['Brot', 'Zucker','Milch', 'Mehl'],
      currentlySelected: []
    }
  },
  props: {
    _filterDropdown: Object,
    _form: Object,
    _list: Object
  },
  mounted() {
    this.overlay = this.$el.querySelector('#filter-overlay');
    this.list = this.$el.querySelector('#filter-list');
    this.init();
  },
  methods: {
    init() {
      this.categories.forEach((category, id) => {
        let li = document.createElement('li');
        let label = document.createElement('label');
        let checkbox = document.createElement('input');

        label.setAttribute('for', `category-${id}`);
        label.innerText = category;

        checkbox.id = `category-${id}`;
        checkbox.type = `checkbox`;
        checkbox.name = id;

        li.appendChild(label);
        li.appendChild(checkbox);

        this.buttons.push(checkbox);

        this.list.appendChild(li);
      })
    },

    showFilters() {
      this.overlay.classList.add('visible');
    },

    apply() {
      this.overlay.classList.remove('visible');

      this.currentlySelected = [];

      this.buttons.forEach((button, id)  => {
        if (button.checked) {
          this.currentlySelected.push(id);
        }
      })

      console.log('this.currentlySelected:', this.currentlySelected);
    }
  }
}
</script>
