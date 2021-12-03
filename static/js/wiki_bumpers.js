let create_wiki_bumpers_button = document.getElementById("create-wiki-bumpers-button");

let bumpers_count = 0;

create_wiki_bumpers_button.onclick = () => {
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
        "                <input type=\"text\" id=\"NumberbumpersInput\" name=\"NameInput\" placeholder=\"Название\" value=\"\"\n" +
        "                       style=\"position: absolute;margin-left: 10px;margin-top: 50px; width: 340px;\">\n" +
        "                <div class=\"border-b-line\" style=\"width: 370px;top: 75px;\"></div>\n" +
        // "                <input type=\"text\" id=\"CCbumpersInput\" name=\"CCInput\" placeholder=\"Коэф. сцепления\" value=\"\"\n" +
        // "                       style=\"position: absolute;margin-left: 10px;margin-top: 125px; width: 340px;\">\n" +
        // "                <div class=\"border-b-line\" style=\"width: 370px;top: 155px;\"></div>\n" +
        // "                <input type=\"text\" id=\"PaymentYearInput\" name=\"YearInput\" placeholder=\"Year\" value=\"\"\n" +
        // "                       style=\"position: absolute;margin-left: 210px;margin-top: 145px; width: 145px;\">\n" +
        // "                <div class=\"border-b-line\" style=\"width: 170px;left: 200px;top: 170px;\"></div>\n" +
        "                <input type=\"text\" id=\"PhotobumpersInput\" name=\"PhotoInput\" placeholder=\"Photo URL\" value=\"\"\n" +
        "                       style=\"position: absolute;margin-left: 10px;margin-top: 200px; width: 145px;\">\n" +
        "                  <select class=\"group-selector\" id=\"colors-selector\" onchange=\"\"" +
        "                       style=\"position: absolute;margin-left: 210px;margin-top: 200px; width: 145px;\">\n" +
        "                    </select>" +
        "                <div class=\"border-b-line\" style=\"width: 170px;top: 224px;\"></div>\n" +
        "            </div>\n" +
        "        </div>\n" +
        "        <span style=\"position: absolute; left: 180px;\">" +
        "           <button class=\"button-active\" onclick='document.getElementById(\"create-profile-window\").remove();'>Cancel</button>\n" +
        "           <button type=\"submit\" class=\"red-button\" id='create-bumpers-button' onclick='createbumpers();'>Save</button>\n" +
        "        </span>" +
        "    </div>";
    home.appendChild(create_profile_window);
    updateColors();
}
function isNumber(n) { return !isNaN(parseFloat(n)) && !isNaN(n - 0) }

function createbumpers() {
    let NameInput = document.getElementById("NumberbumpersInput");
    let PhotoInput = document.getElementById("PhotobumpersInput");
    let colors_selector = document.getElementById("colors-selector");
    let color = colors_selector.options[colors_selector.selectedIndex].value;
    if(!isNumber(color)){
        tempErrorAlert('Цвет неправильный', 3000);
    }
    else {
        $.ajax({
            url: '/bumpers/create',
            method: 'post',
            data: {
                name: NameInput.value,
                photo: PhotoInput.value,
                color: color,
            }
        }).done(function (data) {
            if (data["status"] === "ok") {
                tempAlert("Бампер добавлен", 3000);
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

function updatebumpersTable() {
    let bumpers = document.getElementById("tbody-wiki-bumpers");
    $.ajax({
        url: '/bumpers',
        method: 'get',
    }).done(function (data) {
        while (bumpers.firstChild) {
            bumpers.removeChild(bumpers.firstChild);
        }
        bumpers_count = 0;
        data["list"].forEach((i) => {
            let tr = document.createElement("tr");
            tr.id = "bumpers_" + i["id"];
            tr.innerHTML = "<td style='padding-left: 2%; width: 7%'>" +
                "                        <label class=\"my-checkbox\">\n" +
                "                        <input type=\"checkbox\" class='checkbox-bumpers' value='" + i['id'] + "' onclick='updateSelectedbumpersCount();'>\n" +
                "                        <div class=\"check-container grey\">\n" +
                "                            <svg class=\"\" width=\"15\" height=\"10\" viewBox=\"0 0 15 10\" fill=\"none\"\n" +
                "                                 xmlns=\"http://www.w3.org/2000/svg\">\n" +
                "                                <path d=\"M13 2L5.4375 9L2 5.81818\" stroke=\"#F1F1F1\" stroke-width=\"2\"\n" +
                "                                      stroke-linecap=\"square\"\n" +
                "                                      stroke-linejoin=\"round\"></path>\n" +
                "                            </svg>\n" +
                "                        </div>\n" +
                "                    </label></td>" +
                " <td style='padding-left: 2%'>" + ('000' + ++bumpers_count).slice(-4) + "</td>\n" +
                "            <td>" + i["name"] + "</td>\n" +
                "            <td>" + i["color"]['name'] + "</td>\n" +
                "            <td>" + i["photo"] + "</td>\n" +
                "            <td>" + i["creator"] + "</td>\n" +
                "            <td>" + "" + "</td>";
            bumpers.appendChild(tr);
        });
        updateSelectedbumpersCount();
    });
}

function updateSelectedbumpersCount() {
    let count = 0;
    let p = document.getElementsByClassName("checkbox-bumpers");
    for (let i = 0; i < p.length; i++) {
        if (p.item(i).checked === true) {
            count++;
        }
    }
    if (count !== bumpers_count) {
        document.getElementById("checkbox-all-bumpers").checked = false;
    }
    document.getElementById("bumpers_stats").innerText = "Total: " + bumpers_count + "/Select: " + count;
}

function selectAllBumpers() {
    let checkbox = document.getElementById("checkbox-all-bumpers");
    if (checkbox.checked === true) {
        let p = document.getElementsByClassName("checkbox-bumpers");
        for (let i = 0; i < p.length; i++) {
            p.item(i).checked = true;
        }
        document.getElementById("bumpers_stats").innerText = "Total: " + bumpers_count + "/Select: " + bumpers_count;
    } else {
        let p = document.getElementsByClassName("checkbox-bumpers");
        for (let i = 0; i < p.length; i++) {
            p.item(i).checked = false;
        }
        document.getElementById("bumpers_stats").innerText = "Total: " + bumpers_count + "/Select: 0";
    }
}

updatebumpersTable();