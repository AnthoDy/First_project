const btncart = document.querySelector('.contenedor-icono-carrito');
const contenedorCarrito = document.querySelector('.contenedor-cart-products');

btncart.addEventListener('click', () => {
    contenedorCarrito.classList.toggle('hidden-cart');
});

const btnOpciones = document.querySelector('.opcion-preferencia');
const ContOpciones = document.querySelector('.contenedor-opciones');

btnOpciones.addEventListener('click', () => {
    ContOpciones.classList.toggle('hidden-opciones');
});

const Infocarrito = document.querySelector('.cart-product');
const rowproduct = document.querySelector('.row-product');

const ListaProduct = document.querySelector('.contenedor-items');

let AllProducts = [];

const valorTotal = document.querySelector('.total-pagar');
const countProducts = document.querySelector('#contador-productos');

ListaProduct.addEventListener('click', e => {
    if (e.target.classList.contains('btn-add-cart')) {
        const product = e.target.parentElement;
        const infoproduct = {
            quantity: 1,
            title: product.querySelector('h2').textContent,
            precio: parseFloat(product.querySelector('p').textContent.slice(1)), 
        };

        const exist = AllProducts.some(product => product.title === infoproduct.title);

        if (exist) {
            const products = AllProducts.map(product => {
                if (product.title === infoproduct.title) {
                    product.quantity++;
                }
                return product;
            });
            AllProducts = [...products];
        } else {
            AllProducts = [...AllProducts, infoproduct];
        }

        EnsHtml();
    }
});

rowproduct.addEventListener('click', e => {
    if (e.target.classList.contains('icon-close')) {
        const product = e.target.parentElement;
        const title = product.querySelector('p').textContent;

        AllProducts = AllProducts.filter(product => product.title !== title);

        EnsHtml();
    }
});

const EnsHtml = () => {
    rowproduct.innerHTML = '';

    let total = 0;
    let totalofproducts = 0;

    AllProducts.forEach(product => {
        const contenedorProducts = document.createElement('div');
        contenedorProducts.classList.add('cart-product');

        contenedorProducts.innerHTML = `
        <div class="info-cart-product">
            <span class="cantidad-producto">${product.quantity}</span>
            <p class="titulo-producto">${product.title}</p>
            <span class="precio-producto">$${product.precio.toFixed(2)}</span>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon-close">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        </div>`;

        rowproduct.append(contenedorProducts);

        total += product.quantity * product.precio;
        totalofproducts += product.quantity;
    });

    valorTotal.innerText = `$${total.toFixed(2)}`;
    countProducts.innerText = totalofproducts;
};
