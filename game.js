

import {
    ACESFilmicToneMapping,
    AnimationClip,
    AnimationMixer,
    Clock,
    Euler,
    Group,
    HemisphereLight,
    InterpolateSmooth,
    LoopOnce,
    MathUtils,
    Mesh,
    MirroredRepeatWrapping,
    PerspectiveCamera,
    PlaneGeometry,
    PMREMGenerator,
    Quaternion,
    QuaternionKeyframeTrack,
    Scene, ShaderMaterial,
    SpotLight,
    TextureLoader,
    Vector3,
    VectorKeyframeTrack,
    WebGLRenderer,
    BoxGeometry,
    MeshBasicMaterial,
} from '../node_modules/three/build/three.module.js';

import {
    menu,
    about,
    startButton,
} from './game/ui.js'



const scene = new Scene();
const camera = new PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
let renderer = new WebGLRenderer();

async function init() {
    renderer = new WebGLRenderer();
    renderer.toneMapping = ACESFilmicToneMapping;
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)

    document.addEventListener('keydown', onKeyDown, false);
    document.addEventListener('keyup', onKeyUp, false);

    // commented out for dev purposes, reinsitute it later
    //menu.style.display="block";
    //about.style.display="block";
    animate(); // remove later 

    startButton.onclick = (event) => {
        menu.style.display="none";
        about.style.display="none";
        animate();
    }
}

//      MOVEMENT

var xSpeed = 0.1;
var ySpeed = 0.1;

let leftPressed = false;
let rightPressed = false;
let upPressed = false;
let downPressed = false;

function onKeyDown(event) {
    let keyCode = event.which;
    if (keyCode == 65) {
        leftPressed = true;
    } else if (keyCode == 68) {
        rightPressed = true;
    }
    else if (keyCode == 87) {
        upPressed = true;
    }
    else if (keyCode == 83) {
        downPressed = true;
    }
}

function onKeyUp(event) {
    let keyCode = event.which;
    if (keyCode == 65) {
        leftPressed = false;
    } else if (keyCode == 68) {
        rightPressed = false;
    }
    else if (keyCode == 87) {
        upPressed = false;
    }
    else if (keyCode == 83) {
        downPressed = false;
    }
}

function resizeCanvasToDisplaySize() {
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    document.body.appendChild(renderer.domElement)
}



const geometry = new BoxGeometry( 1, 1, 1 );
const material = new MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

function animate() {

	requestAnimationFrame( animate );

    resizeCanvasToDisplaySize();

    if (leftPressed) {
        cube.position.x -= xSpeed;
    }
    if (rightPressed) {
        cube.position.x += xSpeed;
    }
    if (upPressed) {
        cube.position.y += ySpeed;
    }
    if (downPressed) {
        cube.position.y -= ySpeed;
    }
    cube.position.x = clamp(cube.position.x, -20, 25);

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;

	renderer.render( scene, camera );
}



init();
