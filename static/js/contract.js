let create_contract_button = document.getElementById("create-contract-button");
let contract_selected_button = document.getElementById("delete-contract-selected-button");
let contract_count = 0;

create_contract_button.onclick = () => {
    removeAllWindows();
    let home = document.getElementById("windows-container");
    let create_profile_window = document.createElement("div");
    create_profile_window.innerHTML = "<div class=\"blur-window create-profile\" id=\"create-profile-window\" style='height: 560px'>\n" +
        "        <div class=\"container top-container\">\n" +
        "            <div class=\"menu-slider unselectable\">\n" +
        "                <div class=\"menu-slider-item active unselectable\" id=\"profile-general-button\">Создать</div>\n" +
        "            </div>\n" +
        "            <div class=\"border-b-line\"></div>\n" +
        "        </div>\n" +
        "        <div>\n" +
        "            <div class=\"container profile-container\" id=\"general-container\" hidden>\n" +
        "            </div>\n" +
        "            <div class=\"container profile-container\" id=\"delivery-container\" hidden>\n" +
        "            </div>\n" +
        "            <div class=\"container profile-container\" id=\"payment-container\">\n" +
        "                <input type=\"text\" id=\"ForNameCreateContractInput\" name=\"NameInput\" placeholder=\"Кому\" value=\"\"\n" +
        "                        style=\"position: absolute;margin-left: 10px;margin-top: 0px; width: 350px;\">\n" +
        "                <div class=\"border-b-line\" style=\"width: 350px;top: 25px;\">" +
        "                <input type=\"text\" id=\"FromMoneyCreateContractInput\" name=\"NameInput\" placeholder=\"Сколько денег отдашь\" value=\"\"\n" +
        "                        style=\"position: absolute;margin-left: 10px;margin-top: 10px; width: 350px;\">\n" +
        "                <div class=\"border-b-line\" style=\"width: 350px;top: 35px;\">" +
        "                <input type=\"text\" id=\"ToMoneyCreateContractInput\" name=\"NameInput\" placeholder=\"Сколько денег получишь\" value=\"\"\n" +
        "                        style=\"position: absolute;margin-left: 10px;margin-top: 10px; width: 350px;\">\n" +
        "                <div class=\"border-b-line\" style=\"width: 350px;top: 35px;\">" +
        "                <input type=\"text\" id=\"ClosingDateCreateContractInput\" name=\"NameInput\" placeholder=\"Дата окончания. 2021-12-12\" value=\"\"\n" +
        "                        style=\"position: absolute;margin-left: 10px;margin-top: 10px; width: 350px;\">\n" +
        "                <div class=\"border-b-line\" style=\"width: 350px;top: 35px;\">" +
        "        <input type=\"text\" id=\"ClosingTimeCreateContractInput\" name=\"NameInput\" placeholder=\"Время окончания. 00:00 Необязательно\" value=\"\"\n" +
        "                        style=\"position: absolute;margin-left: 10px;margin-top: 10px; width: 350px;\">\n" +
        "                <div class=\"border-b-line\" style=\"width: 350px;top: 35px;\">" +
        "            </div>\n" +
        "           <div class=\"fake-scroll-container\" style='margin-top:0;'>\n" +
        "        <table class=\"table\" style='width: 380px; margin-top: 40px; margin-left: 0'>\n" +
        "            <thead>\n" +
        "            <tr>\n" +
        "                <th class=\"unselectable\" style=\"width: 5%; padding-left: 2%\">\n" +
        "                    <label class=\"my-checkbox\">\n" +
        "                        <input type=\"checkbox\" id=\"checkbox-all-create-contract\" onclick=\"selectAllCreateContract();\">\n" +
        "                        <div class=\"check-container\">\n" +
        "                            <svg class=\"\" width=\"15\" height=\"10\" viewBox=\"0 0 15 10\" fill=\"none\"\n" +
        "                                 xmlns=\"http://www.w3.org/2000/svg\">\n" +
        "                                <path d=\"M13 2L5.4375 9L2 5.81818\" stroke=\"#F1F1F1\" stroke-width=\"2\"\n" +
        "                                      stroke-linecap=\"square\"\n" +
        "                                      stroke-linejoin=\"round\"></path>\n" +
        "                            </svg>\n" +
        "                        </div>\n" +
        "                    </label>\n" +
        "                </th>\n" +
        "                <th style=\"width: 8%; padding-left: 1.5%\">#</th>\n" +
        "                <th style=\"width: 15%;\">Тип</th>\n" +
        "                <th style=\"width: 14%;\">Имя</th>\n" +
        "            </tr>\n" +
        "            </thead>\n" +
        "        </table>\n" +
        "    </div>\n" +
        "    <div class=\"scroll-container\" style='position:relative;width: 380px;height: 140px; margin-top: -40px; margin-left: 0'>\n" +
        "        <table class=\"table\" style='margin-left: 0;margin-top: 0;overflow:auto;'>\n" +
        "            <thead>\n" +
        "            <tr>\n" +
        "                <th style=\"width: 15%; padding-left: 2%\"></th>\n" +
        "                <th style=\"width: 15%; padding-left: 3%\"></th>\n" +
        "                <th style=\"width: 35%;\"></th>\n" +
        "                <th style=\"width: 35%;\"></th>\n" +
        "                <th></th>\n" +
        "            </tr>\n" +
        "            </thead>\n" +
        "            <tbody id=\"tbody-create-contract\"></tbody>\n" +
        "        </table>\n" +
        "    </div>" +
        "            </div>\n" +
        "        </div>\n" +
        "        <span style=\"position: relative; left: 140px; top: -50px\">" +
        "           <button class=\"button-active\" onclick='document.getElementById(\"create-profile-window\").remove();'>закрыть</button>\n" +
        "           <button type=\"submit\" class=\"red-button\" id='create-bumpers-button' onclick='createContract();'>Сохранить</button>\n" +
        "        </span>" +
        "    </div>";
    home.appendChild(create_profile_window);
    updateCreateContractTable();
}

