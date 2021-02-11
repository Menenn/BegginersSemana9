function loadanimation(){
    var loadscreen = document.getElementById('loading')

    loadscreen.innerHTML = `
        <img src="https://img1.picmix.com/output/stamp/normal/8/5/2/9/509258_fb107.gif" alt="Loading">
    `

    setTimeout("unloadanimation()", 500);
}

function unloadanimation(){  
    var loadscreen = document.getElementById('loading')
    loadscreen.innerHTML = ``
}

var botaoclick = document.getElementById('botaopesquisar')
botaoclick.addEventListener("click", loadanimation);


function loadlivros(){
    const xhr = new XMLHttpRequest()

    var busca = document.getElementById('pesquisanome').value
    var tipo = document.getElementById('selector').value
    var conteudo = document.getElementById('conteudo')
    var resultadocont = document.getElementById('resultadocont')

    xhr.open("GET", `https://www.googleapis.com/books/v1/volumes?q=+${tipo}:${busca}&key=AIzaSyBjAgkaeJNrxudSp-uiuRSenekIZmq3g0k`)

    xhr.onreadystatechange = function (){
    if(xhr.status = 200 && xhr.readyState == 4){

        let dadosJSONText = xhr.responseText
        let info = JSON.parse(dadosJSONText)

        for (let i = 0; i <= info.items.length +5; i++){

            resultadocont.innerHTML =
                `
                <h1>Foram encontrados ${i} resultados</h1>
                `

            conteudo.innerHTML +=
            `
            <div class="div0" id="${[i]}">                   
                        <div class="div1"> 
                            <img src="${info.items[i].volumeInfo.imageLinks.thumbnail ?? "Sem imagem da Capa"}">
                                <div class="div2">
                                    <h2>${info.items[i].volumeInfo.title ?? "Nada encontrado"}</h2> 
                                    <p id="subt" class="ps">Subtitulo: 
                                    ${info.items[i].volumeInfo.subtitle ?? "Nada encontrado"}</p>
                                    <p class="ps">Categoria: 
                                    ${info.items[i].volumeInfo.categories ?? "Nada encontrado"}</p>
                                    <p id="autor" class="ps">Autor: 
                                    ${info.items[i].volumeInfo.authors ?? "Nada encontrado"}</p>
                                    <p id="date" class="ps">Data de Publicação: 
                                    ${info.items[i].volumeInfo.publishedDate ?? "Nada encontrado"}</p>
                                    <p id="desc" class="ps">Descrição: 
                                    ${info.items[i].volumeInfo.description ?? "Nada encontrado"}</p>
                                    <p id="desc" class="ps">Linguagem: 
                                    ${info.items[i].volumeInfo.language ?? "Nada encontrado"}</p>

                                <div class="links">
                                <a class="link" target="_blank" href="${info.items[i].volumeInfo.infoLink}">
                                Mais Informações
                                </a>
                                <a class="link" target="_blank" href="${info.items[i].saleInfo.buyLink}">
                                Link de Compra
                                </a>
                                <a id="apilivro" target="_blank" class="link" href="${info.items[i].selfLink}">
                                API do Livro
                                </a>
                                </div>
                             </div>
                        </div>
                    </div> 
            `
            }
        }
    }

    xhr.send();
    conteudo.innerHTML = ""
}