window.hubble = {
  init: true,
  cache: [],
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
    'x-model': (el, value) => {
      if (el.value !== `${value}`) {
        el.value = value;
      }
      if (hubble.init) {
        const key = el.getAttribute('x-model');
        const updateData = (e) => {
          const inputValue = e.target.value;
          const dataType = typeof hubble.data[key];

          let parsedValue;

          switch (dataType) {
            case 'number':
              parsedValue = parseFloat(inputValue);
              break;
            case 'boolean':
              parsedValue = inputValue.toLowerCase() === 'true';
              break;
            default:
              parsedValue = inputValue;
              break;
          }

          hubble.data[key] = parsedValue;
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
      if (!value) {
        const displayValue = el.style.getPropertyValue('display');
        if (displayValue !== '') {
          hubble.cache[el] = displayValue;
        }
        el.style.display = 'none';
        const nextSibling = el.nextElementSibling;
        if (nextSibling.getAttribute('x-else') !== null) {
          if (hubble.cache[nextSibling]) nextSibling.style.display = hubble.cache[nextSibling]
          nextSibling.style.display = 'block';
        }
      } else {
        el.style.display = hubble.cache[el] || 'block';
        const nextSibling = el.nextElementSibling
        if (nextSibling.getAttribute('x-else') !== null) {
          const displayValue = nextSibling.style.getPropertyValue('display');
          if (displayValue !== '') {
            hubble.cache[nextSibling] = displayValue;
          }
          nextSibling.style.display = 'none';
        }
      }
    },
    'x-item-key': (el, value) => {
    },
    "x-for": (el, value) => {
      const [item, array] = value.split(' in ');
      let template;
      if (hubble.init) {
        template = el.innerHTML;
        el.setAttribute('x-temp', template);
      } else {
        template = el.getAttribute('x-temp');
      }

      el.innerHTML = '';

      hubble.data[array].forEach((dataItem, index) => {
        const templateInstance = document.createElement('template');

        const html = template.replace(new RegExp(item, 'g'), `${array}[${index}]`);

        templateInstance.innerHTML = html;

        const content = templateInstance.content.cloneNode(true);

        el.appendChild(content);
      });
    }
  },
  start() {
    this.root = document.querySelector('[x-data]');
    const dataString = this.root.getAttribute('x-data');
    this.data = new Proxy(eval(`(${dataString})`), {
      set: (target, key, value) => {
        target[key] = value;
        this.updateDOM()
        return true;
      }
    });
    this.updateDOM()
    this.init = false;
  },
  updateDOM() {
    this.walkDom(this.root, (el) => {
      for (const attr of el.attributes) {
        let { name, value } = attr;
        if (name.startsWith('x-bind') || name.startsWith(':')) {
          this.directives['x-bind'](el, eval(`with (this.data) { ${value} }`))
        } else if (name.startsWith('x-for')) {
          this.directives['x-for'](el, value)
        } else if (Object.keys(this.directives).some((k) => name.startsWith(k))) {
          this.directives[name](el, eval(`with (this.data) { ${value} }`))
        } else if (this.init && name.startsWith('@')) {
          const event = attr.name.substring(1);
          el.addEventListener(event, (e) => {
            eval(`with (this.data) { ${value} }`)
          })
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

const createRandomArray = (length, min, max) => Array.from({ length }, () => Math.floor(Math.random() * (max - min + 1)) + min);

window.hubble.start()
