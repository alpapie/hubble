
class Activepage extends HTMLElement {
    constructor() {
        super();
        //this.attachShadow({ mode: 'open' });
        this.props=this.getAttribute("x-prop")
        console.log(this.props)
        function Getdata(data) {
      return data;
    }
    }
    connectedCallback(){
        this.render()
    }
    render(){
        let content= `
        <section class="todoapp" id="root">
    <header class="header" data-testid="header">
      <h1>todos</h1>
      <div class="input-container">
        <input
          class="new-todo"
          id="todo-input"
          type="text"
          data-testid="text-input"
          placeholder="What needs to be done?"
          value=""
        />
      </div>
    </header>
    <main class="main" data-testid="main">
      <div class="toggle-all-container">
        <input
          class="toggle-all"
          type="checkbox"
          data-testid="toggle-all"
        /><label class="toggle-all-label" for="toggle-all"
          >Toggle All Input</label
        >
      </div>
      <ul class="todo-list" data-testid="todo-list">
          <hub-item>  <hub-item/>
      </ul>
    </main>
    <hub-footer></hub-footer>
  </section>
        `;
        
        this.innerHTML=content
    }
}
customElements.define('hub-activepage', Activepage);
    
class Completedpage extends HTMLElement {
    constructor() {
        super();
        //this.attachShadow({ mode: 'open' });
        this.props=this.getAttribute("x-prop")
        console.log(this.props)
        function Getdata(data) {
      return data;
    }
    }
    connectedCallback(){
        this.render()
    }
    render(){
        let content= `
        <section class="todoapp" id="root">
    <header class="header" data-testid="header">
      <h1>todos</h1>
      <div class="input-container">
        <input
          class="new-todo"
          id="todo-input"
          type="text"
          data-testid="text-input"
          placeholder="What needs to be done?"
          value=""
        />
      </div>
    </header>
    <main class="main" data-testid="main">
      <div class="toggle-all-container">
        <input
          class="toggle-all"
          type="checkbox"
          data-testid="toggle-all"
        /><label class="toggle-all-label" for="toggle-all"
          >Toggle All Input</label
        >
      </div>
      <ul class="todo-list" data-testid="todo-list">
        <hub-item>  <hub-item/>
      </ul>
    </main>
    <hub-footer></hub-footer>
  </section>
        `;
        
        this.innerHTML=content
    }
}
customElements.define('hub-completedpage', Completedpage);
    
class page extends HTMLElement {
    constructor() {
        super();
        //this.attachShadow({ mode: 'open' });
        this.props=this.getAttribute("x-prop")
        console.log(this.props)
        function Getdata(data) {
    return data;
  }
    }
    connectedCallback(){
        this.render()
    }
    render(){
        let content= `
        <section class="todoapp" id="root">
  <header class="header" data-testid="header">
    <h1>todos</h1>
    <div class="input-container">
      <input
        class="new-todo"
        id="todo-input"
        type="text"
        data-testid="text-input"
        placeholder="What needs to be done?"
        value=""
      />
    </div>
  </header>
  <main class="main" data-testid="main">
    <div class="toggle-all-container">
      <input class="toggle-all"
        type="checkbox"
        data-testid="toggle-all"
      /><label class="toggle-all-label" for="toggle-all"
        >Toggle All Input</label
      >
    </div>
    <ul class="todo-list" data-testid="todo-list">
        <hub-item>  <hub-item/>
    </ul>
  </main>
  <hub-footer></hub-footer>
</section>
        `;
        
        this.innerHTML=content
    }
}
customElements.define('hub-page', page);
    
class footer extends HTMLElement {
    constructor() {
        super();
        //this.attachShadow({ mode: 'open' });
        this.props=this.getAttribute("x-prop")
        console.log(this.props)
        
    }
    connectedCallback(){
        this.render()
    }
    render(){
        let content= `
        <footer class="footer" data-testid="footer">
    <span class="todo-count">1 item left!</span>
    <ul class="filters" data-testid="footer-navigation">
      <li><a class="selected" href="#/">All</a></li>
      <li><a class="" href="#/active">Active</a></li>
      <li><a class="" href="#/completed">Completed</a></li>
    </ul>
    <button class="clear-completed" disabled="">Clear completed</button>
  </footer>
        `;
        
        this.innerHTML=content
    }
}
customElements.define('hub-footer', footer);
    
