const fs = require('fs');
const path = require('path');

let { FolderHubbleTraitement } = require("./compiler/index.js")

function main(projectName) {
    try {
        let componentsContent = FolderHubbleTraitement()

        // TODO: Make the build folder relative to the project root
        let dirPath=__dirname + `/../${projectName}/build`
        if (!fs.existsSync(dirPath)){
            fs.mkdirSync(dirPath);
        }
        fs.writeFileSync(path.join(dirPath, "app.js"), componentsContent, { flag: "w" });
        fs.writeFileSync(path.join(dirPath, `index.html`), getIndexContent(__dirname + "/../example/index.html", ["/app.js"]));
        moveFolderWithContent(sourceDir, destinationDir)
    } catch (error) {
        throw new Error(error)
    }
}


function getIndexContent(filePath = "", jsPath = []) {
    try {
        const indexContent = fs.readFileSync(filePath, 'utf-8');
        let scriptTag = jsPath.map((elem) => {
            return `
            <script type="module" src="${elem}"></script>
            `
        })
        return indexContent.replace(" %hubble-route", "<hub-router></hub-router>").replace(" %hubble-file", scriptTag.join("\n"))
    } catch (error) {
        throw new Error(`error to fing index.html file: ${error}`)
    } 
}


function moveFolderWithContent(sourceDir, destinationDir) {
    try {

        if (!fs.existsSync(sourceDir)) {
            throw new Error(`The source folder ${sourceDir} does not exist.`);
        }

        if (!fs.existsSync(destinationDir)) {
            fs.mkdirSync(destinationDir, { recursive: true });
        }

        const files = fs.readdirSync(sourceDir);

        files.forEach(file => {
            const sourceFile = path.join(sourceDir, file);
            const destinationFile = path.join(destinationDir, file);
            const fileStat = fs.statSync(sourceFile);

            if (fileStat.isDirectory()) {
                moveFolderWithContent(sourceFile, destinationFile);
            } else {
                fs.copyFileSync(sourceFile, destinationFile);
            }
        });
    } catch (err) {
        console.error(`An error occurred while copying the folder: ${err}`);
        throw new Error(err);
    }
}

// Usage of the function
const sourceDir = __dirname + "/../example/static";
const destinationDir = __dirname + "/../example/build";

module.exports = { main };
