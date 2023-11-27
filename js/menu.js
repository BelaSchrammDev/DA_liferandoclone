const pizzaArray = [
    { name: 'Margherita', info: 'VA', ingredients: ['Tomatensauce', 'Mozzarella', 'Basilikum'] },
    { name: 'Pepperoni', info: 'AS', ingredients: ['Tomatensauce', 'Mozzarella', 'Pepperoni'] },
    { name: 'Funghi', info: 'V', ingredients: ['Tomatensauce', 'Mozzarella', 'Champignons'] },
    { name: 'Quattro Formaggi', info: 'V', ingredients: ['Tomatensauce', 'Mozzarella', 'Gorgonzola', 'Parmesan', 'Ricotta'] },
    { name: 'Diavola', info: 'S', ingredients: ['Tomatensauce', 'Mozzarella', 'scharfe Salami'] },
    { name: 'Hawaiian', ingredients: ['Tomatensauce', 'Mozzarella', 'Schinken', 'Ananas'] },
    { name: 'BBQ Chicken', ingredients: ['BBQ-Sauce', 'Mozzarella', 'Hähnchen', 'Rote Zwiebel'] },
    { name: 'Veggie Supreme', info: 'V', ingredients: ['Tomatensauce', 'Mozzarella', 'Paprika', 'Rote Zwiebel', 'Oliven', 'Champignons'] },
    { name: 'Capricciosa', ingredients: ['Tomatensauce', 'Mozzarella', 'Schinken', 'Artischocken', 'Champignons', 'Oliven'] },
    { name: 'Prosciutto e Funghi', ingredients: ['Tomatensauce', 'Mozzarella', 'Schinken', 'Champignons'] },
    { name: 'Salami', ingredients: ['Tomatensauce', 'Mozzarella', 'Salami'] },
    { name: 'Caprese', info: 'V', ingredients: ['Tomatensauce', 'Mozzarella', 'Tomaten', 'Büffelmozzarella', 'Basilikum'] },
    { name: 'Seafood', ingredients: ['Tomatensauce', 'Mozzarella', 'Meeresfrüchte', 'Knoblauch', 'Petersilie'] },
    { name: 'Trüffel', info: 'V', ingredients: ['Trüffelöl', 'Mozzarella', 'Champignons', 'Parmesan'] },
    { name: 'Mexicana', info: 'Scharf', ingredients: ['Tomatensauce', 'Mozzarella', 'Hackfleisch', 'Paprika', 'Zwiebeln', 'Chilisauce'] },
    { name: 'Spinat & Feta', info: 'V', ingredients: ['Tomatensauce', 'Mozzarella', 'Spinat', 'Feta', 'Knoblauch'] },
    { name: 'Mango Chicken', ingredients: ['Tomatensauce', 'Mozzarella', 'Hähnchen', 'Mango', 'Curry'] },
    { name: 'Bianca', info: 'V', ingredients: ['Olivenöl', 'Mozzarella', 'Parmesan', 'Rucola'] },
    { name: 'Tandoori', ingredients: ['Tandoori-Sauce', 'Mozzarella', 'Hähnchen', 'Paprika', 'Joghurtsauce'] },
    { name: 'Bolognese', ingredients: ['Bolognese-Sauce', 'Mozzarella', 'Parmesan'] }
];


function renderMenu() {
    let menuHtml = '';
    for (let index = 0; index < pizzaArray.length; index++) {
        menuHtml += getMenuBoxHTML(pizzaArray[index]);
    }
    document.getElementById('menu').innerHTML = menuHtml;
}


function getMenuBoxHTML(pizza) {
    return `<div class="flex_c_jfs_afs flex_gap_1 menu_box">
                <span>${pizza.name}</span>
                <div class="flex_r_jfs_ace flex_gap_1">${getInfos(pizza)}</div>
                <span>${getIngredients(pizza)}</span>
                <div class="menu_box_add"><img src="./img/plus.svg"></div>
            </div>`;
}


function getInfos(pizza) {
    let infoHtml = '';
    if (pizza.info) {
        for (let index = 0; index < pizza.info.length; index++) {
            const infoTag = pizza.info[index];
            switch (infoTag) {
                case 'V':
                    infoHtml += getInfoSpan('Vegetarisch', 'black', '#f3f375');
                    break;
                case 'A':
                    infoHtml += getInfoSpan('Angebot', 'white', '#1da31d');
                    break;
                case 'S':
                    infoHtml += getInfoSpan('Scharf', 'white', '#ff5151');
                    break;
            }
        }
    }
    return infoHtml;
}


function getInfoSpan(text, color, bgcolor) {
    return `<span class="menu_box_info" style="background-color: ${bgcolor};color: ${color};">${text}</span>`
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