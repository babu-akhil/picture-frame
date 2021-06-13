import firstImage from './images/0.jpg'
import secondImage from './images/1.jpg'
import thirdImage from './images/2.jpeg'
import fourthImage from './images/3.jpeg'

let imageList = Array.from([firstImage,secondImage,thirdImage,fourthImage])

function createContainer() {
    let containerDiv = document.createElement('div')
    containerDiv.id = 'container'
    containerDiv.style.height = '400px'
    containerDiv.style.width = '2400px'
    return containerDiv
}

function appendImagesToContainerDiv(containerDiv) {
    imageList.forEach(item => {
        containerDiv.appendChild(returnImage(item))
    })
}

function returnImage(image) {

    let imageElement = document.createElement('img')
    imageElement.src = image
    imageElement.style.height = '400px'
    imageElement.style.width = '600px'
    return imageElement
}

function createPictureFrame(){
    let pictureFrame = document.createElement('div')
    pictureFrame.id = 'pictureFrame'
    pictureFrame.style.height = '400px'
    pictureFrame.style.width = '600px'
    pictureFrame.style.overflow = 'hidden'
    return pictureFrame
}





let frame = createPictureFrame();

let container = createContainer();
appendImagesToContainerDiv(container);

frame.appendChild(container)

let body = document.querySelector('body')

body.appendChild(frame)