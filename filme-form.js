const urlApi = "https://api-filmes.ctdscleoracy.click/";

async function uploadImagem(file) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('authkey', '1');

    const urlUpload = urlApi + 'uploadImagem';

    const response = await fetch(urlUpload, {
        method: 'post',
        body: formData 
    });

    if (!response.ok) {
        const erro = await response.json();
        throw new Error(erro.erro || 'Erro no upload da imagem');
    }

    const result = await response.json();
    return result.caminho;
}

document.getElementById("formFilme").addEventListener("submit", async function(e) {
    e.preventDefault();

    let capaCaminho = "";

    const file = document.getElementById("formFile").files[0];
    if(file){
        try {
        capaCaminho = await uploadImagem(file);    
        } catch (error) {
            alert("Erro ao fazer upload da imagem: " + error.message);
            return;
        }
        
    }
     
    const filme = {
        nome: document.getElementById("nome").value, 
        duracao: parseInt(document.getElementById("duracao").value),
        dataLancamento: document.getElementById("dataLancamento").value,
        classificacao: document.getElementById("classificacao").value,
        diretor: document.getElementById("diretor").value,
        linkTrailer: document.getElementById("linkTrailer").value,
        categoria: document.getElementById("categoria").value,
        capa_do_filme: capaCaminho,
        elenco: document.getElementById("elenco").value,
        sinopse: document.getElementById("Sinopse").value
     };
    
});