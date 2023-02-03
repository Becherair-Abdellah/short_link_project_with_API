// start with java script code
// in this app we have a 6 function to make a short link 
// function one is to make ability to click at the bars and show menu bar
// some variable 
let shortin_it= document.querySelector('#shorten-it');
// run this web app
Main();
function Main(){
    menubar();
    enterlink();
}

function menubar(){
    let bar = document.querySelector('.bars');
    let nav = document.querySelector('nav');
    let imgbar = document.querySelector('.bars img');
    // when user click at bar add class 'visible' on div nav;
    bar.onclick = ()=>{
        nav.classList.toggle('visible');
        if(nav.classList.contains('visible')){
            imgbar.src = 'img/xmark-solid.svg';
            document.querySelector('html').style = `overflow: hidden;`
        }
        else
        {
            imgbar.src = 'img/bars.svg';
            if(!document.querySelector('.error')){
                document.querySelector('html').style = `overflow-x: hidden;`
            }
        }
    }
    
}
// function two is call enter link when user enter any like change style of input
function enterlink(){
    let input = document.querySelector('input');
    let divadd = document.querySelector(".add-links");
    let shortenIt = document.querySelector('#shorten-it');
    input.onclick = ()=>{divadd.classList.add("addlink")};
    // when user click at outside deivs remove class 'addlink'
    document.onclick = ()=>{
        if(event.target!==input && event.target!== shortin_it){
            divadd.classList.remove("addlink");
        }
    }
    // when user click at shorten it button call API and shorten th url
    shortenIt.onclick = ()=>{
        if(document.querySelector('.error')){
            document.querySelector('.error').remove();
        }
        console.log(input.value);
    getData(input.value);
    }

}
// function get data from API
async function getData(inputValue){
    let data;
    try{
        let request = await fetch(`https://api.shrtco.de/v2/shorten?url=${inputValue}`);
        data = await request.json();
        document.querySelector('.add-links input').value = '';
        creatDivshort(data.result.original_link,data.result.short_link);
        
    }catch{ 
        ERROR(data.error);
    }
}
// function create div short
function creatDivshort(longlink,shortlink){
    // create div copy-link
    let div = document.createElement('div');
    div.classList = 'copy-link';
    // create span one
    let spanlink = document.createElement('span');
    spanlink.classList = 'link';
    spanlinktext = document.createTextNode(longlink);
    spanlink.appendChild(spanlinktext);
    // create span two
    let spanshort = document.createElement('input');
    spanshort.type = 'text';
    spanshort.classList = 'short-link';
    spanshort.value = shortlink; 
    spanshort.readOnly = true;
    // create button
    let button = document.createElement('button');
    button.id = 'copy';
    let buttontext = document.createTextNode('copy');
    button.appendChild(buttontext);
    // append children
    div.appendChild(spanlink);
    div.appendChild(spanshort);
    div.appendChild(button);
    let linksdiv = document.querySelector('.links');
    linksdiv.appendChild(div);
    copytext(document.querySelector('.short-link'))
}
// function create div ERROR!
function ERROR(msg){
    let diverror =document.createElement('div');
    diverror.classList = 'error';
    let spanmessg = document.createElement('span');
    spanmessg.classList = 'message';
    let spantextmssg = document.createTextNode(msg);
    spanmessg.appendChild(spantextmssg);
    diverror.appendChild(spanmessg);
    let button = document.createElement('button');
    button.id = 'close';
    let img = document.createElement('img');
    img.src = 'img/xmark-solid.svg';
    button.appendChild(img);
    diverror.appendChild(button);
    document.body.appendChild(diverror);
    document.querySelector('html').style = 'overflow:hidden';
    button.onclick = ()=>{
        diverror.remove();
        if(!document.querySelector('nav').classList.contains('visible')){
            document.querySelector('html').style = 'overflow-x:hidden';
        }
    }
}
function copytext(input){
    document.querySelectorAll('#copy').forEach((divcopy)=>{
        divcopy.onclick = function(){
            // remove class copies from all button copy
            document.querySelectorAll('#copy').forEach((ele)=>{
                ele.classList.remove('copied')
            })
                document.querySelector(".add-links").classList.add("addlink");
            divcopy.classList.add('copied');
            divcopy.innerText = 'Copied!';
            divcopy.parentNode.children[1].select();
            document.execCommand("copy");
            document.getSelection().removeAllRanges();
            document.querySelector(".add-links").classList.add("addlink");
        
        }
        console.log(divcopy);
    });
}
