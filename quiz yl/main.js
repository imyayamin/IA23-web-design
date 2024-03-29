const elQuiz = document.querySelector(".quiz")
const elPergunta = elQuiz.querySelector(".pergunta")
const elAlternativas = elQuiz.querySelector(".alternativas")
const elContador = elQuiz.querySelector(".contador")
const elCorretas = elContador.querySelector(".corretas")
const elErradas = elContador.querySelector(".erradas")

const elModalFinish = document.querySelector(".modal-finish")
const elContadorFinish = elModalFinish.querySelector(".contador")
const elCorretasFinish = elContadorFinish.querySelector(".corretas")
const elErradasFinish = elContadorFinish.querySelector(".erradas")
const elRestartBtn = elQuiz.querySelector(".btn");

async function main() {
  const requisicao = await fetch("perguntas.json")
  const quiz = await requisicao.json()
  
  let nCorretas = 0
  let nErradas = 0
  let questaoAtual = 0
  let alternativaCorretaAtual

  elCorretas.innerHTML = nCorretas
  elErradas.innerHTML = nErradas

  function carregarQuestao(numeroDaQuestao) {
    const questao = quiz[numeroDaQuestao]
    alternativaCorretaAtual = questao.correta
    elPergunta.innerText = questao.pergunta
    elAlternativas.innerHTML = ""
    questao.alternativas.forEach(alt => {
      elAlternativas.innerHTML += `<button>${alt} <strong></strong> </button>`
    })
  }

  elAlternativas.addEventListener("click", ev => {
    const botaoClicado = ev.target.closest("button")
    if (!botaoClicado) return

    const listaDeFilhos = [...elAlternativas.children]
    const alternativaCorretaClicada = listaDeFilhos.indexOf(botaoClicado)

    if (alternativaCorretaClicada == alternativaCorretaAtual) {
      nCorretas++
      elCorretas.innerHTML = nCorretas
      if (questaoAtual == quiz.length-1) {
        elCorretasFinish.innerHTML = nCorretas
        elErradasFinish.innerHTML = nErradas
        return elModalFinish.classList.add("open")
      }
      return carregarQuestao(++questaoAtual)
    }
    
    nErradas++
    elErradas.innerHTML = nErradas
  })

  function reiniciarQuiz() {
    nCorretas = 0;
    nErradas = 0;
    questaoAtual = 0;
    elCorretas.innerHTML = nCorretas;
    elErradas.innerHTML = nErradas;
    elModalFinish.classList.remove("open");
    carregarQuestao(questaoAtual);
  }

  const elRestartBtn = document.querySelector(".modal-finish .btn");
  elRestartBtn.addEventListener("click", reiniciarQuiz);


  carregarQuestao(questaoAtual)
}

main()

