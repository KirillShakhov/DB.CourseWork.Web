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
            removeContract(p.item(i).value);
        }
    }
}

function removeContract(id){
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
                "            <td>" + i['to_user']['username'] + "</td>\n" +
                "            <td>" + i['closing_date']+"("+ i['closing_time'] + ")" + "</td>\n" +
                "            <td><p style='color: red;'>" + i['from_money'] + "</p>/<p style='color: green'>" + i['to_money'] + "</p></td>\n" +
                // "            <td>\n" +
                "                <button class=\"btn-none\" style=\"margin-left: 15px;\" onclick='contractItemWindow(" + i['id_contract'] + ");'>\n" +
                "                       <svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" viewBox=\"0 0 96 96\" width=\"20px\" height=\"20px\">\n" +
                "                           <g id=\"surface35259549\">\n" +
                "                           <path style=\" stroke:none;fill-rule:nonzero;fill:rgb(100%,100%,100%);fill-opacity:1;\" d=\"M 20.703125 12 L 12 26.921875 L 12 84 L 84 84 L 84 26.921875 L 75.296875 12 Z M 25.296875 20 L 70.703125 20 L 75.367188 28 L 20.632812 28 Z M 36 36 L 60 36 L 60 44 L 36 44 Z M 36 36 \"/>\n" +
                "                           </g>\n" +
                "                       </svg>\n" +
                "                </button>\n" +
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
                "";
            tasks.appendChild(tr);
            updateSelectedContractCount();
        });
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
    if (count !== contract_count) {
        document.getElementById("checkbox-all-contract").checked = false;
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
    create_profile_window.innerHTML = "<div class=\"blur-window create-profile\" id=\"create-profile-window\" style='height: 500px'>\n" +
        "        <div class=\"container top-container\">\n" +
        "            <div class=\"menu-slider unselectable\">\n" +
        "                <div class=\"menu-slider-item active unselectable\" id=\"profile-general-button\">Предметы</div>\n" +
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
        "           <button class=\"button-active\" onclick='document.getElementById(\"create-profile-window\").remove();'>Cancel</button>\n" +
        "           <button type=\"submit\" class=\"red-button\" id='create-bumpers-button' onclick='contractItem("+id_item+",document.getElementById(\"PriceItemInput\").value);document.getElementById(\"create-profile-window\").remove();'>Save</button>\n" +
        "        </span>" +
        "    </div>";
    home.appendChild(create_profile_window);

    let tasks = document.getElementById("tbody-contract-items");
    $.ajax({
        url: '/contract/items',
        method: 'get',
        data:{
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
                type = "Car";
                type_name = i['car']['name']
            } else if (i['bumper'] != null) {
                type = "Bumper";
                type_name = i['bumper']['name']
            } else if (i['wheels'] != null) {
                type = "Wheels";
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