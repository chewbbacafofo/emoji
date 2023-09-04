emoji = "";

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/QePIcd4RU/model.json",modelLoaded);

Webcam.set({
    width:350,
    height:300,
    image_format: 'png',
    png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

console.log('ml5 version:', ml5.version);

function modelLoaded(){
    console.log('Model Loaded!');
}

function speak(){
    synth = window.speechSynthesis;
    speak_data = "Esse é o seu emoji";
    utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}

function check(){
    img = document.getElementById("captured_image");
    classifier.classify(img,gotResult);
}

function gotResult(error, results){
    if (error){
        console.error(error);
    }
    else {
        console.log(results);
        emoji = results[0].label;
        speak();
        if (results[0].label=="soquinho"){
            document.getElementById("update_emoji").innerHTML = "👊"
        }

        if (results[0].label=="coração"){
            document.getElementById("update_emoji").innerHTML = "🫰"
        }

        if (results[0].label=="ily"){
            document.getElementById("update_emoji").innerHTML = "🤟"
        }

        if (results[0].label=="de boas"){
            document.getElementById("update_emoji").innerHTML = "🤙"
        }
    }
}