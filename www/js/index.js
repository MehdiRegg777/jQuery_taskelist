/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    //document.getElementById('deviceready').classList.add('ready');
    
    


    $("#nuevaListaButton").on("click", añadirElemento);
/*     $("#editButton").on("click", editarElemento);
    $("#deleteButton").on("click", eliminarElemento); */
    $(document).on("click", ".deleteButton", eliminarElemento);
    $(document).on("click", ".editButton", editarElemento);

    // Recuperar desde el Local Storage
    var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    for (var i = 0; i < tasks.length; i++) {
        agregarElementoALista(tasks[i]);
    }

}
function añadirElemento() {
    var text = prompt("Añadir tasca:");
    if (text !== null && text.trim() !== "") {
        var $elem = $("<li><a href='#" + text + "'>" + text + "</a></li>");
        var $deleteButton = $("<button class='delTask deleteButton' style='float: right;'>Delete</button>");
        var $editButton = $("<button class='delTask editButton' style='float: right;'>Edit</button>");

        $elem.find('a').append($deleteButton);
        $elem.find('a').append($editButton);

        $("ul").append($elem);

       /*  var $page = $("<div data-role='page' id='" + text + "'></div>");
        var $header = $("<div data-role='header'><a href='#' data-icon='back' data-rel='back' title='Go back'>Back</a><h1>" + text + "</h1></div>");
        var $content = $("<div class='ui-content'><p>This is " + text + "</p></div>");
        var $footer = $("<div data-role='footer' data-position='fixed'><h1>" + text + "</h1></div>");

        $page.append($header);
        $page.append($content);
        $page.append($footer);

        $("body").append($page); */

        $('ul[data-role="listview"]').listview('refresh');

        // Guardar en el Local Storage
        var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(text);
        localStorage.setItem('tasks', JSON.stringify(tasks));

    }
}

function eliminarElemento() {
    var $a = $(this).closest("a");
    var taskID = $a.attr("href").replace("#", "");
    var $li = $a.closest("li");
    // Eliminar del Local Storage
    var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    var index = tasks.indexOf(taskID);
    if (index !== -1) {
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    $li.remove();
    $("#" + taskID).remove();
    $('ul[data-role="listview"]').listview('refresh');
}

function editarElemento() {
    var $a = $(this).closest("a");

    // Obtén el texto solo del elemento <a> actual (excluyendo botones)
    var currentText = $a.contents().filter(function() {
        return (this.nodeType === 3 && $(this).closest('.delTask').length === 0);
    }).text();
    // var currentText = $a.text();
    var newText = prompt("Editar tasca:");

    if (newText !== null && newText.trim() !== "") {
        $a.text(newText);
        var taskID = $a.attr("href").replace("#", "");
        $("#" + taskID + " h1").text(newText);
        $("#" + taskID + " p").text("This is " + newText);

        $a.attr('href', '#' + newText);

        var $deleteButton = $("<button class='delTask deleteButton' style='float: right;'>Delete "  + "</button>");
        var $editButton = $("<button class='delTask editButton' style='float: right;'>Edit "  + "</button>");

        $a.siblings('.deleteButton').remove();
        $a.siblings('.editButton').remove();
        $a.append($deleteButton);
        $a.append($editButton);
        $("#ff").attr("id", newText);
        $("#" + newText + " h1").text(newText);
        $("#" + newText + " p").text("This is " + newText);
        $("#" + newText + " .ui-content p").text("This is " + newText);
        $("#" + newText + " .ui-footer h1").text(newText);

        // Actualizar en el Local Storage
        var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        var index = tasks.indexOf(currentText);
        console.log(currentText);
        console.log(index);
        console.log(tasks);
        if (index !== -1) {
            tasks[index] = newText;
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }
    $('ul[data-role="listview"]').listview('refresh');
    $('div[data-role="page"]').listview('refresh');

    
}

function agregarElementoALista(text) {
    var $elem = $("<li><a href='#" + text + "'>" + text + "</a></li>");
    var $deleteButton = $("<button class='delTask deleteButton' style='float: right;'>Delete</button>");
    var $editButton = $("<button class='delTask editButton' style='float: right;'>Edit</button>");

    $elem.find('a').append($deleteButton);
    $elem.find('a').append($editButton);

    $("ul").append($elem);

    $('ul[data-role="listview"]').listview('refresh');

}

/* function edita(ev) {
    console.log("edita")
    var caller = ev.target || e.srcElement;
    var elem = $(caller).parent();
    var text = $(elem).clone().children().remove().end().text();
    $(elem).empty();
    var input = $("<input type='text'/>");
    input.val(text);
    var ok = $("<button>OK</button>");

    $(ok).click(modifica);
    elem.append(input);
    elem.append(ok);
    $("#tasklist").listview("refresh");
}

function modifica(ev) {
    console.log("edita")
    var caller = ev.target || e.srcElement;
    var elem = $(caller).parent();
    var text = $(elem).find("input").val();

    $(elem).empty();

    var delbtn = $("<button style='float:right;'>X</button>");
    var editbtn = $("<button style='float:right;'>edit</button>");
    $(delbtn).click(esborra);
    $(editbtn).click(edita);

    $(elem).append(text);
    $(elem).append(delbtn);
    $(elem).append(editbtn);
    
    $("#tasklist").listview("refresh");
} */