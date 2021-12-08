let create_wiki_cars_button = document.getElementById("create-wiki-cars-button");
let create_cars_group_button = document.getElementById("create-cars-group-button");
let remove_cars_group_button = document.getElementById("remove-cars-group-button");

let cars_count = 0;

remove_cars_group_button.onclick = () => {
    removeSelectedCarsGroup();
}
create_cars_group_button.onclick = () => {
    removeAllWindows();
    let home = document.getElementById("windows-container");
    let create_profile_window = document.createElement("div");
    create_profile_window.innerHTML = "<div class=\"blur-window create-profile\" id=\"create-cars-group-window\">\n" +
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
        "                <input type=\"text\" id=\"CarNameInput\" name=\"NameInput\" placeholder=\"Название\" value=\"\"\n" +
        "                       style=\"position: absolute;margin-left: 10px;margin-top: 50px; width: 340px;\">\n" +
        "                <div class=\"border-b-line\" style=\"width: 370px;top: 75px;\"></div>\n" +
        "                <input type=\"text\" id=\"CarsDescriptionInput\" name=\"NameInput\" placeholder=\"Описание\" value=\"\"\n" +
        "                       style=\"position: absolute;margin-left: 10px;margin-top: 100px; width: 340px;\">\n" +
        "                <div class=\"border-b-line\" style=\"width: 370px;top: 125px;\"></div>\n" +
        "                <input type=\"text\" id=\"CarsDateBeginInput\" name=\"NameInput\" placeholder=\"Дата начала. Пример: 2018-05-05\" value=\"\"\n" +
        "                       style=\"position: absolute;margin-left: 10px;margin-top: 150px; width: 340px;\">\n" +
        "                <div class=\"border-b-line\" style=\"width: 370px;top: 175px;\"></div>\n" +
        "                <input type=\"text\" id=\"CarsDateFinishInput\" name=\"NameInput\" placeholder=\"Дата конца. Пример: 2018-05-06\" value=\"\"\n" +
        "                       style=\"position: absolute;margin-left: 10px;margin-top: 200px; width: 340px;\">\n" +
        "                <dixv class=\"border-b-line\" style=\"width: 370px;top: 225px;\"></dixv>\n" +
        "            </div>\n" +
        "        </div>\n" +
        "        <span style=\"position: absolute; left: 180px;\">" +
        "           <button class=\"button-active\" onclick='document.getElementById(\"create-cars-group-window\").remove();'>Cancel</button>\n" +
        "           <button type=\"submit\" class=\"red-button\" id='create-cars-group-button' onclick='createCarsGroup();'>Save</button>\n" +
        "        </span>" +
        "    </div>";
    home.appendChild(create_profile_window);
    updateCarsGroup();

}


function updateColorsCreateCars() {
    let colors1_selector = document.getElementById("color1-selector");
        colors1_selector.innerText = "";
    let colors2_selector = document.getElementById("color2-selector");
        colors2_selector.innerText = "";
    $.ajax({
        url: '/colors',
        method: 'get',
    }).done(function (data) {
        let option11 = document.createElement("option");
            option11.text = 'Выберите цвет1';
            option11.value = 'null';
            colors1_selector.appendChild(option11);
        let option22 = document.createElement("option");
            option22.text = 'Выберите цвет2';
            option22.value = 'null';
            colors2_selector.appendChild(option22);
        if (data["status"] === 'ok') {
            data["list"].forEach((i) => {
                let option = document.createElement("option");
                option.text = i['name'];
                option.value = i['id_color'];
                colors1_selector.appendChild(option);
            });
            data["list"].forEach((i) => {
                let option = document.createElement("option");
                option.text = i['name'];
                option.value = i['id_color'];
                colors2_selector.appendChild(option);
            });
        }
    });
}

function updateBumpersCreateCars() {
    let colors1_selector = document.getElementById("bumpers-selector");
        colors1_selector.innerText = "";
    $.ajax({
        url: '/bumpers',
        method: 'get',
    }).done(function (data) {
        let option11 = document.createElement("option");
            option11.text = 'Выберите бампер';
            option11.value = 'null';
            colors1_selector.appendChild(option11);
        if (data["status"] === 'ok') {
            data["list"].forEach((i) => {
                let option = document.createElement("option");
                option.text = i['name'];
                option.value = i['id_bumper'];
                colors1_selector.appendChild(option);
            });
        }
    });
}

function updateWheelsCreateCars() {
    let colors1_selector = document.getElementById("wheels-selector");
        colors1_selector.innerText = "";
    $.ajax({
        url: '/wheels',
        method: 'get',
    }).done(function (data) {
        let option11 = document.createElement("option");
            option11.text = 'Выберите колеса';
            option11.value = 'null';
            colors1_selector.appendChild(option11);
        if (data["status"] === 'ok') {
            data["list"].forEach((i) => {
                let option = document.createElement("option");
                option.text = i['name'];
                option.value = i['id_wheel'];
                colors1_selector.appendChild(option);
            });
        }
    });
}

