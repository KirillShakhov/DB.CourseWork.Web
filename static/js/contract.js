let create_contract_button = document.getElementById("create-contract-button");
let contract_selected_button = document.getElementById("contract-selected-button");
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
                "        <input type=\"text\" id=\"ClosingTimeCreateContractInput\" name=\"NameInput\" placeholder=\"Время окончания. Необязательно\" value=\"\"\n" +
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
        "           <button class=\"button-active\" onclick='document.getElementById(\"create-profile-window\").remove();'>Cancel</button>\n" +
        "           <button type=\"submit\" class=\"red-button\" id='create-bumpers-button' onclick='createContract();'>Save</button>\n" +
        "        </span>" +
        "    </div>";
    home.appendChild(create_profile_window);
    updateCreateContractTable();
}

function createContract(){
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
    if(ForNameCreateContractInput.value !== '') dat['to_user'] = ForNameCreateContractInput.value
    if(ClosingTimeCreateContractInput.value !== '') dat['closing_time'] = ClosingTimeCreateContractInput.value

    let items = [];
    let p = document.getElementsByClassName("checkbox-create-contract");
    for (let i = 0; i < p.length; i++) {
        if (p.item(i).checked === true) {
           items.push(p.item(i).value);
        }
    }
    if(items != null) dat['items'] = items

    $.ajax({
        url: '/contract/create',
        method: 'post',
        data: dat
    }).done(function (data) {
        if (data["status"] === "ok") {
            tempAlert("Контракт добавлен", 3000);
            updatebumpersTable();
        } else {
            if(data["message"] === "could not execute statement;"){
                tempErrorAlert("Один из предметов используется в другом контракте", 3000);
            }
            else {
                tempErrorAlert(data["message"], 3000);
            }
        }
    });
    removeAllWindows();
}

