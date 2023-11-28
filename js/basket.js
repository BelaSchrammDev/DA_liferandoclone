// basket: { pizzaname: pizzaamount, ...: ...,}
let basket = {};

function clickMenu(pizzaName) {

}


function renderBasket() {

}


function renderEmptyBasket(){
    
}


function addToBasket(pizzaName) {
    if (nameInBasket(pizzaName)) basket.pizzaName++;
    else basket.pizzaName = 1;
    renderBasket();
}


function nameInBasket(pizzaName) {
    for (const pname of basket) {
        if (pname === pizzaName) return true;
    }
}