function updateSeriesCreateCars() {
    let colors1_selector = document.getElementById("series-selector");
        colors1_selector.innerText = "";
    $.ajax({
        url: '/cars/groups',
        method: 'get',
    }).done(function (data) {
        let option11 = document.createElement("option");
            option11.text = 'Выберите серию';
            option11.value = 'null';
            colors1_selector.appendChild(option11);
        if (data["status"] === 'ok') {
            data["list"].forEach((i) => {
                let option = document.createElement("option");
                option.text = i['name'];
                option.value = i['id_series'];
                colors1_selector.appendChild(option);
            });
        }
    });
}

function createCarsGroup() {
    let CarNameInput = document.getElementById("CarNameInput");
    let CarsDescriptionInput = document.getElementById("CarsDescriptionInput");
    let CarsDateBeginInput = document.getElementById("CarsDateBeginInput");
    let CarsDateFinishInput = document.getElementById("CarsDateFinishInput");

    let data = {
            name: CarNameInput.value,
            description: CarsDescriptionInput.value,
            date_of_start: CarsDateBeginInput.value,
        }

    if(CarsDateFinishInput.value !== "")  data['date_of_finish'] = CarsDateFinishInput.value

    $.ajax({
        url: '/cars/groups/create',
        method: 'post',
        data: data
    }).done(function (data) {
        if (data["status"] === "ok") {
            tempAlert("Серия создана", 3000);
            updateCarsGroup();
        } else {
            tempErrorAlert(data["message"], 3000);
        }
    });
    removeAllWindows();
}

function removeSelectedCarsGroup() {
    let select = document.getElementById('cars-group-selector');
    let id = select.options[select.selectedIndex].value;
    $.ajax({
        url: '/cars/groups/remove',
        method: 'post',
        data: {
            id: id,
        }
    }).done(function (data) {
        if (data["status"] === "ok") {
            tempAlert("Серия удалена", 3000);
            updateCarsGroup();
        } else {
            tempErrorAlert(data["message"], 3000);
        }
    });
}

create_wiki_cars_button.onclick = () => {
    removeAllWindows();
    let home = document.getElementById("windows-container");
    let create_profile_window = document.createElement("div");
    create_profile_window.innerHTML = "<div class=\"blur-window create-profile\" id=\"create-profile-window\">\n" +
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
        "                <input type=\"text\" id=\"carsNameInput\" name=\"NameInput\" placeholder=\"Название\" value=\"\"\n" +
        "                       style=\"position: absolute;margin-left: 10px;margin-top: 50px; width: 340px;\">\n" +
        "                <div class=\"border-b-line\" style=\"width: 370px;top: 75px;\"></div>\n" +
        "                  <select class=\"group-selector\" id=\"series-selector\" onchange=\"\"" +
        "                       style=\"position: absolute;margin-left: 10px;margin-top: 100px; width: 345px;\">\n" +
        "                  </select>" +
        "                  <select class=\"group-selector\" id=\"bumpers-selector\" onchange=\"\"" +
        "                       style=\"position: absolute;margin-left: 10px;margin-top: 150px; width: 345px;\">\n" +
        "                  </select>" +
        "                  <select class=\"group-selector\" id=\"wheels-selector\" onchange=\"\"" +
        "                       style=\"position: absolute;margin-left: 10px;margin-top: 200px; width: 345px;\">\n" +
        "                  </select>" +
        "                  <select class=\"group-selector\" id=\"color1-selector\" onchange=\"\"" +
        "                       style=\"position: absolute;margin-left: 10px;margin-top: 250px; width: 145px;\">\n" +
        "                  </select>" +
        "                  <select class=\"group-selector\" id=\"color2-selector\" onchange=\"\"" +
        "                       style=\"position: absolute;margin-left: 210px;margin-top: 250px; width: 145px;\">\n" +
        "                  </select>" +
        "            </div>\n" +
        "        </div>\n" +
        "        <span style=\"position: absolute; left: 180px;\">" +
        "           <button class=\"button-active\" onclick='document.getElementById(\"create-profile-window\").remove();'>Cancel</button>\n" +
        "           <button type=\"submit\" class=\"red-button\" id='create-cars-button' onclick='createCars();'>Save</button>\n" +
        "        </span>" +
        "    </div>";
    home.appendChild(create_profile_window);
    updateColorsCreateCars();
    updateBumpersCreateCars();
    updateWheelsCreateCars();
    updateSeriesCreateCars();
}

