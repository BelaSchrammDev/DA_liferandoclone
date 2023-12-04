// basket: { pizzaname: pizzaamount, ...: ...,}
let basket = {};


function initBasket() {
    initDigitRoles();
}

function renderBasket() {
    const basketList = Object.keys(basket);
    let basketHtml = '';
    let priceSummary = 0;
    if (basketList.length == 0) {
        setElementDisplayStyle('empty_basket_info', 'flex');
        setElementDisplayStyle('price_summary', 'none');
    }
    else {
        setElementDisplayStyle('empty_basket_info', 'none');
        setElementDisplayStyle('price_summary', 'flex');
    }
    for (let index = 0; index < basketList.length; index++) {
        const pizza = getPizzaInfo(basketList[index]);
        if (pizza) {
            basketHtml += getBasketItemHtml(pizza, basket[basketList[index]]);
            priceSummary += pizza.price * basket[basketList[index]];
        }
    }
    document.getElementById('basket_list').innerHTML = basketHtml;
    setDigitRoleValue('price_summary_role', priceSummary);
}


function getPriceSummary(price) {
    return `
        <div class="flex_c_jfs_ast m_2 font_16b">
            <div class="flex_r_jsb_ace">
                <span>Zwischensumme</span>
                <div id="price_summary" digitrole_template="XX0.00€" class="digitrole"></div>
                <span>${price}</span>
            </div>
        </div>
    `;
}


function getBasketItemHtml(pizza, amount) {
    return `
    <div class="flex_r_jfs_afs flex_gap_2 m_x_2 p_y_2 font_16b basket_item">
        <span>${amount}</span>
        <div class="flex_c_jfs_ast flex_gap_2 flex_grow_1">
            <div class="flex_r_jsb_ace">
                <span>${pizza.name}</span>
                <span>${pizza.price * amount}</span>
            </div>
            <div class="flex_r_jfe_ace flex_gap_2">
                <button onclick="delFromBasket('${pizza.name}')">-</button>
                <span style="width: 30px; text-align: center;">${amount}</span>
                <button onclick="addToBasket('${pizza.name}')">+</button>
            </div>
        </div>
    </div>`;
}


function delFromBasket(pizzaName) {
    basket[pizzaName]--;
    if (basket[pizzaName] == 0) delete basket[pizzaName];
    renderBasket();
}

function addToBasket(pizzaName) {
    if (basket[pizzaName]) basket[pizzaName]++;
    else basket[pizzaName] = 1;
    renderBasket();
}


function setElementDisplayStyle(element, dstyle) {
    setStyleAttribute(element, `display: ${dstyle};`);
}


function setStyleAttribute(element, value) {
    document.getElementById(element).style = value;
}