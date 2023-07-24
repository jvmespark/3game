// import * as THREE from 'three'
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

camera.position.z = 2;

function animate() {

	requestAnimationFrame( animate );

    resizeCanvasToDisplaySize();

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;

	renderer.render( scene, camera );
}

init();