const affichage = document.querySelector('.affichage');
const btns = document.querySelectorAll('button');
const inputs = document.querySelectorAll('input');
const infoTxt = document.querySelector('.info-txt');
let dejaFait = false;



const today = new Date();
const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000) 
let day = ('0' + nextWeek).slice(9,11);
let month = ('0' + (today.getMonth() + 1)).slice(-2);
let year = today.getFullYear();
document.querySelector('input[type=date').value =`${year}-${month}-${day}`;

btns.forEach(btn => {
    btn.addEventListener('click', btnAction);
})

function btnAction(e){

    let nvObj = {};
    inputs.forEach(input => {
        let attrName = input.getAttribute('name');
        let attrValeur = attrName !== "cookieExpire" ? input.value : input.valueAsDate;
        nvObj[attrName] = attrValeur;
    })
    // console.log(nvObj);
    let description = e.target.getAttribute('data-cookie');
     
    if (description === "creer"){
        creerCookie(nvObj.cookieName, nvObj.cookieValue, nvObj.cookieExpire);

    } else if (description === 'toutAfficher'){
        listeCookies();
        
    }

}
function creerCookie(name, value, exp){

    infoTxt.innerText = "";
    affichage.innerHTML = "";
    affichage.childNodes.forEach(child => {
        child.remove();
    })
    // si le cookie a le meme noms

    let cookies = document.cookie.split(';');
    cookies.forEach(cookie => {

        cookie = cookie.trim();
        // console.log(cookie);
        let formatCookie = cookie.split('=');
        console.log(formatCookie);
        if(formatCookie[0] === encodeURIComponent(name)){
            dejaFait = true;
        }
    })
    if(dejaFait){
        infoTxt.innerText = "un cookie possede deja ce nom";
        dejaFait = false;
        return;
    }

    //si le cookie n'a pas de mon
    if(name.length === 0){
        infoTxt.innerText = `Impossible de definir un cookie sans nom`;
        return;
    }
    document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)};expires=${exp.toUTCString()}`;

    let info = document.createElement('li');
    info.innerText = `Cookie ${name} créé.`;
    affichage.appendChild(info);
    setTimeout(() => {
        info.remove();
    }, 1500)
}
function listeCookies(){

    let cookies = document.cookie.split(';');

    if(cookies.join() === ""){
        infoTxt.innerText = 'Pas de cookies a afficher';
        return;
    }
    
    cookies.forEach(cookie => {
        cookie = cookie.trim();
        let formatCookie = cookie.split('=');
        // console.log(formatCookie);
        let item = document.createElement('li');

        infoTxt.innerText = "cliquer sur un cookie dans la liste pour le suprimer"
        item.innerText = `Nom : ${decodeURIComponent(formatCookie[0])}, Valeur : ${decodeURIComponent(formatCookie[1])}`;
        affichage.appendChild(item);

        item.addEventListener('click', () => {
            document.cookie = `${formatCookie[0]}=; expires=${new Date(0)}`;
            item.innerText = `Cookie ${formatCookie[0]} supprimé`;
            setTimeout(() => {
                item.remove()

            }, 1000);
        })
    })
}

