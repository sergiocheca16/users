const apiURL = 'https://jsonplaceholder.typicode.com/users';

const listaUsuarios = document.getElementById('listaUsuarios');

const generarEdadAleatoria = () => Math.floor(Math.random() * (65 - 18 + 1)) + 18;

const mostrarUsuarios = (usuarios) => {
    usuarios.forEach(usuario => {
        const li = document.createElement('li');

        li.innerHTML = `
            <img src="${usuario.img}" alt="${usuario.name}">
            <div class="details">
                <p><span>Nombre:</span> ${usuario.name}</p>
                <p><span>Edad:</span> ${usuario.age}</p>
                <p><span>Usuario:</span> ${usuario.username}</p>
                <p><span>Teléfono:</span> ${usuario.phone}</p>
                <p><span>Email:</span> ${usuario.email}</p>
                <p><span>Compañía:</span> ${usuario.company}</p>
                <p><span>Dirección:</span> ${usuario.address}</p>
            </div>
        `;
        listaUsuarios.appendChild(li);
    });
};

fetch(apiURL)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
        }
        return response.json();
    })
    .then(usuarios => {
        const usuariosConDetalles = usuarios.map(usuario => {
            const {
                id,
                name,
                username,
                email,
                phone,
                company: { name: companyName },
                address: { street, suite, city }
            } = usuario;

            return {
                ...usuario,
                age: generarEdadAleatoria(),
                img: `./assets/img/${id}.jpeg`,
                address: `${street}, ${suite}, ${city}`,
                company: companyName
            };
        });

        mostrarUsuarios(usuariosConDetalles);
    })
    .catch(error => {
        console.error('Error al obtener los usuarios:', error);
        listaUsuarios.innerHTML = `<li>Error al cargar los datos. Por favor, intenta nuevamente.</li>`;
    });
