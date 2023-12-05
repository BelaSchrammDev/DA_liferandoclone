const pizzaArray = [
    { name: 'Margherita', info: 'VA', ingredients: ['Tomatensauce', 'Mozzarella', 'Basilikum'], price: 899 },
    { name: 'Pepperoni', info: 'AS', ingredients: ['Tomatensauce', 'Mozzarella', 'Pepperoni'], price: 999 },
    { name: 'Funghi', info: 'V', ingredients: ['Tomatensauce', 'Mozzarella', 'Champignons'], price: 1049 },
    { name: 'Quattro Formaggi', info: 'V', ingredients: ['Tomatensauce', 'Mozzarella', 'Gorgonzola', 'Parmesan', 'Ricotta'], price: 1199 },
    { name: 'Diavola', info: 'S', ingredients: ['Tomatensauce', 'Mozzarella', 'scharfe Salami'], price: 1099 },
    { name: 'Hawaiian', ingredients: ['Tomatensauce', 'Mozzarella', 'Schinken', 'Ananas'], price: 1249 },
    { name: 'BBQ Chicken', ingredients: ['BBQ-Sauce', 'Mozzarella', 'Hähnchen', 'Rote Zwiebel'], price: 1179 },
    { name: 'Veggie Supreme', info: 'G', ingredients: ['Tomatensauce', 'Mozzarella', 'Paprika', 'Rote Zwiebel', 'Oliven', 'Champignons'], price: 1299 },
    { name: 'Capricciosa', ingredients: ['Tomatensauce', 'Mozzarella', 'Schinken', 'Artischocken', 'Champignons', 'Oliven'], price: 1349 },
    { name: 'Prosciutto e Funghi', ingredients: ['Tomatensauce', 'Mozzarella', 'Schinken', 'Champignons'], price: 1199 },
    { name: 'Salami', ingredients: ['Tomatensauce', 'Mozzarella', 'Salami'], price: 949 },
    { name: 'Caprese', info: 'V', ingredients: ['Tomatensauce', 'Mozzarella', 'Tomaten', 'Büffelmozzarella', 'Basilikum'], price: 1299 },
    { name: 'Seafood', ingredients: ['Tomatensauce', 'Mozzarella', 'Meeresfrüchte', 'Knoblauch', 'Petersilie'], price: 1499 },
    { name: 'Trüffel', info: 'V', ingredients: ['Trüffelöl', 'Mozzarella', 'Champignons', 'Parmesan'], price: 1599 },
    { name: 'Mexicana', info: 'Scharf', ingredients: ['Tomatensauce', 'Mozzarella', 'Hackfleisch', 'Paprika', 'Zwiebeln', 'Chilisauce'], price: 1149 },
    { name: 'Spinat & Feta', info: 'V', ingredients: ['Tomatensauce', 'Mozzarella', 'Spinat', 'Feta', 'Knoblauch'], price: 1249 },
    { name: 'Mango Chicken', ingredients: ['Tomatensauce', 'Mozzarella', 'Hähnchen', 'Mango', 'Curry'], price: 1379 },
    { name: 'Bianca', info: 'V', ingredients: ['Olivenöl', 'Mozzarella', 'Parmesan', 'Rucola'], price: 1099 },
    { name: 'Tandoori', ingredients: ['Tandoori-Sauce', 'Mozzarella', 'Hähnchen', 'Paprika', 'Joghurtsauce'], price: 1329 },
    { name: 'Bolognese', ingredients: ['Bolognese-Sauce', 'Mozzarella', 'Parmesan'], price: 1149 }
];


const infoArray = {
    'V': { name: 'Vegetarisch', fontColor: 'black', bgColor: '#f3f375' },
    'G': { name: 'Vegan', fontColor: 'black', bgColor: 'orange' },
    'A': { name: 'Angebot', fontColor: 'white', bgColor: '#1da31d' },
    'S': { name: 'Scharf', fontColor: 'white', bgColor: '#ff5151' },
}


function initMenu() {
    for (let index = 0; index < pizzaArray.length; index++) {
        const pizza = pizzaArray[index];
        pizza.ID = pizza.name.replace(' ', '_');
    }
}


function formatPrice(num) {
    let numAsString = num.toString();
    let characters = numAsString.split("").reverse();
    let parts = [];
    for (let i = 0; i < characters.length; i += 2) {
        let part = characters.slice(i, i + 2).reverse().join("");
        parts.unshift(part);
    }
    return parts.join(",");
}


function getPizzaInfo(pizzaID) {
    for (let index = 0; index < pizzaArray.length; index++) {
        const pizza = pizzaArray[index];
        if (pizza.ID == pizzaID) return pizza;
    }
    return undefined;
}


function getPizzaPrice(pizzaID) {
    const pizza = getPizzaInfo(pizzaID);
    if (pizza) return pizza.price;
    return 0;
}


function renderMenu() {
    let menuHtml = '';
    for (let index = 0; index < pizzaArray.length; index++) {
        menuHtml += getMenuBoxHTML(pizzaArray[index]);
    }
    document.getElementById('menu').innerHTML = menuHtml;
}


function getMenuBoxHTML(pizza) {
    return `<div class="flex_c_jfs_afs flex_gap_1 menu_box" onclick="increaseBasket('${pizza.ID}')">
                <span class="font_bold">${pizza.name}</span>
                <div class="flex_r_jfs_ace flex_gap_1">${getInfos(pizza)}</div>
                <span>${getIngredients(pizza)}</span>
                <span class="font_bold">${formatPrice(pizza.price)} €</span>
                <div class="menu_box_add"><img src="./img/plus.svg"></div>
            </div>`;
}


function getInfos(pizza) {
    let infoHtml = '';
    if (pizza.info) {
        for (let index = 0; index < pizza.info.length; index++) {
            const infoTag = infoArray[pizza.info[index]];
            if (infoTag) infoHtml += getInfoSpan(infoTag.name, infoTag.fontColor, infoTag.bgColor);
        }
    }
    return infoHtml;
}


function getInfoSpan(text, color, bgcolor) {
    return `
            <span
                class="menu_box_info"
                style="background-color: ${bgcolor};color: ${color};"
                >${text}
            </span>`
}


function getIngredients(pizza) {
    let ingredients = '';
    for (let index = 0; index < pizza.ingredients.length; index++) {
        const ingredient = pizza.ingredients[index];
        if (index === 0) ingredients += 'mit ' + ingredient;
        else if (index === pizza.ingredients.length - 1) ingredients += ' und ' + ingredient;
        else ingredients += ', ' + ingredient;
    }
    return ingredients;
}