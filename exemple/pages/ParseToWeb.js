// const fs = require('fs');
const fs = require('fs').promises;
// import fs from "fs"
// import path from "path"
// // const path = require('path');

// console.log(path);
// console.log(fs);
// function extraireContenuHuble(filePath) {
//     const contenuFichier = fs.readFileSync(filePath, 'utf-8');

//     const matchTemplate = contenuFichier.match(/<template>([\s\S]*)<\/template>/);
//     const matchScript = contenuFichier.match(/<script>([\s\S]*)<\/script>/);

//     const contenuHTML = matchTemplate ? matchTemplate[1].trim() : '';
//     const codeJavaScript = matchScript ? matchScript[1].trim() : '';

//     return { contenuHTML, codeJavaScript };
// }


// const cheminFichierHuble = './todo.huble';


// const { contenuHTML, codeJavaScript } = extraireContenuHuble(cheminFichierHuble);

// console.log('Contenu HTML :', contenuHTML);
// console.log('Code JavaScript :', codeJavaScript);

async function lireFichier() {
    try {
        var reader = new FileReader();
       
        const handle = await window.showOpenFilePicker();
        const file = await handle[0].getFile();
        const contenu = await file.text();
        console.log(contenu);
    } catch (error) {
        console.error('Erreur de lecture du fichier :', error);
    }
}

lireFichier();
