// basket: { pizzaname: pizzaamount, ...: ...,}
let basket = {};
const deliveryPrice = 1500;
const minOrderValue = 5000;


function initBasket() {
    initDigitRoles();
    setDigitRoleValue('delivery_role', deliveryPrice);
    setDigitRoleValue('summary_role', 1500);
}


function setVisibiltyOfDivs(basketEmpty) {
    if (basketEmpty) {
        setElementDisplayStyle('empty_basket_info', 'flex');
        setElementDisplayStyle('price_summary', 'none');
    }
    else {
        setElementDisplayStyle('empty_basket_info', 'none');
        setElementDisplayStyle('price_summary', 'flex');
    }
}

function renderBasket() {
    const basketList = Object.keys(basket);
    let basketHtml = '';
    let priceSummary = 0;
    setVisibiltyOfDivs(basketList.length == 0);
    for (let index = 0; index < basketList.length; index++) {
        const pizza = getPizzaInfo(basketList[index]);
        const amount = basket[basketList[index]];
        if (pizza) {
            basketHtml += getBasketItemHtml(pizza, amount);
            priceSummary += pizza.price * amount;
        }
    }
    document.getElementById('basket_list').innerHTML = basketHtml;
    renderSummarySection();
}


function renderSummarySection() {
    const basketList = Object.keys(basket);
    let priceSummary = 0;
    for (let index = 0; index < basketList.length; index++) {
        const pizza = getPizzaInfo(basketList[index]);
        const amount = basket[basketList[index]];
        if (pizza) priceSummary += pizza.price * amount;
    }
    setDigitRoleValue('price_summary_role', priceSummary);
    setDigitRoleValue('summary_role', priceSummary + deliveryPrice);
}


function getBasketItemHtml(pizza, amount) {
    return `
    <div id="basketitem_${pizza.ID}" class="flex_r_jfs_afs flex_gap_2 m_x_2 p_y_2 font_16b basket_item">
        <span id="amount1_${pizza.ID}">${amount}</span>
        <div class="flex_c_jfs_ast flex_gap_2 flex_grow_1">
            <div class="flex_r_jsb_ace">
                <span>${pizza.name}</span><span id="price_sum_${pizza.ID}">${pizza.price * amount}</span>
            </div>
            <div class="flex_r_jfe_ace flex_gap_2">
                <button onclick="delFromBasket('${pizza.ID}')">-</button>
                <span id="amount2_${pizza.ID}" style="width: 30px; text-align: center;">${amount}</span>
                <button onclick="addToBasket('${pizza.ID}')">+</button>
                <button onclick="deleteFromBasket('${pizza.ID}')"><img src="./img/trash.svg" alt=""></button>
            </div>
        </div>
    </div>`;
}


function updateBasketItem(pizzaID) {
    const amount = basket[pizzaID];
    document.getElementById('amount1_' + pizzaID).innerHTML = amount;
    document.getElementById('amount2_' + pizzaID).innerHTML = amount;
    document.getElementById('price_sum_' + pizzaID).innerHTML = getPizzaInfo(pizzaID).price * amount;
}


function deleteFromBasket(pizzaID) {
    const basketItem = document.getElementById('basketitem_' + pizzaID);
    basketItem.style = `max-height: 0; opacity: 0; padding: 0; border: unset;`;
    setTimeout(() => {
        basketItem.remove();
    }, 600);
    delete basket[pizzaID];
    renderSummarySection();
}


function delFromBasket(pizzaID) {
    basket[pizzaID]--;
    if (basket[pizzaID] == 0) deleteFromBasket(pizzaID);
    else {
        updateBasketItem(pizzaID);
        renderSummarySection();
    }
}

function addToBasket(pizzaID) {
    if (basket[pizzaID]) basket[pizzaID]++;
    else basket[pizzaID] = 1;
    renderBasket();
}


function setElementDisplayStyle(element, dstyle) {
    setStyleAttribute(element, `display: ${dstyle};`);
}


function setStyleAttribute(element, value) {
    document.getElementById(element).style = value;
}