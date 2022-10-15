objects = [];
Status = "";
input_text = "";

function setup() {
    canvas = createCanvas(300, 298);
    canvas.position(485, 250);

    video = createCapture(VIDEO);
    video.size(300, 298)
    video.hide();
}

function start() {
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    input_text = document.getElementById("object_input").value;
}

function modelLoaded() {
    console.log("Model Loaded Successfully!");
    Status = true;
}

function draw() {
    image(video, 0, 0, 480, 480);
    if (Status != "") {
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status: Objects Detected";
            console.log(objects.length);

            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "" + percent + "%" + objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if(objects[i].label == input_text)
            {
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("object_found").innerHTML = input_text + " Found";
                var synth = window.speechSynthesis;
                var utterThis = window.SpeechSynthesisUtterance(input_text+ "Found");
                synth.speak(utterThis);
            }
            else
            {
                document.getElementById("object_found").innerHTML = input_text + " Not Found";
            }
        }

    }
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}