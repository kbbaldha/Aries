var pictureSource;   // picture source
var destinationType; // sets the format of returned value 
var imageText;
var bar = null;
// Wait for PhoneGap to connect with the device
//
document.addEventListener("deviceready", onDeviceReady2, false);
 //PhoneGap is ready to be used!
//
function onDeviceReady2() {
    pictureSource = navigator.camera.PictureSourceType;

    destinationType = navigator.camera.DestinationType;

    /* TTS.speak('I have Successfully added ', function () {
                    }, function (reason) {
                    });*/
}

function getTextFromImage(imageURI) {

    var data = {
        "requests": [
          {
              "image": {
                  "content": imageURI
              },
              "features": [
                {
                    "type": "TEXT_DETECTION"
                }
              ]
          }
        ]
    }
    $('#loader').show();

     $.ajax({
         type: "POST",
         url: "https://vision.googleapis.com/v1/images:annotate?key=AIzaSyDHanX2UO4E348H7QjyXD2bZnL_UGQ1_6Y",
         data: JSON.stringify(data),
         crossDomain: true,
         contentType: "json",
         success: function (result) {
             try {
                 $('#loader').hide();
                 imageText = result.responses[0].textAnnotations[0].description;
                //alert("Edited Data" + bar);
                var editedData = prompt("Please edit and enhance the information", imageText);
                if (editedData != null && bar == null) {
                    
                    addItemToKitchen(editedData,"dataTable1");
                }else{
                    addItemToKitchenWithOCR(editedData, bar);
                }
             }
             catch (err) {
                 alert(err);
             }
         },
         error: function(xhr,status,error){
             alert(status);
         },
         dataType: "json"
     });
    
}

function onPhotoURISuccess(imageURI) {
     getTextFromImage(imageURI);
}


function getPhoto(source,b) {
    if(b != null){
        bar = b;
    }
    //getPhotoURI(pictureSource.PHOTOLIBRARY, onPhotoURISuccess);
    getPhotoURI(source, onPhotoURISuccess);    
}

function getPhotoURI(source, callBack) {
    navigator.camera.getPicture(callBack, onFail, {
        quality: 50,
        destinationType: destinationType.DATA_URL,
        sourceType: source
    });

 }
 

function onFail(message) {
    alert('Failed because: ' + message);
}