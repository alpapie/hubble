const fs = require('fs');
const path = require('path');

function extraireContenuHuble(filePath) {
    const contenuFichier = fs.readFileSync(filePath, 'utf-8');

    const matchTemplate = contenuFichier.match(/<template>([\s\S]*)<\/template>/);
    const matchScript = contenuFichier.match(/<script>([\s\S]*)<\/script>/);

    const contenuHTML = matchTemplate ? matchTemplate[1].trim() : '';
    const codeJavaScript = matchScript ? matchScript[1].trim() : '';

    return { contenuHTML, codeJavaScript };
}

function FolderHubleTraitement(hublePath, relativePath) {
    fs.readdirSync(hublePath).forEach((folder) => {
        const pathFolder = path.join(hublePath, folder);
        const stat = fs.statSync(pathFolder);

        if (stat.isDirectory()) {
            FolderHubleTraitement(pathFolder, relativePath + '/' + folder);
        } else if (folder.endsWith('.hubble')) {
            console.log("path du fichier:",pathFolder)

            const { contenuHTML, codeJavaScript } = extraireContenuHuble(pathFolder);

            const componentName = path.basename(pathFolder, path.extname(pathFolder));
            console.log(componentName)
            const componentContent = `
            class ${componentName} extends HTMLElement {
                constructor() {
                    super();
                    this.attachShadow({ mode: 'open' });
                    this.shadowRoot.innerHTML = \`
                        ${contenuHTML}
                    \`;
                    ${codeJavaScript}
                }
            }

            customElements.define('${componentName}', ${componentName});
            `;
            fs.writeFileSync(path.join(__dirname+"/../../build", `${componentName}.js`), componentContent);

            console.log(`Le composant ${componentName} a été créé dans le dossier build.`);
            console.log('Contenu HTML de', folder, ':', contenuHTML);
            console.log('Code JavaScript de', folder, ':', codeJavaScript);
        }
    })
   
}

module.exports = { FolderHubleTraitement };