let urlParams = new URLSearchParams(document.location.search);
let idCategoria = urlParams.get('id');

async function  buscarCategoriaId() {
    const response = await fetch(`http://localhost:3000/categorias/${idCategoria}`);
    const categoria = await response.json();

    document.getElementById('nome-categoria').value = categoria.nomeCategoria;
    document.getElementById("descricao-categoria").value = categoria.descricaoCategoria;
}

async function editarCategoria(event){
    event.preventDefault();

    const nomeCategoria = document.getElementById("nome-categoria").value;
    const descricaoCategoria = document.getElementById("descricao-categoria").value;

    // enviando p/ o BD
    const apiUrlCategoria = `http://localhost:3000/categorias/${idCategoria}`;

    // Objeto que será enviado via API
    const categoria = {
        nomeCategoria,
        descricaoCategoria
    }

    // Estrutura de requisição [POST]
    const request = new Request(apiUrlCategoria,{
        method:'PATCH',
        body: JSON.stringify(categoria),
        headers: new Headers(
           { 'Content-Type': 'application/json' }
        )

    })

    const response = await fetch(request);
    
    if(response.ok){
        alert(`categoria ${categoria.nomeCategoria} editado com sucesso!`)
        window.location.href = './categorias.html'
        console.log("Chegou até aqui.")
    }
}

buscarCategoriaId()
