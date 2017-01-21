var app = new Clarifai.App(
    'wvhf-1v_4WbugYRGa9q4Ph9nDa_iBLZKcOinlP7P',
    'Tfh9_DDQWCu-ujWWg02DkNAk4tpkD2ASaLPgzwnG'
  );

function getTags(source) {
	
    getPhotoURI(source,getImageTags);
}
var tags;
function getImageTags(imageURI) {
    $('#loader').show();
    app.models.predict(Clarifai.FOOD_MODEL, { base64: imageURI }).then(
    function (response) {
        $('#loader').hide();
        tags = response.outputs[0].data.concepts;
        renderTags(tags);
    },
    function (err) {
        // there was an error
        console.log(error);
    }
  );
}

function bindTagClick() {
    $('.tag').on("click", function (e) {
        //console.log($(this).text());
        var txt = $(this).text();
        $(this).remove();
        addItemToKitchen(txt);
       
    });
}

function renderTags(tags) {
    var str = '<button id="closeButton" type="button" style="margin-top:27px" class="btn btn-danger btn-lg  pull-right">X</button>';
   // str+=  '<ul class="list-group">';
    for (var i = 0; i < tags.length; i++) {
        //str = str + "<div>" + tags[i].name + "</div>";
        
        str = str + '<button type="button" class="btn btn-primary btn-lg btn-block tag">' + tags[i].name + '</button>';
        //str = str + '<li class="list-group-item tag">' + tags[i].name + '</li>';
    }
   // str+="</ul>";
    document.getElementById('imageTags').innerHTML = str;
    $("#imageTagsParent").show();
    $("#closeButton").on("click", function () { $("#imageTagsParent").hide(); });
    bindTagClick();
   
  
  

}