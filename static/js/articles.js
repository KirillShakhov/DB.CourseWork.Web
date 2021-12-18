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
        "                <input type=\"text\" id=\"titleArticleInput\" name=\"NameInput\" placeholder=\"Название статьи\" value=\"\"\n" +
        "                        style=\"position: absolute;margin-left: 10px;margin-top: 0px; width: 350px;\">\n" +
        "                <div class=\"border-b-line\" style=\"width: 370px;top: 25px;\">" +
        "        <select class=\"group-selector\" id=\"create-window-cars-group-selector\" onchange=\"updateCrateWindowArticleCarSelector();\"" +
        "              style=\"position: absolute;margin-left: 10px;margin-top: 20px; width:160px;\">\n" +
        "              <option value='null'>Выберите серию...</option>" +
        "        </select>" +
        "        <select class=\"group-selector\" id=\"create-window-cars-selector\" onchange=\"\"" +
        "                style=\"position: absolute;margin-left: 190px;margin-top: 20px; width:170px;\">\n" +
        "             <option value='null'><--</option>" +
        "        </select>" +

        "               <textarea placeholder='Текст' id='textArticleInput' style='background: #1F1F25; margin-top: 80px; margin-left: 10px; color: #fafafa; width: 350px; height: 260px;'></textarea>\n" +
        "               </div>\n" +
        "            </div>\n" +
        "        </div>\n" +
        "        <span style=\"position: relative; left: 170px; top: 100px\">" +
        "           <button class=\"button-active\" onclick='document.getElementById(\"create-profile-window\").remove();'>Cancel</button>\n" +
        "           <button type=\"submit\" class=\"red-button\" id='create-bumpers-button' onclick='createArticle();'>Save</button>\n" +
        "        </span>" +
        "    </div>";
    home.appendChild(create_profile_window);
    updateCrateWindowArticleCarGroupSelector();
}

function articleTextItemWindow(title, text) {
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
        "            <div class=\"container profile-container\" id=\"payment-container\">\n" +
        "                <input type=\"text\" value='"+title+"' id=\"titleArticleInput\" name=\"NameInput\" placeholder=\"Название статьи\" value=\"\" disabled\n" +
        "                        style=\"position: absolute;margin-left: 10px;width: 340px;background-color: transparent \">\n" +
        "                <div class=\"border-b-line\" style=\"width: 370px;top: 25px;\">" +
        "               <textarea placeholder='Текст' id='textArticleInput' style='background: #1F1F25; margin-top: 20px; margin-left: 10px; color: #fafafa; width: 350px; height: 330px;' disabled>" + text + "</textarea>\n" +
        "               </div>\n" +
        "            </div>\n" +
        "        </div>\n" +
        "        <span style=\"position: relative; left: 260px; top: 100px\">" +
        "           <button class=\"button-active\" onclick='document.getElementById(\"create-profile-window\").remove();'>Cancel</button>\n" +
        "        </span>" +
        "    </div>";
    home.appendChild(create_profile_window);
}

function updateCrateWindowArticleCarGroupSelector() {
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
            let option = document.createElement("option");
            option.value = null;
            option.text = "Не выбирать серию";
            selector.appendChild(option);
            last++;
            selector.selectedIndex = last;
            // selector.selectedIndex = last;
            updateCrateWindowArticleCarSelector();
        } else {

        }
    });
}


function createArticle() {
    let titleArticleInput = document.getElementById("titleArticleInput");
    let textArticleInput = document.getElementById("textArticleInput");

    let create_window_cars_selector = document.getElementById('create-window-cars-selector');
    let id_car = create_window_cars_selector.options[create_window_cars_selector.selectedIndex].value;


    let dat = {
        title: titleArticleInput.value,
        text: textArticleInput.value,
    };
    if (id_car !== null) dat['car'] = id_car

    $.ajax({
        url: '/article/create',
        method: 'post',
        data: dat
    }).done(function (data) {
        if (data["status"] === "ok") {
            tempAlert("Статья добавлена", 3000);
            updateArticleTable();
        } else {
            tempErrorAlert(data["message"], 3000);
        }
    });
    removeAllWindows();
}

