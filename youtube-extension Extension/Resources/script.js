document.addEventListener("DOMContentLoaded", function(event) {
    safari.extension.dispatchMessage("Hello World 2!");
});

const speedButton = document.createElement('input')
speedButton.type = 'number'
speedButton.value = '1'
speedButton.step = '0.1'

let fastSpeed = 2
const fasterSpeed = 5

let shiftPressed = false
let mouseOnButton = false
let videoPaused = false

const speedButtonStyle = `
    box-sizing: border-box;
    background: #7A0E0E;
    width: 100px;
    height: 30px;
    margin: auto 10px;
    cursor: pointer;
    position: absolute;
    right: 50%;
    top: 12px;
    line-height: 30px;
    font-weight: bold;
    color: white;
    border: none;
    outline: none;
    border-radius: 4px;
    padding-left: 10px;
`

const youtubeInject = () => {

    const footer = document.querySelector(".ytp-chrome-controls")
    const video = document.querySelector("video")
    
    speedButton.setAttribute( 'style', speedButtonStyle )
    footer.appendChild(speedButton)
    
    const checkIfShiftPressed = (event) => {
        if (event.key == "Shift") {
            shiftPressed = true
            if (mouseOnButton) {
                video.playbackRate = fasterSpeed
                speedButton.value = fasterSpeed
            }
        }
        
        if (video.loop) {
            if (event.key === "ArrowLeft") {
                if (shiftPressed) {
                    video.currentTime = video.currentTime - 5
                } else {
                video.currentTime = video.currentTime - 2
                }
            }
            
            if (event.key === "ArrowRight") {
                if (shiftPressed) {
                    video.currentTime = video.currentTime + 5
                }
                 else {
                video.currentTime = video.currentTime + 2
                }
            }
        }
        
        if (event.type == "keyup") {
            console.log('shiftup')
            if (event.key == "Shift") {
            shiftPressed = false
            }
            if (mouseOnButton) {
                video.playbackRate = fastSpeed
                speedButton.value = fastSpeed
            }
        }
    }
    
    document.onkeydown = checkIfShiftPressed
    document.onkeyup = checkIfShiftPressed
    
    speedButton.onmouseenter = () => {
        video.playbackRate = fastSpeed
        speedButton.value = fastSpeed
        mouseOnButton = true
        if (!shiftPressed) return
        video.playbackRate = fasterSpeed
        speedButton.value = fasterSpeed
    }
    
    speedButton.onmouseleave = () => {
        video.playbackRate = 1
        speedButton.value = 1
        mouseOnButton = false
    }
    
    speedButton.onmousedown = () => {
        videoPaused = true
        video.pause()
    }
    
    speedButton.onchange = () => {
        let value = speedButton.value
        value = parseFloat(value)
        fastSpeed = value
        video.playbackRate = fastSpeed
    }

    speedButton.onwheel = () => {
        event.preventDefault()

        let reduceByValue = Math.sign(event.wheelDeltaY)
        reduceByValue = reduceByValue * 0.1
        reduceByValue = Math.round(reduceByValue * 100) / 100
        
        fastSpeed -= reduceByValue
        fastSpeed = Math.round(fastSpeed * 100) / 100

        if (fastSpeed < 2) {
            fastSpeed = 2
        } else if (fastSpeed > 16) {
            fastSpeed = 16
        }

        speedButton.value = fastSpeed
        video.playbackRate = fastSpeed
    }
    
    document.onmouseup = () => {
        if (!videoPaused) return
        video.play()
        videoPaused = false
    }


}

const checkAndInject = () => {
    console.log("Checking")
    if (!window.location.href.includes('youtube.com')) {
        console.log("Not a YouTube URL. Stopping script.");
        clearInterval(interval);
        return;
    }

    const footer = document.querySelector(".ytp-chrome-controls");
    const video = document.querySelector("video");

    if (footer && video) {
        clearInterval(interval); // Stop checking once elements are found
        youtubeInject(); // Inject script
    }
};

const interval = setInterval(checkAndInject, 1);
