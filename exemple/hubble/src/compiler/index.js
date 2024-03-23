const fs = require('fs');
const path = require('path');

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

function createAppFile(hubblePath, relativePath) {
    fs.readdirSync(hubblePath).forEach((folder) => {
        const pathFolder = path.join(hubblePath, folder);
        const stat = fs.statSync(pathFolder);

        if (stat.isDirectory()) {
            createAppFile(pathFolder, relativePath + '/' + folder);
        } else if (folder.endsWith('.hubble')) {
            const { contentWithoutScript, scriptContent } = extractHubbleContent(pathFolder);
            if (contentWithoutScript) {
                const componentName = path.basename(pathFolder, path.extname(pathFolder));
                if (!addedComponents.has(componentName)) {
                    const componentContent = createComponent(componentName, contentWithoutScript, scriptContent);
                    allContent += componentContent;
                    addedComponents.add(componentName);
                }
            }
        }
    })
}

function FolderHubleTraitement() {
    const hubblePath = "./../src/pages";
    createAppFile(hubblePath, "");
    return allContent;
}

function createComponent(componentName, htmlContent, javaScriptCode) {
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
customElements.define('hub-${componentName}', ${componentName});
    `;
    return componentContent;
}

module.exports={FolderHubleTraitement}