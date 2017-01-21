    function toggle_visibility(id1,id2,id3) {
            $("div[id^='Section']").hide();
            $("#" + id1).show();
            }

            document.addEventListener('deviceready', function () {
                // basic usage
                TTS
                    .speak('I have Successfully added ' + text, function () {
                        
                    }, function (reason) {
                        
                    });
            }, false);


            function scan(){
                console.log("clicked");
                cordova.plugins.barcodeScanner.scan(function(result){
                addItemToKitchen(result.text);
                speak(result.text);
                },function(error){
                alert(JSON.stringify(error));
                });
            }

            function createNewToDo() {
            var todoDictionary = {};

            // prompt the user to enter to-do
            var todo = prompt("Add item to your list","")
                if (todo != null) {
                if (todo == "") {
                    $( function() {
                        $( "#dialog" ).dialog({
                        height: 100,
                        modal: true,
                        open: function(event, ui){
                            setTimeout("$('#dialog').dialog('close')",3000);
                        }
                        }, "Alert", "Alert");
                    });
                } else {
                    addItemToKitchen(todo);
                }
            }
        }

        function addItemToKitchen(todo){
            todoDictionary = {
                    check: 0,
                    text: todo
            };
            addTableRow(todoDictionary, false);
            speak(todo);
        }

        var rowID = 0;

        function addTableRow(todoDictionary, appIsLoading) {
            rowID += 1;
            var table = document.getElementById("dataTable");
            var rowCount = table.rows.length;
            var row = table.insertRow(rowCount);

            var cell1 = row.insertCell(0);
            var element1 = document.createElement("input");
            element1.type = "checkbox";
            element1.name = "chkbox[]";
            element1.checked = todoDictionary["check"];
            element1.setAttribute("onclick", "checkboxClicked()");
            cell1.style = "width:20% !important";
            cell1.appendChild(element1);


            var cell2 = row.insertCell(1);
            var element2 = document.createElement("Label");
            element2.setAttribute("for",todoDictionary["text"]);
            element2.innerHTML = todoDictionary["text"];
            element2.name = "txtbox[]";
            element2.class = "contenttd";
            element2.id = "text" + rowID;
            element2.setAttribute("onchange", "saveToDoList()");
            cell2.style = "width:50% !important";
            cell2.appendChild(element2);

            var cell3 = row.insertCell(2);
            var element3 = document.createElement("input");
            console.log("todo " + todoDictionary["Quantity"]);
            if(todoDictionary["Quantity"] == null || todoDictionary["Quantity"] == undefined){
                element3.setAttribute("value",1);
            }else{
                element3.setAttribute("value", todoDictionary["Quantity"]);
            }
            element3.name = "txtbox[]";
            element3.id = "Quantity" + rowID;
            element3.setAttribute("onchange", "saveToDoList()");
            element3.style = "width:50%";
            cell3.style = "width:30% !important";
            cell3.appendChild(element3);



            // update the UI and save the to-do list
            checkboxClicked();
            saveToDoList();

            if (!appIsLoading) alert("Task Added Successfully.");
        }


        // add the strike-through styling to completed tasks

        function checkboxClicked() {
            var table = document.getElementById("dataTable");
            var rowCount = table.rows.length;

            // loop through all rows of the table
            for (var i = 0; i < rowCount; i++) {
                var row = table.rows[i];
                var chkbox = row.cells[0].childNodes[0];
                var textbox = row.cells[1].childNodes[0];

                // if the checkbox is checked, add the strike-through styling
                if (null != chkbox && true == chkbox.checked) {
                    if (null != textbox) {
                        textbox.style.setProperty("text-decoration", "line-through");
                    }
                }
                else {
                    textbox.style.setProperty("text-decoration", "none");
                }

            }

            // save the to-do list
            saveToDoList();
        }


        // view the content of the selected row
        function editSelectedRow(todoTextField) {
            console.log(todoTextField);
        }


        // delete the selected row
        function deleteSelectedRow(deleteButton) {
            var p = deleteButton.parentNode.parentNode;
            p.parentNode.removeChild(p);
            saveToDoList();
        }


        // remove completed tasks
        function removeCompletedTasks() {
            var table = document.getElementById("dataTable");
            var rowCount = table.rows.length;

            // loop through all rows of the table
            for (var i = 0; i < rowCount; i++) {
                // if the checkbox is checked, delete the row
                var row = table.rows[i];
                var chkbox = row.cells[0].childNodes[0];
                if (null != chkbox && true == chkbox.checked) {
                    table.deleteRow(i);
                    rowCount--;
                    i--;
                }
            }

            // save the to-do list
            saveToDoList();

            alert("Completed Tasks Were Removed Successfully.");
        }


        // save the to-do list
        function saveToDoList() {
            var todoArray = {};
            var checkBoxState = 0;
            var textValue = "";

            var table = document.getElementById("dataTable");
            var rowCount = table.rows.length;

            if (rowCount != 0) {
                // loop through all rows of the table
                for (var i = 0; i < rowCount; i++) {
                    var row = table.rows[i];

                    // determine the state of the checkbox
                    var chkbox = row.cells[0].childNodes[0];
                    if (null != chkbox && true == chkbox.checked) {
                        checkBoxState = 1;
                    } else {
                        checkBoxState = 0;
                    }

                    // retrieve the content of the to-do
                    var textbox = row.cells[1].childNodes[0];
                    textValue = textbox.innerHTML;

                    var qunatText = row.cells[2].childNodes[0];
                    quantValue = qunatText.value;

                    // populate the array
                    todoArray["row" + i] = {
                        check: checkBoxState,
                        text: textValue,
                        Quantity: quantValue
                    };
                }
            } else {
                todoArray = null;
            }

            // use the local storage API to persist the data as JSON
            window.localStorage.setItem("todoList", JSON.stringify(todoArray));
        }

        // load the to-do list
        function loadToDoList() {
            // use the local storage API load the JSON formatted to-do list, and decode it
            var theList = JSON.parse(window.localStorage.getItem("todoList"));
            if (null == theList || theList == "null") {
                deleteAllRows();
            } else {
                var count = 0;
                for (var obj in theList) {
                    count++;
                }

                // remove any existing rows from the table
                deleteAllRows();

                // loop through the to-dos
                for (var i = 0; i < count; i++) {
                    // adding a row to the table for each one
                    addTableRow(theList["row" + i], true);
                }
            }
        }

        // delete all the rows
        function deleteAllRows() {
            var table = document.getElementById("dataTable");
            var rowCount = table.rows.length;

            // loop through all rows of the table
            for (var i = 0; i < rowCount; i++) {
                // delete the row
                table.deleteRow(i);
                rowCount--;
                i--;
            }

            // save the to-do list
            saveToDoList();
        }

        function toggle_sidebar()
        {
            var sidebar = document.getElementById("sidebar");
            if(sidebar.style.left == "-200px"){
                sidebar.style.left = "0px";
            }
            else{
                sidebar.style.left = "-200px";
            }
        }

        function onLoad() {
            document.addEventListener("deviceready", onDeviceReady, false);
            }
            function onDeviceReady() {
            window.plugins.tts.startup(startupWin, fail);
            pictureSource = navigator.camera.PictureSourceType;
            destinationType = navigator.camera.DestinationType;
        }

        function startupWin(result) {
            // When result is equal to STARTED we are ready to play
            TTS.STARTED==2
            if (result == 2) {
                window.plugins.tts.getLanguage(win, fail);
                window.plugins.tts.speak("The text to speech service is ready");
                window.plugins.tts.isLanguageAvailable("en_US", function() {
                    addLang("en_US", "English (American)");
                }, fail);
                window.plugins.tts.isLanguageAvailable("en_GB", function() {
                    addLang("en_GB", "English (UK)");
                }, fail);
                window.plugins.tts.isLanguageAvailable("fr", function() {
                    addLang("fr", "French");
                }, fail);
                window.plugins.tts.isLanguageAvailable("de", function() {
                    addLang("de", "German");
                }, fail);
                window.plugins.tts.isLanguageAvailable("it", function() {
                    addLang("it", "Italian");
                }, fail);
                window.plugins.tts.isLanguageAvailable("es", function() {
                    addLang("es", "Spanish");
                }, fail);
                }
            }

    function addLang(loc, lang) {
        var langs = document.getElementById('langs');
        var langOption = document.createElement("OPTION") 
        langOption.innerText = lang; 
        langOption.value = loc;
            langs.options.add(langOption); 
    }
    
    function changeLang() {
        var yourSelect = document.getElementById('langs');
            window.plugins.tts.setLanguage(yourSelect.options[yourSelect.selectedIndex].value, win, fail);
    }
    
    function win(result) {
        console.log(result);
    }
        
        function fail(result) {
            console.log("Error = " + result);
        }
        
        function speak(text) {
        TTS.speak('I have Successfully added ' + text, function () {     
                    });
        }

        function voicerec() {
        var maxMatches = 1;
        var promptString = "Speak now"; // optional
        var language = "en-US";         // optional
        window.plugins.speechrecognizer.startRecognize(function(result){
        alert(result);
        }, function(errorMessage){
            console.log("Error message: " + errorMessage);
        }, maxMatches, promptString, language);
    }