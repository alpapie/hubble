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
