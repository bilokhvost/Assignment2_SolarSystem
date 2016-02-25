/// <reference path="_reference.ts"/>

// MAIN GAME FILE

// THREEJS Aliases
import Scene = THREE.Scene;
import Renderer = THREE.WebGLRenderer;
import PerspectiveCamera = THREE.PerspectiveCamera;
import BoxGeometry = THREE.BoxGeometry;
import CubeGeometry = THREE.CubeGeometry;
import SphereGeometry = THREE.SphereGeometry;
import Geometry = THREE.Geometry;
import AxisHelper = THREE.AxisHelper;
import LambertMaterial = THREE.MeshLambertMaterial;
import MeshBasicMaterial = THREE.MeshBasicMaterial;
import Material = THREE.Material;
import Mesh = THREE.Mesh;
import Object3D = THREE.Object3D;
import SpotLight = THREE.SpotLight;
import PointLight = THREE.PointLight;
import AmbientLight = THREE.AmbientLight;
import Control = objects.Control;
import GUI = dat.GUI;
import Color = THREE.Color;
import Vector3 = THREE.Vector3;
import Face3 = THREE.Face3;
import Point = objects.Point;
import CScreen = config.Screen;


//Custom Game Objects
import gameObject = objects.gameObject;

var scene: Scene;
var renderer: Renderer;
var camera: PerspectiveCamera;
var axes: AxisHelper;
var sphere: Mesh;
var ambientLight: AmbientLight;
var spotLightLeft: SpotLight;
var spotLightRight: SpotLight;
var spotLightMiddle: SpotLight;
var control: Control;
var gui: GUI;
var stats: Stats;
var step: number = 0;
var cubeGeometry: CubeGeometry;
var cubeMaterial: LambertMaterial;

var sun: Mesh;
var sunPointLight: PointLight;

var firstPlanet: Mesh;
var firstPlanetEmptyObject: Object3D;
var secondPlanet: Mesh;
var secondPlanetEmptyObject: Object3D;
var thirdPlanet: Mesh;
var thirdPlanetEmptyObject: Object3D;
var fourthPlanet: Mesh;
var fourthPlanetEmptyObject: Object3D;
var moon: Mesh;
var fifthPlanet: Mesh;
var fifthPlanetEmptyObject: Object3D;

