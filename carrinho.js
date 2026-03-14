let carrinho = JSON.parse(localStorage.getItem("carrinho")) || []

function salvar() {
    localStorage.setItem("carrinho", JSON.stringify(carrinho))
}

/* ================= PREÇO AO VIVO ================= */

function calcularPreco(precoBase){

let qtd = Number(document.getElementById("qtd").value)

let extrasValor = 0
document.querySelectorAll(".extra:checked").forEach(el=>{
extrasValor += Number(el.value)
})

let total = (precoBase + extrasValor) * qtd

let campo = document.getElementById("precoAtual")
if(campo){
campo.innerHTML = "Total: R$ " + total
}

}

/* ================= ADICIONAR ================= */

function adicionarProduto(nome, precoBase) {

    let qtd = Number(document.getElementById("qtd").value)

    // limite total
    let totalItensCarrinho = 0

    carrinho.forEach(item => {
        totalItensCarrinho += item.qtd
    })

    if (totalItensCarrinho + qtd > 5) {
        alert("🐰 Pedido pode ter no máximo 5 ovos no total!")
        return
    }


    let extrasValor = 0
    let extrasNome = []

    document.querySelectorAll(".extra:checked").forEach(el => {
        extrasValor += Number(el.value)
        extrasNome.push(el.dataset.nome)
    })

    let subtotal = (precoBase + extrasValor)

    carrinho.push({
        nome,
        qtd,
        extras: extrasNome,
        subtotal
    })

    salvar()
    renderCarrinho()
    atualizarContador()
    toggleCarrinho()
    animarCarrinho()
}

/* ================= ANIMAÇÃO ================= */

function animarCarrinho() {
    let btn = document.querySelector(".carrinho-btn")
    if (!btn) return
    btn.style.transform = "scale(1.25)"
    setTimeout(() => {
        btn.style.transform = "scale(1)"
    }, 250)
}

/* ================= CONTADOR ================= */

function atualizarContador() {
    let contador = document.getElementById("contador")
    if (!contador) return

    let total = 0
    carrinho.forEach(i => total += i.qtd)

    contador.innerHTML = total
}

/* ================= CARRINHO ================= */

function toggleCarrinho() {
    let painel = document.getElementById("painelCarrinho")

    if (painel.style.right == "0px") {
        painel.style.right = "-360px"
    } else {
        painel.style.right = "0px"
    }
}

function alterarQtd(index, val) {
    carrinho[index].qtd = Number(val)
    salvar()
    renderCarrinho()
    atualizarContador()
}

function removerItem(index) {
    carrinho.splice(index, 1)
    salvar()
    renderCarrinho()
    atualizarContador()
}

function limparCarrinho() {
    if (confirm("Limpar carrinho?")) {
        carrinho = []
        localStorage.removeItem("carrinho")
        renderCarrinho()
        atualizarContador()
    }
}

/* ================= RENDER ================= */

function renderCarrinho() {

    let lista = document.getElementById("lista")
    if (!lista) return

    lista.innerHTML = ""

    let totalGeral = 0

    carrinho.forEach((item, index) => {

        let totalItem = item.subtotal * item.qtd
        totalGeral += totalItem

        lista.innerHTML += `

<div style="border-bottom:1px solid #eee;padding:12px 0">

<strong>${item.nome}</strong><br>

Extras: ${item.extras.join(", ") || "Nenhum"}<br>

Qtd: <input type="number" min="1"
value="${item.qtd}"
onchange="alterarQtd(${index},this.value)"
style="width:55px">

<button onclick="removerItem(${index})"
style="background:#e74c3c;color:white;border:none;padding:5px 8px;border-radius:6px;margin-left:5px;">
X </button>

<br>
Subtotal: R$${totalItem}

</div>
`
    })

    document.getElementById("total").innerHTML =
        "<strong>Total: R$ " + totalGeral + "</strong>"

}

/* ================= FINALIZAR ================= */

function finalizar() {

    let nome = document.getElementById("clienteNome")?.value || ""
    let telefone = document.getElementById("clienteFone")?.value || ""
    let bairro = document.getElementById("clienteBairro")?.value || ""


    let msg = "Pedido Páscoa 🐰🍫%0A"

    let totalGeral = 0

    carrinho.forEach(item => {
        let totalItem = item.subtotal * item.qtd
        totalGeral += totalItem

        msg += `${item.nome}%0A`
        msg += `Qtd: ${item.qtd}%0A`
        msg += `Extras: ${item.extras.join(", ") || "Nenhum"}%0A`
        msg += `Valor: R$${totalItem}%0A%0A`
    })


    msg += `TOTAL FINAL: R$${totalGeral}%0A`

    msg += `%0ANome: ${nome}%0ABairro: ${bairro}`

    window.open("https://wa.me/5527999699243?text=" + msg)

}

function limitarQtd(){

let campo = document.getElementById("qtd")
if(!campo) return

let valor = Number(campo.value)

/* se estiver vazio */
if(campo.value === ""){
return
}

/* limite máximo */
if(valor > 5){
campo.value = 5
}

/* limite mínimo */
if(valor < 1){
campo.value = 1
}

}



renderCarrinho()
atualizarContador()
