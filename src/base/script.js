let materias = [];

function cadastrarMateria() {
  const materiaInput = document.getElementById('materia-input');
  const materiaNome = materiaInput.value;

  if (materiaNome) {
    const materia = { nome: materiaNome, faltas: 0 };
    materias.push(materia);

    const materiaSelect = document.getElementById('materia-select');
    const option = document.createElement('option');
    option.text = materiaNome;
    option.value = materiaNome;
    materiaSelect.appendChild(option);

    mostrarFormularioFaltas();
  }

  materiaInput.value = '';
}

function adicionarFaltas() {
  const materiaSelect = document.getElementById('materia-select');
  const selectedMateria = materiaSelect.value;

  const faltasInput = document.getElementById('faltas-input');
  const quantidadeFaltas = parseInt(faltasInput.value);

  if (selectedMateria && !isNaN(quantidadeFaltas)) {
    const materia = materias.find(m => m.nome === selectedMateria);
    materia.faltas += quantidadeFaltas;

    exibirFaltasRegistradas();
  }

  faltasInput.value = '';
}

function mostrarFormularioFaltas() {
  document.getElementById('matricula-form').style.display = 'none';
  document.getElementById('faltas-form').style.display = 'block';
}

function exibirFaltasRegistradas() {
  document.getElementById('faltas-ul').innerHTML = '';

  materias.forEach(materia => {
    const li = document.createElement('li');
    li.textContent = `${materia.nome}: ${materia.faltas} faltas`;
    document.getElementById('faltas-ul').appendChild(li);
  });

  document.getElementById('faltas-list').style.display = 'block';
}
