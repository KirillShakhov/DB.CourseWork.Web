let create_tasks_button = document.getElementById("create-task-button");
let delete_task_selected_button = document.getElementById("delete-task-selected-button");
let my_items_count = 0;
let windows_name = "car";


delete_task_selected_button.onclick = () => {
    let p = document.getElementsByClassName("checkbox-item");
    for (let i = 0; i < p.length; i++) {
        if (p.item(i).checked === true) {
            removeItem(p.item(i).value);
        }
    }
}


function updateItemTable() {
    let tasks = document.getElementById("tbody-items");
    $.ajax({
        url: '/items',
        method: 'get',
    }).done(function (data) {
        while (tasks.firstChild) {
            tasks.removeChild(tasks.firstChild);
        }
        my_items_count = 0;
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
                "                        <input type=\"checkbox\" class='checkbox-item' value='" + i['id_item'] + "' onclick='updateSelectedItemsCount();'>\n" +
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
                "<td style='padding-left: 1%'>" + ('000' + ++my_items_count).slice(-4) + "</td>\n" +
                "            <td>" + type + "</td>\n" +
                "            <td>" + type_name + "</td>\n" +
                "            <td>" + i['description'] + "</td>\n" +
                "            <td>" + "<img width='150' src=" + i['real_photo'] + " alt=" + i['real_photo'] + ">" + "</td>\n" +
                "            <td>\n" +
                "                <button class=\"btn-none\" style=\"margin-left: 15px;\" onclick='tradeItemWindow(" + i['id_item'] + ");'>\n" +
                "                      <b style='font-size: 22px;'>$</b>" +
                "                </button>\n" +
                "                <button class=\"btn-none\" style=\"margin-left: 15px;\" onclick='showLogs(" + i["id"] + ");'>\n" +
                "                    <svg width=\"16\" height=\"20\" viewBox=\"0 0 16 20\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" transform=\"scale(0.9) translate(0 -2)\">\n" +
                "                       <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M0.781049 0.7988C1.28115 0.287337 1.95942 0 2.66667 0H9.77778C10.0135 0 10.2396 0.0957789 10.4063 0.266267L15.7397 5.72081C15.9064 5.8913 16 6.12253 16 6.36364V17.2727C16 17.996 15.719 18.6897 15.219 19.2012C14.7189 19.7127 14.0406 20 13.3333 20H2.66667C1.95942 20 1.28115 19.7127 0.781049 19.2012C0.280952 18.6897 0 17.996 0 17.2727V2.72727C0 2.00396 0.280951 1.31026 0.781049 0.7988ZM2.66667 1.81818C2.43092 1.81818 2.20483 1.91396 2.03813 2.08445C1.87143 2.25494 1.77778 2.48617 1.77778 2.72727V17.2727C1.77778 17.5138 1.87143 17.7451 2.03813 17.9156C2.20483 18.086 2.43092 18.1818 2.66667 18.1818H13.3333C13.5691 18.1818 13.7952 18.086 13.9619 17.9156C14.1286 17.7451 14.2222 17.5138 14.2222 17.2727V6.74019L9.40959 1.81818H2.66667Z\" fill=\"#F1F1F1\"/>\n" +
                "                       <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M9.7778 0C10.2687 0 10.6667 0.407014 10.6667 0.909091V5.45455H15.1111C15.6021 5.45455 16 5.86156 16 6.36364C16 6.86571 15.6021 7.27273 15.1111 7.27273H9.7778C9.28689 7.27273 8.88892 6.86571 8.88892 6.36364V0.909091C8.88892 0.407014 9.28689 0 9.7778 0Z\" fill=\"#F1F1F1\"/>\n" +
                "                       <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M3.55566 10.9091C3.55566 10.407 3.95363 10 4.44455 10H11.5557C12.0466 10 12.4446 10.407 12.4446 10.9091C12.4446 11.4112 12.0466 11.8182 11.5557 11.8182H4.44455C3.95363 11.8182 3.55566 11.4112 3.55566 10.9091Z\" fill=\"#F1F1F1\"/>\n" +
                "                       <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M3.55566 14.5454C3.55566 14.0434 3.95363 13.6364 4.44455 13.6364H11.5557C12.0466 13.6364 12.4446 14.0434 12.4446 14.5454C12.4446 15.0475 12.0466 15.4545 11.5557 15.4545H4.44455C3.95363 15.4545 3.55566 15.0475 3.55566 14.5454Z\" fill=\"#F1F1F1\"/>\n" +
                "                       <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M3.55566 7.27274C3.55566 6.77066 3.95363 6.36365 4.44455 6.36365H6.22233C6.71325 6.36365 7.11122 6.77066 7.11122 7.27274C7.11122 7.77482 6.71325 8.18183 6.22233 8.18183H4.44455C3.95363 8.18183 3.55566 7.77482 3.55566 7.27274Z\" fill=\"#F1F1F1\"/>\n" +
                "                   </svg>\n" +
                "                </button>\n" +
                "            </td>";
            tasks.appendChild(tr);
            updateSelectedItemsCount();
        });
    });
}

