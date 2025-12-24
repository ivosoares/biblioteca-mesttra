async function carregarCategoriaSelect(){
    const response = await fetch('http://localhost:3000/categorias');
    const categorias = response.json();

    const select = document.getElementById('categoria');

    categorias.forEach(categoria => {
        const option = document.createElement('option');
        option.value = categoria.id;
        option.textContent = categoria.nomeCategoria;
        select.appendChild(option);
    });

}