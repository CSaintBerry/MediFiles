document.addEventListener('DOMContentLoaded', () => {
    // Toggle Menu
    const menuBtn = document.getElementById('menuBtn');
    const menu = document.getElementById('menu');
    if (menuBtn && menu) {
        menuBtn.addEventListener('click', () => {
            menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
        });
    }

    // Handle form submission
    const createForm = document.getElementById('createForm');
    if (createForm) {
        createForm.addEventListener('submit', (e) => {
            e.preventDefault();
            savePatient(createForm, true);
        });
    }

    const guardarBtn = document.getElementById('guardarBtn');
    if (guardarBtn) {
        guardarBtn.addEventListener('click', () => {
            savePatient(createForm, false);
        });
    }

    const referirBtn = document.getElementById('referirBtn');
    if (referirBtn) {
        referirBtn.addEventListener('click', () => {
            showReferenciaModal();
        });
    }

    const imprimirBtn = document.getElementById('imprimirBtn');
    if (imprimirBtn) {
        imprimirBtn.addEventListener('click', () => {
            window.print();
        });
    }

    // Function to save patient data
    function savePatient(form, addToQueue) {
        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        fetch('/clinicalrecords', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            if (result.message) {
                alert('Paciente guardado exitosamente');
                if (addToQueue) {
                    addToQueue(data);
                }
            } else {
                alert('Error al guardar el paciente');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al guardar el paciente');
        });
    }
    
    // Function to add patient to the queue
    function addToQueue(patientData) {
        fetch('/clinicalrecords/queue', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(patientData)
        })
        .then(response => response.json())
        .then(result => {
            if (result.message) {
                alert('Paciente añadido a la cola');
            } else {
                alert('Error al añadir a la cola');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al añadir a la cola');
        });
    }
    
    // Function to show reference modal
    function showReferenciaModal() {
        const nombre = document.getElementById('nombre').value;
        const sexo = document.getElementById('sexo').value;
        const edad = document.getElementById('edad').value;
    
        document.getElementById('refNombre').innerText = nombre;
        document.getElementById('refSexo').innerText = sexo;
        document.getElementById('refEdad').innerText = edad;
    
        const modal = document.getElementById('referenciaModal');
        modal.style.display = 'block';
    
        const closeBtn = modal.querySelector('.close');
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    
        const imprimirReferenciaBtn = document.getElementById('imprimirReferenciaBtn');
        imprimirReferenciaBtn.addEventListener('click', () => {
            window.print();
        });
    }
    
    // Profile
    const profileBtn = document.getElementById('profileBtn');
    if (profileBtn) {
        profileBtn.addEventListener('click', () => {
            alert('Perfil del usuario');
        });
    }
    
    // Logout
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            // Lógica para cerrar sesión
            window.location.href = 'login.html';
        });
    }
});    