function selectAllCreateContract(){
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
        tasks_count = 0;
        data["list"].forEach((i) => {
            let tr = document.createElement("tr");
            tr.id = "item_" + i['id_item'];
            let type, type_name;
            if (i['car'] != null) {
                type = "Car";
                type_name = i['car']['name']
            } else if (i['bumper'] != null) {
                type = "Bumper";
                type_name = i['bumper']['name']
            } else if (i['wheels'] != null) {
                type = "Wheels";
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
                "<td style='padding-left: 1%'>" + ('000' + ++tasks_count).slice(-4) + "</td>\n" +
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
    if (count !== items_count) {
        document.getElementById("checkbox-all-create-contract").checked = false;
    }
}

contract_selected_button.onclick = () => {
    let p = document.getElementsByClassName("checkbox-contract");
    for (let i = 0; i < p.length; i++) {
        if (p.item(i).checked === true) {
            buyItem(p.item(i).value);
        }
    }
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
            tr.id = "contract_" + i['id'];
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
                "                        <input type=\"checkbox\" class='checkbox-contract' value='" + i['id'] + "' onclick='updateSelectedItemsCount();'>\n" +
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
                "            <td>" + type + "</td>\n" +
                "            <td>" + type_name + "</td>\n" +
                "            <td>" + i['item']['description'] + "</td>\n" +
                "            <td>" + "<img width='150' src=" + i['item']['real_photo'] + " alt=" + i['item']['real_photo'] + ">" + "</td>\n" +
                // "            <td>\n" +
                // "                <button class=\"btn-none\" style=\"margin-left: 15px;\" onclick='contractItemWindow(" + i['item']['id_item'] + ");'>\n" +
                // "                      <b style='font-size: 22px;'>$</b>" +
                // "                </button>\n" +
                // "                <button class=\"btn-none\" style=\"margin-left: 15px;\" onclick='showLogs(" + i['item']["id_item"] + ");'>\n" +
                // "                    <svg width=\"16\" height=\"20\" viewBox=\"0 0 16 20\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" transform=\"scale(0.9) translate(0 -2)\">\n" +
                // "                       <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M0.781049 0.7988C1.28115 0.287337 1.95942 0 2.66667 0H9.77778C10.0135 0 10.2396 0.0957789 10.4063 0.266267L15.7397 5.72081C15.9064 5.8913 16 6.12253 16 6.36364V17.2727C16 17.996 15.719 18.6897 15.219 19.2012C14.7189 19.7127 14.0406 20 13.3333 20H2.66667C1.95942 20 1.28115 19.7127 0.781049 19.2012C0.280952 18.6897 0 17.996 0 17.2727V2.72727C0 2.00396 0.280951 1.31026 0.781049 0.7988ZM2.66667 1.81818C2.43092 1.81818 2.20483 1.91396 2.03813 2.08445C1.87143 2.25494 1.77778 2.48617 1.77778 2.72727V17.2727C1.77778 17.5138 1.87143 17.7451 2.03813 17.9156C2.20483 18.086 2.43092 18.1818 2.66667 18.1818H13.3333C13.5691 18.1818 13.7952 18.086 13.9619 17.9156C14.1286 17.7451 14.2222 17.5138 14.2222 17.2727V6.74019L9.40959 1.81818H2.66667Z\" fill=\"#F1F1F1\"/>\n" +
                // "                       <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M9.7778 0C10.2687 0 10.6667 0.407014 10.6667 0.909091V5.45455H15.1111C15.6021 5.45455 16 5.86156 16 6.36364C16 6.86571 15.6021 7.27273 15.1111 7.27273H9.7778C9.28689 7.27273 8.88892 6.86571 8.88892 6.36364V0.909091C8.88892 0.407014 9.28689 0 9.7778 0Z\" fill=\"#F1F1F1\"/>\n" +
                // "                       <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M3.55566 10.9091C3.55566 10.407 3.95363 10 4.44455 10H11.5557C12.0466 10 12.4446 10.407 12.4446 10.9091C12.4446 11.4112 12.0466 11.8182 11.5557 11.8182H4.44455C3.95363 11.8182 3.55566 11.4112 3.55566 10.9091Z\" fill=\"#F1F1F1\"/>\n" +
                // "                       <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M3.55566 14.5454C3.55566 14.0434 3.95363 13.6364 4.44455 13.6364H11.5557C12.0466 13.6364 12.4446 14.0434 12.4446 14.5454C12.4446 15.0475 12.0466 15.4545 11.5557 15.4545H4.44455C3.95363 15.4545 3.55566 15.0475 3.55566 14.5454Z\" fill=\"#F1F1F1\"/>\n" +
                // "                       <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M3.55566 7.27274C3.55566 6.77066 3.95363 6.36365 4.44455 6.36365H6.22233C6.71325 6.36365 7.11122 6.77066 7.11122 7.27274C7.11122 7.77482 6.71325 8.18183 6.22233 8.18183H4.44455C3.95363 8.18183 3.55566 7.77482 3.55566 7.27274Z\" fill=\"#F1F1F1\"/>\n" +
                // "                   </svg>\n" +
                // "                </button>\n" +
                // "            </td>";
                "            <td style='color: #FFD800; font-size: 22px;'>" + i['price'] + "</td>";

            tasks.appendChild(tr);
            updateSelectedItemsCount();
        });
    });
}


function addTask(name, module, pid, amount, profile_group_id, account_group_id, proxy_group_id, filter, sizes) {
    let data = {
        name: name,
        module: module,
        filter: filter,
        sizes: sizes,
        item_id: pid,
        amount: amount,
        proxyGroup_id: proxy_group_id,
    };
    if (account_group_id !== null && account_group_id !== 'null') {
        data['accountGroup_id'] = account_group_id;
    }
    if (profile_group_id !== null && profile_group_id !== 'null') {
        data['profileGroup_id'] = profile_group_id;
    }

    $.ajax({
        url: '/add_tasks',
        method: 'post',
        data: data
    }).done(function (data) {
        if (data["status"] === "ok") {
            tempAlert("Tasks added", 3000);
            updateTasksTable();
        } else {
            tempErrorAlert(data["message"], 3000);
        }
    });
}

function buyItem(id) {
    $.ajax({
        url: '/contract/buy',
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
        updateContractTable();
        updateItemTable();
        updateInfo();
    });
}

