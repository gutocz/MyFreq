document.addEventListener("DOMContentLoaded", () => {
    const subjectsContainer = document.getElementById("subjectsContainer");
    const btnAddSubject = document.getElementById("btnAddSubject");
    const btnSaveSubject = document.getElementById("btnSaveSubject");
    const modal = document.getElementById("modal");
    const subjectNameInput = document.getElementById("subjectName");
    const totalHoursInput = document.getElementById("totalHours");
    const classHoursInput = document.getElementById("classHours");
  
    // Carregar dados do LocalStorage ao carregar a página
    let subjects = JSON.parse(localStorage.getItem("subjects")) || [];
  
    function updateLocalStorage() {
      localStorage.setItem("subjects", JSON.stringify(subjects));
    }
  
    function createSubjectBlock(subject) {
      const subjectBlock = document.createElement("div");
      subjectBlock.className = "subject";
      const status = (subject.faltas * subject.horas_aula) > subject.carga_horaria_total * 0.3 ? "Reprovado" : "Aprovado";
      subjectBlock.innerHTML = `
        <h3>${subject.nome}</h3>
        <p>Faltas: ${subject.faltas}/${((subject.carga_horaria_total * 0.3)/subject.horas_aula).toFixed(1)}</p>
        <p>Status: ${status}</p>
        <button class="btnAddFalta">Adicionar Falta</button>
        <button class="btnRemoveFalta">Remover Falta</button>
        <button class="btnDeleteSubject">Deletar Cadeira</button>
      `;
      subjectBlock.querySelector(".btnAddFalta").addEventListener("click", () => addFalta(subject));
      subjectBlock.querySelector(".btnRemoveFalta").addEventListener("click", () => removeFalta(subject));
      subjectBlock.querySelector(".btnDeleteSubject").addEventListener("click", () => deleteSubject(subject));
      subjectsContainer.appendChild(subjectBlock);
    }
  
    function addFalta(subject) {
      if (subject.faltas * subject.horas_aula < subject.carga_horaria_total) {
        subject.faltas++;
        updateLocalStorage();
        updateSubjectBlocks();
      }
    }
  
    function removeFalta(subject) {
      if (subject.faltas > 0) {
        subject.faltas--;
        updateLocalStorage();
        updateSubjectBlocks();
      }
    }
  
    function deleteSubject(subject) {
      const index = subjects.indexOf(subject);
      if (index !== -1) {
        subjects.splice(index, 1);
        updateLocalStorage();
        updateSubjectBlocks();
      }
    }
  
    function updateSubjectBlocks() {
      subjectsContainer.innerHTML = "";
      subjects.forEach(subject => createSubjectBlock(subject));
    }
  
    function clearModalInputs() {
      subjectNameInput.value = "";
      totalHoursInput.value = "";
      classHoursInput.value = "";
    }
  
    btnAddSubject.addEventListener("click", () => modal.style.display = "block");
  
    btnSaveSubject.addEventListener("click", () => {
      const nome = subjectNameInput.value.trim();
      const carga_horaria_total = parseInt(totalHoursInput.value);
      const horas_aula = parseInt(classHoursInput.value);
      if (nome && carga_horaria_total && horas_aula) {
        const newSubject = {
          nome,
          carga_horaria_total,
          horas_aula,
          faltas: 0,
        };
        subjects.push(newSubject);
        updateLocalStorage();
        createSubjectBlock(newSubject);
        modal.style.display = "none";
        clearModalInputs();
      }
    });
  
    modal.querySelector(".close").addEventListener("click", () => {
      modal.style.display = "none";
      clearModalInputs();
    });
  
    // Inicializar a exibição das matérias
    updateSubjectBlocks();
  });
  