function showLogs(id) {
    removeAllWindows();
    $.ajax({
        url: '/status_tasks',
        method: 'get',
    }).done(function (data) {
        let home = document.getElementById("windows-container");
        let create_task_window = document.createElement("div");
        create_task_window.id = "logs-window";
        create_task_window.className = "blur-window add-proxy-window account-window";
        create_task_window.innerHTML = "        <div class=\"account-window-top-container\">\n" +
            "                Logs\n" +
            "        </div>\n" +
            "        <div class=\"add-proxy-container task-log-container\">\n" +
            "            <div class=\"textarea add-proxy-textarea task-log-area overflow\" id='logs-area'>\n" +
            "            </div>\n" +
            "        </div>\n" +
            "        <div style=\"position: relative; margin-top: 430px; margin-left: 360px\">\n" +
            "            <button class=\"button-active\" onclick='document.getElementById(\"logs-window\").remove();'>закрыть</button>\n" +
            "        </div>";
        home.appendChild(create_task_window);
        let textarea = document.getElementById('logs-area');
        let list = [];
        data['list'].forEach(i => {
            if (i['id'] === id) {
                i['tasks'].forEach(t => {
                    t["logs"].split("\n").forEach(dl => {
                        if (dl !== '') {
                            let dd = dl.split('###', 2);
                            list.push(dd[1]);
                            // [Date.parse(dd[0])],
                            // list.sort();
                        }
                    });
                });
            }
        });
        list.forEach((i1) => {
            let s = document.createElement("div");
            s.innerHTML = i1;
            textarea.appendChild(s);
        });
    });
}

