# Aries
<h4><b>A personal assistant for your kitchen, which helps you automatically manage the kitchen items(veggies, groceries etc) to be ordered automatically for your family.</b></h4>

https://devpost.com/software/aries_server_nodejs 

![alt text](https://challengepost-s3-challengepost.netdna-ssl.com/photos/production/software_photos/000/462/113/datas/gallery.jpg)


The idea started with the pain point of going to buy groceries every week while living as bachelors and studying at University of Florida. The pace at which the applications of **AI-Computer Vision** being developed, but we were still struggling to keep track of everything required in the kitchen, making that grocery list and somehow still forgetting one or two things to buy. Why can't this be solved using the technologies, API's and the knowledge which we have to make our as well as the life of other's suffering through the same thing simple.

We thus started discussing about **Aries** - A small personal assistant for your home, first focusing your kitchen. It all started with discussion of integration of a smart **AI** application which automatically keeps track of your day-to-day kitchen requirements and as well orders for you at the perfect time with the cheapest deal available at that time. This takes away all the hard-work, tension, maintenance of that weekly grocery shopping.

Now coming to real work to be done, we started jotting down points and features to be included into **Aries**. First came upon the barcode scanner which will be captured through the IOT device already near to your kitchen or instilled in the Refrigerator which you have, as barcodes are the world wide accepted unique code for each thing you buy. So simple it would be scan everything whenever you put it into your Refrigerator and an auto-scanner near your Trash to keep track of things that are getting used up and will be required sooner.

But is the personal assistant complete?Yes initially turned into a great NO, when we saw someone eating a banana, it does not have a barcode, neither any vegetable or fruits. It was time for addition of a new feature and a very easy one from the user's perspective. Capture an image of all the veggies and fruits, and the personal assistant automatically detects them, what are they and adds to your list. This was made possible by using the Clarifai API.

As we are simplifying life of humans, it is not that simple, correct. Corner cases are always present to trouble you. What if barcode scanned is not detected? Well now what to be done about those lucky things which would escape the scanner. But then Optical Character Recognition has come far ahead in this, so using it we detect the characters of the stuff bought and adds to your shopping list.

Well, as it started with bachelors living together, so the kitchen is also shared among all of them. They are in a way living as a family, so the kitchen requirements are also family wide. This personal assistant app would also be built family wide was thus added as a feature to **Aries**.

Now a personal assistant cannot be just a notification API in the Alexa, and Google Home already here. Thus adding a interactivity feature was a must have. Now not going to far and coming to the timeline left in our hand we decided to only provide interactivity related to normal Addition of Items to the List and also give a summary of items that are already added.

Most important feature was of connecting to the grocery store or the store to automatically order from. This was possible with the Amazon API, hard to crack the nut to add items to its cart with a hell lot of security keys required by Amazon, but we were able to achieve success at last.

Now that **Aries** is ready to become your small personal assistant, be there to have an experience of a simple life with it at the DEMO.


# Built With
javascript
css
node.js
mongodb
rest
phonegap
html5
apache
amazon-web-services
clarifai
ispeech-text-to-speech
barcode-scanner