class item extends HTMLElement {
    constructor() {
        super();
        //this.attachShadow({ mode: 'open' });
        this.props=this.getAttribute("x-prop")
        console.log(this.props)
        
    }
    connectedCallback(){
        this.render()
    }
    render(){
        let content= `
        <div x-data="{
  data:'new item'
}">

    <li class="" data-testid="todo-item">
      <div class="view">
        <input class="toggle" type="checkbox" data-testid="todo-item-toggle" />
        <label data-testid="todo-item-label" x-text="data"> </label>
        <button class="destroy" data-testid="todo-item-button"></button>
      </div>
    </li>

</div>
        `;
        
        this.innerHTML=content
    }
}
customElements.define('hub-item', item);
    
class todo extends HTMLElement {
    constructor() {
        super();
        //this.attachShadow({ mode: 'open' });
        this.props=this.getAttribute("x-prop")
        console.log(this.props)
        
    }
    connectedCallback(){
        this.render()
    }
    render(){
        let content= `
        <template x-data="{
    count: 1,
   props
}">

</template>
<span x-text="props"></span>
<li class="" data-testid="todo-item">
    <div class="view">
        <input
        class="toggle"
        type="checkbox"
        data-testid="todo-item-toggle"
        /><label data-testid="todo-item-label">label alpapie</label
        ><button class="destroy" data-testid="todo-item-button"></button>
    </div>
</li>
        `;
        
        this.innerHTML=content
    }
}
customElements.define('hub-todo', todo);
    