function createContract() {
    let ForNameCreateContractInput = document.getElementById("ForNameCreateContractInput");
    let FromMoneyCreateContractInput = document.getElementById("FromMoneyCreateContractInput");
    let ToMoneyCreateContractInput = document.getElementById("ToMoneyCreateContractInput");
    let ClosingDateCreateContractInput = document.getElementById("ClosingDateCreateContractInput");
    let ClosingTimeCreateContractInput = document.getElementById("ClosingTimeCreateContractInput");

    let dat = {
        from_money: FromMoneyCreateContractInput.value,
        to_money: ToMoneyCreateContractInput.value,
        closing_date: ClosingDateCreateContractInput.value
    };
    if (ForNameCreateContractInput.value !== '') dat['to_user'] = ForNameCreateContractInput.value
    if (ClosingTimeCreateContractInput.value !== '') dat['closing_time'] = ClosingTimeCreateContractInput.value

    let items = [];
    let p = document.getElementsByClassName("checkbox-create-contract");
    for (let i = 0; i < p.length; i++) {
        if (p.item(i).checked === true) {
            items.push(p.item(i).value);
        }
    }
    if (items != null) dat['items'] = items

    $.ajax({
        url: '/contract/create',
        method: 'post',
        data: dat
    }).done(function (data) {
        if (data["status"] === "ok") {
            tempAlert("Контракт добавлен", 3000);
        } else {
            if (data["message"] === "could not execute statement;") {
                tempErrorAlert("Один из предметов используется в другом контракте", 3000);
            } else {
                tempErrorAlert(data["message"], 3000);
            }
        }
        updateContractTable();
    });
    removeAllWindows();
}

