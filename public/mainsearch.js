document.addEventListener('DOMContentLoaded', () => {
    // Toggle Menu
    const menuBtn = document.getElementById('menuBtn');
    const menu = document.getElementById('menu');
    if (menuBtn && menu) {
        menuBtn.addEventListener('click', () => {
            menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
        });
    }

    // Search
    const searchBtn = document.getElementById('searchBtn');
    const searchQuery = document.getElementById('searchQuery');
    const searchResults = document.getElementById('searchResults');

    if (searchBtn && searchQuery && searchResults) {
        searchBtn.addEventListener('click', () => {
            const query = searchQuery.value;

            fetch(`/search?query=${encodeURIComponent(query)}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    searchResults.innerHTML = data.map(patient => `
                        <div class="result">
                            <p>ID: ${patient.id}</p>
                            <p>Nombre: ${patient.nombre_apellido}</p>
                            <p>Edad: ${patient.edad}</p>
                            <p>Género: ${patient.sexo}</p>
                            <button class="addToQueueBtn" data-id="${patient.id}">Añadir a la cola</button>
                            <button class="viewBtn" data-id="${patient.id}">Ver</button>
                            <button class="deleteBtn" data-id="${patient.id}">Eliminar</button>
                        </div>
                    `).join('');

                    // Añadir manejadores de eventos para los nuevos botones
                    document.querySelectorAll('.addToQueueBtn').forEach(btn => {
                        btn.addEventListener('click', (event) => {
                            const id = event.target.getAttribute('data-id');
                            fetch(`/queue`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({ patient_id: id })
                            })
                            .then(response => response.json())
                            .then(data => {
                                if (data.message) {
                                    alert('Paciente añadido a la cola exitosamente');
                                } else {
                                    alert('Error al añadir el paciente a la cola');
                                }
                            })
                            .catch(error => {
                                console.error('Error:', error);
                                alert('Error al añadir el paciente a la cola');
                            });
                        });
                    });

                    document.querySelectorAll('.viewBtn').forEach(btn => {
                        btn.addEventListener('click', (event) => {
                            const id = event.target.getAttribute('data-id');
                            window.location.href = `/view?id=${id}`;
                        });
                    });

                    document.querySelectorAll('.deleteBtn').forEach(btn => {
                        btn.addEventListener('click', (event) => {
                            const id = event.target.getAttribute('data-id');
                            fetch(`/patients/${id}`, {
                                method: 'DELETE',
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            })
                            .then(response => response.json())
                            .then(data => {
                                if (data.message) {
                                    alert('Paciente eliminado exitosamente');
                                    event.target.parentElement.remove();
                                } else {
                                    alert('Error al eliminar el paciente');
                                }
                            })
                            .catch(error => {
                                console.error('Error:', error);
                                alert('Error al eliminar el paciente');
                            });
                        });
                    });
                } else {
                    searchResults.innerHTML = '<p>No se encontraron pacientes</p>';
                }
            })
            .catch(error => {
                console.error('Error:', error);
                searchResults.innerHTML = '<p>Error al realizar la búsqueda</p>';
            });
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

