let lastKnownScrollPosition = 0;
let ticking = false;


function init() {
    includeHTML();
    initMenu();
    initBasket();
    renderMenu();
    setVisibiltyOfDivs();
    addScrollBehavior();
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


function addScrollBehavior() {
    document.addEventListener("scroll", () => {
        lastKnownScrollPosition = window.scrollY;
        if (!ticking) {
            window.requestAnimationFrame(() => {
                changeScrollPosition(lastKnownScrollPosition);
                ticking = false;
            });
            ticking = true;
        }
    });
}


function changeScrollPosition(yPos) {
    const headerHeight = document.getElementsByTagName('header')[0].clientHeight;
    setCssVariable('--basket_margin_top', `${Math.max(yPos - headerHeight, 0)}px`);
}


function ifResponsiv() { return getCssVariable_Bool('--responsiv'); }
function getCssVariable_String(varName) { return window.getComputedStyle(document.body).getPropertyValue(varName); }
function getCssVariable_Bool(varName) { return getCssVariable_String(varName) == 'true'; }
function getCssVariable_Number(varName) { return +getCssVariable_String(varName); }
function setCssVariable(varName, value) { document.querySelector(':root').style.setProperty(varName, value); }