function selectAllCreateContract() {
    let checkbox = document.getElementById("checkbox-all-create-contract");
    if (checkbox.checked === true) {
        let p = document.getElementsByClassName("checkbox-create-contract");
        for (let i = 0; i < p.length; i++) {
            p.item(i).checked = true;
        }
    } else {
        let p = document.getElementsByClassName("checkbox-create-contract");
        for (let i = 0; i < p.length; i++) {
            p.item(i).checked = false;
        }
    }
}

function updateCreateContractTable() {
    let tasks = document.getElementById("tbody-create-contract");
    $.ajax({
        url: '/items',
        method: 'get',
    }).done(function (data) {
        while (tasks.firstChild) {
            tasks.removeChild(tasks.firstChild);
        }
        count = 0;
        data["list"].forEach((i) => {
            let tr = document.createElement("tr");
            tr.id = "item_" + i['id_item'];
            let type, type_name;
            if (i['car'] != null) {
                type = "Машина";
                type_name = i['car']['name']
            } else if (i['bumper'] != null) {
                type = "Бампер";
                type_name = i['bumper']['name']
            } else if (i['wheels'] != null) {
                type = "Колеса";
                type_name = i['wheels']['name']
            }
            tr.innerHTML = "<td style='padding-left: 2%; width: 5%'>" +
                "                   <label class=\"my-checkbox\">\n" +
                "                        <input type=\"checkbox\" class='checkbox-create-contract' value='" + i['id_item'] + "' onclick='updateSelectedCreateContract();'>\n" +
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
                "<td style='padding-left: 1%'>" + ('000' + ++count).slice(-4) + "</td>\n" +
                "            <td>" + type + "</td>\n" +
                "            <td>" + type_name + "</td>\n";
            tasks.appendChild(tr);
        });
    });
}

function updateSelectedCreateContract() {
    let count = 0;
    let p = document.getElementsByClassName("checkbox-create-contract");
    for (let i = 0; i < p.length; i++) {
        if (p.item(i).checked === true) {
            count++;
        }
    }
    if (count !== my_items_count) {
        document.getElementById("checkbox-all-create-contract").checked = false;
    }
}

contract_selected_button.onclick = () => {
    let p = document.getElementsByClassName("checkbox-contract");
    for (let i = 0; i < p.length; i++) {
        if (p.item(i).checked === true) {
            removeContract(p.item(i).value);
        }
    }
}

function removeContract(id) {
    $.ajax({
        url: '/contract/remove',
        method: 'post',
        data: {
            id: id
        }
    }).done(function (data) {
        if (data["status"] === "ok") {
            tempAlert("Контракт удален", 3000);
        } else {
            tempErrorAlert(data["message"], 3000);
        }
        updateContractTable();
    });
}

