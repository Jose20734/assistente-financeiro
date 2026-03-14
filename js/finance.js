let gastos = carregarDados("gastos") || []
let meta = parseFloat(localStorage.getItem("meta")) || 0

function salvarMeta(){

meta = parseFloat(document.getElementById("metaInput").value) || 0

localStorage.setItem("meta",meta)

atualizarSistema()

}

function adicionarGasto(){

if(!descricao.value || !valor.value){
alert("Preencha descrição e valor")
return
}

let valorTotal=parseFloat(valor.value)

let qtdParcelas=parseInt(parcelas.value) || 1

let valorParcela=valorTotal/qtdParcelas

for(let i=0;i<qtdParcelas;i++){

let dataParcela=new Date(data.value)

dataParcela.setMonth(dataParcela.getMonth()+i)

let gasto={

descricao:descricao.value,
valor:valorParcela,
categoria:categoria.value,
pessoa: pessoa.value || "Casa",
pagamento:pagamento.value,
cartao:cartao.value,
parcela:(i+1)+" / "+qtdParcelas,
local:local.value,
data:dataParcela.toISOString().split("T")[0]

}

gastos.push(gasto)

}

salvarDados("gastos",gastos)

descricao.value=""
valor.value=""
parcelas.value=1
local.value=""
data.value=""

atualizarSistema()

}

function totalGastos(){

return gastos.reduce((a,b)=>a + Number(b.valor),0)

}

function removerGasto(index){

gastos.splice(index,1)

salvarDados("gastos",gastos)

atualizarSistema()

}
