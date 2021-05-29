var video="";
var status;
var objects = [];
function preload(){
video=createVideo("video.mp4");
}
function setup(){
    canvas=createCanvas(500,500);
    canvas.center();
    video.hide();
}

function draw(){
image(video,0,0,500,500);
if(status != ""){
    objectdetector.detect(video,gotResult);

    for(i=0;i<objects.length;i++){
document.getElementById("status").innerHTML="Objects Detected";
document.getElementById("num_of_objects").innerHTML="Number Of Objects Detected are/is "+objects.length;
percent = floor(objects[i].confidence*100);
fill("blue");
stroke("black");
strokeWeight(2);
text(objects[i].label+" "+percent+"%",objects[i].x+15,objects[i].y+15); 
noFill();
rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
  }
}
}

function start(){
    objectdetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Detecting Objects";
}

function modelLoaded(){
    console.log("model is loaded");
status = true;
console.log(typeof(status));
video.loop();
video.speed(1);
video.volume(0);
}

function gotResult(error,results){
if(error){
    console.error(error);
}
else{
    console.log(results);
    objects=results;
}
}