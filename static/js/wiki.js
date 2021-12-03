let create_wiki_bumpers_button = document.getElementById("create-wiki-bumpers-button");
let create_wiki_cars_button = document.getElementById("create-wiki-cars-button");
let create_wiki_wheels_button = document.getElementById("create-wiki-wheels-button");


function checkCreator() {
    $.ajax({
        url: '/info',
        method: 'get',
    }).done(function (data) {
        if (data["status"] === 'ok') {
            create_wiki_bumpers_button.hidden = data["list"]["creator"] === null;
            create_wiki_cars_button.hidden = data["list"]["creator"] === null;
            create_wiki_wheels_button.hidden = data["list"]["creator"] === null;
        }
    });
}

checkCreator();