function updateSelectedItemsCount() {
    let count = 0;
    let p = document.getElementsByClassName("checkbox-contract");
    for (let i = 0; i < p.length; i++) {
        if (p.item(i).checked === true) {
            count++;
        }
    }
    if (count !== contract_count) {
        document.getElementById("checkbox-all-items").checked = false;
    }
    document.getElementById("contract_stats").innerText = "Total: " + contract_count + "/Select: " + count;
}

function selectAllContract() {
    let checkbox = document.getElementById("checkbox-all-contract");
    if (checkbox.checked === true) {
        let p = document.getElementsByClassName("checkbox-contract");
        for (let i = 0; i < p.length; i++) {
            p.item(i).checked = true;
        }
        document.getElementById("contract_stats").innerText = "Total: " + contract_count + "/Select: " + contract_count;
    } else {
        let p = document.getElementsByClassName("checkbox-contract");
        for (let i = 0; i < p.length; i++) {
            p.item(i).checked = false;
        }
        document.getElementById("contract_stats").innerText = "Total: " + contract_count + "/Select: 0";
    }
}

function createItem() {
    let data = {};
    if (windows_name === "car") {
        data['description'] = document.getElementById("ItemCarDesInput").value;
        data['real_photo'] = document.getElementById("ItemCarPhotoInput").value;
        let create_window_cars_selector = document.getElementById('create-window-cars-selector');
        let id_car = create_window_cars_selector.options[create_window_cars_selector.selectedIndex].value;
        if (id_car !== null && id_car !== 'null') {
            data['id_car'] = id_car;
        }
    } else if (windows_name === "bumper") {
        data['description'] = document.getElementById("ItemBumperDesInput").value;
        data['real_photo'] = document.getElementById("ItemBumperPhotoInput").value;

        let create_window_bumper_selector = document.getElementById('create-window-bumper-selector');
        let id_bumper = create_window_bumper_selector.options[create_window_bumper_selector.selectedIndex].value;
        if (id_bumper !== null && id_bumper !== 'null') {
            data['id_bumper'] = id_bumper;
        }
    } else if (windows_name === "wheels") {
        data['description'] = document.getElementById("ItemWheelsDesInput").value;
        data['real_photo'] = document.getElementById("ItemWheelsPhotoInput").value;

        let create_window_wheels_selector = document.getElementById('create-window-wheels-selector');
        let id_wheels = create_window_wheels_selector.options[create_window_wheels_selector.selectedIndex].value;
        if (id_wheels !== null && id_wheels !== 'null') {
            data['id_wheels'] = id_wheels;
        }
    }
    $.ajax({
        url: '/items/create',
        method: 'post',
        data: data
    }).done(function (data) {
        if (data["status"] === "ok") {
            tempAlert("Предмет добавлен", 3000);
        } else {
            tempErrorAlert(data["message"], 3000);
        }
        updatecontractTable();
    });
    document.getElementById("create-item-window").remove();
}

function updateItemWindow() {
    let car_container = document.querySelector("#car-container");
    let bumper_container = document.querySelector("#bumper-container");
    let wheels_container = document.querySelector("#wheels-container");
    car_container.hidden = true;
    bumper_container.hidden = true;
    wheels_container.hidden = true;

    let profile_general_button = document.getElementById("item-car-button");
    let profile_delivery_button = document.getElementById("item-bumper-button");
    let profile_payment_button = document.getElementById("item-wheels-button");

    profile_general_button.className = "menu-slider-item unselectable";
    profile_delivery_button.className = "menu-slider-item unselectable";
    profile_payment_button.className = "menu-slider-item unselectable";
    if (windows_name === "car") {
        let selector = document.getElementById("create-window-cars-group-selector");
        selector.innerText = "";
        $.ajax({
            url: '/cars/groups',
            method: 'get',
        }).done(function (data) {
            if (data["list"].length !== 0) {
                let last = -1;
                data["list"].forEach((i) => {
                    let option = document.createElement("option");
                    option.value = i["id_series"];
                    option.text = i["name"];
                    selector.appendChild(option);
                    last++;
                });
                // selector.selectedIndex = last;
                updateCrateWindowCarSelector();
            } else {

            }
        });

        profile_general_button.className = "menu-slider-item unselectable active";
        car_container.hidden = false;
    } else if (windows_name === "bumper") {
        let selector = document.getElementById("create-window-bumper-selector");
        selector.innerText = "";
        $.ajax({
            url: '/bumpers',
            method: 'get',
        }).done(function (data) {
            let option = document.createElement("option");
            option.text = 'Выберите бампер';
            option.value = 'null';
            selector.appendChild(option);
            if (data["status"] === 'ok') {
                data["list"].forEach((i) => {
                    let option = document.createElement("option");
                    option.text = i['name'];
                    option.value = i['id_bumper'];
                    selector.appendChild(option);
                });
            }
        });

        profile_delivery_button.className = "menu-slider-item unselectable active";
        bumper_container.hidden = false;
    } else if (windows_name === "wheels") {
        let selector = document.getElementById("create-window-wheels-selector");
        selector.innerText = "";
        $.ajax({
            url: '/wheels',
            method: 'get',
        }).done(function (data) {
            let option = document.createElement("option");
            option.text = 'Выберите колеса';
            option.value = 'null';
            selector.appendChild(option);
            if (data["status"] === 'ok') {
                data["list"].forEach((i) => {
                    let option = document.createElement("option");
                    option.text = i['name'];
                    option.value = i['id_wheel'];
                    selector.appendChild(option);
                });
            }
        });

        profile_payment_button.className = "menu-slider-item unselectable active";
        wheels_container.hidden = false;
    }
}

