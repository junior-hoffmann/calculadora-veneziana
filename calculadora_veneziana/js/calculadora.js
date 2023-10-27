let btnCalcular = document.getElementById("btn-calcular")
let inputAltura = document.getElementById("form-altura")
let inputLargura = document.getElementById("form-largura")
let sectionRespostas = document.getElementById("calculos")

btnCalcular.addEventListener("click", (event) => {
    {
        event.preventDefault()
        let calculos = calcular(inputAltura.value, inputLargura.value)
        sectionRespostas.innerHTML = `<p>
        Quantidade de Venezianas: ${calculos.quantidadeDeVenezianas} <br>
        
        Quantidade de barras: ${calculos.numeroDeBarras} <br>
        
        Quantidade por barra: ${calculos.quantidadePorBarras} <br>
        
        Divisão dos riscos: 
        <ol>
        `
        
        for (let i = 0; i < calculos.arrayDeRiscos.length; i++) {
            sectionRespostas.innerHTML += `<li>${calculos.arrayDeRiscos[i]}</li>`;
        }
        
        sectionRespostas.innerHTML += `</ol>
        </p>
        `
        


        // sectionRespostas.innerHTML =`<p>
        // Quantidade de Venezianas: ${calculos.quantidadeDeVenezianas} <br>

        // Quantidade de barras: ${calculos.numeroDeBarras} <br>

        // Quantidade por barra: ${calculos.quantidadePorBarras} <br>

        // Divisão dos riscos: ${calculos.arrayDeRiscos}
        // </p>
        // `
    }
})

const especificacoes = {
    tamanhoDaVeneziana: 8,
    distanciaDoRisco: {
        minimo: 6,
        maximo: 7
    },
    tamanhoDaBarra: 300
}

function calcular(alturaDoVao, larguraDoVao) {

    let medida = alturaDoVao - especificacoes.tamanhoDaVeneziana
    let quantidadeDeVenezianas = decideQuantidade(medida)
    let arrayDeRiscos = criarArrayDeRiscos(quantidadeDeVenezianas, medida)
    let { quantidadePorBarras, numeroDeBarras } = calcularBarras(quantidadeDeVenezianas, larguraDoVao)

    return {
        quantidadeDeVenezianas,
        arrayDeRiscos,
        quantidadePorBarras,
        numeroDeBarras
    }

}

function calcularBarras(quantidadeDeVenezianas, larguraDoVao) {
    let quantidadePorBarras = Math.floor(especificacoes.tamanhoDaBarra / larguraDoVao)
    let numeroDeBarras = quantidadeDeVenezianas / quantidadePorBarras

    return {
        quantidadePorBarras,
        numeroDeBarras
    }
}

function criarArrayDeRiscos(quantidadeDeVenezianas, medidaDoVao) {

    let riscos = []
    let medidaDoRisco = medidaDoVao / quantidadeDeVenezianas

    for (let i = 1; i <= quantidadeDeVenezianas; i++) {
        riscos.push((medidaDoRisco * i).toFixed(1))
    }

    return riscos

}

function decideQuantidade(tamanhoDoVao) {

    let quantidade = Math.floor(tamanhoDoVao / especificacoes.distanciaDoRisco.minimo);

    let achouQuantidade = false
    while (!achouQuantidade) {
        if ((tamanhoDoVao / quantidade >= especificacoes.distanciaDoRisco.minimo) && (tamanhoDoVao / quantidade <= especificacoes.distanciaDoRisco.maximo)) {
            achouQuantidade = true
            break
        } else if ((tamanhoDoVao / quantidade > especificacoes.distanciaDoRisco.maximo)) {
            quantidade++
            console.log("Aumentou", quantidade)
        } else if ((tamanhoDoVao / quantidade < especificacoes.distanciaDoRisco.minimo)) {
            quantidade--
            console.log("Diminuiu", quantidade)
        }

    }
    return quantidade
}