function init() {
    // Instantiate a new Scene object
    scene = new Scene();

    setupRenderer(); // setup the default renderer
	
    setupCamera(); // setup the camera
	
    // add an axis helper to the scene
    axes = new AxisHelper(10);
    scene.add(axes);
    console.log("Added Axis Helper to scene...");
   
 
    //Add a sun to the Scene
    sun = new gameObject(new SphereGeometry(10, 30, 30),
        new LambertMaterial({ map: THREE.ImageUtils.loadTexture('../Assets/images/sun.jpg') }),
        0, 0, 0);
        sun.receiveShadow=false;
    scene.add(sun);
    console.log("Added sun to scene...");
    
    //add pointlight to the sun
    sunPointLight = new THREE.PointLight(0xffffff, 5, 100);
    sunPointLight.castShadow=true;
    sun.add(sunPointLight);

    //Add an empty object for the first planet to the scene
    firstPlanetEmptyObject = new Object3D();
    firstPlanetEmptyObject.position.set(0, 0, 0);
    scene.add(firstPlanetEmptyObject);
    console.log("Added first empty object to sun...");

    //Add first planet to scene 
    firstPlanet = new gameObject(new SphereGeometry(4, 32, 32, 0.05),
        new LambertMaterial({ map: THREE.ImageUtils.loadTexture('../Assets/images/redPlanet.jpg') }),
        10, 2, 20);
        firstPlanet.castShadow=true;
    firstPlanetEmptyObject.add(firstPlanet);
    console.log("Added first planet to scene...");
    
    //Add an empty object for the second planet to the scene
    secondPlanetEmptyObject = new Object3D();
    secondPlanetEmptyObject.position.set(0, 0, 0);
    sun.add(secondPlanetEmptyObject);
    console.log("Added second empty object to sun...");
    
    //add second planet to the scene
    secondPlanet = new gameObject(new SphereGeometry(4, 32, 32),
        new LambertMaterial({ map: THREE.ImageUtils.loadTexture('../Assets/images/bluePlanet.jpg') }),
        30, 2, 30);
        secondPlanet.castShadow=true;
    secondPlanetEmptyObject.add(secondPlanet);
    console.log("Added second planet to scene...");
    
    //add moon to the second planet
    moon = new gameObject(new SphereGeometry(1.25, 32, 32),
        new LambertMaterial({ map: THREE.ImageUtils.loadTexture('../Assets/images/moon.jpg') }),
        6, 0, 4);
    moon.receiveShadow = true;
    moon.castShadow = true;
    secondPlanet.add(moon);
    console.log("Added planet moon to scene...");
    
     //Add an empty object for the third planet to the scene
   thirdPlanetEmptyObject = new Object3D();
    thirdPlanetEmptyObject.position.set(0, 0, 0);
    scene.add(thirdPlanetEmptyObject);
    console.log("Added third empty object to sun...");   
    
    //add third planet to the scene
    thirdPlanet = new gameObject(new SphereGeometry(3.5, 50, 50),
        new LambertMaterial({ map: THREE.ImageUtils.loadTexture('../Assets/images/ukrPlanet.jpg') }),
        45, 2, 40);
    thirdPlanetEmptyObject.add(thirdPlanet);
    console.log("Added third planet to scene...");
    
    //Add an empty object for the fourth planet to the scene
   fourthPlanetEmptyObject = new Object3D();
    fourthPlanetEmptyObject.position.set(0, 0, 0);
    scene.add(fourthPlanetEmptyObject);
    console.log("Added fourth empty object to sun...");   
    
    //add fourth planet to the scene
   fourthPlanet = new gameObject(new SphereGeometry(3.9, 50, 50),
        new LambertMaterial({ map: THREE.ImageUtils.loadTexture('../Assets/images/livePlanet.jpg') }),
        53, 2, 44);
    fourthPlanetEmptyObject.add(fourthPlanet);
    console.log("Added fourth planet to scene...");
    
    //Add an empty object for the fifth planet to the scene
   fifthPlanetEmptyObject = new Object3D();
    fifthPlanetEmptyObject.position.set(0, 0, 0);
    scene.add(fifthPlanetEmptyObject);
    console.log("Added fifth empty object to sun...");   
    
    //add fifth planet to the scene
    fifthPlanet = new gameObject(new SphereGeometry(4.5, 50, 50),
        new LambertMaterial({ map: THREE.ImageUtils.loadTexture('../Assets/images/redPlanet.jpg') }),
        65, 2, 55);
    fifthPlanetEmptyObject.add(fifthPlanet);
    console.log("Added fifth planet to scene...");
    
    // Add an AmbientLight to the scene
    ambientLight = new AmbientLight(0x404040);
    scene.add(ambientLight);
    console.log("Added an Ambient Light to Scene");

	// Add a SpotLight to light left part of the sun
    spotLightLeft = new SpotLight(0xffffff);
    spotLightLeft.position.set(-70, 50, 100);
    //spotLight.rotation.set(-0.8, 42.7, 19.5);
    spotLightLeft.castShadow = false;
    scene.add(spotLightLeft);
    console.log("Added a SpotLight Light to Scene");
    
     // add controls
    gui = new GUI();
    control = new Control(0.05);
    addControl(control);
    
    // Add framerate stats
    addStatsObject();
    console.log("Added Stats to scene...");

    document.body.appendChild(renderer.domElement);
    gameLoop(); // render the scene	    
    window.addEventListener('resize', onResize, false);
}

function onResize(): void {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function addControl(controlObject: Control): void {
    gui.add(controlObject, 'rotationSpeed', -0.5, 0.5);
}

function addStatsObject() {
    stats = new Stats();
    stats.setMode(0);
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    document.body.appendChild(stats.domElement);
}

// Setup main game loop
function gameLoop(): void {
    stats.update();
   sun.rotation.y+=0.02;
   firstPlanetEmptyObject.rotation.y += 0.05;
    firstPlanet.rotation.y += 0.035;
   secondPlanetEmptyObject.rotation.y += 0.025;
   secondPlanet.rotation.y -= 0.025;
   thirdPlanet.rotation.y+=0.07;
   thirdPlanetEmptyObject.rotation.y+=-0.02;
    fourthPlanet.rotation.y+=0.1;
   fourthPlanetEmptyObject.rotation.y+=0.045;
    fifthPlanet.rotation.y+=0.3;
   fifthPlanetEmptyObject.rotation.y+=0.065;
   
   
   
   
   moon.rotation.y+=0.1
   
   
    //   childCube.rotation.z+=0.05;
    requestAnimationFrame(gameLoop);
	
    // render the scene
    renderer.render(scene, camera);
}

// Setup default renderer
function setupRenderer(): void {
    renderer = new Renderer();
    renderer.setClearColor(0xffffff, 1.0);
    //renderer.setSize(CScreen.WIDTH, CScreen.HEIGHT);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    console.log("Finished setting up Renderer...");
}

// Setup main camera for the scene
function setupCamera(): void {
    //  camera = new PerspectiveCamera(45, config.Screen.RATIO, 0.1, 1000);
    camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = -75;
    camera.position.y = 80;
    camera.position.z = 175;
    camera.lookAt(new Vector3(0, 0, 0));
    console.log("Finished setting up Camera...");
}
