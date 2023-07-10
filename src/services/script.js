function redirecionarPagCadastro() {
    window.location.href = "../pages/addMat.html";
}

function redirecionarPagListar() {
    window.location.href = "../pages/materias.html";
}

function redirecionarPagHome() {
    window.location.href = "../pages/index.html";
}

function cadastrarMateria() {
    const materiaInput = document.getElementById('materia-input');
    const materiaNome = materiaInput.value;
    const cargaHorariaInput = document.getElementById('cargaHoraria-input');
    const cargaHoraria = cargaHorariaInput.value;
    const horasAulaInput = document.getElementById('horasAula-input');
    const horasAula = horasAulaInput.value;

    if (materiaNome && cargaHoraria && horasAula) {
    }
}