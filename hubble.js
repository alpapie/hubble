window.hubble = {
    init: true,
    cache: [],
    directives: {
        'x-text': (el, value) => {
            el.innerText = value;
        },
        'x-if': (el, value) => {
            if (!value) {
                const displayValue = el.style.getPropertyValue('display');
                if (displayValue !== '') {
                    hubble.cache[el] = displayValue;
                }
                el.style.display = 'none';
                const nextSibling = el.nextElementSibling;
                if (hubble.cache[nextSibling]) nextSibling.style.display = hubble.cache[nextSibling]
                nextSibling.style.display = 'block';

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
                if (Object.keys(this.directives).includes(name)) {
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

window.hubble.start()
