let sidebar = document.querySelector(".sidebar");
let closeBtn = document.querySelector("#btn");

function changeMainWindow(page) {
    let myitems = document.getElementById("myitems-section");
    let wiki_cars = document.getElementById("wiki-cars-section");
    let wiki_bumpers = document.getElementById("wiki-bumpers-section");
    let wiki_wheels = document.getElementById("wiki-wheels-section");
    let settings = document.getElementById("settings-section");
    let articles = document.getElementById("articles-section");
    let contracts = document.getElementById("contracts-section");
    let trade = document.getElementById("trade-section");
    let auctions = document.getElementById("auctions-section");
    myitems.hidden = true;
    wiki_cars.hidden = true;
    wiki_bumpers.hidden = true;
    wiki_wheels.hidden = true;
    settings.hidden = true;
    articles.hidden = true;
    contracts.hidden = true;
    auctions.hidden = true;
    trade.hidden = true;
    let selected_elements = document.getElementsByClassName("selected");
    for (let i = 0; i < selected_elements.length; i++) {
        selected_elements.item(i).className = "svg-container";
    }
    if (page === "myitems") {
        myitems.hidden = false;
        document.getElementById("sidebar-myitems").children.item(0).className = "svg-container selected";
        setLocation("myitems");
    } else if (page === "wiki_cars") {
        wiki_cars.hidden = false;
        document.getElementById("sidebar-wiki-cars").children.item(0).className = "svg-container selected";
        setLocation("wiki_cars");
    } else if (page === "wiki_bumpers") {
        wiki_bumpers.hidden = false;
        document.getElementById("sidebar-wiki-cars").children.item(0).className = "svg-container selected";
        setLocation("wiki_bumpers");
    } else if (page === "wiki_wheels") {
        wiki_wheels.hidden = false;
        document.getElementById("sidebar-wiki-cars").children.item(0).className = "svg-container selected";
        setLocation("wiki_wheels");
    } else if (page === "settings") {
        settings.hidden = false;
        document.getElementById("sidebar-settings").children.item(0).className = "svg-container selected";
        setLocation("settings");
    } else if (page === "articles") {
        articles.hidden = false;
        document.getElementById("sidebar-articles").children.item(0).className = "svg-container selected";
        setLocation("articles");
    } else if (page === "contracts") {
        contracts.hidden = false;
        document.getElementById("sidebar-contracts").children.item(0).className = "svg-container selected";
        setLocation("contracts");
    } else if (page === "trade") {
        trade.hidden = false;
        document.getElementById("sidebar-trade").children.item(0).className = "svg-container selected";
        setLocation("trade");
    } else if (page === "auctions") {
        auctions.hidden = false;
        document.getElementById("sidebar-auctions").children.item(0).className = "svg-container selected";
        setLocation("auctions");
    }
}

function setLocation(curLoc) {
    try {
        history.pushState(null, null, curLoc);
        return;
    } catch (e) {
    }
    location.hash = '#' + curLoc;
}

let pages = ['myitems', 'settings', 'wiki_cars', 'wiki_wheels', 'wiki_bumpers', 'trade', 'contracts', 'articles', 'auctions'];
if (window.location.pathname === "/") {
    changeMainWindow("wiki_cars");
} else {
    pages.forEach((item) => {
        if (window.location.pathname.slice(1) === item) {
            changeMainWindow(item);
        }
    });
}
