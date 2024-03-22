
let {FolderHubleTraitement} =require("./compiler/index.js")
function main(){
    console.log(__dirname)
    const hublePath = __dirname+"/../../pages";
    FolderHubleTraitement(hublePath,"")
}

main()