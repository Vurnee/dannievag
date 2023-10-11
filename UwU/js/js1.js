let a =window.location.href.split('?')[1];
console.log(a)
fetch(`https://api.escuelajs.co/api/v1/products/${a}`)
    .then(response => response.json())
    .then(commits => {
        console.log(commits);
        const vivod = document.getElementById('vivod');
        vivod.insertAdjacentHTML('beforeend', `
            <a href="index.html">Вернуться обратно</a>
            <p>${commits.id}</p>
            <p onclick="name()">${commits.title}</p>
            <p>${commits.description}</p>
            <img id = 'img_vivod' src="${commits.images}" height="150px" width="150px" >
            <p>${commits.price + '$'}</p>
        `);
    });