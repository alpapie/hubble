const fs = require('fs');
const path = require('path');
const { createRouting } = require('./router');

function extractHubbleContent(filePath) {
    const hubbleContent = fs.readFileSync(filePath, 'utf-8');

    const matchScript = hubbleContent.match(/<script>([\s\S]*)<\/script>/);
    const scriptContent = matchScript ? matchScript[1].trim() : '';

    // Extraire le reste (style et template)
    const contentWithoutScript = hubbleContent.replace(/<script>[\s\S]*<\/script>/, '');
    return { contentWithoutScript, scriptContent };
}

let allContent = '';
let addedComponents = new Set();
let routes = new Set()

function createAppFile(hubblePath, relativePath = "") {
    fs.readdirSync(hubblePath).forEach((folder) => {
        const pathFolder = path.join(hubblePath, folder);
        const stat = fs.statSync(pathFolder);

        if (stat.isDirectory()) {
            createAppFile(pathFolder, relativePath + '/' + folder);
        } else if (folder.endsWith('.hubble')) {
            const { contentWithoutScript, scriptContent } = extractHubbleContent(pathFolder);

            const componentName = relativePath.split("/").map((elem) => { return elem.charAt(0).toUpperCase() + elem.slice(1) }).join("") + path.basename(pathFolder, path.extname(pathFolder));
            if (folder.endsWith('page.hubble') && !addedComponents.has({ name: `hub-${componentName}`, hash: relativePath || "/" })) {
                routes.add({
                    name: `hub-${componentName.toLowerCase()}`,
                    hash: relativePath || "/"
                })
            }
            if (contentWithoutScript) {
                if (!addedComponents.has(componentName)) {
                    const componentContent = createComponent(componentName, contentWithoutScript, scriptContent);
                    allContent += componentContent;
                    addedComponents.add(componentName);
                }
            }
        }
    })
}

function FolderHubbleTraitement() {
    const hubblePath = __dirname + "/../../example/src/pages";
    addedComponents = new Set();
    routes = new Set()
    allContent = ''
    createAppFile(hubblePath, "");

    console.log(allContent, "route list" + new Date().toLocaleString());
    return allContent + createRouting([...routes]);
}

function createComponent(componentName = "", htmlContent, javaScriptCode) {
    const componentContent = `
class ${componentName} extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = \`
${htmlContent.trim()}
        \`;
        ${javaScriptCode}
    }
}
customElements.define('hub-${componentName.toLowerCase()}', ${componentName});
    `;
    return componentContent;
}

module.exports = { FolderHubbleTraitement }