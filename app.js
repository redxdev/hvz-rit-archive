// This code is quick + dirty, pls no h8

var games = [];
var gameTemplate = null;

function registerGame(gameId, gameName) {
    games.push({id: gameId, name: gameName});
}

function renderIndex() {
    var container = document.createElement("div");

    var title = document.createElement("h2");
    title.innerHTML = "Archive Index";
    title.className = "text-center";
    container.appendChild(title);

    var items = document.createElement("ul");
    container.appendChild(items);

    games.forEach(function (el) {
        var textContainer = document.createElement("li");
        items.appendChild(textContainer);

        var text = document.createElement("a");
        text.href = "#";
        text.onclick = function () {
            displayGame(el);
        };
        text.innerText = el.name;
        textContainer.appendChild(text);
    });

    return container;
}

function resetContainers() {
    $('#index-container').empty();
    $('#content-container').empty();
}

function displayIndex() {
    resetContainers();

    $('#index-container').append(renderIndex());
}

function displayGame(game) {
    resetContainers();

    $.getJSON("games/" + game.id + ".json", function (data) {
        data.name = game.name;
        data.id = game.id;

        data.missions.forEach(function (mission) {
            switch (mission.team) {
            case "all":
                mission.all = true;
                break;

            case "zombie":
                mission.zombie = true;
                break;

            case "human":
                mission.human = true;
                break;
            }
        });

        var html = gameTemplate(data);
        $('#content-container').html(html);
    })
    .fail (function(err) {
        console.error(err);
        $('#index-container').html('<h2>Unable to load game</h2>');
    });
}

$(function () {
	registerGame("2017-fall", "2017 Fall")
    registerGame("2017-spring", "2017 Spring");
    registerGame("2016-fall", "2016 Fall");
    registerGame("2016-spring", "2016 Spring");
    registerGame("2015-fall", "2015 Fall");
    registerGame("2015-spring", "2015 Spring");

    var source = $('#content-container').html();
    gameTemplate = Handlebars.compile(source);

    displayIndex();
});