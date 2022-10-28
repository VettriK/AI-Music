var scoreLeftWrist
var scoreRightWrist 
var leftWristX
var leftWristY
var rightWristX
var rightWristY
var song1=""
var song2=""
var song1Status=""
var song2Status=""
function preload(){
song1=loadSound("song1.mp3")
song2=loadSound("song2.mp3")
}
function draw(){
image(video,0,0,700,550)
song1Status=song1.isPlaying()
song2Status=song2.isPlaying()
fill("red")
stroke("blue")
if (scoreLeftWrist>0.001){
    circle(leftWristX, leftWristY, 25)
    console.log("leftWrist")
    song1.stop()
    if (song2Status=="false"){
        song2.play()
        document.getElementById("songName").innerHTML="Playing: The Score - Unstoppable"
    }
}
if (scoreRightWrist>0.001){
    circle(rightWristX, rightWristY, 25)
    console.log("rightWrist")
    song2.stop()
    if (song1Status=="false"){
        song1.play()
        document.getElementById("songName").innerHTML="Playing: Hedwig's Theme"
    }
}
}
function setup(){
canvas=createCanvas(700,550)
canvas.center()
video=createCapture(VIDEO)
video.hide()
poseNet=ml5.poseNet(video, modelLoaded)
poseNet.on("pose", getPoses)
}

function modelLoaded(){
    console.log("model loaded successfully")
}
function getPoses(result){
if (result.length>0){
    console.log(result)
    leftWristX=result[0].pose.leftWrist.x
    leftWristY=result[0].pose.leftWrist.y
    rightWristX=result[0].pose.rightWrist.x
    rightWristY=result[0].pose.rightWrist.y
    console.log(leftWristX+","+leftWristY)
    console.log(rightWristX+","+rightWristY)
    scoreLeftWrist=result[0].pose.keypoints[9].score
    console.log(scoreLeftWrist)
    scoreRightWrist=result[0].pose.keypoints[10].score
    console.log(scoreRightWrist)
}
}
function play(){
    song.play()
    song.setVolume(1)
    song.rate(1)
}
