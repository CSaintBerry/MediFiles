document.addEventListener('DOMContentLoaded', () => {
    // Toggle Menu
    const menuBtn = document.getElementById('menuBtn');
    const menu = document.getElementById('menu');
    if (menuBtn && menu) {
        menuBtn.addEventListener('click', () => {
            menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
        });
    }
document.addEventListener('DOMContentLoaded', function() {
    fetch('/api/closure/daily-closure')
        .then(response => response.json())
        .then(data => {
            const dailyClosureContainer = document.getElementById('dailyClosure');
            dailyClosureContainer.innerHTML = '';
            
            if (data.length > 0) {
                data.forEach(patient => {
                    const patientElement = document.createElement('div');
                    patientElement.classList.add('patient-queue');
                    patientElement.innerHTML = `
                        <p>Nombre: ${patient.nombre_apellido}</p>
                        <p>Edad: ${patient.edad}</p>
                        <p>Sexo: ${patient.sexo}</p>
                        <p>Fecha de Creación: ${new Date(patient.date_added).toLocaleDateString()}</p>
                    `;
                    dailyClosureContainer.appendChild(patientElement);
                });
            } else {
                dailyClosureContainer.innerHTML = '<p>No hay pacientes en la cola hoy.</p>';
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

document.getElementById('printBtn').addEventListener('click', function() {
    window.print();
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
};
