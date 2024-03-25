
class CompletedAllslaslapage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
<div class="btn-group-vertical" role="group" aria-label="">
    <button type="button" class="btn btn-secondary">First One</button>
    <button type="button" class="btn btn-secondary">Second One</button>
    <div class="btn-group" role="group">
        <button
            id="dropdownId"
            type="button"
            class="btn btn-secondary dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
        >
            More
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownId">
            <a class="dropdown-item" href="#/">First Dropdown</a>
            <a class="dropdown-item" href="#">Second Dropdown</a>
        </div>
    </div>
</div>
        `;
        
    }
}
customElements.define('hub-completedallslaslapage', CompletedAllslaslapage);
    
class CompletedOnepage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
<div class="btn-group-vertical" role="group" aria-label="">
    <button type="button" class="btn btn-secondary">First One</button>
    <button type="button" class="btn btn-secondary">Second One</button>
    <div class="btn-group" role="group">
        <button
            id="dropdownId"
            type="button"
            class="btn btn-secondary dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
        >
            More
            sd
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownId">
            <a class="dropdown-item" href="#/">First Dropdown</a>
            <a class="dropdown-item" href="#/completed">Second Dropdown</a>
        </div>
    </div>
</div>
        `;
        
    }
}
customElements.define('hub-completedonepage', CompletedOnepage);
    
class Completedpage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
<div class="dropdown open">
    <button
        class="btn btn-secondary dropdown-toggle"
        type="button"
        id="triggerId"
        data-bs-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
    >
        Dropdown Button
    </button>
    <div class="dropdown-menu" aria-labelledby="triggerId">
        <button class="dropdown-item" href="#">Action</button>
        <button class="dropdown-item disabled" href="#">
            Disabled action
        </button>
    </div>
</div>
        `;
        
    }
}
customElements.define('hub-completedpage', Completedpage);
    
class page extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
<style>
    template,
    div {
        color: red
    }
</style>

<div>
    <h1>hubble is here</h1>
</div>
<a href="#/completed">completed</a>
<template x-data="{
    search: '',
    items: ['foo', 'bar', 'baz'],
}">
    <div>
        <h1>hubble is here</h1>
    </div>
    <input placeholder="Search...">

    <ul>
        <template x-for="item in items" :key="item">
            <Todo x-props="{item}" />
        </template>
    </ul>
</template>
        `;
        function Getdata(data) {
        return data
    }
    console.log(" je suis la");
    }
}
customElements.define('hub-page', page);
    
class todo extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
<template>
    <li x-text="props.item"></li>
</template>
        `;
        
    }
}
customElements.define('hub-todo', todo);
    

export default class Router extends HTMLElement {
    constructor() {
        super()

        /** @type {Route[]} */
        this.routes = [
        
                {
                    name: 'hub-completedallslaslapage',
                    hash: '/completed/allslasla',
                    regExp: new RegExp(/^#\/completed\/allslasla$/)
                }
                ,
                {
                    name: 'hub-completedonepage',
                    hash: '/completed/one',
                    regExp: new RegExp(/^#\/completed\/one$/)
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

    /**
     * route to the desired hash/domain
     *
     * @param {string} hash
     * @param {boolean} [replace = false]
     * @param {boolean} [isUrlEqual = true]
     * @return {Route}
     */
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

    /**
     * evaluates if a render is necessary
     *
     * @param {string} name
     * @param {boolean} [isUrlEqual = true]
     * @return {boolean}
     */
    shouldComponentRender(name, isUrlEqual = true) {
        if (!this.children || !this.children.length) return true
        return !isUrlEqual || this.children[0].tagName !== name.toUpperCase()
    }

    /**
     * renders the page
     *
     * @param {HTMLElement} component
     * @return {void}
     */
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
