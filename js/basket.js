// basket: { pizzaname: pizzaamount, ...: ...,}
let basket = {};
const deliveryPrice = 1500;
const minOrderValue = 5000;


function initBasket() {
    initDigitRoles();
    setDigitRoleValue('delivery_role', deliveryPrice);
    setDigitRoleValue('summary_role', 0);
}


function setElementDisplayStyle(element, dstyle) { setStyleAttribute(element, `display: ${dstyle};`); }
function setStyleAttribute(element, value) { document.getElementById(element).style = value; }
function ifBasketEmpty() { return Object.keys(basket).length == 0; }
function getBasketItemAmount(pizzaID) { return basket[pizzaID]; }


function setVisibiltyOfDivs() {
    if (ifBasketEmpty()) {
        setElementDisplayStyle('empty_basket_info', 'flex');
        setElementDisplayStyle('price_summary', 'none');
    } else {
        setElementDisplayStyle('empty_basket_info', 'none');
        setElementDisplayStyle('price_summary', 'flex');
    }
}


function renderSummarySection() {
    const basketList = Object.keys(basket);
    let priceSummary = 0;
    for (let index = 0; index < basketList.length; index++) {
        const pizzaID = basketList[index];
        priceSummary += getPizzaPrice(pizzaID) * getBasketItemAmount(pizzaID);
    }
    setDigitRoleValue('price_summary_role', priceSummary);
    setDigitRoleValue('summary_role', priceSummary + deliveryPrice);
}


function getBasketItemHtml(pizzaID) {
    const pizza = getPizzaInfo(pizzaID);
    const amount = basket[pizzaID];
    return `
    <div id="basketitem_${pizza.ID}" class="m_x_2 font_16b basket_item">
      <div class="flex_r_jfs_afs flex_gap_2 flex_grow_1 p_y_2">
        <span id="amount1_${pizza.ID}">${amount}</span>
        <div class="flex_c_jfs_ast flex_gap_2 flex_grow_1">
            <div class="flex_r_jsb_ace">
                <span>${pizza.name}</span>
                <div id="basketitem_${pizza.ID}_summary" digitrole_template="XX0,00€" class="digitrole"></div>
            </div>
            <div class="flex_r_jfe_ace flex_gap_2">
                <button onclick="increaseBasket('${pizza.ID}')">-</button>
                <span id="amount2_${pizza.ID}" style="width: 30px; text-align: center;">${amount}</span>
                <button onclick="decreaseBasket('${pizza.ID}')">+</button>
                <button onclick="deleteFromBasket('${pizza.ID}')"><img src="./img/trash.svg" alt=""></button>
            </div>
        </div>
      </div>
    </div>`;
}


function addNewBasketItem(pizzaID) {
    setVisibiltyOfDivs();
    document.getElementById('basket_list').innerHTML += getBasketItemHtml(pizzaID);
    initDigitRole(document.getElementById(`basketitem_${pizzaID}_summary`));
    setDigitRoleValue(`basketitem_${pizzaID}_summary`, getPizzaPrice(pizzaID));
}


function updateBasketItem(pizzaID) {
    const amount = basket[pizzaID];
    document.getElementById('amount1_' + pizzaID).innerHTML = amount;
    document.getElementById('amount2_' + pizzaID).innerHTML = amount;
    setDigitRoleValue(`basketitem_${pizzaID}_summary`, getPizzaInfo(pizzaID).price * amount);
}


function deleteFromBasket(pizzaID) {
    const basketItem = document.getElementById('basketitem_' + pizzaID);
    basketItem.style = `max-height: 0; border-bottom: 0px solid rgba(0,0,0,0);`;
    setTimeout(() => { basketItem.remove(); }, 600);
    delete basket[pizzaID];
    renderSummarySection();
}

// increase
// decrease
function increaseBasket(pizzaID) {
    basket[pizzaID]--;
    if (basket[pizzaID] == 0) deleteFromBasket(pizzaID);
    else {
        updateBasketItem(pizzaID);
        renderSummarySection();
    }
}


function decreaseBasket(pizzaID) {
    if (basket[pizzaID]) {
        basket[pizzaID]++;
        updateBasketItem(pizzaID);
    } else {
        basket[pizzaID] = 1;
        addNewBasketItem(pizzaID);
    }
    renderSummarySection();
}
