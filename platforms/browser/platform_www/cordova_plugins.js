cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-camera/www/CameraConstants.js",
        "id": "cordova-plugin-camera.Camera",
        "pluginId": "cordova-plugin-camera",
        "clobbers": [
            "Camera"
        ]
    },
    {
        "file": "plugins/cordova-plugin-camera/www/CameraPopoverOptions.js",
        "id": "cordova-plugin-camera.CameraPopoverOptions",
        "pluginId": "cordova-plugin-camera",
        "clobbers": [
            "CameraPopoverOptions"
        ]
    },
    {
        "file": "plugins/cordova-plugin-camera/www/Camera.js",
        "id": "cordova-plugin-camera.camera",
        "pluginId": "cordova-plugin-camera",
        "clobbers": [
            "navigator.camera"
        ]
    },
    {
        "file": "plugins/cordova-plugin-camera/src/browser/CameraProxy.js",
        "id": "cordova-plugin-camera.CameraProxy",
        "pluginId": "cordova-plugin-camera",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-tts/www/tts.js",
        "id": "cordova-plugin-tts.tts",
        "pluginId": "cordova-plugin-tts",
        "clobbers": [
            "TTS"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.speech.speechrecognition/www/SpeechRecognition.js",
        "id": "org.apache.cordova.speech.speechrecognition.SpeechRecognition",
        "pluginId": "org.apache.cordova.speech.speechrecognition",
        "clobbers": [
            "SpeechRecognition"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.speech.speechrecognition/www/SpeechRecognitionError.js",
        "id": "org.apache.cordova.speech.speechrecognition.SpeechRecognitionError",
        "pluginId": "org.apache.cordova.speech.speechrecognition",
        "clobbers": [
            "SpeechRecognitionError"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.speech.speechrecognition/www/SpeechRecognitionAlternative.js",
        "id": "org.apache.cordova.speech.speechrecognition.SpeechRecognitionAlternative",
        "pluginId": "org.apache.cordova.speech.speechrecognition",
        "clobbers": [
            "SpeechRecognitionAlternative"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.speech.speechrecognition/www/SpeechRecognitionResult.js",
        "id": "org.apache.cordova.speech.speechrecognition.SpeechRecognitionResult",
        "pluginId": "org.apache.cordova.speech.speechrecognition",
        "clobbers": [
            "SpeechRecognitionResult"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.speech.speechrecognition/www/SpeechRecognitionResultList.js",
        "id": "org.apache.cordova.speech.speechrecognition.SpeechRecognitionResultList",
        "pluginId": "org.apache.cordova.speech.speechrecognition",
        "clobbers": [
            "SpeechRecognitionResultList"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.speech.speechrecognition/www/SpeechRecognitionEvent.js",
        "id": "org.apache.cordova.speech.speechrecognition.SpeechRecognitionEvent",
        "pluginId": "org.apache.cordova.speech.speechrecognition",
        "clobbers": [
            "SpeechRecognitionEvent"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.speech.speechrecognition/www/SpeechGrammar.js",
        "id": "org.apache.cordova.speech.speechrecognition.SpeechGrammar",
        "pluginId": "org.apache.cordova.speech.speechrecognition",
        "clobbers": [
            "SpeechGrammar"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.speech.speechrecognition/www/SpeechGrammarList.js",
        "id": "org.apache.cordova.speech.speechrecognition.SpeechGrammarList",
        "pluginId": "org.apache.cordova.speech.speechrecognition",
        "clobbers": [
            "SpeechGrammarList"
        ]
    },
    {
        "file": "plugins/phonegap-plugin-barcodescanner/www/barcodescanner.js",
        "id": "phonegap-plugin-barcodescanner.BarcodeScanner",
        "pluginId": "phonegap-plugin-barcodescanner",
        "clobbers": [
            "cordova.plugins.barcodeScanner"
        ]
    },
    {
        "file": "plugins/phonegap-plugin-barcodescanner/src/browser/BarcodeScannerProxy.js",
        "id": "phonegap-plugin-barcodescanner.BarcodeScannerProxy",
        "pluginId": "phonegap-plugin-barcodescanner",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-speechrecognizer/SpeechRecognizer.js",
        "id": "cordova-plugin-speechrecognizer.SpeechRecognizer",
        "pluginId": "cordova-plugin-speechrecognizer",
        "clobbers": [
            "plugins.speechrecognizer"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.3.1",
    "cordova-plugin-compat": "1.1.0",
    "cordova-plugin-camera": "2.3.1",
    "cordova-plugin-tts": "0.2.3",
    "org.apache.cordova.speech.speechrecognition": "0.1.2",
    "phonegap-plugin-barcodescanner": "6.0.5",
    "cordova-plugin-speechrecognizer": "1.0.0"
}
// BOTTOM OF METADATA
});