let create_tasks_button = document.getElementById("create-task-button");
let delete_task_selected_button = document.getElementById("delete-task-selected-button");
let window_create_task = "methods";
let items_count = 0;
let windows_name = "car";


delete_task_selected_button.onclick = () => {
    let p = document.getElementsByClassName("checkbox-task");
    for (let i = 0; i < p.length; i++) {
        if (p.item(i).checked === true) {
            removeTask(p.item(i).value);
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
        tasks_count = 0;
        data["list"].forEach((i) => {
            let tr = document.createElement("tr");
            tr.id = "item_" + i['id'];
            let type, type_name;
            if(i['car'] != null) {
                type = "Car";
                type_name = i['car']['name']
            }else if(i['bumper'] != null) {
                type = "Bumper";
                type_name = i['bumper']['name']
            }else if(i['wheels'] != null) {
                type = "Wheels";
                type_name = i['wheels']['name']
            }
            tr.innerHTML = "<td style='padding-left: 2%; width: 5%'>" +
                "                   <label class=\"my-checkbox\">\n" +
                "                        <input type=\"checkbox\" class='checkbox-item' value='" + i['id'] + "' onclick='updateSelectedItemsCount();'>\n" +
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
                "            <td>" + type_name + "</td>\n" +
                "            <td>" + i['description'] + "</td>\n" +
                "            <td>" + "<img width='150' src="+i['real_photo']+" alt="+i['real_photo']+">" + "</td>\n" +
                "            <td>\n" +
                "                <button class=\"btn-none button-start\" style=\"margin-left: 15px;\" onclick='changeButton(" + i["id"] + ")'>\n" +
                "                    <svg width=\"16\" height=\"22\" viewBox=\"0 0 22 22\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
                "                         <rect x=\"1\" y=\"1\" width=\"20\" height=\"20\" rx=\"5\" stroke=\"#F1F1F1\" stroke-width=\"2\"/>\n" +
                "                         <path d=\"M9 7.22729L15 11.3182L9 15.4091V7.22729Z\" stroke=\"#F1F1F1\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n" +
                "                    </svg>\n" +
                "                </button>\n" +
                "                <button class=\"btn-none\" style=\"margin-left: 15px;\" onclick='copyTaskGroup(" + i["id"] + ")'>\n" +
                "                    <svg width=\"16\" height=\"23\" viewBox=\"0 0 22 23\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
                "                        <path d=\"M3 8.61084H12C13.1046 8.61084 14 9.52408 14 10.6506V19.8296C14 20.9561 13.1046 21.8694 12 21.8694H3C1.89543 21.8694 1 20.9561 1 19.8296V10.6506C1 9.52408 1.89543 8.61084 3 8.61084Z\"\n" +
                "                              stroke=\"#F1F1F1\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n" +
                "                        <path d=\"M18 14.7302H19C19.5304 14.7302 20.0391 14.5153 20.4142 14.1328C20.7893 13.7502 21 13.2314 21 12.6904V3.51145C21 2.97047 20.7893 2.45165 20.4142 2.06912C20.0391 1.68658 19.5304 1.47168 19 1.47168H10C9.46957 1.47168 8.96086 1.68658 8.58579 2.06912C8.21071 2.45165 8 2.97047 8 3.51145V4.53134\"\n" +
                "                              stroke=\"#F1F1F1\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n" +
                "                    </svg>\n" +
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
                // "                <button class=\"btn-none\" style=\"margin-left: 15px;\" onclick='removeTask(" + i["id"] + ")'>\n" +
                // "                    <svg width=\"14\" height=\"24\" viewBox=\"0 0 20 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
                // "                        <path d=\"M1 5.5791H3H19\" stroke=\"#F1F1F1\" stroke-width=\"2\" stroke-linecap=\"round\"\n" +
                // "                              stroke-linejoin=\"round\"></path>\n" +
                // "                        <path d=\"M6 5.5783V3.52499C6 2.98042 6.21071 2.45815 6.58579 2.07308C6.96086 1.68801 7.46957 1.47168 8 1.47168H12C12.5304 1.47168 13.0391 1.68801 13.4142 2.07308C13.7893 2.45815 14 2.98042 14 3.52499V5.5783M17 5.5783V19.9515C17 20.496 16.7893 21.0183 16.4142 21.4034C16.0391 21.7884 15.5304 22.0048 15 22.0048H5C4.46957 22.0048 3.96086 21.7884 3.58579 21.4034C3.21071 21.0183 3 20.496 3 19.9515V5.5783H17Z\"\n" +
                // "                              stroke=\"#F1F1F1\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n" +
                // "                    </svg>\n" +
                // "                </button>\n" +
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
            "            <button class=\"button-active\" onclick='document.getElementById(\"logs-window\").remove();'>Cancel</button>\n" +
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

function copyTaskGroup(id) {
    $.ajax({
        url: '/show_tasks',
        method: 'get',
        data: {
            id: id
        }
    }).done(function (data) {
        let sizes = "";
        data['list']['sizes'].forEach(i => {
            sizes += i + " ";
        })
        sizes.trim();
        addTask(data['list']['name'],
            data['list']['module'],
            data['list']['itemId'],
            data['list']['amount'],
            data['list']['profileGroup'] === null ? null : data['list']['profileGroup']['id'],
            data['list']['accountGroup'] === null ? null : data['list']['accountGroup']['id'],
            data['list']['proxyGroup']['id'],
            data['list']['filter'],
            sizes);
    });
}

function changeButton(id) {
    let tr = document.getElementById("tasks_" + id);
    let status = tr.getElementsByClassName("status-task").item(0);
    if (status.textContent === "In Progress") {
        stopTask(id);
    } else {
        runTask(id);
    }
}

create_tasks_button.onclick = () => {
    removeAllWindows();
    let home = document.getElementById("windows-container");
    let create_profile_window = document.createElement("div");
    create_profile_window.innerHTML = "<div class=\"blur-window create-profile\" id=\"create-item-window\">\n" +
        "        <div class=\"container top-container\">\n" +
        "            <div class=\"menu-slider unselectable\">\n" +
        "                <div class=\"menu-slider-item\" id=\"profile-general-button\" onclick='windows_name = \"car\";updateProfileWindow();'>Машинка</div>\n" +
        "                <div class=\"menu-slider-item\" id=\"profile-delivery-button\" onclick='windows_name = \"bumper\";updateProfileWindow();'>Бампер</div>\n" +
        "                <div class=\"menu-slider-item\" id=\"profile-payment-button\" onclick='windows_name = \"wheels\";updateProfileWindow();'>Колеса</div>\n" +
        "            </div>\n" +
        "            <div class=\"border-b-line\"></div>\n" +
        "        </div>\n" +
        "\n" +
        "        <div>\n" +
        "            <div class=\"container profile-container\" id=\"general-container\" hidden>\n" +
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
        "\n" +
        "            <div class=\"container profile-container\" id=\"delivery-container\" hidden>\n" +
        "                <div class=\"middle-container-text\">Выберите бампер:</div>\n" +
        "                <div class=\"middle-container-text\" style=\"margin-top: 70px\">Описание:</div>\n" +
        "                <div class=\"middle-container-text\" style=\"margin-top: 145px\">Фото:</div>\n" +
        "                  <select class=\"group-selector\" id=\"wheels-selector\" onchange=\"\"" +
        "                       style=\"position: absolute;margin-left: 10px;margin-top: 30px; width:220px;\">\n" +
        "                       <option value='null'>Выберите бампер...</option>" +
        "                  </select>" +
        "                <input type=\"text\" id=\"GeneralEmailAddressInput\" placeholder=\"Куплен на алике\" value=\"\"\n" +
        "                       style=\"position: absolute;margin-left: 10px;margin-top: 100px; width:220px;\">\n" +
        "                <div class=\"border-b-line\" style=\"width: 250px;top: 125px;\"></div>\n" +
        "                <input type=\"text\" id=\"GeneralPhoneNumberInput\" placeholder=\"https://www.google.com/url...\" value=\"\"\n" +
        "                       style=\"position: absolute;margin-left: 10px;margin-top: 175px; width:220px;\">\n" +
        "                <div class=\"border-b-line\" style=\"width: 250px;top: 200px;\"></div>\n" +
        "            </div>\n" +
        "\n" +
        "            <div class=\"container profile-container\" id=\"payment-container\" hidden>\n" +
        "                <div class=\"middle-container-text\">Выберите колеса:</div>\n" +
        "                <div class=\"middle-container-text\" style=\"margin-top: 70px\">Описание:</div>\n" +
        "                <div class=\"middle-container-text\" style=\"margin-top: 145px\">Фото:</div>\n" +
        "                  <select class=\"group-selector\" id=\"wheels-selector\" onchange=\"\"" +
        "                       style=\"position: absolute;margin-left: 10px;margin-top: 30px; width:220px;\">\n" +
        "                       <option value='null'>Выберите колеса...</option>" +
        "                  </select>" +
        "                <input type=\"text\" id=\"GeneralEmailAddressInput\" placeholder=\"Снял с соседсой машины\" value=\"\"\n" +
        "                       style=\"position: absolute;margin-left: 10px;margin-top: 100px; width:220px;\">\n" +
        "                <div class=\"border-b-line\" style=\"width: 250px;top: 125px;\"></div>\n" +
        "                <input type=\"text\" id=\"GeneralPhoneNumberInput\" placeholder=\"https://www.google.com/url...\" value=\"\"\n" +
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
    updateProfileWindow();
};


// function updateStatus() {
//     $.ajax({
//         url: '/status_tasks',
//         method: 'get',
//     }).done(function (data) {
//         let updateMonitor = false;
//         for (let i = 0; i < data["list"].length; i++) {
//             const group = data["list"][i];
//             for (let j = 0; j < group["tasks"].length; j++) {
//                 const task = group["tasks"][j];
//                 if (task["status"] === "SUCCESS" && task["checked"] === false) {
//                     $.ajax({
//                         url: '/tasks_checked',
//                         method: 'post',
//                         data: {
//                             idGroup: group["id"],
//                             idTask: j
//                         }
//                     }).done(() => {
//                             updateStatus();
//                         }
//                     );
//                     if (task["message"] === "null") {
//                         tempErrorAlert("Task not succeed", 1500);
//                     } else {
//                         if (getCookie('desktop') === 'true') {
//                             window.open("data:text/html;charset=utf-8," + task["message"], "", "_blank")
//                         } else {
//                             // let newWindow = window.open("about:blank", "", "_blank");
//                             // newWindow.document.write(task["message"]);
//                             let newWindow = window.open();
//                             newWindow.document.write(task["message"]);
//                         }
//                         tempAlert("Task succeed", 1500);
//                     }
//                 }
//             }
//         }
//         let run = "                    <svg width=\"16\" height=\"22\" viewBox=\"0 0 22 22\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
//             "                         <rect x=\"1\" y=\"1\" width=\"20\" height=\"20\" rx=\"5\" stroke=\"#F1F1F1\" stroke-width=\"2\"/>\n" +
//             "                         <path d=\"M9 7.22729L15 11.3182L9 15.4091V7.22729Z\" stroke=\"#F1F1F1\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n" +
//             "                    </svg>\n";
//         let stop = "                   <svg width=\"16\" height=\"22\" viewBox=\"0 0 22 22\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
//             "                       <rect x=\"1\" y=\"1\" width=\"20\" height=\"20\" rx=\"5\" stroke=\"#F1F1F1\" stroke-width=\"2\"/>\n" +
//             "                       <rect x=\"7\" y=\"7\" width=\"8\" height=\"8\" rx=\"2\" fill=\"#F1F1F1\"/>\n" +
//             "                   </svg>\n";
//         data["list"].forEach((i) => {
//             let item = document.getElementById("tasks_" + i["id"]);
//             let status = item.getElementsByClassName("status-task").item(0);
//             let isSUCCESS = true;
//             let isStart = false;
//             let isCancel = false;
//             i["tasks"].forEach((task) => {
//                 if (task["status"] === "IN_PROGRESS") {
//                     isStart = true;
//                     isSUCCESS = false;
//                 }
//                 if (task["status"] === "CANCEL") {
//                     isCancel = true;
//                     isSUCCESS = false;
//                 }
//             });
//             if (isStart) {
//                 status.style.color = '#F18730';
//                 status.textContent = "In Progress";
//                 updateMonitor = true;
//             } else if (isCancel) {
//                 status.style.color = '#F18730';
//                 status.textContent = "Canceled";
//             } else if (isSUCCESS) {
//                 status.style.color = '#A5E12D';
//                 status.textContent = "SUCCESS";
//             }
//             let button = item.getElementsByClassName("button-start").item(0);
//             if (status.textContent === "In Progress") {
//                 button.innerHTML = stop;
//             } else {
//                 button.innerHTML = run;
//             }
//         });
//         if (updateMonitor) {
//             if (update_interval == null) update_interval = setInterval(updateStatus, 2000);
//         } else {
//             clearInterval(update_interval);
//             update_interval = null;
//         }
//     });
// }


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

function removeTask(id) {
    $.ajax({
        url: '/remove_tasks',
        method: 'get',
        data: {
            id: id
        }
    }).done((data) => {
        if (data["status"] === "ok") {
            tempAlert("Tasks was removed", 3000);
        } else {
            tempErrorAlert(data["message"], 3000);
        }
        updateTasksTable();
    });
}

function runTask(id) {
    $.ajax({
        url: '/run_tasks',
        method: 'post',
        data: {
            id: id
        }
    }).done((data) => {
        if (data["status"] === "ok") {
            let tr = document.getElementById("tasks_" + id);
            let status = tr.getElementsByClassName("status-task").item(0);
            status.textContent = "In Progress";
            status.style.color = '#F18730';
            tempAlert("Tasks started", 3000);
        } else {
            tempErrorAlert(data["message"], 3000);
        }
        updateStatus();
    });
}

function stopTask(id) {
    $.ajax({
        url: '/stop_tasks',
        method: 'post',
        data: {
            id: id
        }
    }).done((data) => {
        if (data["status"] === "ok") {
            tempAlert("Tasks stoped", 3000);
        } else {
            tempErrorAlert(data["message"], 3000);
        }
        updateStatus();
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
    if (count !== items_count) {
        document.getElementById("checkbox-all-items").checked = false;
    }
    document.getElementById("items_stats").innerText = "Total: " + tasks_count + "/Select: " + count;
}

function selectAllItems() {
    let checkbox = document.getElementById("checkbox-all-items");
    if (checkbox.checked === true) {
        let p = document.getElementsByClassName("checkbox-item");
        for (let i = 0; i < p.length; i++) {
            p.item(i).checked = true;
        }
        document.getElementById("items_stats").innerText = "Total: " + tasks_count + "/Select: " + tasks_count;
    } else {
        let p = document.getElementsByClassName("checkbox-item");
        for (let i = 0; i < p.length; i++) {
            p.item(i).checked = false;
        }
        document.getElementById("items_stats").innerText = "Total: " + tasks_count + "/Select: 0";
    }
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

function backButton() {
    let module_list_header = document.getElementById("module-list-header");
    let create_task_header = document.getElementById("create-task-header");
    document.getElementById("methods-container").hidden = false;
    document.getElementById("crete-task-container").hidden = true;
    window_create_task = "methods";
    module_list_header.className = "menu-slider-item unselectable active";
    create_task_header.className = "menu-slider-item unselectable";
    let create_task_back_button = document.getElementById("create-task-back-button")
    create_task_back_button.hidden = true;
}


function backProfileButton() {
    let create_profile_back_button = document.getElementById("create-profile-back-button")
    if (windows_name === "payment") {
        windows_name = "delivery";
        updateProfileWindow();
    } else if (windows_name === "delivery") {
        windows_name = "general";
        updateProfileWindow();
        create_profile_back_button.hidden = true;
    }
}

function createItem() {
    let data = {
        description: document.getElementById("ItemCarDesInput").value,
        real_photo: document.getElementById("ItemCarPhotoInput").value,
    };
    if (windows_name === "car") {
        let create_window_cars_selector = document.getElementById('create-window-cars-selector');
        let id_car = create_window_cars_selector.options[create_window_cars_selector.selectedIndex].value;
        if (id_car !== null && id_car !== 'null') {
            data['id_car'] = id_car;
        }
    } else if (windows_name === "delivery") {

    } else if (windows_name === "payment") {

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

function updateProfileWindow() {
    let general_container = document.querySelector("#general-container");
    let delivery_container = document.querySelector("#delivery-container");
    let payment_container = document.querySelector("#payment-container");
    general_container.hidden = true;
    delivery_container.hidden = true;
    payment_container.hidden = true;

    let profile_general_button = document.getElementById("profile-general-button");
    let profile_delivery_button = document.getElementById("profile-delivery-button");
    let profile_payment_button = document.getElementById("profile-payment-button");

    let create_profile_back_button = document.getElementById("create-profile-back-button")
    let create_profile_next_button = document.getElementById("create-profile-next-button")

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
        general_container.hidden = false;
    } else if (windows_name === "bumper") {
        profile_delivery_button.className = "menu-slider-item unselectable active";
        delivery_container.hidden = false;
    } else if (windows_name === "wheels") {
        profile_payment_button.className = "menu-slider-item unselectable active";
        payment_container.hidden = false;
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
updateItemTable();