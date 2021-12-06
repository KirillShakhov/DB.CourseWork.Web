let create_article_button = document.getElementById("create-article-button");
let article_selected_button = document.getElementById("delete-article-selected-button");
let article_count = 0;

create_article_button.onclick = () => {
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
        "                <input type=\"text\" id=\"ForNameCreatearticleInput\" name=\"NameInput\" placeholder=\"Название статьи\" value=\"\"\n" +
        "                        style=\"position: absolute;margin-left: 10px;margin-top: 0px; width: 350px;\">\n" +
        "                <div class=\"border-b-line\" style=\"width: 350px;top: 25px;\">" +
        "        <select class=\"group-selector\" id=\"create-window-cars-group-selector\" onchange=\"updateCrateWindowCarSelector();\"" +
        "              style=\"position: absolute;margin-left: 10px;margin-top: 20px; width:160px;\">\n" +
        "              <option value='null'>Выберите серию...</option>" +
        "        </select>" +
        "        <select class=\"group-selector\" id=\"create-window-cars-selector\" onchange=\"\"" +
        "                style=\"position: absolute;margin-left: 190px;margin-top: 20px; width:180px;\">\n" +
        "             <option value='null'><--</option>" +
        "        </select>" +

        "               <textarea placeholder='Текст' style='background: #1F1F25; margin-top: 80px; margin-left: 10px; color: #fafafa; width: 330px; height: 250px;'></textarea>\n" +
        "               </div>\n" +
        "            </div>\n" +
        "        </div>\n" +
        "        <span style=\"position: relative; left: 140px; top: 80px\">" +
        "           <button class=\"button-active\" onclick='document.getElementById(\"create-profile-window\").remove();'>Cancel</button>\n" +
        "           <button type=\"submit\" class=\"red-button\" id='create-bumpers-button' onclick='createArticle();'>Save</button>\n" +
        "        </span>" +
        "    </div>";
    home.appendChild(create_profile_window);
}

function createArticle() {
    let ForNameCreatearticleInput = document.getElementById("ForNameCreatearticleInput");
    let FromMoneyCreatearticleInput = document.getElementById("FromMoneyCreatearticleInput");
    let ToMoneyCreatearticleInput = document.getElementById("ToMoneyCreatearticleInput");
    let ClosingDateCreatearticleInput = document.getElementById("ClosingDateCreatearticleInput");
    let ClosingTimeCreatearticleInput = document.getElementById("ClosingTimeCreatearticleInput");

    let dat = {
        from_money: FromMoneyCreatearticleInput.value,
        to_money: ToMoneyCreatearticleInput.value,
        closing_date: ClosingDateCreatearticleInput.value
    };
    if (ForNameCreatearticleInput.value !== '') dat['to_user'] = ForNameCreatearticleInput.value
    if (ClosingTimeCreatearticleInput.value !== '') dat['closing_time'] = ClosingTimeCreatearticleInput.value

    let items = [];
    let p = document.getElementsByClassName("checkbox-create-article");
    for (let i = 0; i < p.length; i++) {
        if (p.item(i).checked === true) {
            items.push(p.item(i).value);
        }
    }
    if (items != null) dat['items'] = items

    $.ajax({
        url: '/article/create',
        method: 'post',
        data: dat
    }).done(function (data) {
        if (data["status"] === "ok") {
            tempAlert("Контракт добавлен", 3000);
            updatebumpersTable();
        } else {
            if (data["message"] === "could not execute statement;") {
                tempErrorAlert("Один из предметов используется в другом контракте", 3000);
            } else {
                tempErrorAlert(data["message"], 3000);
            }
        }
    });
    removeAllWindows();
}

function selectAllCreatearticle() {
    let checkbox = document.getElementById("checkbox-all-create-article");
    if (checkbox.checked === true) {
        let p = document.getElementsByClassName("checkbox-create-article");
        for (let i = 0; i < p.length; i++) {
            p.item(i).checked = true;
        }
    } else {
        let p = document.getElementsByClassName("checkbox-create-article");
        for (let i = 0; i < p.length; i++) {
            p.item(i).checked = false;
        }
    }
}

