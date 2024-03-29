let basket = {};
const minOrderValue = 2000;
const deliveryPrice = 500;
const freeOrderValue = 5000;
let payAllowed = false;
const responsivQuery = window.matchMedia('(max-width: 700px)');
let isBasketResponsivShow = false;


function checkResponsivMode() {
    if (responsivQuery.matches) setResponsivMode();
    else setNonResponsivMode();
}


function setResponsivMode() {
    showBasketButton(true);
    showBasketCloseButton(true);
    setTimeout(() => {
        document.getElementById('basket').classList.add('basket_moveup');
    }, 500);
}


function setNonResponsivMode() {
    const basket = document.getElementById('basket');
    basket.classList.remove('basket_moveup');
    basket.style = '';
    showBasketButton(false);
    showBasketCloseButton(false);
    isBasketResponsivShow = false;
}


function initBasket() {
    responsivQuery.addEventListener('change', checkResponsivMode);
    initDigitRoles();
    setDigitRoleValue('delivery_role', deliveryPrice);
    setDigitRoleValue('summary_role', 0);
    setDigitRoleValue('pay_button_role', 0);
    setDigitRoleValue('basket_button_role', 0);
    checkResponsivMode();
    toggleEmptyBasketInfo();
}


function showBasketButton(show) {
    document.getElementById('basket_button_div').style = show ? 'bottom: 0;' : '';
}


function showBasketCloseButton(show) {
    document.getElementById('basket_close_button').style = show ? '' : 'display: none;';
}


function showBasket(show) {
    document.getElementById('basket').style = show ? 'margin-top: 0' : '';
    showBasketButton(!show);
    isBasketResponsivShow = show;
}


function setElementDisplayStyle(element, dstyle) { setStyleAttribute(element, `display: ${dstyle};`); }
function setStyleAttribute(element, value) { document.getElementById(element).style = value; }
function ifBasketEmpty() { return Object.keys(basket).length == 0; }
function getBasketItemAmount(pizzaID) { return basket[pizzaID]; }


function setBasketItemPrice(pizzaID, amount = 1) {
    setDigitRoleValue(`basketitem_${pizzaID}_summary`, getPizzaInfo(pizzaID).price * amount);
}


function toggleEmptyBasketInfo() {
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
    const realDeliveryCost = (priceSummary > freeOrderValue ? 0 : deliveryPrice);
    renderSummaryValues(priceSummary, realDeliveryCost);
    renderPayButton(priceSummary, realDeliveryCost);
    renderBasketButton(priceSummary, basketList.length);
}


function renderSummaryValues(priceSummary, realDeliveryCost) {
    setDigitRoleValue('price_summary_role', priceSummary);
    setDigitRoleValue('delivery_role', realDeliveryCost);
    setDigitRoleValue('summary_role', priceSummary + realDeliveryCost);
}


function renderPayButton(priceSummary, realDeliveryCost) {
    setDigitRoleValue('pay_button_role', priceSummary + realDeliveryCost);
    const payButton = document.getElementById('pay_button');
    if (priceSummary > minOrderValue) {
        payButton.classList.remove('pay_button_disabled');
        payAllowed = true;
    }
    else {
        payButton.classList.add('pay_button_disabled');
        payAllowed = false;
    }
}


function renderBasketButton(priceSummary, value) {
    setDigitRoleValue('basket_button_role', priceSummary);
    const countElement = document.getElementById('basket_button_icon_count');
    if (value == 0) countElement.style = 'display: none;';
    else countElement.style = 'display: block;';
    countElement.innerHTML = value;
}


function clickPayButton() {
    if (payAllowed) {
        alert('Vielen Dank für Ihre Bestellung.');
        basket = {};
        document.getElementById('basket_list').innerHTML = '';
        renderSummarySection();
        toggleEmptyBasketInfo();
    }
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
                <button onclick="decreaseBasket('${pizza.ID}')">-</button>
                <span id="amount2_${pizza.ID}" style="width: 30px; text-align: center;">${amount}</span>
                <button onclick="increaseBasket('${pizza.ID}')">+</button>
                <button onclick="deleteFromBasket('${pizza.ID}')"><img src="./img/trash.svg" alt=""></button>
            </div>
        </div>
      </div>
    </div>`;
}


function addNewBasketItem(pizzaID) {
    toggleEmptyBasketInfo();
    document.getElementById('basket_list').innerHTML += getBasketItemHtml(pizzaID);
    initDigitRole(document.getElementById(`basketitem_${pizzaID}_summary`));
    setBasketItemPrice(pizzaID);
}


function updateBasketItem(pizzaID) {
    const amount = basket[pizzaID];
    document.getElementById('amount1_' + pizzaID).innerHTML = amount;
    document.getElementById('amount2_' + pizzaID).innerHTML = amount;
    setBasketItemPrice(pizzaID, amount);
}


function deleteFromBasket(pizzaID) {
    const basketItem = document.getElementById('basketitem_' + pizzaID);
    basketItem.style = `min-height: 0; height: 0; border-bottom: 0px solid rgba(0,0,0,0);`;
    setTimeout(() => { basketItem.remove(); }, 600);
    delete basket[pizzaID];
    renderSummarySection();
    toggleEmptyBasketInfo();
}


function decreaseBasket(pizzaID) {
    basket[pizzaID]--;
    if (basket[pizzaID] == 0) {
        deleteFromBasket(pizzaID);
    } else {
        updateBasketItem(pizzaID);
        renderSummarySection();
    }
}


function increaseBasket(pizzaID) {
    if (basket[pizzaID]) {
        basket[pizzaID]++;
        updateBasketItem(pizzaID);
    } else {
        basket[pizzaID] = 1;
        addNewBasketItem(pizzaID);
    }
    highlightMenuPlusIcon(pizzaID);
    renderSummarySection();
}
