let UsernameSettingsInput = document.getElementById("UsernameSettingsInput");
let FirstNameSettingsInput = document.getElementById("FirstNameSettingsInput");
let SecondNameSettingsInput = document.getElementById("SecondNameSettingsInput");
let EmailSettingsInput = document.getElementById("EmailSettingsInput");
let BiographySettingsInput = document.getElementById("BiographySettingsInput");
let RDateSettingsInput = document.getElementById("RDateSettingsInput");
let SaveSettingButton = document.getElementById("SaveSettingButton");
let CreatorSettingsInput = document.getElementById("CreatorSettingsInput");


function updateInfo() {
    $.ajax({
        url: '/info',
        method: 'get',
    }).done(function (data) {
        if (data["status"] === 'ok') {
            UsernameSettingsInput.value = data["list"]["username"];
            FirstNameSettingsInput.value = data["list"]["first_name"];
            SecondNameSettingsInput.value = data["list"]["last_name"];
            EmailSettingsInput.value = data["list"]["email"];
            BiographySettingsInput.value = data["list"]["biography"];
            RDateSettingsInput.value = data["list"]["registration_date"];


            let balance = document.getElementsByClassName("my-balance");
            for (let i = 0; i < balance.length; i++) {
                balance.item(i).textContent = data["list"]["balance"];
            }


            if (data["list"]["creator"] === null) {
                CreatorSettingsInput.checked = false;

                document.getElementById("create-wiki-bumpers-button").hidden = true;
                document.getElementById("create-wiki-cars-button").hidden = true;
                document.getElementById("create-cars-group-button").hidden = true;
                document.getElementById("remove-cars-group-button").hidden = true;
                document.getElementById("create-wiki-wheels-button").hidden = true;
                document.getElementById("remove-wiki-cars-button").hidden = true;
            } else {
                CreatorSettingsInput.checked = true;
                CreatorSettingsInput.disabled = true;

                document.getElementById("create-wiki-bumpers-button").hidden = false;
                document.getElementById("create-wiki-cars-button").hidden = false;
                document.getElementById("create-cars-group-button").hidden = false;
                document.getElementById("remove-cars-group-button").hidden = false;
                document.getElementById("create-wiki-wheels-button").hidden = false;
                document.getElementById("remove-wiki-cars-button").hidden = false;
            }
        }
    });
}

SaveSettingButton.onclick = () => {
    $.ajax({
        url: '/editinfo',
        method: 'post',
        data: {
            username: UsernameSettingsInput.value,
            first_name: FirstNameSettingsInput.value,
            last_name: SecondNameSettingsInput.value,
            email: EmailSettingsInput.value,
            biography: BiographySettingsInput.value,
            creator: CreatorSettingsInput.checked
        }
    }).done(function (data) {
        if (data["status"] === "ok") {
            tempAlert("Профиль обновлен", 3000);
            document.cookie = "login=" + UsernameSettingsInput.value;
            updateInfo();
        } else {
            tempErrorAlert(data["message"], 3000);
        }
    });
}

updateInfo();