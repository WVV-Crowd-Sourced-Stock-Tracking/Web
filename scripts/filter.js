class Filter {

  constructor (filterDropdown, form, list) {

    this.overlay = filterDropdown;
    this.buttons = [];
    this.list = list;
    this.categories = ['Brot', 'Zucker','Milch', 'Mehl'];
    this.currentlySelected = [];

    this.init();

  }

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

    
  }

  showFilters() {

    this.overlay.classList.add('visible');

  }

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