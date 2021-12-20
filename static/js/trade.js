let trade_selected_button = document.getElementById("trade-selected-button");
let trade_count = 0;


trade_selected_button.onclick = () => {
    let p = document.getElementsByClassName("checkbox-trade");
    for (let i = 0; i < p.length; i++) {
        if (p.item(i).checked === true) {
            buyItem(p.item(i).value);
        }
    }
}


function updateTradeTable() {
    let tasks = document.getElementById("tbody-trade");
    $.ajax({
        url: '/trade/get',
        method: 'get',
    }).done(function (data) {
        while (tasks.firstChild) {
            tasks.removeChild(tasks.firstChild);
        }
        trade_count = 0;
        data["list"].forEach((i) => {
            let tr = document.createElement("tr");
            tr.id = "trade_" + i['id'];
            let type, type_name, id_item;
            if (i['item']['car'] != null) {
                type = "Машина";
                type_name = i['item']['car']['name'];
                id_item = i['item']['car']['id_car'];
            } else if (i['item']['bumper'] != null) {
                type = "Бампер";
                type_name = i['item']['bumper']['name'];
                id_item = i['item']['bumper']['id_bumper'];
            } else if (i['item']['wheels'] != null) {
                type = "Колеса";
                type_name = i['item']['wheels']['name'];
                id_item = i['item']['wheels']['id_wheels'];
            }
            let removeButton = i['item']['owner']['username'] === myname ? "<button class=\"btn-none\" style=\"margin-left: 10px;\" onclick='removeTrade(" + i['item']['id_item'] + ")'>\n" +
                            "                    <svg width=\"14\" height=\"24\" viewBox=\"0 0 20 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
                            "                        <path d=\"M1 5.5791H3H19\" stroke=\"#F1F1F1\" stroke-width=\"2\" stroke-linecap=\"round\"\n" +
                            "                              stroke-linejoin=\"round\"></path>\n" +
                            "                        <path d=\"M6 5.5783V3.52499C6 2.98042 6.21071 2.45815 6.58579 2.07308C6.96086 1.68801 7.46957 1.47168 8 1.47168H12C12.5304 1.47168 13.0391 1.68801 13.4142 2.07308C13.7893 2.45815 14 2.98042 14 3.52499V5.5783M17 5.5783V19.9515C17 20.496 16.7893 21.0183 16.4142 21.4034C16.0391 21.7884 15.5304 22.0048 15 22.0048H5C4.46957 22.0048 3.96086 21.7884 3.58579 21.4034C3.21071 21.0183 3 20.496 3 19.9515V5.5783H17Z\"\n" +
                            "                              stroke=\"#F1F1F1\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n" +
                            "                    </svg>\n" +
                            "                </button>\n" : "";
            tr.innerHTML = "<td style='padding-left: 2%; width: 5%'>" +
                "                   <label class=\"my-checkbox\">\n" +
                "                        <input type=\"checkbox\" class='checkbox-trade' value='" + i['id'] + "' onclick='updateSelectedTradeItemsCount();'>\n" +
                "                        <div class=\"check-container grey\">\n" +
                "                            <svg class=\"\" width=\"15\" height=\"10\" viewBox=\"0 0 15 10\" fill=\"none\"\n" +
                "                                 xmlns=\"http://www.w3.org/2000/svg\">\n" +
                "                                <path d=\"M13 2L5.4375 9L2 5.81818\" stroke=\"#F1F1F1\" stroke-width=\"2\"\n" +
                "                                      stroke-linecap=\"square\"\n" +
                "                                      stroke-linejoin=\"round\"></path>\n" +
                "                            </svg>\n" +
                "                        </div>\n" +
                "                    </label>" +
                "                    </div></td>" +
                "<td style='padding-left: 1%'>" + ('000' + ++trade_count).slice(-4) + "</td>\n" +
                "            <td>" + type + "</td>\n" +
                "            <td>" + type_name + "</td>\n" +
                "            <td>" + i['item']['description'] + "</td>\n" +
                "            <td>" + "<img width='150' src=" + i['item']['real_photo'] + " alt=" + i['item']['real_photo'] + ">" + "</td>\n" +
                "            <td>" + i['item']['owner']['username'] + "</td>\n" +
                "            <td style='color: #FFD800; font-size: 22px;'>" + i['price'] + "</td>" +
                "            <td>" + removeButton + "</td>\n";

            tasks.appendChild(tr);
            updateSelectedTradeItemsCount();
        });
    });
}

function removeTrade(id) {
    $.ajax({
        url: '/trade/remove',
        method: 'post',
        data: {
            id: id
        }
    }).done(function (data) {
        if (data["status"] === "ok") {
            tempAlert("Снято с продажи", 3000);
            updateTradeTable();
        } else {
            tempErrorAlert(data["message"], 3000);
        }
    });
}

function buyItem(id) {
    $.ajax({
        url: '/trade/buy',
        method: 'post',
        data: {
            id: id
        }
    }).done((data) => {
        if (data["status"] === "ok") {
            tempAlert("Предмет куплен", 3000);
        } else {
            tempErrorAlert(data["message"], 3000);
        }
        updateTradeTable();
        updateItemTable();
        updateInfo();
    });
}

function updateSelectedTradeItemsCount() {
    let count = 0;
    let p = document.getElementsByClassName("checkbox-trade");
    for (let i = 0; i < p.length; i++) {
        if (p.item(i).checked === true) {
            count++;
        }
    }
    if (trade_count !== 0) document.getElementById("checkbox-all-trade").checked = count === trade_count;
    document.getElementById("trade_stats").innerText = "Всего: " + trade_count + "/Выбрано: " + count;
}

function selectAllTrade() {
    let checkbox = document.getElementById("checkbox-all-trade");
    if (checkbox.checked === true) {
        let p = document.getElementsByClassName("checkbox-trade");
        for (let i = 0; i < p.length; i++) {
            p.item(i).checked = true;
        }
        document.getElementById("trade_stats").innerText = "Всего: " + trade_count + "/Выбрано: " + trade_count;
    } else {
        let p = document.getElementsByClassName("checkbox-trade");
        for (let i = 0; i < p.length; i++) {
            p.item(i).checked = false;
        }
        document.getElementById("trade_stats").innerText = "Всего: " + trade_count + "/Выбрано: 0";
    }
}

function tradeItem(id, price) {
    $.ajax({
        url: '/trade/create',
        method: 'post',
        data: {
            id: id,
            price: price
        }
    }).done(function (data) {
        if (data["status"] === "ok") {
            tempAlert("Предмет выставлен на продажу", 3000);
        } else {
            tempErrorAlert(data["message"], 3000);
        }
        updateTradeTable();
    });
}

updateTradeTable();