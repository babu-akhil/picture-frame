import firstImage from './images/0.jpg'
import secondImage from './images/1.jpg'
import thirdImage from './images/2.jpeg'
import fourthImage from './images/3.jpeg'
import './style.css'

let imageList = Array.from([firstImage,secondImage,thirdImage,fourthImage])
let shift = 0
let shiftIndex = Array.from([0, 600, 1200, 1800])

function createContainer() {
    let containerDiv = document.createElement('div')
    containerDiv.id = 'container'
    containerDiv.style.height = '400px'
    containerDiv.style.width = '2400px'
    containerDiv.style.transition = 'transform 1s ease-in-out'
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

function updateCircle() {
    let circleList = Array.from(document.getElementsByClassName('circle'))
    let activeCircle = circleList.filter(circle => circle.dataset.index == shiftIndex.indexOf(shift))[0]
    
    circleList.forEach(circle => {
        if (circle == activeCircle) {
            circle.classList.add('active')
        }
        else {circle.classList.remove('active')}
    })
}

function nextPicture(containerDiv) {
    if (shift==1800) {shift = 0}
    else {shift += 600}
    console.log(shift)
    containerDiv.style.transform = `translateX(-${shift}px)`

    updateCircle()
}

function previousPicture(containerDiv) {
    if (shift ==0) {shift = 1800}
    else {shift -= 600}
    console.log(shift)
    containerDiv.style.transform = `translateX(-${shift}px)`
    updateCircle()
}

function makeButtons(container){
    let buttonsContainer = document.createElement('div')
    buttonsContainer.id = 'buttons'

    let prevButton = document.createElement('button')
    prevButton.id = 'prevButton'
    prevButton.innerHTML = '<'
    let nextButton = document.createElement('button')
    nextButton.id = 'nextButton'
    nextButton.innerHTML = '>'

    prevButton.addEventListener('click', ()=> {
        previousPicture(container)
    })

    nextButton.addEventListener('click', () => {
        nextPicture(container)
    })

    buttonsContainer.appendChild(prevButton)
    buttonsContainer.appendChild(nextButton)

    buttonsContainer.style.width = '600px'
    buttonsContainer.style.display = 'flex'
    buttonsContainer.style.flexDirection = 'row'
    buttonsContainer.style.justifyContent = 'center'
    return buttonsContainer
}

function makeCircleDiv(containerDiv) {
    let circlesDiv = document.createElement('div')
    circlesDiv.id = 'circlesDiv'
    circlesDiv.style.display = 'flex'
    circlesDiv.style.flexDirection = 'row'
    circlesDiv.style.justifyContent = 'center'
    circlesDiv.style.width = '600px';
    circlesDiv.style.marginTop = '5px'
    let circleList = Array.from([makeCircle(0),makeCircle(1),makeCircle(2),makeCircle(3)])
    circlesDiv.appendChild(circleList[0])
    circlesDiv.appendChild(circleList[1])
    circlesDiv.appendChild(circleList[2])
    circlesDiv.appendChild(circleList[3])

    circleList.forEach(circle => {
        circle.addEventListener('click', ()=> {
            circleList.forEach(generalCircle => {
                if (generalCircle == circle) 
                    {
                        circle.classList.add('active');
                        shift = shiftIndex[circle.dataset.index]-600
                        nextPicture(containerDiv)

                        }
                else {generalCircle.classList.remove('active')}
            })
        })
    })
    return circlesDiv   
}

function makeCircle(index) {
    let circle = document.createElement('div')
    circle.classList.add('circle')
    if(index==0) {circle.classList.add('active')}
    circle.dataset.index = index;
    circle.style.border = '2px solid black'
    circle.style.borderRadius = '50%';
    circle.style.height = '15px';
    circle.style.width = '15px';
    circle.style.margin = '0px 5px'
    return circle
}





let frame = createPictureFrame();

let container = createContainer();
appendImagesToContainerDiv(container);

frame.appendChild(container)

let body = document.querySelector('body')

body.appendChild(frame)

let buttonsContainer = makeButtons(container)
body.appendChild(buttonsContainer)

let circlesDivision = makeCircleDiv(container)
body.appendChild(circlesDivision)

let interval = setInterval(function() {nextPicture(container)}, 5000)