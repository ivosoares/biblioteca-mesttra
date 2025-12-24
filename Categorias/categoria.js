const tabelaCategoria = document.getElementById('tabelaCategoria');


async function criarCategoria(event) {
    // Remove a atualização da tela(submit)
    event.preventDefault();

    // pegando as informações passada no input
    const nomeCategoria = document.getElementById("nome-categoria").value;
    const descricaoCategoria = document.getElementById("descricao-categoria").value;


    // Enviando p/ a API
    const apiUrlCategoria = "http://localhost:3000/categorias";

    // Objeto que será enviado via API
    const categoria = {
        nomeCategoria,
        descricaoCategoria
    }

    // Estrutura de requisição [POST]
    const request = new Request(apiUrlCategoria,{
        method:'POST',
        body: JSON.stringify(categoria),
        headers: new Headers(
           { 'Content-Type': 'application/json' }
        )

    })

    const response = await fetch(request);
    
    if(response.ok){
        alert("Cadastrado com sucesso")
        window.location.href = './categorias.html'
        console.log("Chegou até aqui.")
    }

}

async function listarCategoria(){
    // usando o GET
    const response = await fetch('http://localhost:3000/categorias');
    const categorias = await response.json();
    console.log("[ESPIÃO]",categorias)

    categorias.forEach(function (categoria) {
        tabelaCategoria.insertAdjacentHTML('beforeend',
            `
             <tr>
                <td>${categoria.id}</td>
                <td>${categoria.nomeCategoria}</td>
                <td>${categoria.descricaoCategoria}</td>
                <td>
                    <button class="btn btn-sm btn-info text-white me-1">
                        <i class="bi bi-eye-fill"></i>
                    </button>
                    <a href="./edicao-categoria.html?id=${categoria.id}" class="btn btn-sm btn-warning text-white me-1">
                        <i class="bi bi-pencil-fill"></i>
                    </a>
                    <button class="btn btn-sm btn-danger" onclick="excluirCategoria('${categoria.id}')">
                        <i class="bi bi-trash-fill"></i>
                    </button>
                </td>
            </tr>
            `
        )
    });


}

listarCategoria();

async function excluirCategoria(id){
    const apiUrlCategoria = `http://localhost:3000/categorias/${id}`

    // estrutura de requisição o DELETE

    const request = new Request(apiUrlCategoria,{
        method:'DELETE'
    })
   
    if(confirm("Deseja Excluir está categoria")){
        const response = await fetch(request);
        const categoria = await response.json();

        tabelaCategoria.innerHTML = "";
        listarCategoria()
    }


}
