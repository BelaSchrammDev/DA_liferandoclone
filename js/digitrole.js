function initDigitRoles() {
    let digitroleElements = document.querySelectorAll('[digitrole_template]');
    for (let i = 0; i < digitroleElements.length; i++) {
        initDigitRole(digitroleElements[i]);
    }
}


function initDigitRole(digitrole) {
    const template = digitrole.getAttribute('digitrole_template').split('').reverse().join('');
    const digitroleID = digitrole.id;
    let digitroleInnerHTML = ''
    let digitrolecount = 1;
    for (let index = 0; index < template.length; index++) {
        const digit = template[index];
        if (digit === '0' || digit === 'X') {
            digitroleInnerHTML = getSingleDigitRole(digitroleID, digitrolecount++, digit) + digitroleInnerHTML;
        } else {
            digitroleInnerHTML = `<div>${digit}</div>${digitroleInnerHTML}`;
        }
    }
    digitrole.innerHTML = digitroleInnerHTML;
    setDigitRoleValue(digitroleID, 0);
}


function getDigitRoleID(mainID, numberID) { return mainID + '_' + numberID; }


function ifEven(number) { return number % 2 === 0; }


function getSingleDigitRole(digitroleID, digitroleNumber, digittype) {
    return `
        <div id="${getDigitRoleID(digitroleID, digitroleNumber)}"
             digit_type="${digittype}">
             <div style="margin-top: ${ifEven(digitroleNumber) ? 0 : '-1px'}">0</div><div>0</div><div> </div>
        </div>`;
}


function setDigitRoleValue(digitroleID, value) {
    const valueText = getValueStringWithZeros(digitroleID, value);
    let valueCount = 1;
    for (let index = 0; index < valueText.length; index++) {
        const digit = valueText[index];
        if (digit !== '.') setSingleDigitRoleNumber(digitroleID, valueCount++, digit);
    }
}


function getValueStringWithZeros(digitroleID, value) {
    const valueText = value.toString().split('').reverse().join('');
    let valueCount = 0;
    let returnText = '';
    const digitDivs = document.getElementById(digitroleID).children;
    for (let index = digitDivs.length - 1; index >= 0; index--) {
        const digitType = digitDivs[index].getAttribute('digit_type');
        if ('X0'.includes(digitType)) {
            if (valueCount > valueText.length - 1) returnText += digitType;
            else returnText += valueText[valueCount];
            valueCount++;
        } else returnText += '.';
    }
    return returnText;
}


function setSingleDigitRoleNumber(digitroleID, number, value) {
    const digitrole_X = document.getElementById(getDigitRoleID(digitroleID, number));
    if (digitrole_X == undefined) return;
    if (digitrole_X.getAttribute('digit_value') === value) return;
    else digitrole_X.setAttribute('digit_value', value);
    if (digitrole_X.getAttribute('digit_type') === 'X' && value === 'X') roleToInvisible(digitrole_X);
    else roleToDigit(digitrole_X, value);
}


function roleToDigit(digitrole, value) {
    const digitrole_n = digitrole.children[0];
    const digitrole_nn = digitrole.children[1];
    let newMarginTop = '0px';
    if (digitrole_n.style.getPropertyValue('margin-top') == '0px') {
        digitrole_nn.innerHTML = value;
        newMarginTop = `-${digitrole_n.clientHeight}px`
    } else {
        digitrole_n.innerHTML = value;
    }
    digitrole_n.style = ` margin-top: ${newMarginTop};`;
}


function roleToInvisible(digitrole) {
    const digitrole_n = digitrole.children[0];
    digitrole_n.style = ` margin-top: -${digitrole_n.clientHeight * 2}px;`;
}