export default class Router extends HTMLElement {
    constructor() {
        super()

        this.routes = [
        
        {
            name: 'hub-activepage',
            hash: '/active',
            regExp: new RegExp(/^#\/active$/)
        }
                ,
        {
            name: 'hub-completedpage',
            hash: '/completed',
            regExp: new RegExp(/^#\/completed$/)
        }
                ,
        {
            name: 'hub-page',
            hash: '/',
            regExp: new RegExp(/^#\/$/)
        }
                
            // 404 Page not found
            ,{
                name: 'Hub-404',
                hash:'#/404',
                regExp: new RegExp(/^#\/404$/)
            },
        ]

        this.previousRoute = this.routes[0]

        /**
         * Listens to hash changes and forwards the new hash to route
         */
        this.hashChangeListener = event => {
            this.previousRoute = this.route(location.hash, false, event.newURL === event.oldURL)
        }
    }

    connectedCallback() {
        self.addEventListener('hashchange', this.hashChangeListener)
        this.previousRoute = this.route(this.routes.some(route => route.regExp.test(location.hash)) ? location.hash : '#/', true)
    }

    disconnectedCallback() {
        self.removeEventListener('hashchange', this.hashChangeListener)
    }

    route(hash, replace = false, isUrlEqual = true) {
        // escape on route call which is not set by hashchange event and trigger it here, if needed
        if (location.hash !== hash) {
            if (replace) location.replace(hash);
            return this.previousRoute
        }

        let route
        // find the correct route or do nothing
        if ((route = this.routes.find(route => route.regExp.test(hash)))) {
                if (this.shouldComponentRender(route.name, isUrlEqual)) {
                    // document.title = route.title
                    let component= document.createElement(route.name)
                    this.render(component)
                }
        } else {
            console.log("Not Found");
            self.location.hash = '#/404'
        }

        return route ? route : this.previousRoute
    }


    shouldComponentRender(name, isUrlEqual = true) {
        if (!this.children || !this.children.length) return true
        return !isUrlEqual || this.children[0].tagName !== name.toUpperCase()
    }

  
    render(component) {
        // clear previous content
        this.innerHTML = ''
        this.appendChild(component)
    }
}
customElements.define('hub-router', Router);

window.hubble = {
  init: true,
  cache: [],
  data: [],
  directives: {
    'x-text': (el, value) => {
      if (el.innerText !== `${value}`) {
        el.innerText = value;
      }
    },
    'x-bind': (el, value) => {
      const attrName = el.getAttributeNames().find(name => name.startsWith("x-bind:") || name.startsWith(":"));
      const actualAttrName = attrName.startsWith(":") ? attrName.substring(1) : attrName.substring(7);
      el.setAttribute(actualAttrName, value);
    },
    'x-model': (el, value, uuid) => {
      const key = el.getAttribute('x-model');
      if (el.type === 'checkbox') {
        el.checked = !!value;
      } else if (el.type === 'radio') {
        el.checked = (value === el.value);
      } else {
        if (el.value !== value) {
          el.value = value;
        }
      }

      if (hubble.init) {
        const updateData = (e) => {
          let newValue;
          if (el.type === 'checkbox') {
            newValue = el.checked;
          } else if (el.type === 'radio') {
            if (el.checked) {
              newValue = el.value;
            } else {
              return;
            }
          } else {
            newValue = e.target.value;
          }

          let parsedValue = typeof hubble.data[uuid][key] === 'number' ? parseFloat(newValue) : newValue;

          hubble.data[uuid][key] = parsedValue;
        };

        switch (el.tagName.toLowerCase()) {
          case "input":
            if (el.type === "checkbox" || el.type === "radio") {
              el.addEventListener("change", updateData);
            } else {
              el.addEventListener("input", updateData);
            }
            break;
          case "select":
          case "textarea":
            el.addEventListener("input", updateData);
            break;
        }
      }
    },
    'x-if': (el, value) => {
      const nextSibling = el.nextElementSibling;
      if (hubble.init) {
        const displayValue = el.style.getPropertyValue('display');
        if (displayValue !== '') {
          hubble.cache[el] = displayValue;
        }
      }
      if (!value) {
        el.style.display = 'none';
        if (nextSibling && nextSibling.getAttribute('x-else') !== null) {
          nextSibling.style.display = hubble.cache[nextSibling] || 'block';
        }
      } else {
        el.style.display = hubble.cache[el] || 'block';
        if (nextSibling && nextSibling.getAttribute('x-else') !== null) {
          if (hubble.init) {
            const displayValue = nextSibling.style.getPropertyValue('display');
            if (displayValue !== '') {
              hubble.cache[nextSibling] = displayValue;
            }
          }
          nextSibling.style.display = 'none';
        }
      }
    },
    'x-item-key': (el, value) => {
    },
    "x-for": (el, value, uuid) => {
      const [item, array] = value.split(' in ');
      let template;
      if (hubble.init) {
        template = el.innerHTML;
        el.setAttribute('x-temp', template);
      } else {
        template = el.getAttribute('x-temp');
      }

      el.innerHTML = '';

      hubble.data[uuid][array].forEach((_, index) => {
        const templateInstance = document.createElement('template');
        const html = template.replace(new RegExp(item, 'g'), `${array}[${index}]`);
        templateInstance.innerHTML = html;
        const content = templateInstance.content.cloneNode(true);
        el.appendChild(content);
      });
    }
  },
  start() {
    const dataElements = document.querySelectorAll('[x-data]');
    console.log(dataElements);
    dataElements.forEach((element) => {
      const dataString = element.getAttribute('x-data');
      const dataObject = eval(`(${dataString})`);
      this.initializeComponent(element, dataObject);
    });
    this.init = false;
  },
  initializeComponent(container, data) {
    const uuid = createUUID();
    const proxyData = new Proxy(({ ...data, uuid }), {
      set: (target, key, value) => {
        target[key] = value;
        hubble.updateDOM(container, target.uuid);
        return true;
      }
    });
    hubble.data[uuid] = proxyData;
    this.updateDOM(container, uuid);
  },
  updateDOM(container, uuid) {
    this.walkDom(container, (el) => {
      for (const attr of el.attributes) {
        let { name, value } = attr;
        if (name.startsWith('x-bind') || name.startsWith(':')) {
          this.directives['x-bind'](el, eval(`with (hubble.data[uuid]) { ${value} }`), uuid)
        } else if (name.startsWith('x-for')) {
          this.directives['x-for'](el, value, uuid)
        } else if (Object.keys(this.directives).some((k) => name.startsWith(k))) {
          this.directives[name](el, eval(`with (hubble.data[uuid]) { ${value} }`), uuid)
        } else if (this.init && name.startsWith('@')) {
          const keyEventMatch = name.match(/^@(keydown|keyup)(\.[a-zA-Z]+)*$/);
          if (keyEventMatch) {
            const modifiers = keyEventMatch[2] ? keyEventMatch[2].split('.').slice(1) : [];
            const event = keyEventMatch[1];

            el.addEventListener(event, (e) => {
              const isKeyPressed = modifiers.every(modifier => e.key === `${modifier.charAt(0).toUpperCase() + modifier.slice(1).toLowerCase()}`);

              if (isKeyPressed) {
                eval(`with (hubble.data[uuid]) { ${el.getAttribute(name)} }`);
              }
            });
          } else {
            const event = name.substring(1);
            el.addEventListener(event, (e) => {
              eval(`with (hubble.data[uuid]) { ${value} }`)
            })
          }
        }
      }
    })
  },
  walkDom(el, callback) {
    callback(el);

    el = el.firstElementChild;

    while (el) {
      this.walkDom(el, callback);
      el = el.nextElementSibling;
    }
  },
}

const createUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

window.hubble.start()