function createCars() {
    let carsNameInput = document.getElementById("carsNameInput");

    let series_selector = document.getElementById("series-selector");
    let series = series_selector.options[series_selector.selectedIndex].value;

    let wheels_selector = document.getElementById("wheels-selector");
    let wheels = wheels_selector.options[wheels_selector.selectedIndex].value;

    let bumper_selector = document.getElementById("bumpers-selector");
    let bumper = bumper_selector.options[bumper_selector.selectedIndex].value;

    let colors1_selector = document.getElementById("color1-selector");
    let color1 = colors1_selector.options[colors1_selector.selectedIndex].value;

    let colors2_selector = document.getElementById("color2-selector");
    let color2 = colors2_selector.options[colors2_selector.selectedIndex].value;
    d = [];
    d['name'] = carsNameInput.value;
    d['series'] = series;

    let first_color, second_color, bumpers_, wheels_;
    if(color1 !== 'null' && color1 != null) first_color = color1;
    if(color2!== 'null' && color2 != null) second_color = color2;
    if(bumper!== 'null' && bumper != null) bumpers_ = bumper;
    if(wheels!== 'null' && wheels != null) wheels_ = wheels;

    if(series == null || series === "null"){
        tempErrorAlert("Серия не выбрана", 3000);
    }
    else {
        $.ajax({
            url: '/cars/create',
            method: 'post',
            data: {
                name: carsNameInput.value,
                series: series,
                bumpers: bumpers_,
                wheels: wheels_,
                first_color: first_color,
                second_color: second_color,
            }
        }).done(function (data) {
            if (data["status"] === "ok") {
                tempAlert("Машинка добавлен", 3000);
                updateCarsTable();
            } else {
                tempErrorAlert(data["message"], 3000);
            }
        });
        removeAllWindows();
    }
}

function updateSelectedCarsCount() {
    let count = 0;
    let p = document.getElementsByClassName("checkbox-cars");
    for (let i = 0; i < p.length; i++) {
        if (p.item(i).checked === true) {
            count++;
        }
    }
    if (count !== cars_count) {
        document.getElementById("checkbox-all-cars").checked = false;
    }
    document.getElementById("cars_stats").innerText = "Total: " + cars_count + "/Select: " + count;
}

function selectAllCars() {
    let checkbox = document.getElementById("checkbox-all-cars");
    if (checkbox.checked === true) {
        let p = document.getElementsByClassName("checkbox-cars");
        for (let i = 0; i < p.length; i++) {
            p.item(i).checked = true;
        }
        document.getElementById("cars_stats").innerText = "Total: " + cars_count + "/Select: " + cars_count;
    } else {
        let p = document.getElementsByClassName("checkbox-cars");
        for (let i = 0; i < p.length; i++) {
            p.item(i).checked = false;
        }
        document.getElementById("cars_stats").innerText = "Total: " + cars_count + "/Select: 0";
    }
}

function updateCarsGroup() {
    let selector = document.getElementById("cars-group-selector");
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
            let profile_group_selector = document.getElementById('cars-group-selector');
            profile_group_selector.selectedIndex = last;
            updateCarsTable();
        } else {
            let option = document.createElement("option");
            option.text = "Create ->";
            selector.appendChild(option);
            let profiles = document.getElementById("tbody-wiki-cars");
            while (profiles.firstChild) {
                profiles.removeChild(profiles.firstChild);
            }
        }
    });
}

function updateCarsTable() {
    let cars_group_selector = document.getElementById('cars-group-selector');
    let id = cars_group_selector.options[cars_group_selector.selectedIndex].value;

    let cars = document.getElementById("tbody-wiki-cars");
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
        cars_count = 0;
        data["list"]['cars'].forEach((i) => {
            let tr = document.createElement("tr");
            tr.id = "cars_" + i["id_car"];
            tr.innerHTML = "<td class=\"unselectable\" style='padding-left: 2%; width: 7%'>" +
                "                        <label class=\"my-checkbox\">\n" +
                "                        <input type=\"checkbox\" class='checkbox-cars' value='" + i['id_car'] + "' onclick='updateSelectedCarsCount();'>\n" +
                "                        <div class=\"check-container grey\">\n" +
                "                            <svg class=\"\" width=\"15\" height=\"10\" viewBox=\"0 0 15 10\" fill=\"none\"\n" +
                "                                 xmlns=\"http://www.w3.org/2000/svg\">\n" +
                "                                <path d=\"M13 2L5.4375 9L2 5.81818\" stroke=\"#F1F1F1\" stroke-width=\"2\"\n" +
                "                                      stroke-linecap=\"square\"\n" +
                "                                      stroke-linejoin=\"round\"></path>\n" +
                "                            </svg>\n" +
                "                        </div>\n" +
                "                    </label></td>" +
                " <td style='padding-left: 2%'>" + ('000' + ++cars_count).slice(-4) + "</td>\n" +
                "            <td>" + i["name"] + "</td>\n" +
                "            <td>" + i["first_color"] + ":" + i["second_color"] + "</td>\n" +
                "            <td>" + i["wheels"] + "</td>\n" +
                "            <td>" + i["bumper"] + "</td>\n" +
                "            <td>" + i["creator"]['creator_user']['username'] + "</td>\n" +
                "            <td>" + "" + "</td>";
            cars.appendChild(tr);
        });
        updateSelectedCarsCount();
    });
}


updateCarsGroup();