create_tasks_button.onclick = () => {
    removeAllWindows();
    let home = document.getElementById("windows-container");
    let create_profile_window = document.createElement("div");
    create_profile_window.innerHTML = "<div class=\"blur-window create-profile\" id=\"create-item-window\">\n" +
        "        <div class=\"container top-container\">\n" +
        "            <div class=\"menu-slider unselectable\">\n" +
        "                <div class=\"menu-slider-item\" id=\"item-car-button\" onclick='windows_name = \"car\";updateItemWindow();'>Машинка</div>\n" +
        "                <div class=\"menu-slider-item\" id=\"item-bumper-button\" onclick='windows_name = \"bumper\";updateItemWindow();'>Бампер</div>\n" +
        "                <div class=\"menu-slider-item\" id=\"item-wheels-button\" onclick='windows_name = \"wheels\";updateItemWindow();'>Колеса</div>\n" +
        "            </div>\n" +
        "            <div class=\"border-b-line\"></div>\n" +
        "        </div>\n" +
        "        <div>\n" +
        "            <div class=\"container profile-container\" id=\"car-container\" hidden>\n" +
        "                <div class=\"middle-container-text\">Выберите машинку:</div>\n" +
        "                <div class=\"middle-container-text\" style=\"margin-top: 70px\">Описание:</div>\n" +
        "                <div class=\"middle-container-text\" style=\"margin-top: 145px\">Фото:</div>\n" +
        "                  <select class=\"group-selector\" id=\"create-window-cars-group-selector\" onchange=\"updateCrateWindowCarSelector();\"" +
        "                       style=\"position: absolute;margin-left: 10px;margin-top: 30px; width:160px;\">\n" +
        "                       <option value='null'>Выберите серию...</option>" +
        "                  </select>" +
        "                  <select class=\"group-selector\" id=\"create-window-cars-selector\" onchange=\"\"" +
        "                       style=\"position: absolute;margin-left: 190px;margin-top: 30px; width:180px;\">\n" +
        "                       <option value='null'><--</option>" +
        "                  </select>" +
        "                <input type=\"text\" id=\"ItemCarDesInput\" placeholder=\"Не бита, не крашена\" value=\"\"\n" +
        "                       style=\"position: absolute;margin-left: 10px;margin-top: 100px; width:220px;\">\n" +
        "                <div class=\"border-b-line\" style=\"width: 250px;top: 125px;\"></div>\n" +
        "                <input type=\"text\" id=\"ItemCarPhotoInput\" placeholder=\"https://www.google.com/url...\" value=\"\"\n" +
        "                       style=\"position: absolute;margin-left: 10px;margin-top: 175px; width:220px;\">\n" +
        "                <div class=\"border-b-line\" style=\"width: 250px;top: 200px;\"></div>\n" +
        "            </div>\n" +
        "            <div class=\"container profile-container\" id=\"bumper-container\" hidden>\n" +
        "                <div class=\"middle-container-text\">Выберите бампер:</div>\n" +
        "                <div class=\"middle-container-text\" style=\"margin-top: 70px\">Описание:</div>\n" +
        "                <div class=\"middle-container-text\" style=\"margin-top: 145px\">Фото:</div>\n" +
        "                  <select class=\"group-selector\" id=\"create-window-bumper-selector\" onchange=\"\"" +
        "                       style=\"position: absolute;margin-left: 10px;margin-top: 30px; width:220px;\">\n" +
        "                       <option value='null'>Выберите бампер...</option>" +
        "                  </select>" +
        "                <input type=\"text\" id=\"ItemBumperDesInput\" placeholder=\"Куплен на алике\" value=\"\"\n" +
        "                       style=\"position: absolute;margin-left: 10px;margin-top: 100px; width:220px;\">\n" +
        "                <div class=\"border-b-line\" style=\"width: 250px;top: 125px;\"></div>\n" +
        "                <input type=\"text\" id=\"ItemBumperPhotoInput\" placeholder=\"https://www.google.com/url...\" value=\"\"\n" +
        "                       style=\"position: absolute;margin-left: 10px;margin-top: 175px; width:220px;\">\n" +
        "                <div class=\"border-b-line\" style=\"width: 250px;top: 200px;\"></div>\n" +
        "            </div>\n" +
        "            <div class=\"container profile-container\" id=\"wheels-container\" hidden>\n" +
        "                <div class=\"middle-container-text\">Выберите колеса:</div>\n" +
        "                <div class=\"middle-container-text\" style=\"margin-top: 70px\">Описание:</div>\n" +
        "                <div class=\"middle-container-text\" style=\"margin-top: 145px\">Фото:</div>\n" +
        "                  <select class=\"group-selector\" id=\"create-window-wheels-selector\" onchange=\"\"" +
        "                       style=\"position: absolute;margin-left: 10px;margin-top: 30px; width:220px;\">\n" +
        "                       <option value='null'>Выберите колеса...</option>" +
        "                  </select>" +
        "                <input type=\"text\" id=\"ItemWheelsDesInput\" placeholder=\"Снял с соседсой машины\" value=\"\"\n" +
        "                       style=\"position: absolute;margin-left: 10px;margin-top: 100px; width:220px;\">\n" +
        "                <div class=\"border-b-line\" style=\"width: 250px;top: 125px;\"></div>\n" +
        "                <input type=\"text\" id=\"ItemWheelsPhotoInput\" placeholder=\"https://www.google.com/url...\" value=\"\"\n" +
        "                       style=\"position: absolute;margin-left: 10px;margin-top: 175px; width:220px;\">\n" +
        "                <div class=\"border-b-line\" style=\"width: 250px;top: 200px;\"></div>\n" +
        "            </div>\n" +
        "        </div>\n" +
        "        <span style=\"position: absolute; left: 180px;\">" +
        "           <button class=\"button-active\" onclick='document.getElementById(\"create-item-window\").remove();'>Закрыть</button>\n" +
        "           <button type=\"submit\" class=\"red-button\" id='create-profile-next-button' onclick='createItem();'>Добавить</button>\n" +
        "        </span>" +
        "    </div>";
    home.appendChild(create_profile_window);
    windows_name = "car";
    updateItemWindow();
};

