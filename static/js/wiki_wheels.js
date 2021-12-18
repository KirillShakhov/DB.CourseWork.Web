let create_wiki_wheels_button = document.getElementById("create-wiki-wheels-button");

let wheels_count = 0;

create_wiki_wheels_button.onclick = () => {
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
        "\n" +
        "        <div>\n" +
        "            <div class=\"container profile-container\" id=\"general-container\" hidden>\n" +
        "            </div>\n" +
        "            <div class=\"container profile-container\" id=\"delivery-container\" hidden>\n" +
        "            </div>\n" +
        "\n" +
        "            <div class=\"container profile-container\" id=\"payment-container\">\n" +
        "                <input type=\"text\" id=\"NumberWheelsInput\" name=\"NameInput\" placeholder=\"Название\" value=\"\"\n" +
        "                       style=\"position: absolute;margin-left: 10px;margin-top: 50px; width: 340px;\">\n" +
        "                <div class=\"border-b-line\" style=\"width: 370px;top: 75px;\"></div>\n" +
        "                <input type=\"text\" id=\"CCWheelsInput\" name=\"CCInput\" placeholder=\"Коэф. сцепления\" value=\"\"\n" +
        "                       style=\"position: absolute;margin-left: 10px;margin-top: 125px; width: 340px;\">\n" +
        "                <div class=\"border-b-line\" style=\"width: 370px;top: 155px;\"></div>\n" +
        "                <input type=\"text\" id=\"PhotoWheelsInput\" name=\"PhotoInput\" placeholder=\"Photo URL\" value=\"\"\n" +
        "                       style=\"position: absolute;margin-left: 10px;margin-top: 200px; width: 145px;\">\n" +
        "                  <select class=\"group-selector\" id=\"colors-selector\" onchange=\"\"" +
        "                       style=\"position: absolute;margin-left: 210px;margin-top: 200px; width: 145px;\">\n" +
        "                    </select>" +
        "                <div class=\"border-b-line\" style=\"width: 170px;top: 224px;\"></div>\n" +
        "            </div>\n" +
        "        </div>\n" +
        "        <span style=\"position: absolute; left: 180px;\">" +
        "           <button class=\"button-active\" onclick='document.getElementById(\"create-profile-window\").remove();'>Cancel</button>\n" +
        "           <button type=\"submit\" class=\"red-button\" id='create-wheels-button' onclick='createWheels();'>Save</button>\n" +
        "        </span>" +
        "    </div>";
    home.appendChild(create_profile_window);
    updateColors();
}

function isNumber(n) {
    return !isNaN(parseFloat(n)) && !isNaN(n - 0)
}

function createWheels() {
    let NameInput = document.getElementById("NumberWheelsInput");
    let CCInput = document.getElementById("CCWheelsInput");
    let PhotoInput = document.getElementById("PhotoWheelsInput");
    let colors_selector = document.getElementById("colors-selector");
    let color = colors_selector.options[colors_selector.selectedIndex].value;
    if (!isNumber(color)) {
        tempErrorAlert('Цвет неправильный', 3000);
    } else {
        $.ajax({
            url: '/wheels/create',
            method: 'post',
            data: {
                name: NameInput.value,
                cc: CCInput.value,
                photo: PhotoInput.value,
                color: color,
            }
        }).done(function (data) {
            if (data["status"] === "ok") {
                tempAlert("Колеса добавлены", 3000);
                updateWheelsTable();
            } else {
                tempErrorAlert(data["message"], 3000);
            }
        });
        removeAllWindows();
    }
}

function updateColors() {
    let colors_selector = document.getElementById("colors-selector");
    colors_selector.innerText = "";
    $.ajax({
        url: '/colors',
        method: 'get',
    }).done(function (data) {
        if (data["status"] === 'ok') {
            data["list"].forEach((i) => {
                let option = document.createElement("option");
                option.text = i['name'];
                option.value = i['id_color'];
                colors_selector.appendChild(option);
            });
        }
    });
}

