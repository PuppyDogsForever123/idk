peter_pan_song = "";
harry_potter_song = "";

leftWrist_x = 0;
leftWrist_y = 0;

rightWrist_x = 0;
rightWrist_y = 0;

scoreLeftWrist = 0;

song_peter_pan = "";

scoreRightWrist = 0;
song_harry_potter = "";

function setup() {
    canvas = createCanvas(600, 530);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw() {
    image(video, 0, 0, 600, 530);

    fill("red")
    stroke("red")

    song_peter_pan = peter_pan_song.isPlaying();
    console.log("Peter Pan Song = " + song_peter_pan);

    song_harry_potter = harry_potter_song.isPlaying();
    console.log("Harry Potter Song = " + song_harry_potter);

    if(scoreLeftWrist > 0.2) {
        circle(leftWrist_x, leftWrist_y, 20)
        harry_potter_song.stop();

        if(song_peter_pan == false) {
            peter_pan_song.play();
        }

        else {
            document.getElementById("nameS").innerHTML = "Song Name: Peter Pan Song"
        }
    }

    if(scoreWrightWrist > 0.2) {
        circle(rightWrist_x, rightWrist_y, 20)
        peter_pan_song.stop();

        if(song_harry_potter == false) {
            harry_potter_song.play();
        }

        else {
            document.getElementById("nameS").innerHTML = "Song Name: Harry Potter Song"
        }
    }
}

function preload() {
    peter_pan_song = loadSound("music2.mp3");
    harry_potter_song = loadSound("music.mp3");
}

function modelLoaded() {
    console.log("PoseNet Is Initialized");
}

function gotPoses(results) {
    if(results.length > 0) {
        console.log(results)

        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("leftWrist_Score = " + scoreLeftWrist);

        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("RightWrist_Score = " + scoreRightWrist);

        leftWrist_x = results[0].pose.leftWrist.x;
        leftWrist_y = results[0].pose.leftWrist.y;

        console.log("leftWrist_x = " + leftWrist_x + " leftWrist_y = " + leftWrist_y);

        rightWrist_x = results[0].pose.rightWrist.x;
        rightWrist_y = results[0].pose.rightWrist.y;

        console.log("rightWrist_x = " + rightWrist_x + " rightWrist_y = " + rightWrist_y);
    }
}