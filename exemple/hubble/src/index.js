const fs = require('fs');
const path = require('path');

let {FolderHubleTraitement} =require("./compiler/index.js")
function main(){

    let componentsContent=  FolderHubleTraitement()
    // console.log(componentsContent)
    fs.writeFileSync(path.join(__dirname+"/../build", `app.js`), componentsContent);
    fs.writeFileSync(path.join(__dirname+"/../build", `index.html`), indexContent);

}

module.exports = { main };

let indexContent=`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div class="hubble">
    <hub-route></hub-route>
    <hub-page></hub-page>
    alpapie
    </div>
  <script type="module" src="/app.js"></script>
</body>
</html>
`