const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sNome = document.querySelector('#m-nome')
const sCargaHoraria = document.querySelector('#m-cargahoraria')
const sHorasAula = document.querySelector('#m-horasaula')
const sFaltas = document.querySelector('#m-faltas')
const btnSalvar = document.querySelector('#btnSalvar')

function setSStatus(sCargaHoraria, sHorasAula, sFaltas) {
  let status = ''
  let cargaHoraria = parseInt(sCargaHoraria.value)
  let horasAula = parseInt(sHorasAula.value)
  let faltas = parseInt(sFaltas.value)

  if ((faltas * horasAula) > (cargaHoraria * 0.3)) {
    status = 'Reprovado por Falta'
  } else {
    status = 'Aprovado'
  }

  return status
}

function setQuantidadeMaximadeFaltas(sCargaHoraria, sHorasAula) {
  let cargaHoraria = parseInt(sCargaHoraria.value)
  let horasAula = parseInt(sHorasAula.value)

  return (cargaHoraria * 0.3) / horasAula
}

let itens
let id

function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    sNome.value = itens[index].nome
    sFaltas.value = itens[index].faltas
    sCargaHoraria.value = itens[index].cargahoraria
    sHorasAula.value = itens[index].horasaula
    id = index
  } else {
    sNome.value = ''
    sFaltas.value = ''
    sCargaHoraria.value = ''
    sHorasAula.value = ''
  }
  
}

function editItem(index) {

  openModal(true, index)
}

function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

function insertItem(item, index) {
  let status = setSStatus(sCargaHoraria, sHorasAula, sFaltas)
  let quantidadeMaximaDeFaltas = setQuantidadeMaximadeFaltas(sCargaHoraria, sHorasAula)
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.nome}</td>
    <td>${item.faltas}/${quantidadeMaximaDeFaltas}</td>
    <td>${status}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

btnSalvar.onclick = e => {
  
  if (sNome.value == '' || sFaltas.value == '' || sCargaHoraria.value == '' || sHorasAula.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].nome = sNome.value
    itens[id].faltas = sFaltas.value
    itens[id].cargahoraria = sCargaHoraria.value
    itens[id].horasaula = sHorasAula.value
  } else {
    itens.push({'nome': sNome.value, 'faltas': sFaltas.value, 'cargahoraria': sCargaHoraria.value, 'horasaula': sHorasAula.value})
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })

}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()