function updateCreateArticleTable() {
    let tasks = document.getElementById("tbody-article");
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
                "                        <input type=\"checkbox\" class='checkbox-create-article' value='" + i['id_item'] + "' onclick='updateSelectedCreatearticle();'>\n" +
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

function updateSelectedCreatearticle() {
    let count = 0;
    let p = document.getElementsByClassName("checkbox-create-article");
    for (let i = 0; i < p.length; i++) {
        if (p.item(i).checked === true) {
            count++;
        }
    }
    if (count !== items_count) {
        document.getElementById("checkbox-all-create-article").checked = false;
    }
}

article_selected_button.onclick = () => {
    let p = document.getElementsByClassName("checkbox-article");
    for (let i = 0; i < p.length; i++) {
        if (p.item(i).checked === true) {
            removearticle(p.item(i).value);
        }
    }
}

function removearticle(id) {
    $.ajax({
        url: '/article/remove',
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
        updatearticleTable();
    });
}


function confirmarticle(id) {
    $.ajax({
        url: '/article/confirm',
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
        updatearticleTable();
    });
}

function updatearticleTable() {
    let tasks = document.getElementById("tbody-article");
    $.ajax({
        url: '/article/get',
        method: 'get',
    }).done(function (data) {
        while (tasks.firstChild) {
            tasks.removeChild(tasks.firstChild);
        }
        article_count = 0;
        data["list"].forEach((i) => {
            let tr = document.createElement("tr");
            tr.id = "article_" + i['id_article'];
            let toUser = "Общедоступный";
            if (i['to_user'] !== null) toUser = i['to_user']['username'];

            tr.innerHTML = "<td style='padding-left: 2%; width: 5%'>" +
                "                   <label class=\"my-checkbox\">\n" +
                "                        <input type=\"checkbox\" class='checkbox-article' value='" + i['id_article'] + "' onclick='updateSelectedarticleCount();'>\n" +
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
                "<td style='padding-left: 1%'>" + ('000' + ++article_count).slice(-4) + "</td>\n" +
                "            <td>" + i['from_user']['username'] + "</td>\n" +
                "            <td>" + toUser + "</td>\n" +
                "            <td>" + i['closing_date'] + "(" + i['closing_time'] + ")" + "</td>\n" +
                "            <td><p style='color: red;'>" + i['from_money'] + "</p>/<p style='color: green'>" + i['to_money'] + "</p></td>\n" +
                // "            <td>\n" +
                "                <button class=\"btn-none\" style=\"margin-left: 15px;\" onclick='articleItemWindow(" + i['id_article'] + ");'>\n" +
                "                       <svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" viewBox=\"0 0 96 96\" width=\"20px\" height=\"20px\">\n" +
                "                           <g id=\"surface35259549\">\n" +
                "                           <path style=\" stroke:none;fill-rule:nonzero;fill:rgb(100%,100%,100%);fill-opacity:1;\" d=\"M 20.703125 12 L 12 26.921875 L 12 84 L 84 84 L 84 26.921875 L 75.296875 12 Z M 25.296875 20 L 70.703125 20 L 75.367188 28 L 20.632812 28 Z M 36 36 L 60 36 L 60 44 L 36 44 Z M 36 36 \"/>\n" +
                "                           </g>\n" +
                "                       </svg>\n" +
                "                </button>\n" +
                "                <button class=\"btn-none\" style=\"margin-left: 15px;\" onclick='confirmarticle(" + i['id_article'] + ");'>\n" +
                "                       <svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" viewBox=\"0 0 96 96\" width=\"20px\" height=\"20px\">\n" +
                "                           <g id=\"surface35259549\">\n" +
                "                           <path style=\" stroke:none;fill-rule:nonzero;fill:rgb(100%,100%,100%);fill-opacity:1;\" d=\"M 20.703125 12 L 12 26.921875 L 12 84 L 84 84 L 84 26.921875 L 75.296875 12 Z M 25.296875 20 L 70.703125 20 L 75.367188 28 L 20.632812 28 Z M 36 36 L 60 36 L 60 44 L 36 44 Z M 36 36 \"/>\n" +
                "                           </g>\n" +
                "                       </svg>\n" +
                "                </button>\n" +
                "";
            tasks.appendChild(tr);
            updateSelectedarticleCount();
        });
    });
}


function updateSelectedarticleCount() {
    let count = 0;
    let p = document.getElementsByClassName("checkbox-article");
    for (let i = 0; i < p.length; i++) {
        if (p.item(i).checked === true) {
            count++;
        }
    }
    if (count !== article_count) {
        document.getElementById("checkbox-all-article").checked = false;
    }
    document.getElementById("article_stats").innerText = "Total: " + article_count + "/Select: " + count;
}

function selectAllarticle() {
    let checkbox = document.getElementById("checkbox-all-article");
    if (checkbox.checked === true) {
        let p = document.getElementsByClassName("checkbox-article");
        for (let i = 0; i < p.length; i++) {
            p.item(i).checked = true;
        }
        document.getElementById("article_stats").innerText = "Total: " + article_count + "/Select: " + article_count;
    } else {
        let p = document.getElementsByClassName("checkbox-article");
        for (let i = 0; i < p.length; i++) {
            p.item(i).checked = false;
        }
        document.getElementById("article_stats").innerText = "Total: " + article_count + "/Select: 0";
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

function articleItemWindow(id_item) {
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
        "            <tbody id=\"tbody-article-items\"></tbody>\n" +
        "        </table>\n" +
        "    </div>" +
        "            </div>\n" +
        "        </div>\n" +
        "        <span style=\"position: absolute; left: 180px; top: 40px\">" +
        "           <button class=\"button-active\" onclick='document.getElementById(\"create-profile-window\").remove();'>Cancel</button>\n" +
        "           <button type=\"submit\" class=\"red-button\" id='create-bumpers-button' onclick='articleItem(" + id_item + ",document.getElementById(\"PriceItemInput\").value);document.getElementById(\"create-profile-window\").remove();'>Save</button>\n" +
        "        </span>" +
        "    </div>";
    home.appendChild(create_profile_window);

    let tasks = document.getElementById("tbody-article-items");
    $.ajax({
        url: '/article/items',
        method: 'get',
        data: {
            id: id_item
        }
    }).done(function (data) {
        while (tasks.firstChild) {
            tasks.removeChild(tasks.firstChild);
        }
        article_count = 0;
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
            tr.id = "article_item_" + i['id_item'];
            tr.innerHTML = "<td style='padding-left: 1%'>" + ('000' + ++article_count).slice(-4) + "</td>\n" +
                "            <td>" + type + "</td>\n" +
                "            <td>" + type_name + "</td>\n" +
                "";
            tasks.appendChild(tr);
            updateSelectedarticleCount();
        });
    });
}

function articleItem(id, price) {
    $.ajax({
        url: '/article/create',
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
        updatearticleTable();
    });
}

updatearticleTable();