function updateContractTable() {
    let tasks = document.getElementById("tbody-contract");
    $.ajax({
        url: '/contract/get',
        method: 'get',
    }).done(function (data) {
        while (tasks.firstChild) {
            tasks.removeChild(tasks.firstChild);
        }
        contract_count = 0;
        data["list"].forEach((i) => {
            let tr = document.createElement("tr");
            tr.id = "contract_" + i['id_contract'];
            let toUser = "Общедоступный";
            if (i['to_user'] !== null) toUser = i['to_user']['username'];

            tr.innerHTML = "<td style='padding-left: 2%; width: 5%'>" +
                "                   <label class=\"my-checkbox\">\n" +
                "                        <input type=\"checkbox\" class='checkbox-contract' value='" + i['id_contract'] + "' onclick='updateSelectedContractCount();'>\n" +
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
                "<td style='padding-left: 1%'>" + ('000' + ++contract_count).slice(-4) + "</td>\n" +
                "            <td>" + i['from_user']['username'] + "</td>\n" +
                "            <td>" + toUser + "</td>\n" +
                "            <td>" + i['closing_date'] + "(" + i['closing_time'] + ")" + "</td>\n" +
                "            <td><p style='color: red;'>" + i['from_money'] + "</p>/<p style='color: green'>" + i['to_money'] + "</p></td>\n" +
                "            <td>\n" +
                "                <button class=\"btn-none\" style=\"margin-left: 15px;\" onclick='contractItemWindow(" + i['id_contract'] + ");'>\n" +
                "                       <svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" viewBox=\"0 0 96 96\" width=\"20px\" height=\"20px\">\n" +
                "                           <g id=\"surface35259549\">\n" +
                "                           <path style=\" stroke:none;fill-rule:nonzero;fill:rgb(100%,100%,100%);fill-opacity:1;\" d=\"M 20.703125 12 L 12 26.921875 L 12 84 L 84 84 L 84 26.921875 L 75.296875 12 Z M 25.296875 20 L 70.703125 20 L 75.367188 28 L 20.632812 28 Z M 36 36 L 60 36 L 60 44 L 36 44 Z M 36 36 \"/>\n" +
                "                           </g>\n" +
                "                       </svg>\n" +
                "                </button>\n" +
                "                <button class=\"btn-none\" style=\"margin-left: 15px;\" onclick='confirmContract(" + i['id_contract'] + ");'>\n" +
                "                       <svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" viewBox=\"0 0 96 96\" width=\"20px\" height=\"20px\">\n" +
                "                           <g id=\"surface35259549\">\n" +
                "                           <path style=\" stroke:none;fill-rule:nonzero;fill:rgb(100%,100%,100%);fill-opacity:1;\" d=\"M 20.703125 12 L 12 26.921875 L 12 84 L 84 84 L 84 26.921875 L 75.296875 12 Z M 25.296875 20 L 70.703125 20 L 75.367188 28 L 20.632812 28 Z M 36 36 L 60 36 L 60 44 L 36 44 Z M 36 36 \"/>\n" +
                "                           </g>\n" +
                "                       </svg>\n" +
                "                </button>\n" +
                "           </td>";
            tasks.appendChild(tr);
            updateSelectedContractCount();
        });
    });
}

function confirmContract(id) {
    $.ajax({
        url: '/contract/confirm',
        method: 'post',
        data: {
            id: id
        }
    }).done(function (data) {
        if (data["status"] === "ok") {
            tempAlert("Контракт принят", 3000);
        } else {
            tempErrorAlert(data["message"], 3000);
        }
        updateContractTable();
    });
}


function updateSelectedContractCount() {
    let count = 0;
    let p = document.getElementsByClassName("checkbox-contract");
    for (let i = 0; i < p.length; i++) {
        if (p.item(i).checked === true) {
            count++;
        }
    }
    if (contract_count !== 0) document.getElementById("checkbox-all-contract").checked = count === contract_count;
    document.getElementById("contract_stats").innerText = "Всего: " + contract_count + "/Выбрано: " + count;
}

function selectAllContract() {
    let checkbox = document.getElementById("checkbox-all-contract");
    if (checkbox.checked === true) {
        let p = document.getElementsByClassName("checkbox-contract");
        for (let i = 0; i < p.length; i++) {
            p.item(i).checked = true;
        }
        document.getElementById("contract_stats").innerText = "Всего: " + contract_count + "/Выбрано: " + contract_count;
    } else {
        let p = document.getElementsByClassName("checkbox-contract");
        for (let i = 0; i < p.length; i++) {
            p.item(i).checked = false;
        }
        document.getElementById("contract_stats").innerText = "Всего: " + contract_count + "/Выбрано: 0";
    }
}

