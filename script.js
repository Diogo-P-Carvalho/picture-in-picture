const videoElement = document.querySelector('#video');
const button = document.querySelector('#button');
const errorContainer = document.querySelector('#error');

// Propmt to select media stream, pass to video element, then play
async function selectMediaStream() {
    try {
        const mediaStream = await navigator.mediaDevices.getDisplayMedia();
        videoElement.srcObject = mediaStream;
        videoElement.onloadedmetadata = () => {
            videoElement.play();
        }
    } catch (error) {
        // catch error here
        console.log(error);
        errorContainer.hidden = false;
    }
}

button.addEventListener('click', async () => {
    if (videoElement.srcObject?.active) {
        // disable button
        button.disabled = true;
        // start picture in picture
        await videoElement.requestPictureInPicture();
        // reset button
        button.disabled = false;   
    } else {
        errorContainer.hidden = false;
    }    
});

// On Load
selectMediaStream();