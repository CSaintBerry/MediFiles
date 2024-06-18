document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('registerForm');
  const roleSelect = document.getElementById('role');
  const medicoFields = document.getElementById('medicoFields');

  if (registerForm && roleSelect && medicoFields) {
    roleSelect.addEventListener('change', () => {
      if (roleSelect.value === 'medico') {
        medicoFields.style.display = 'block';
      } else {
        medicoFields.style.display = 'none';
      }
    });

    registerForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const formData = {
        role: roleSelect.value,
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value,
        cedula: document.getElementById('cedula').value,
        direccion: document.getElementById('direccion').value,
        telefono: document.getElementById('telefono').value,
        email: document.getElementById('email').value,
        usuario: document.getElementById('usuario').value,
        contraseña: document.getElementById('contraseña').value,
        confirmarContraseña: document.getElementById('confirmarContraseña').value,
        colegioMedico: document.getElementById('colegioMedico').value
      };

      // Basic form validation
      if (!formData.nombre ||!formData.apellido ||!formData.email ||!formData.usuario ||!formData.contraseña) {
        alert('Please fill in all required fields');
        return;
      }

      if (formData.contraseña!== formData.confirmarContraseña) {
        alert('Passwords do not match');
        return;
      }

      if (roleSelect.value === 'medico' &&!formData.colegioMedico) {
        alert('Please fill in the Colegio Médico field');
        return;
      }

      fetch('/users/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        })
     .then(response => response.json())
     .then(data => {
        if (data.success) {
          alert('Cuenta creada exitosamente');
          window.location.href = 'index.html';
        } else {
          alert('Error al crear la cuenta: ' + data.message);
        }
      })
     .catch(error => {
        console.error('Error:', error);
        alert('Error al crear la cuenta: ' + error.message);
      });
    });
  }
});
