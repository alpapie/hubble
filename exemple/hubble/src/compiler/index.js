const fs = require('fs');
const path = require('path');

console.log(__dirname)

const hublePath = __dirname+"/../pages";

function traiterDossier(hublePath, relativePath) {
    fs.readdirSync(hublePath).forEach((folder) => {
        const pathFolder = path.join(hublePath, folder);
        const stat = fs.statSync(pathFolder);

        if (stat.isDirectory()) {
            traiterDossier(pathFolder, relativePath + '/' + folder);
        } else if (folder.endsWith('.hubble')) {
            console.log(folder)
        }
    })
   
}
traiterDossier(hublePath,"")