article_selected_button.onclick = () => {
    let p = document.getElementsByClassName("checkbox-article");
    for (let i = 0; i < p.length; i++) {
        if (p.item(i).checked === true) {
            removeArticle(p.item(i).value);
        }
    }
}

function removeArticle(id) {
    $.ajax({
        url: '/article/remove',
        method: 'post',
        data: {
            id: id
        }
    }).done(function (data) {
        if (data["status"] === "ok") {
            tempAlert("Статья удалена", 3000);
        } else {
            tempErrorAlert(data["message"], 3000);
        }
        updateArticleTable();
    });
}

function updateArticleTable() {
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
            tr.id = "article_" + i['id_articles'];

            tr.innerHTML = "<td style='padding-left: 2%; width: 5%'>" +
                "                   <label class=\"my-checkbox\">\n" +
                "                        <input type=\"checkbox\" class='checkbox-article' value='" + i['id_articles'] + "' onclick='updateSelectedArticleCount();'>\n" +
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
                "            <td>" + i['title'] + "</td>\n" +
                "            <td>" + i['author']['username'] + "</td>\n" +
                "            <td>" + i['create_date'] + "</td>\n" +
                // "            <td>\n" +
                "                <button class=\"btn-none\" style=\"margin-left: 15px;\" onclick='articleTextItemWindow(" + i['title'] + "," + i['text'] + ");'>\n" +
                "                       <svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" viewBox=\"0 0 96 96\" width=\"20px\" height=\"20px\">\n" +
                "                           <g id=\"surface35259549\">\n" +
                "                           <path style=\" stroke:none;fill-rule:nonzero;fill:rgb(100%,100%,100%);fill-opacity:1;\" d=\"M 20.703125 12 L 12 26.921875 L 12 84 L 84 84 L 84 26.921875 L 75.296875 12 Z M 25.296875 20 L 70.703125 20 L 75.367188 28 L 20.632812 28 Z M 36 36 L 60 36 L 60 44 L 36 44 Z M 36 36 \"/>\n" +
                "                           </g>\n" +
                "                       </svg>\n" +
                "                </button>\n" +
                "";
            tasks.appendChild(tr);
            updateSelectedArticleCount();
        });
    });
}


function updateSelectedArticleCount() {
    let count = 0;
    let p = document.getElementsByClassName("checkbox-article");
    for (let i = 0; i < p.length; i++) {
        if (p.item(i).checked === true) {
            count++;
        }
    }
    if (article_count !== 0) document.getElementById("checkbox-all-article").checked = count === article_count;
    document.getElementById("article_stats").innerText = "Total: " + article_count + "/Select: " + count;
}

function updateCrateWindowArticleCarSelector() {
    let create_window_cars_group_selector = document.getElementById('create-window-cars-group-selector');
    let id = create_window_cars_group_selector.options[create_window_cars_group_selector.selectedIndex].value;
    let cars = document.getElementById("create-window-cars-selector");

    if (id === null || id === "null") {
        while (cars.firstChild) {
            cars.removeChild(cars.firstChild);
        }
        let option = document.createElement("option");
        option.value = null;
        option.text = "Не выбирать машину";
        cars.appendChild(option);
        cars.selectedIndex = 0;
    } else {
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
            let last = -1;


            data["list"]['cars'].forEach((i) => {
                let option = document.createElement("option");
                option.value = i["id_car"];
                option.text = i["name"];
                cars.appendChild(option);
                last++;
                cars.selectedIndex = last;
            });
            let option = document.createElement("option");
            option.value = null;
            option.text = "Не выбирать машину";
            cars.appendChild(option);
            last++;
            cars.selectedIndex = last;

        });
    }
}

function selectAllArticle() {
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

updateArticleTable();