function updateCrateWindowCarSelector() {
    let create_window_cars_group_selector = document.getElementById('create-window-cars-group-selector');
    let id = create_window_cars_group_selector.options[create_window_cars_group_selector.selectedIndex].value;
    let cars = document.getElementById("create-window-cars-selector");
    $.ajax({
        url: '/cars/groups/get',
        method: 'get',
        data: {
            id: id
        }
    }).done(function (data) {
        while (cars.firstChild) {
            cars.removeChild(cars.firstChild);
        }
        // cars.innerText = "";

        cars_count = 0;
        data["list"]['cars'].forEach((i) => {
            let last = -1;
            let option = document.createElement("option");
            option.value = i["id_car"];
            option.text = i["name"];
            cars.appendChild(option);
            last++;
            cars.selectedIndex = last;
        });
    });
}

function contractItemWindow(id_item) {
    removeAllWindows();
    let home = document.getElementById("windows-container");
    let create_profile_window = document.createElement("div");
    create_profile_window.innerHTML = "<div class=\"blur-window create-profile\" id=\"create-profile-window\" style='height: 300px'>\n" +
        "        <div class=\"container top-container\">\n" +
        "            <div class=\"menu-slider unselectable\">\n" +
        "                <div class=\"menu-slider-item active unselectable\" id=\"profile-general-button\">Продажа предмета</div>\n" +
        "            </div>\n" +
        "            <div class=\"border-b-line\"></div>\n" +
        "        </div>\n" +
        "        <div>\n" +
        "            <div class=\"container profile-container\" id=\"general-container\" hidden>\n" +
        "            </div>\n" +
        "            <div class=\"container profile-container\" id=\"delivery-container\" hidden>\n" +
        "            </div>\n" +
        "            <div class=\"container profile-container\" id=\"payment-container\">\n" +
        "                <div class=\"middle-container-text\">Введите цену:</div>\n" +
        "                <input type=\"text\" id=\"PriceItemInput\" name=\"NameInput\" placeholder=\"100\" value=\"\"\n" +
        "                       style=\"position: absolute;margin-left: 10px;margin-top: 50px; width: 340px;\">\n" +
        "                <div class=\"border-b-line\" style=\"width: 370px;top: 75px;\"></div>\n" +
        "            </div>\n" +
        "        </div>\n" +
        "        <span style=\"position: absolute; left: 180px; top: -180px\">" +
        "           <button class=\"button-active\" onclick='document.getElementById(\"create-profile-window\").remove();'>Cancel</button>\n" +
        "           <button type=\"submit\" class=\"red-button\" id='create-bumpers-button' onclick='contractItem("+id_item+",document.getElementById(\"PriceItemInput\").value);document.getElementById(\"create-profile-window\").remove();'>Save</button>\n" +
        "        </span>" +
        "    </div>";
    home.appendChild(create_profile_window);
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