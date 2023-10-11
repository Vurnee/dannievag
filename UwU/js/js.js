document.addEventListener("DOMContentLoaded", async () => {
    const products = await (await fetch("https://api.escuelajs.co/api/v1/products")).json();
    const categories = await (await fetch("https://api.escuelajs.co/api/v1/categories")).json();

    render(products);

    renderCategoriesButton(categories);
});

let productsGlobal;

async function render(products) {
    console.log(products);
    productsGlobal = products;
    const categories = await getCategoryes();
    // console.log(categories);
    for (let index = 0; index < products.length; index++) {
        renderItem(products[index].id, products[index].category.name, products[index], index, categories);
    }

}


function renderItem(id, category, item, index, categories) {
    const div = document.getElementById("categories");
    const categor = categories.find(cat => cat.name === category);
    const divCat = document.getElementById(categor.name);

    if (divCat) {
        divCat.insertAdjacentHTML("beforeend", `<div class="div1" ><a href = 'vivod.html?${item.id}'><img src="${item.images[0]}" class="img"></a><p class="title">${item.title}</p> </br><p class="price">${item.price + '$'}</p> <button onclick = 'del(${item.id})'>DEL</button></div>`);
    } else {
        div.insertAdjacentHTML("beforeend", `
        <div id ='main'>
        <div>
            <p class="zag">${categor.name}</p>
        </div>
        <div id='${categor.name}' class="category" ">
        </div>
        </div>
        `);
        const divCat = document.getElementById(categor.name);
        divCat.insertAdjacentHTML("beforeend", `<div class="div1" ><a href = 'vivod.html?${item.id}'><img src="${item.images[0]}" class="img"></a><p class="title">${item.title}</p></br><p class="price">${item.price + '$'}</p><button onclick = 'del(${item.id})'>DEL</button></div>`);
    }
}



const renderCategoriesButton = (categories) => {
    const dataButtonsDiv = document.getElementById("dataButtons");
    categories.forEach((element) => {
        const categoryName = element.name;
        dataButtonsDiv.insertAdjacentHTML("beforeend", `<button onclick="loadData('${element.id}')" class = 'but_but'>${categoryName}</button>`);
    });
};

const getCategoryes = async () => {
    const response = await fetch("https://api.escuelajs.co/api/v1/categories", {
        method: "GET"
    });
    if (response.ok) {
        const result = await response.json();
        return result;
    }
};

async function loadData(id) {
    const data = await (await fetch(`https://api.escuelajs.co/api/v1/products/?categoryId=${id}`)).json();
    document.getElementById("categories").innerHTML = ""
    render(data);
}
function del(id) {
    console.log(id);
    fetch(`https://api.escuelajs.co/api/v1/products/${id}`, {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json' },
    })

}
