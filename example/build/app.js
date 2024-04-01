
class page extends HTMLElement {
    constructor() {
        super();
        //this.attachShadow({ mode: 'open' });
        this.props=this.getAttribute("x-props")
        console.log(typeof this.props+' page')
        
    }
    connectedCallback(){
        this.render()
    }
    render(){
        let content= `
        <section class="todoapp" id="root">
  <div x-data="{
    list:   [{name:' Task 1', complete:false}, {name:'Task 2', complete:true}, {name:'Task 3', complete:false}] ,
    input:'',
    filter:'all'
  }">
    <header class="header" data-testid="header">
      <h1>todos</h1>
      <div class="input-container">
        <input class="new-todo" id="todo-input" type="text" data-testid="text-input"
          placeholder="What needs to be done?" value="" x-model="$input" @keyup.enter="
          if ($input.trim()) {
            $list =[...$list,{
              name:$input,
              complete: false
            }]
            $input=''
          }
          document.getElementById('todo-input').value=''
          " />
      </div>
    </header>
    <main class="main" >
      <div class="toggle-all-container"  @click="$list = $list.map(todo => ({...todo, complete: true}))">
        <input class="toggle-all" type="checkbox"  /><label class="toggle-all-label"
          for="toggle-all">Toggle All Input </label>
      </div>
      <ul x-for="todo, index in $list" class="todo-list" >
            <div class="">
              <li :class="todo.complete" x-if=" $filter === 'all' || ($filter === 'completed' && todo.complete) || ($filter === 'active' &&  !todo.complete)">
                <div class="view-index" @dblclick="
                  document.querySelector('.view-index').style.display='none'
                  document.querySelector('.input-container-index').style.display='block'
                  // $edit=todo.name
                ">
                  <input class="toggle" type="checkbox" :checked="todo.complete" @click="$list = [...$list.map((v, i) => index === i ? ({...v, complete: !v.complete}) : v)]" />
                  <label  x-text="todo.name"> </label>
                  <button class="destroy" @click="$list = [ ...$list.filter((task, j) => j !== index)]" id=""></button>
                </div>
              </li>
              <div class="input-container-index inputToedit" style="display: none;">
                <input type="text" :value="todo.name" class="edit" @keyup.enter="
                  if (document.querySelector('.input-container-index > input').value.trim()) {
                    $list =[...$list.map((v, i) => index === i ? ({...v, name: document.querySelector('.input-container-index > input').value}) : v)]
                  }
                  document.querySelector('.view-index').style.display='block'
                  document.querySelector('.input-container-index').style.display='none'
                "  />
              </div>
            </div>
        </ul>
    </main>
    <footer class="footer" data-testid="footer" x-if="$list.length > 0">
      <span class="todo-count" x-text="$list.filter(todo => !todo.complete).length + ' item left!'"></span>
      <ul class="filters" data-testid="footer-navigation">
        <li><a :class="" href="#/" @click="$filter='all'" >All</a></li>
        <li><a :class="" href="#/active" @click="$filter='active'">Active</a></li>
        <li><a :class="" href="#/completed" @click="$filter='completed'">Completed</a></li>
      </ul>
      <button class="clear-completed" @click="
        $list=[ ...$list.filter((task) => task.complete !==true )]
      ">Clear completed</button>
    </footer>
  </div>
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
        this.props=this.getAttribute("x-props")
        console.log(typeof this.props+' footer')
        
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
        this.props=this.getAttribute("x-props")
        console.log(typeof this.props+' item')
        
    }
    connectedCallback(){
        this.render()
    }
    render(){
        let content= `
        <div>
    <li class=""  >
      <div class="view key">
        <input class="toggle" type="checkbox"  />
        <label  x-text="todo"> </label>
        <button class="destroy" id=""></button>
      </div>
    </li>
    <div class="input-container">
      <input value='' id="edit-todo-input" class="edit"  />
    </div>
</div>
        `;
        
        this.innerHTML=content
    }
}
customElements.define('hub-item', item);
    

export default class Router extends HTMLElement {
    constructor() {
        super()

        this.routes = [
        
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
        // this.hashChangeListener = event => {
        //     this.previousRoute = this.route(location.hash, false, event.newURL === event.oldURL)
        // }
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
      if (actualAttrName === 'checked') {
        if (value) el.setAttribute(actualAttrName, "");
      } else {
        el.setAttribute(actualAttrName, value);
      }
    },
    'x-model': (el, value, uuid) => {
      const key = el.getAttribute('x-model').replaceAll('$', '');
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

      if (!value) {
        el.setAttribute("style", "display: none !important");;
        if (nextSibling && nextSibling.getAttribute('x-else') !== null) {
          nextSibling.removeAttribute("style");
        }
      } else {
        el.removeAttribute("style");
        if (nextSibling && nextSibling.getAttribute('x-else') !== null) {
          nextSibling.setAttribute("style", "display: none !important");;
        }
      }
    },
    "x-for": (el, value, uuid, key) => {
      let [item, array] = value.split(' in ');
      if (key === "$" && hubble.init) key = array
      if (key !== array) return false;

      let template;
      if (hubble.init) {
        template = el.innerHTML;
        el.setAttribute('x-temp', template);
      } else {
        template = el.getAttribute('x-temp');
      }

      const withIndex = item.split(', ');
      if (withIndex.length === 2) {
        item = item.split(', ')[0];
      }

      el.innerHTML = '';

      const _array = array.replaceAll('$', '');
      hubble.data[uuid][_array].forEach((_, index) => {
        const templateInstance = document.createElement('template');
        let html = template.replaceAll(new RegExp(item, 'g'), `${array}[${index}]`);
        if (withIndex.length === 2) {
          html = html.replaceAll(new RegExp(withIndex[1], 'g'), `${index}`);
        }
        templateInstance.innerHTML = html;
        const content = templateInstance.content.cloneNode(true);
        el.appendChild(content);
      });

      return true;
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
        hubble.updateDOM(container, target.uuid, '$' + key);
        return true;
      }
    });
    hubble.data[uuid] = proxyData;
    this.updateDOM(container, uuid);
  },
  updateDOM(container, uuid, key = "$") {
    let shouldRemountEvent = false;
    this.walkDom(container, (el) => {
      for (const attr of el.attributes) {
        let { name, value } = attr;
        if (name.startsWith('x-bind') || name.startsWith(':')) {
          const _value = value.replaceAll('$', 'hubble.data[uuid].')
          this.directives['x-bind'](el, eval(_value), uuid)
        } else if (name.startsWith('x-for')) {
          shouldRemountEvent = this.directives['x-for'](el, value, uuid, key)
        } else if (Object.keys(this.directives).some((k) => name.startsWith(k))) {
          const _value = value.replaceAll('$', 'hubble.data[uuid].')
          this.directives[name](el, eval(_value), uuid)
        } else if ((this.init || shouldRemountEvent) && name.startsWith('@')) {
          const keyEventMatch = name.match(/^@(keydown|keyup)(\.[a-zA-Z]+)*$/);
          if (keyEventMatch) {
            const modifiers = keyEventMatch[2] ? keyEventMatch[2].split('.').slice(1) : [];
            const event = keyEventMatch[1];

            el.addEventListener(event, (e) => {
              const isKeyPressed = modifiers.every(modifier => e.key === `${modifier.charAt(0).toUpperCase() + modifier.slice(1).toLowerCase()}`);

              if (isKeyPressed) {
                const _value = el.getAttribute(name).replaceAll('$', 'hubble.data[uuid].')
                eval(_value);
              }
            });
          } else {
            const event = name.substring(1);
            const _value = value.replaceAll('$', 'hubble.data[uuid].')
            el.addEventListener(event, (e) => {
              eval(_value)
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