function contractItemWindow(id_item) {
    removeAllWindows();
    let home = document.getElementById("windows-container");
    let create_profile_window = document.createElement("div");
    create_profile_window.innerHTML = "<div class=\"blur-window create-profile\" id=\"create-profile-window\" style='height: 500px'>\n" +
        "        <div class=\"container top-container\">\n" +
        "            <div class=\"menu-slider unselectable\">\n" +
        "                <div class=\"menu-slider-item active unselectable\" id=\"profile-general-button\">Предметы входящие в контракт</div>\n" +
        "            </div>\n" +
        "            <div class=\"border-b-line\"></div>\n" +
        "        </div>\n" +
        "        <div>\n" +
        "            <div class=\"container profile-container\" id=\"general-container\" hidden>\n" +
        "            </div>\n" +
        "            <div class=\"container profile-container\" id=\"delivery-container\" hidden>\n" +
        "            </div>\n" +
        "            <div class=\"container profile-container\" id=\"payment-container\">\n" +
        "           <div class=\"fake-scroll-container\" style='margin-top:0;'>\n" +
        "        <table class=\"table\" style='width: 380px; margin-top: 20px; margin-left: 0'>\n" +
        "            <thead>\n" +
        "            <tr>\n" +
        "                <th style=\"width: 10%; padding-left: 5%\">#</th>\n" +
        "                <th style=\"width: 15%;\">Тип</th>\n" +
        "                <th style=\"width: 14%;\">Имя</th>\n" +
        "            </tr>\n" +
        "            </thead>\n" +
        "        </table>\n" +
        "    <div class=\"scroll-container\" style='position:relative;width: 380px;height: 240px; margin-top: -40px; margin-left: 0'>\n" +
        "        <table class=\"table\" style='margin-left: 0;margin-top: 0;overflow:auto;'>\n" +
        "            <thead>\n" +
        "            <tr>\n" +
        "                <th style=\"width: 10%; padding-left: 5%\"></th>\n" +
        "                <th style=\"width: 15%;\"></th>\n" +
        "                <th style=\"width: 14%;\"></th>\n" +
        "                <th></th>\n" +
        "            </tr>\n" +
        "            </thead>\n" +
        "            <tbody id=\"tbody-contract-items\"></tbody>\n" +
        "        </table>\n" +
        "    </div>" +
        "            </div>\n" +
        "        </div>\n" +
        "        <span style=\"position: absolute; left: 180px; top: 40px\">" +
        "           <button class=\"button-active\" onclick='document.getElementById(\"create-profile-window\").remove();'>закрыть</button>\n" +
        "           <button type=\"submit\" class=\"red-button\" id='create-bumpers-button' onclick='contractItem(" + id_item + ",document.getElementById(\"PriceItemInput\").value);document.getElementById(\"create-profile-window\").remove();'>Сохранить</button>\n" +
        "        </span>" +
        "    </div>";
    home.appendChild(create_profile_window);

    let tasks = document.getElementById("tbody-contract-items");
    $.ajax({
        url: '/contract/items',
        method: 'get',
        data: {
            id: id_item
        }
    }).done(function (data) {
        while (tasks.firstChild) {
            tasks.removeChild(tasks.firstChild);
        }
        contract_count = 0;
        data["list"].forEach((i) => {
            let type, type_name;
            if (i['car'] != null) {
                type = "Машина";
                type_name = i['car']['name']
            } else if (i['bumper'] != null) {
                type = "Бампер";
                type_name = i['bumper']['name']
            } else if (i['wheels'] != null) {
                type = "Колеса";
                type_name = i['wheels']['name']
            }
            let tr = document.createElement("tr");
            tr.id = "contract_item_" + i['id_item'];
            tr.innerHTML = "<td style='padding-left: 1%'>" + ('000' + ++contract_count).slice(-4) + "</td>\n" +
                "            <td>" + type + "</td>\n" +
                "            <td>" + type_name + "</td>\n" +
                "";
            tasks.appendChild(tr);
            updateSelectedContractCount();
        });
    });
}

function contractItem(id, price) {
    $.ajax({
        url: '/contract/create',
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
        updateContractTable();
    });
}

updateContractTable();