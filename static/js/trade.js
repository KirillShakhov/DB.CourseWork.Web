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
            let type, type_name;
            if (i['item']['car'] != null) {
                type = "Car";
                type_name = i['item']['car']['name']
            } else if (i['item']['bumper'] != null) {
                type = "Bumper";
                type_name = i['item']['bumper']['name']
            } else if (i['item']['wheels'] != null) {
                type = "Wheels";
                type_name = i['item']['wheels']['name']
            }
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
                "            <td style='color: #FFD800; font-size: 22px;'>" + i['price'] + "</td>";

            tasks.appendChild(tr);
            updateSelectedTradeItemsCount();
        });
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