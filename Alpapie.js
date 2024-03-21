window.Alpine = {
  init: false,

  cache: new Map(),

  data: {},

  rawData: {},

  constants: {
    removedElement: "_rmEl",
  },

  directives: {
    "x-text": (el, value) => {
      el.textContent = value;
    },
    "x-show": (el, value) => {
      el.style.display = value ? "block" : "none";
    },
    "x-if": (element, value) => {
      if (!value) {
        if (element instanceof HTMLElement) {
          if (!Alpine.cache.has(Alpine.constants.removedElement)) {
            Alpine.cache.set(
              Alpine.constants.removedElement,
              element.innerHTML.toString()
            );
          }

          element.innerHTML = "";
        }

        return;
      }

      if (element.innerHTML === "") {
        if (Alpine.cache.has(Alpine.constants.removedElement)) {
          element.innerHTML = Alpine.cache.get(
            Alpine.constants.removedElement
          );
        }
      }
    },
    "x-bind": (el, value) => {
      const attrName = el.getAttributeNames().find(name => name.startsWith("x-bind:") || name.startsWith(":"));
      const actualAttrName = attrName.startsWith(":") ? attrName.substring(1) : attrName.substring(7);
      el.setAttribute(actualAttrName, value);
    },
    "x-for": (el, value, self) => {
      if (!self.init) {
        // Get the data property name and array name
        const [item, array] = value.split(' in ');

        // Get the template content
        const template = el.innerHTML;

        // Clear innerHTML to prevent duplication
        el.innerHTML = '';

        // Render contents for each item in the array
        self.data[array].forEach((dataItem, index) => {
          // Create a new instance of the template
          const templateInstance = document.createElement('template');

          // Replace occurrences of the item name with the current data item
          const html = template.replace(new RegExp(item, 'g'), `${array}[${index}]`);

          // Set the innerHTML of the template instance
          templateInstance.innerHTML = html;

          // Append the content of the template instance to the element
          const content = templateInstance.content.cloneNode(true);

          // // Traverse the cloned content and apply x-text directive if present
          // content.querySelectorAll('[x-text]').forEach(textElement => {
          //   const textValue = textElement.getAttribute('x-text');
          //   textElement.textContent = eval(`this.${textValue}`);
          // });

          el.appendChild(content);
        });
      }
    },
    "x-model": (el, value, self) => {
      if (!self.init) {
        // Get the data property name
        const dataProperty = value;

        // Check if element type is supported (focus on common input types)
        if (!["input", "select", "textarea"].includes(el.tagName.toLowerCase())) {
          console.warn(`x-model is not supported on element type: ${el.tagName}`);
          return;
        }

        // Function to update element value from data property
        const updateElement = () => {
          el.value = self.data[dataProperty];
        };
        // Function to update data property from element value
        const updateData = () => {
          self.data[dataProperty] = el.value;
        };

        // Add event listener based on element type
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

        // Update element value initially based on data
        updateElement();
      }
    },
  },

  start() {
    this.root = document.querySelector("[x-data]");
    this.rawData = this.getInitialData();
    this.data = this.observe(this.rawData);

    this.refreshDom();
    this.registerListeners();
    this.init = true;
  },

  getInitialData() {
    const dataString = this.root.getAttribute("x-data");
    return eval(`(${dataString})`);
  },

  observe(rawData) {
    const self = this;
    return new Proxy(rawData, {
      set(target, key, value) {
        target[key] = value;
        self.refreshDom();
        self.root.setAttribute("x-data", JSON.stringify(rawData));
        return true;
      },
    });
  },

  look(data, property, callback) {
    if (!data || typeof data !== "object") {
      console.warn("observe called on non-object data:", data);
      return;
    }

    const handler = () => {
      callback();
    };

    // Use Proxy for more precise observation
    const observedData = new Proxy(data, {
      set(target, prop, value) {
        if (prop === property) {
          target[prop] = value;
          handler(); // Call callback for x-model updates
        } else {
          target[prop] = value;
          // Optionally, consider recursive observation for nested properties
          // if your use case requires it.
        }
        return true;
      },
    });

    // Return the observed data object
    return observedData;
  },

  refreshDom() {
    this.walkDom(this.root, (el) => {
      for (const attribute of el.attributes) {
        let { name, value } = attribute;
        if (name.startsWith('x-bind') || name.startsWith(':')) {
          this.directives['x-bind'](el, eval(`with (this.data) { ${value} }`))
          continue
        }
        if (!Object.keys(this.directives).includes(name)) continue;
        const directive = this.directives[name].bind(this);
        if (name.startsWith('x-model')) {
          directive(el, value, this);
        } else if (name.startsWith('x-for')) {
          directive(el, value, this);
        } else {
          directive(el, eval(`with (this.data) { ${value} }`));
        }
      }
    });
  },

  walkDom(el, callback) {
    callback(el);

    el = el.firstElementChild;

    while (el) {
      this.walkDom(el, callback);
      el = el.nextElementSibling;
    }
  },

  registerListeners() {
    this.walkDom(this.root, (el) => {
      this.addListenerToElement(el);
    });
  },

  addListenerToElement(el) {
    for (const attribute of el.attributes) {
      if (!attribute.name.startsWith("@")) return;

      const event = attribute.name.substring(1);

      el.addEventListener(event, () => {
        eval(`with(this.data) { ${attribute.value} }`);
      });
    }
  },
};
// hubble -> js (web-component)
// *.component.js + hubble.engine.js (handle directive + routing)


// windows load {
Alpine.start(); // directive
// routing
// }
