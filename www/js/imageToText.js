var pictureSource;   // picture source
var destinationType; // sets the format of returned value 
var imageText;
// Wait for PhoneGap to connect with the device
//
//document.addEventListener("deviceready", onDeviceReady2, false);
// PhoneGap is ready to be used!
//
function onDeviceReady2() {
    pictureSource = navigator.camera.PictureSourceType;

    destinationType = navigator.camera.DestinationType;
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

   // alert(imageURI);
    //$.support.cors = true;
     $.ajax({
         type: "POST",
         url: "https://vision.googleapis.com/v1/images:annotate?key=AIzaSyDHanX2UO4E348H7QjyXD2bZnL_UGQ1_6Y",
         data: JSON.stringify(data),
         crossDomain: true,
         contentType: "json",
         success: function (result) {
             //alert(result.responses[0].textAnnotations[0].description);
             try{
                 imageText = result.responses[0].textAnnotations[0].description;
                 document.getElementById('result').innerHTML = imageText;

                var editedData = prompt("Please edit and enhance the information", imageText);
                if (editedData != null) {
                    addItemToKitchen(editedData);
                }
             }
             catch (err) {
                 alert(JSON.stringify(result));
             }
         },
         error: function(xhr,status,error){
             //console.log(result);
             alert(status);
         },
         dataType: "json"
     });
    
}

function onPhotoURISuccess(imageURI) {

     getTextFromImage(imageURI);
}


function getPhoto(source) {
    // Retrieve image file location from specified source
    navigator.camera.getPicture(onPhotoURISuccess, onFail, {
        quality: 50,
        destinationType: destinationType.DATA_URL,
        sourceType: source
    });
}
 
function onFail(message) {
    alert('Failed because: ' + message);
}