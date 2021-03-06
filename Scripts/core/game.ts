/*game.ts
Kateryna Bilokhvost
Last Modified by: Kateryna Bilokhvost
Date last Modified: Feb 20, 2016
This is a program for solar system display. 
The following controls are available: zoomInFront(pointing to sun), zoomInBack (pointing to the fifth planet), and zoomOut - returns camera to the basic position
Revision History:
  Created initial file
  added a sun and a planet
  added four planetsadded light, textures
  fixed rotation issues
  added more planets
  updated images
  added zooming functionality
  added comments to code
*/
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
var moonTwo: Mesh;
var moonEmptyObject: Object3D;

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
    sun.receiveShadow = false;
    sun.castShadow = false;
    scene.add(sun);
    console.log("Added sun to scene...");
    
    //add pointlight to the sun
    sunPointLight = new THREE.PointLight(0xffffff, 5, 100);
    sunPointLight.castShadow = true;
    sun.add(sunPointLight);

    //Add an empty object for the first planet to the scene
    firstPlanetEmptyObject = new Object3D();
    firstPlanetEmptyObject.position.set(0, 0, 0);
    scene.add(firstPlanetEmptyObject);
    console.log("Added first empty object to sun...");

    //Add first planet to scene 
    firstPlanet = new gameObject(new SphereGeometry(4, 32, 32, 0.05),
        new LambertMaterial({ map: THREE.ImageUtils.loadTexture('../Assets/images/firstPlanet.jpg') }),
        20, 2, 20);
    firstPlanetEmptyObject.add(firstPlanet);
    console.log("Added first planet to scene...");
    
    //Add an empty object for the second planet to the scene
    secondPlanetEmptyObject = new Object3D();
    secondPlanetEmptyObject.position.set(0, 0, 0);
    scene.add(secondPlanetEmptyObject);
    console.log("Added second empty object to sun...");
    
    //add second planet to the scene
    secondPlanet = new gameObject(new SphereGeometry(4, 32, 32),
        new LambertMaterial({ map: THREE.ImageUtils.loadTexture('../Assets/images/secondPlanet.jpg') }),
        40, 2, 40);
    secondPlanetEmptyObject.add(secondPlanet);
    console.log("Added second planet to scene...");
    moonEmptyObject = new Object3D();
 //   moonEmptyObject.position.set(0, 0, 0);
    secondPlanet.add(moonEmptyObject);
    console.log("Added second empty object to sun...");
    //add moon to the second planet
    
    moon = new gameObject(new SphereGeometry(1.5, 32, 32),
        new LambertMaterial({ map: THREE.ImageUtils.loadTexture('../Assets/images/moon.jpg') }),
        6, 0, 4);
    moonEmptyObject.add(moon);
    console.log("Added planet moon to scene...");
    
    //Add an empty object for the third planet to the scene
    thirdPlanetEmptyObject = new Object3D();
    thirdPlanetEmptyObject.position.set(0, 0, 0);
    scene.add(thirdPlanetEmptyObject);
    console.log("Added third empty object to sun...");   
    
    //add third planet to the scene
    thirdPlanet = new gameObject(new SphereGeometry(3.5, 50, 50),
        new LambertMaterial({ map: THREE.ImageUtils.loadTexture('../Assets/images/thirdPlanet.jpg') }),
        55, 2, 55);
    thirdPlanetEmptyObject.add(thirdPlanet);
    console.log("Added third planet to scene...");
    
    //Add an empty object for the fourth planet to the scene
    fourthPlanetEmptyObject = new Object3D();
    fourthPlanetEmptyObject.position.set(0, 0, 0);
    scene.add(fourthPlanetEmptyObject);
    console.log("Added fourth empty object to sun...");   
    
    //add fourth planet to the scene
    fourthPlanet = new gameObject(new SphereGeometry(3.9, 50, 50),
        new LambertMaterial({ map: THREE.ImageUtils.loadTexture('../Assets/images/fourthPlanet.jpg') }),
       80, 2, 80);
    fourthPlanetEmptyObject.add(fourthPlanet);
    console.log("Added fourth planet to scene...");
    
    //Add an empty object for the fifth planet to the scene
    fifthPlanetEmptyObject = new Object3D();
    fifthPlanetEmptyObject.position.set(0, 0, 0);
    scene.add(fifthPlanetEmptyObject);
    console.log("Added fifth empty object to sun...");   
    
    //add fifth planet to the scene
    fifthPlanet = new gameObject(new SphereGeometry(4.5, 50, 50),
        new LambertMaterial({ map: THREE.ImageUtils.loadTexture('../Assets/images/fifthPlanet.jpg') }),
        90, 2, 90);
    fifthPlanetEmptyObject.add(fifthPlanet);
    console.log("Added fifth planet to scene...");
    
    //add moon to the fifth planet
    moonTwo = new gameObject(new SphereGeometry(1.25, 32, 32),
        new LambertMaterial({ map: THREE.ImageUtils.loadTexture('../Assets/images/moonTwo.png') }),
        8, 0, 4);
    fifthPlanet.add(moonTwo);
    console.log("Added planet moon to scene...");
    
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
    control = new Control();
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
    gui.add(controlObject, 'zoomInFront');
    gui.add(controlObject, 'zoomInBack');
    gui.add(controlObject, 'zoomOut');
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
    //rotate the sun
    sun.rotation.y += 0.02;
   
    //rotate planets
    firstPlanetEmptyObject.rotation.y += 0.06;
    firstPlanet.rotation.y += 0.035;
    secondPlanetEmptyObject.rotation.y += 0.045;
    secondPlanet.rotation.y -= 0.025;
    thirdPlanet.rotation.y += 0.07;
    thirdPlanetEmptyObject.rotation.y += -0.03;
    fourthPlanet.rotation.y += 0.1;
    fourthPlanetEmptyObject.rotation.y += 0.009;
    fifthPlanet.rotation.y += 0.04;
    fifthPlanetEmptyObject.rotation.y += 0.002;
    moonEmptyObject.rotation.y+=0.09;
    
    //rotate moon
    moon.rotation.y += 0.1
    moonTwo.rotation.y -= 0.045
    requestAnimationFrame(gameLoop);
	
    // render the scene
    renderer.render(scene, camera);
}

// Setup default renderer
function setupRenderer(): void {
    renderer = new Renderer();
    renderer.setClearColor(0x191919, 1.0);
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
    camera.position.z = 200;
    camera.lookAt(new Vector3(0, 0, 0));
    console.log("Finished setting up Camera...");
}
