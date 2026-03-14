function salvarDados(nome,dados){

localStorage.setItem(nome,JSON.stringify(dados))

}

function carregarDados(nome){

return JSON.parse(localStorage.getItem(nome))||[]

}