function removeItem(id) {
    $.ajax({
        url: '/items/remove',
        method: 'post',
        data: {
            id: id
        }
    }).done((data) => {
        if (data["status"] === "ok") {
            tempAlert("Предмет удален", 3000);
        } else {
            if(data["message"].includes('org.hibernate.exception.ConstraintViolationException')){
                tempErrorAlert("Предмет уже где-то используется", 3000);
            }else{
                tempErrorAlert(data["message"], 3000);
            }
        }
        updateItemTable();
    });
}

function updateSelectedItemsCount() {
    let count = 0;
    let p = document.getElementsByClassName("checkbox-item");
    for (let i = 0; i < p.length; i++) {
        if (p.item(i).checked === true) {
            count++;
        }
    }
    if (my_items_count !== 0) document.getElementById("checkbox-all-items").checked = count === my_items_count;
    document.getElementById("items_stats").innerText = "Всего: " + my_items_count + "/Выбрано: " + count;
}

function selectAllContract() {
    let checkbox = document.getElementById("checkbox-all-items");
    if (checkbox.checked === true) {
        let p = document.getElementsByClassName("checkbox-item");
        for (let i = 0; i < p.length; i++) {
            p.item(i).checked = true;
        }
        document.getElementById("items_stats").innerText = "Всего: " + my_items_count + "/Выбрано: " + my_items_count;
    } else {
        let p = document.getElementsByClassName("checkbox-item");
        for (let i = 0; i < p.length; i++) {
            p.item(i).checked = false;
        }
        document.getElementById("items_stats").innerText = "Всего: " + my_items_count + "/Выбрано: 0";
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
        updateItemTable();
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

        // cars_count = 0;
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

function tradeItemWindow(id_item) {
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
        "           <button class=\"button-active\" onclick='document.getElementById(\"create-profile-window\").remove();'>закрыть</button>\n" +
        "           <button type=\"submit\" class=\"red-button\" id='create-bumpers-button' onclick='tradeItem(" + id_item + ",document.getElementById(\"PriceItemInput\").value);document.getElementById(\"create-profile-window\").remove();'>Сохранить</button>\n" +
        "        </span>" +
        "    </div>";
    home.appendChild(create_profile_window);
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
        updateItemTable();
    });
}

function selectAllItems() {
    let checkbox = document.getElementById("checkbox-all-items");
    if (checkbox.checked === true) {
        let p = document.getElementsByClassName("checkbox-item");
        for (let i = 0; i < p.length; i++) {
            p.item(i).checked = true;
        }
        document.getElementById("items_stats").innerText = "Всего: " + my_items_count + "/Выбрано: " + my_items_count;
    } else {
        let p = document.getElementsByClassName("checkbox-item");
        for (let i = 0; i < p.length; i++) {
            p.item(i).checked = false;
        }
        document.getElementById("items_stats").innerText = "Всего: " + my_items_count + "/Выбрано: 0";
    }
}

updateItemTable();