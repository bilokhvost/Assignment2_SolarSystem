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
var cube: Mesh;
var childCube: Mesh;
var sphere: Mesh;
var ambientLight: AmbientLight;
var spotLight: SpotLight;
var control: Control;
var gui: GUI;
var stats: Stats;
var step: number = 0;
var cubeGeometry: CubeGeometry;
var cubeMaterial: LambertMaterial;
var emptyObject: Object3D;

var firstPlanet:Mesh;
var secondPlanet:Mesh;
var thirdPlanet:Mesh;
var fourthPlanet:Mesh;

function init() {
    // Instantiate a new Scene object
    scene = new Scene();

    setupRenderer(); // setup the default renderer
	
    setupCamera(); // setup the camera
	
    // add an axis helper to the scene
    axes = new AxisHelper(10);
    scene.add(axes);
    console.log("Added Axis Helper to scene...");
   
 
    //Add a sphere to the Scene
    cube = new gameObject(new CubeGeometry (2,2,2), //new gameObject(new SphereGeometry(2, 50, 50),
        new LambertMaterial({ color: 0x00ff00 }),
        0, 2, 0);
    cube.castShadow = true;
    cube.receiveShadow = true;

    scene.add(cube);
    console.log("Added sphere Primitive to scene...");

    emptyObject=new Object3D();
    emptyObject.position.set(0,0,0);
    cube.add(emptyObject);
    console.log("Added empty object to cube Primitive...");

   
    
        firstPlanet =new gameObject(new SphereGeometry(0.7, 50, 50),
        new LambertMaterial({ color: 0xff0000 }),
        6, 1, 0);
    firstPlanet.castShadow = true;
    firstPlanet.receiveShadow = true;
    emptyObject.add(firstPlanet);
    console.log("Added first planet to scene...");
    
       secondPlanet = new gameObject(new SphereGeometry(0.3, 50, 50),
        new LambertMaterial({ color: 0xff0000 }),
        3, 1, 0);
    secondPlanet.castShadow = true;
    secondPlanet.receiveShadow = true;
    emptyObject.add(secondPlanet);
    console.log("Added second planet to scene...");
    
     childCube = new gameObject(new CubeGeometry (0.5,0.5,0.5),//new gameObject(new SphereGeometry(0.5, 50, 50),
        new LambertMaterial({ color: 0xff0000 }),
        3.5, 1, 0);
    childCube.castShadow = true;
    childCube.receiveShadow = true;
    secondPlanet.add(childCube);
    console.log("Added Child Cube Primitive to scene...");
    
        thirdPlanet = new gameObject(new SphereGeometry(0.2, 50, 50),
        new LambertMaterial({ color: 0xff0000 }),
        9, 1, 0);
    thirdPlanet.castShadow = true;
    thirdPlanet.receiveShadow = true;
    emptyObject.add(thirdPlanet);
    console.log("Added third planet to scene...");
    
    // Add an AmbientLight to the scene
    ambientLight = new AmbientLight(0x090909);
    scene.add(ambientLight);
    console.log("Added an Ambient Light to Scene");
	
    // Add a SpotLight to the scene
    spotLight = new SpotLight(0xffffff);
    spotLight.position.set(5.6, 23.1, 5.4);
    spotLight.rotation.set(-0.8, 42.7, 19.5);
    spotLight.castShadow = true;
    scene.add(spotLight);
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
    //   camera.aspect = CScreen.RATIO;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    // renderer.setSize(CScreen.WIDTH, CScreen.HEIGHT);
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
    emptyObject.rotation.y += 0.05;
   secondPlanet.rotation.y+=0.025;
 //   childCube.rotation.z+=0.05;
    requestAnimationFrame(gameLoop);
	
    // render the scene
    renderer.render(scene, camera);
}

// Setup default renderer
function setupRenderer(): void {
    renderer = new Renderer();
    renderer.setClearColor(0xEEEEEE, 1.0);
    //renderer.setSize(CScreen.WIDTH, CScreen.HEIGHT);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    console.log("Finished setting up Renderer...");
}

// Setup main camera for the scene
function setupCamera(): void {
    //  camera = new PerspectiveCamera(45, config.Screen.RATIO, 0.1, 1000);
    camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = 0.6;
    camera.position.y = 16;
    camera.position.z = -20.5;
    camera.lookAt(new Vector3(0, 0, 0));
    console.log("Finished setting up Camera...");
}
