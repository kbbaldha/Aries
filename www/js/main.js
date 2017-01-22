    var url = "http://10.136.34.148:8042";
	//var url = "http://45.79.223.108:8042";
    var familyid = "";

    function signInToServer(name){
         name = '{"familyName" : "myFamily1"}';
         $.ajax({
         type: "POST",
         url: url + "/login",
         data: JSON.stringify(name),
         crossDomain: false,
         contentType: "json",
         success: function (result) {
             familyid = result[0]._id; 
             refreshFeed();
         },
         error: function(xhr,status,error){
         },
         dataType: "json"
      });
      setInterval(refreshFeed,30000);
    }

    function refreshFeed(){
            $.ajax({
                type: "GET",
                url: url + "/family/" + familyid,
                crossDomain: true,
                contentType: "json",
                success: function (result) {
                    if(result != null){
                        updateLocalStorage(result);
                    }else{
                        loadToDoList();
                    }
                },
                error: function(xhr,status,error){
                        loadToDoList();                    
                },
                dataType: "json"
            });
        }

        function updateLocalStorage(result){
            var theList = JSON.parse(window.localStorage.getItem("todoList"));
            var check = 0;
            if(result != null && result != undefined && result.fridgeList != null){
                fridgeList = result.fridgeList;
                var todoArray = {};
                for(var i = 0; i < fridgeList.length; i++){
                    if(theList != null && theList[i]!= null && theList[i].check != null ){
                        check = theList[i].check;
                    }else{
                        check = 0;
                    }
                    todoArray["row" + i] = {
                        check: check,
                        text:fridgeList[i].product.name,
                        Quantity:fridgeList[i].quantity,
                        barcode : fridgeList[i].product.barcode
                    }
                }
                window.localStorage.setItem("todoList", JSON.stringify(todoArray));
            }

            theList = JSON.parse(window.localStorage.getItem("productList"));
            if(result != null && result != undefined && result.productList != null){
                products = result.productList;
                var productListArray = {};
                for(var i = 0; i < products.length; i++){
                    if(theList != null && theList[i]!= null && theList[i].check != null ){
                        check = theList[i].check;
                    }else{
                        check = 0;
                    }
                    productListArray["row" + i] = {
                        check: check,
                        text: products[i].name,
                        Quantity: products[i].totalConsumed,
                        barcode : products[i].barcode
                    }
                }
                window.localStorage.setItem("productList", JSON.stringify(productListArray));
            }

            theList = JSON.parse(window.localStorage.getItem("garbageList"));
            if(result != null && result != undefined && result.garbageList != null){
                garbages = result.garbageList;
                var garbageListArray = {};
                for(var i = 0; i < garbages.length; i++){
                    if(theList != null && theList[i]!= null && theList[i].check != null ){
                        check = theList[i].check;
                    }else{
                        check = 0;
                    }
                    garbageListArray["row" + i] = {
                        check:check,
                        text: garbages[i].product.name,
                        Quantity: garbages[i].quantity,
                        barcode : garbages[i].product.barcode
                    }
                }
                window.localStorage.setItem("garbageList", JSON.stringify(garbageListArray));
            }
            loadToDoList(); 
            loadGarbageList(); 
            loadProductList(); 
        }


    function toggle_visibility(id1,id2,id3) {
            $("div[id^='Section']").hide();
            $("#" + id1).show();
    }

        function scan(){
            cordova.plugins.barcodeScanner.scan(function(result){
                addItemToKitchen(result.text, "dataTable1",true);
                speak(result.text);
            },function(error){
                alert(JSON.stringify(error));
            });
        }

        function createNewToDo(div) {
            var kitchenList = {};
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
                        addItemToKitchen(todo,div);
                    }
            }
        }

        function addItemToKitchen(todo,div,isbar){
            kitchenList = {
                    check: 0,
                    text: todo,
                    Quantity: 1,
                    barcode:""
            };
            if(div != null && div != ""){
			    addToServer(kitchenList,"");
            }
            speak(todo);
        }

        function addItemToKitchenWithOCR(todo,bar){
        var data = {
				itemList: [
				{
					name: todo,
                    barcode: bar,
                    quantity:1
				}
				]
			}
            alert(JSON.stringify(data));
			$.ajax({
				type: "POST",
				url: url + "/family/" + familyid + "/addToFridge",
                data: JSON.stringify(data),
				crossDomain: true,
				dataType: "json",
				success: function (result) {
				},
				error: function(xhr,status,error){
				},
				dataType: "json"
			});
        }



		function generateData(res,str) {
			var result = res;
			data = {
				itemList: [
				{
					name: result.text
				}
				]
			}
			return data;
		}

        function generateDataForModification(res,str,quantity) {
			data = {
				itemList: [
				{
					barcode: str,
                    name: res,
                    quantity:quantity
				}
				]
			}
			return data;
		}

        function modifyOnServer(cell){
            var str = $(cell).parent().parent().find("td:first").find('input')[0].name;
            var res = $(cell).parent().parent().find("td:eq(1)").find('label')[0].text;
            var quantity = $(cell).parent().parent().find("td:eq(2)").find('input')[0].value;

            console.log($(cell).parent().parent().find("td:first").find('input'));
            
            if(quantity == null || quantity == ""){
                quantity = 1;
            }
            var data = generateDataForModification(res,str,quantity);
            $.ajax({
				type: "POST",
				url: url + "/family/" + familyid + "/addToFridge",
                data: data,
				crossDomain: true,
				dataType: "json",
				success: function (result) {
				},
				error: function(xhr,status,error){
				},
				dataType: "json"
			});
        }

        function generateDataForShopping(res,str) {
			var result = res;
            var data = "";
            var d= "";
            if(res != null){
                var outer ='{"itemList": ['; 
                for(i =0 ; i < res.length-1;i++){
                    data += '{"barcode" : "' + res[i] + '"},';
                }
                data += '{"barcode" :"'  + res[res.length-1] + '"}'
                var later = ' ]}';
                d = outer + data + later;
            }      
			return d;
		}
    
        function removeFromServer(){
            var res = getAllCheckedBarCodes("dataTable1")
            var data = generateDataForShopping(res);
            $.ajax({
            type: "POST",
            url: url + "/family/" + familyid + "/addToGarbage",
            data: data,
            crossDomain: false,
            contentType: "application/json",
            success: function (result) {
                updateLocalStorage(result);
            },
            error: function(xhr,status,error){
            },
            dataType: "json"
        });
    }

        function getAllCheckedBarCodes(div){
            var selected = [];
            $('#' + div + ' input:checked').each(function() {
                selected.push($(this).attr('name'));
            });
            console.log(selected);
            return selected;
        }


        function generateDataForMove(res,str) {
            var result = res;
            alert(JSON.stringify(result));
            data = {
                "itemList": [
                {
                    "barcode": result.text
                }
                ]
            }
        }
		
		function addToServer(res,str){
			var data = generateData(res,str);
            $("#loader").show();
			$.ajax({
				type: "POST",
				url: url + "/family/" + familyid + "/addToFridge",
				data: data,
				crossDomain: true,
				dataType: "json",
				success: function (result) {
                    updateLocalStorage(result);
                    $("#loader").hide();
				},
				error: function(xhr,status,error){
				},
				dataType: "json"
			});
		}
        
        var rowID = 0;

        function addTableRow(kitchenList, appIsLoading, div, isbar) {
            rowID += 1;
            var table = document.getElementById(div);
            var rowCount = table.rows.length;
            var row = table.insertRow(rowCount);

            var cell1 = row.insertCell(0);
            var element1 = document.createElement("input");
            element1.type = "checkbox";
            element1.name = kitchenList['barcode'];
            element1.checked = kitchenList["check"];
            element1.id = "check" + rowID;
            element1.setAttribute("onclick", "checkboxClicked('"+ div + "')");
            cell1.style = "width:20% !important";
            cell1.appendChild(element1);

            var cell2 = row.insertCell(1);
            var element2 = document.createElement("Label");
            element2.setAttribute("for",kitchenList["barcode"]);
            var shouldAdd = false;
            if(kitchenList["text"] == null || kitchenList["text"] == "" || (isbar !=null && isbar == true)){
                element2.innerHTML = kitchenList["barcode"];
                var btn = document.createElement("BUTTON");
                btn.innerHTML = "Use OCR";
                btn.setAttribute("onclick", "getPhoto(pictureSource.CAMERA, '" + kitchenList['barcode'] + "');");
                shouldAdd = true;
            }else{
                element2.innerHTML = kitchenList["text"];
            }
            element2.name = "txtbox[]";
            element2.class = "contenttd";
            element2.id = "text" + rowID;
            element2.setAttribute("onchange", "saveToDoList('"+ div + "')");
            cell2.style = "width:50% !important";
            cell2.appendChild(element2);
            if(shouldAdd){
                cell2.appendChild(btn);
            }
            

            var cell3 = row.insertCell(2);
            var element3 = document.createElement("input");
            if(kitchenList["Quantity"] == null || kitchenList["Quantity"] == undefined){
                element3.setAttribute("value",1);
            }else{
                element3.setAttribute("value", kitchenList["Quantity"]);
            }
            element3.name = "txtbox[]";
            element3.id = "Quantity" + rowID;
            element3.setAttribute("onblur", "modifyOnServer(this)");
            element3.style = "width:50%";
            cell3.style = "width:30% !important";
            cell3.appendChild(element3);



            // update the UI and save the to-do list
            checkboxClicked(div);
            saveToDoList(div);

            if (!appIsLoading) alert("Task Added Successfully.");
        }


        // add the strike-through styling to completed tasks

        function checkboxClicked(div) {
            var table = document.getElementById(div);
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
            saveToDoList(div);
        }

        function editSelectedRow(todoTextField) {
            console.log(todoTextField);
        }


        // delete the selected row
        function deleteSelectedRow(deleteButton, div) {
            var p = deleteButton.parentNode.parentNode;
            p.parentNode.removeChild(p);
            saveToDoList(div);
        }


        // remove completed tasks
        function removeCompletedTasks(div) {
            var table = document.getElementById(div);
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
            saveToDoList(div);
        }


        // save the to-do list
        function saveToDoList(div) {
            var todoArray = {};
            var checkBoxState = 0;
            var textValue = "";

            var table = document.getElementById(div);
            var rowCount = table.rows.length;
            console.log(rowCount);
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
                    // var textbox = row.cells[1].childNodes[0];
                    // textValue = textbox.innerHTML;
                    // todoArray = window.localStorage.getItem("todoList");
                    // var barcode = todoArray[i].barcode;
                    // console.log(quantValue);

                    var quantText = row.cells[2].childNodes[0];
                    quantValue = quantText.value;
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
            window.localStorage.setItem("todoList", JSON.stringify(todoArray));
        }


        // load the to-do list
        function loadToDoList() {
            var theList = JSON.parse(window.localStorage.getItem("todoList"));
            if (null == theList || theList == "null") {
                deleteAllRows("dataTable1");
            } else {
                var count = 0;
                for (var obj in theList) {
                    count++;
                }
                if(theList != null){
                    deleteAllRows("dataTable1");
                    for (var i = 0; i < count; i++) {
                        addTableRow(theList["row" + i], true, "dataTable1");
                    }
                }
            }
        }

        // load the to-do list
        function loadGarbageList() {
            var theList = JSON.parse(window.localStorage.getItem("garbageList"));
            if (null == theList || theList == "null") {
                deleteAllRows("dataTable2");
            } else {
                var count = 0;
                for (var obj in theList) {
                    count++;
                }
                if(theList != null){
                    deleteAllRows("dataTable2");
                    for (var i = 0; i < count; i++) {
                        addTableRow(theList["row" + i], true, "dataTable2");
                    }
                }
            }
        }

            function loadProductList() {
                var theList = JSON.parse(window.localStorage.getItem("productList"));
                if (null == theList || theList == "null") {
                    deleteAllRows("dataTable3");
                } else {
                    var count = 0;
                    for (var obj in theList) {
                        count++;
                    }
                if(theList != null){
                    deleteAllRows("dataTable3");
                    for (var i = 0; i < count; i++) {
                        addTableRow(theList["row" + i], true, "dataTable3");
                    }
                }
                }
            }

        function deleteAllRows(div) {
            var table = document.getElementById(div);
            var rowCount = table.rows.length;

            for (var i = 0; i < rowCount; i++) {
                table.deleteRow(i);
                rowCount--;
                i--;
            }
            saveToDoList(div);
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