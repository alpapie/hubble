const fs = require('fs');
const path = require('path');
const { createRouting } = require('./router');

function extractHubbleContent(filePath) {
    try {
        const hubbleContent = fs.readFileSync(filePath, 'utf-8');
    
        const matchScript = hubbleContent.match(/<script>([\s\S]*)<\/script>/);
        const scriptContent = matchScript ? matchScript[1].trim() : '';
    
        // Extraire le reste (style et template)
        const contentWithoutScript = hubbleContent.replace(/<script>[\s\S]*<\/script>/, '');
        return { contentWithoutScript, scriptContent };
    } catch (error) {
        throw new Error(`error in parsing file ${error}`)
    }
}

let allContent = '';
let addedComponents = new Set();
let routes = new Set()

function createAppFile(hubblePath, relativePath = "") {
    try {
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
                    if (contentWithoutScript) {
                        if (!addedComponents.has(componentName)) {
                            const componentContent = createComponent(componentName, contentWithoutScript, scriptContent);
                            allContent += componentContent;
                            addedComponents.add(componentName);
                        }
                    }
                }else{
                    throw new Error("Only page.hubble files are allowed")
                }
            }
        })
    } catch (error) {
        throw new Error(`error in parsing page.hubble file ${error}`)
    }
}

function FolderHubbleTraitement() {
    const hubblePath = __dirname + "/../../example/src/pages";
    const widgetsPath = __dirname + "/../../example/src/widgets";
    addedComponents = new Set();
    routes = new Set()
    allContent = ''

    try {
        createAppFile(hubblePath, "");
        let routeComponnent=createRouting([...routes])
        let witgetComponnent=widgetComponnent(widgetsPath)
        // console.log(allContent, "route list" + new Date().toLocaleString());
        return allContent+ witgetComponnent+ routeComponnent +addRuntimeCode();
        
    } catch (error) {
        throw new Error(error)
    }
}

function addRuntimeCode() {
    const runtimeCode = fs.readFileSync(__dirname + "/../runtime/index.js", 'utf-8');
    return runtimeCode;
}
function createComponent(componentName = "", htmlContent, javaScriptCode) {
    const regex = /x-data="({[^}]*})"/;
    const match = htmlContent.match(regex);
    if (match) {
        let xData = match[1]; 
        // console.log("matched ",xData)
        xData= xData.replace("props",'props:${this.props}')
        htmlContent= htmlContent.replace(regex,xData)
    }
    const componentContent = `
class ${componentName} extends HTMLElement {
    constructor() {
        super();
        //this.attachShadow({ mode: 'open' });
        this.props=this.getAttribute("x-prop")
        console.log(this.props)
        ${javaScriptCode}
    }
    connectedCallback(){
        this.render()
    }
    render(){
        let content= \`
        ${htmlContent.trim()}
        \`;
        
        this.innerHTML=content
    }
}
customElements.define('hub-${componentName.toLowerCase()}', ${componentName});
    `;
    return componentContent;
}

function widgetComponnent(widgetPath){
    try {
        let wigetcontent=""
        fs.readdirSync(widgetPath).forEach((folder) => {
            const pathFolder = path.join(widgetPath, folder);
            const stat = fs.statSync(pathFolder);
    
            if (stat.isDirectory()) {
                throw new Error("sub directory not allowed")
            }
            if (folder.endsWith('.hubble')) {
                const { contentWithoutScript, scriptContent } = extractHubbleContent(pathFolder);
                const componentName = path.basename(pathFolder, path.extname(pathFolder)).toLowerCase();
                if (folder.endsWith('page.hubble')) {
                    throw new Error("page.hubble files not allowed")
                }
                if (contentWithoutScript) {
                    const componentContent = createComponent(componentName, contentWithoutScript, scriptContent);
                    wigetcontent+= componentContent;
                }
            }
        })
        return wigetcontent
    } catch (error) {
        throw new Error(`error in parsing widgets file ${error}`)
    }
}


module.exports = { FolderHubbleTraitement }