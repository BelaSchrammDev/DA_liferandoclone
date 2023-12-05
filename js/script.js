function init() {
    includeHTML();
    initMenu();
    initBasket();
    renderMenu();
    setVisibiltyOfDivs();
}


async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html");
        let resp = await fetch(file);
        if (resp.ok) {
            let htmlText = await resp.text();
            element.innerHTML = htmlText;
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}


function ifResponsiv() { return getCssVariable_Bool('--responsiv'); }
function getCssVariable_String(varName) { return window.getComputedStyle(document.body).getPropertyValue(varName); }
function getCssVariable_Bool(varName) { return getCssVariable_String(varName) == 'true'; }
function getCssVariable_Number(varName) { return +getCssVariable_String(varName); }
function setCssVariable(varName, value) { document.querySelector(':root').style.setProperty(varName, value); }
