let graficoCat
let graficoPessoaChart
let graficoPagamentoChart
let graficoMesChart

function gerarGraficos(){

let categorias={}
let pessoas={}
let pagamentos={}
let meses={}

gastos.forEach(g=>{

categorias[g.categoria]=(categorias[g.categoria]||0)+g.valor

let pessoa = g.pessoa || "Não definido"

pessoas[pessoa]=(pessoas[pessoa]||0)+g.valor

pagamentos[g.pagamento]=(pagamentos[g.pagamento]||0)+g.valor

let mes=g.data ? g.data.substring(0,7) : "Sem data"
meses[mes]=(meses[mes]||0)+g.valor

})

if(graficoCat)graficoCat.destroy()

graficoCat=new Chart(graficoCategoria,{
type:"doughnut",
data:{
labels:Object.keys(categorias),
datasets:[{data:Object.values(categorias)}]
}
})


if(graficoPessoaChart)graficoPessoaChart.destroy()

graficoPessoaChart=new Chart(graficoPessoa,{
type:"bar",
data:{
labels:Object.keys(pessoas),
datasets:[{data:Object.values(pessoas)}]
}
})


if(graficoPagamentoChart)graficoPagamentoChart.destroy()

graficoPagamentoChart=new Chart(graficoPagamento,{
type:"pie",
data:{
labels:Object.keys(pagamentos),
datasets:[{data:Object.values(pagamentos)}]
}
})


if(graficoMesChart)graficoMesChart.destroy()

graficoMesChart=new Chart(graficoMes,{
type:"line",
data:{
labels:Object.keys(meses),
datasets:[{
label:"Gastos por mês",
data:Object.values(meses)
}]
}
})

}
