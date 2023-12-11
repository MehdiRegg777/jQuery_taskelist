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
    
    

    $("#openDialogButton").click(function () {
        $("#myDialog").popup("open");
    });



    // Asigna un controlador de eventos al botón "Nueva Lista"
    $("#nuevaListaButton").click(function () {
        // Crea un identificador único para la nueva página
        var nuevaListaPageId = 'nuevaListaPage' + new Date().getTime();

        // Agrega la nueva página al contenedor
        $('#nuevasListasContainer').append('<div data-role="page" id="' + nuevaListaPageId + '"><div data-role="header"><a href="#" data-icon="back" data-rel="back" title="Go back">Back</a><h1>Nueva Lista</h1></div><div class="ui-content"><p>Contenido de la nueva lista</p></div><div data-role="footer" data-position="fixed"><h1>Nueva Lista</h1></div></div>');


    });


}


