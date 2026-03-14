let lista = document.getElementById("lista")

function atualizarSistema(){

let total = totalGastos()

document.getElementById("totalGasto").innerText="R$ "+total.toFixed(2)

let restante=meta-total

if(restante<0) restante=0

document.getElementById("metaRestante").innerText="R$ "+restante.toFixed(2)

let progresso = meta ? (total/meta)*100 : 0

document.getElementById("metaProgress").style.width=progresso+"%"

document.getElementById("metaTexto").innerText="R$ "+total+" de R$ "+meta

listar()

gerarGraficos()

previsaoMensal()

let card=document.getElementById("previsaoCard")

if(card){
card.innerText=document.getElementById("previsaoMes").innerText.replace("Previsão de gastos do mês: ","")
}

calcularFaturas()

let totalFatura = gastos
.filter(g => g.cartao)
.reduce((total,g)=> total + Number(g.valor),0)

let faturaCard=document.getElementById("faturaTotal")

if(faturaCard){
faturaCard.innerText="R$ "+totalFatura.toFixed(2)
}

}

function listar(){

lista.innerHTML=""

gastos.forEach((g,i)=>{

lista.innerHTML+=`

<tr>

<td>${g.descricao}</td>
<td>R$ ${g.valor.toFixed(2)}</td>
<td>${g.categoria}</td>
<td>${g.pessoa}</td>
<td>${g.pagamento}</td>
<td>${g.cartao || "-"}</td>
<td>${g.parcela || "-"}</td>
<td>${g.data}</td>

<td>

<button onclick="removerGasto(${i})">X</button>

</td>

</tr>

`

})

}

function previsaoMensal(){

let hoje=new Date()

let diaAtual=hoje.getDate()

let total=totalGastos()

if(total==0) return

let mediaDiaria=total/diaAtual

let diasNoMes=new Date(
hoje.getFullYear(),
hoje.getMonth()+1,
0
).getDate()

let previsao=mediaDiaria*diasNoMes

let elemento=document.getElementById("previsaoMes")

if(elemento){

elemento.innerText="Previsão de gastos do mês: R$ "+previsao.toFixed(2)

}

}

function calcularFaturas(){

let faturas={}

gastos.forEach(g=>{

if(!g.cartao) return

faturas[g.cartao]=(faturas[g.cartao]||0)+g.valor

})

let html=""

for(let cartao in faturas){

html+=`

<div style="padding:10px;border-bottom:1px solid #ddd">

<strong>${cartao}</strong><br>

Total da fatura: R$ ${faturas[cartao].toFixed(2)}

</div>

`

}

let div = document.getElementById("faturasCartao")

if(div){
div.innerHTML = html
}

}

atualizarSistema()

async function gerarRelatorio(){

const { jsPDF } = window.jspdf

let doc = new jsPDF()

doc.setFontSize(18)
doc.text("Relatório Financeiro",20,20)

doc.setFontSize(12)

let y = 40

doc.text("Descrição | Valor | Categoria | Pessoa | Data",20,y)

y += 10

gastos.forEach(g => {

if(y > 270){
doc.addPage()
y = 20
}

doc.text(
`${g.descricao} | R$ ${Number(g.valor).toFixed(2)} | ${g.categoria} | ${g.pessoa} | ${g.data}`,
20,
y
)

y += 8

})

let total = totalGastos()

y += 10

doc.text("Total gasto: R$ "+total.toFixed(2),20,y)

doc.save("relatorio-financeiro.pdf")

}