function updateWheelsTable() {
    let wheels = document.getElementById("tbody-wiki-wheels");
    $.ajax({
        url: '/wheels',
        method: 'get',
    }).done(function (data) {
        while (wheels.firstChild) {
            wheels.removeChild(wheels.firstChild);
        }
        wheels_count = 0;
        data["list"].forEach((i) => {
            let removeButton = i['creator']['creator_user']['username'] === myname ? "<button class=\"btn-none\" style=\"margin-left: 10px;\" onclick='removeWheels(" + i["id_wheel"] + ")'>\n" +
                "                    <svg width=\"14\" height=\"24\" viewBox=\"0 0 20 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
                "                        <path d=\"M1 5.5791H3H19\" stroke=\"#F1F1F1\" stroke-width=\"2\" stroke-linecap=\"round\"\n" +
                "                              stroke-linejoin=\"round\"></path>\n" +
                "                        <path d=\"M6 5.5783V3.52499C6 2.98042 6.21071 2.45815 6.58579 2.07308C6.96086 1.68801 7.46957 1.47168 8 1.47168H12C12.5304 1.47168 13.0391 1.68801 13.4142 2.07308C13.7893 2.45815 14 2.98042 14 3.52499V5.5783M17 5.5783V19.9515C17 20.496 16.7893 21.0183 16.4142 21.4034C16.0391 21.7884 15.5304 22.0048 15 22.0048H5C4.46957 22.0048 3.96086 21.7884 3.58579 21.4034C3.21071 21.0183 3 20.496 3 19.9515V5.5783H17Z\"\n" +
                "                              stroke=\"#F1F1F1\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n" +
                "                    </svg>\n" +
                "                </button>\n" : "";
            let tr = document.createElement("tr");
            tr.id = "wheels_" + i["id_wheel"];
            tr.innerHTML = "<td class=\"unselectable\" style='padding-left: 2%; width: 7%'>" +
                "                        <label class=\"my-checkbox\">\n" +
                "                        <input type=\"checkbox\" class='checkbox-wheels' value='" + i['id_wheel'] + "' onclick='updateSelectedWheelsCount();'>\n" +
                "                        <div class=\"check-container grey\">\n" +
                "                            <svg class=\"\" width=\"15\" height=\"10\" viewBox=\"0 0 15 10\" fill=\"none\"\n" +
                "                                 xmlns=\"http://www.w3.org/2000/svg\">\n" +
                "                                <path d=\"M13 2L5.4375 9L2 5.81818\" stroke=\"#F1F1F1\" stroke-width=\"2\"\n" +
                "                                      stroke-linecap=\"square\"\n" +
                "                                      stroke-linejoin=\"round\"></path>\n" +
                "                            </svg>\n" +
                "                        </div>\n" +
                "                    </label></td>" +
                " <td style='padding-left: 2%'>" + ('000' + ++wheels_count).slice(-4) + "</td>\n" +
                "            <td>" + i["name"] + "</td>\n" +
                "            <td>" + i["adhesion_coefficient"] + "</td>\n" +
                "            <td>" + i["disk_color"]['name'] + "</td>\n" +
                "            <td>" + "<img width='150' src=" + i['photo'] + " alt=" + i['photo'] + ">" + "</td>\n" +
                "            <td>" + i['creator']['creator_user']['username'] + "</td>\n" +
                "            <td>" + removeButton + "</td>";
            wheels.appendChild(tr);
        });
        updateSelectedWheelsCount();
    });
}

function removeWheels(id) {
    $.ajax({
            url: '/wheels/remove',
            method: 'post',
            data: {
                id: id
            }
        }).done(function (data) {
            if (data["status"] === "ok") {
                tempAlert("Бампер удален", 3000);
                updateWheelsTable();
            } else {
                tempErrorAlert(data["message"], 3000);
            }
        });
}

function updateSelectedWheelsCount() {
    let count = 0;
    let p = document.getElementsByClassName("checkbox-wheels");
    for (let i = 0; i < p.length; i++) {
        if (p.item(i).checked === true) {
            count++;
        }
    }
    if (wheels_count !== 0) document.getElementById("checkbox-all-wheels").checked = count === wheels_count;
    document.getElementById("wheels_stats").innerText = "Total: " + wheels_count + "/Select: " + count;
}

function selectAllWheels() {
    let checkbox = document.getElementById("checkbox-all-wheels");
    if (checkbox.checked === true) {
        let p = document.getElementsByClassName("checkbox-wheels");
        for (let i = 0; i < p.length; i++) {
            p.item(i).checked = true;
        }
        document.getElementById("wheels_stats").innerText = "Total: " + wheels_count + "/Select: " + wheels_count;
    } else {
        let p = document.getElementsByClassName("checkbox-wheels");
        for (let i = 0; i < p.length; i++) {
            p.item(i).checked = false;
        }
        document.getElementById("wheels_stats").innerText = "Total: " + wheels_count + "/Select: 0";
    }
}

updateWheelsTable();