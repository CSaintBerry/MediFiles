document.addEventListener('DOMContentLoaded', () => {
    // Toggle Menu
    const menuBtn = document.getElementById('menuBtn');
    const menu = document.getElementById('menu');
    if (menuBtn && menu) {
        menuBtn.addEventListener('click', () => {
            menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
        });
    }
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('generateReportBtn').addEventListener('click', function () {
        const age = document.getElementById('edad').value;
        const sex = document.getElementById('sexo').value;
        const dateFrom = document.getElementById('fechaDesde').value;
        const dateTo = document.getElementById('fechaHasta').value;

        const filters = {
            age_filter: age,
            gender_filter: sex,
            date_from: dateFrom,
            date_to: dateTo
        };

        fetch('/api/reports/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(filters)
        })
            .then(response => response.json())
            .then(data => {
                const reportContainer = document.getElementById('reportContainer');
                reportContainer.innerHTML = '';

                if (data.length > 0) {
                    data.forEach(patient => {
                        const patientElement = document.createElement('div');
                        patientElement.classList.add('patient-report');
                        patientElement.innerHTML = `
                            <p>Nombre: ${patient.nombre_apellido}</p>
                            <p>Edad: ${patient.edad}</p>
                            <p>Sexo: ${patient.sexo}</p>
                            <p>Fecha de Creación: ${new Date(patient.created_at).toLocaleDateString()}</p>
                        `;
                        reportContainer.appendChild(patientElement);
                    });
                } else {
                    reportContainer.innerHTML = '<p>No se encontraron pacientes que coincidan con los filtros seleccionados.</p>';
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });

    // Profile
    const profileBtn = document.getElementById('profileBtn');
    if (profileBtn) {
        profileBtn.addEventListener('click', () => {
            alert('Perfil del usuario');
        });
    }
});
    // Logout
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            // Lógica para cerrar sesión
            window.location.href = 'login.html';
        });
    }
});
