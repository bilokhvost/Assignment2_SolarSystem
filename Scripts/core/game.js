/// <reference path="_reference.ts"/>
// MAIN GAME FILE
// THREEJS Aliases
var Scene = THREE.Scene;
var Renderer = THREE.WebGLRenderer;
var PerspectiveCamera = THREE.PerspectiveCamera;
var BoxGeometry = THREE.BoxGeometry;
var CubeGeometry = THREE.CubeGeometry;
var SphereGeometry = THREE.SphereGeometry;
var Geometry = THREE.Geometry;
var AxisHelper = THREE.AxisHelper;
var LambertMaterial = THREE.MeshLambertMaterial;
var MeshBasicMaterial = THREE.MeshBasicMaterial;
var Material = THREE.Material;
var Mesh = THREE.Mesh;
var Object3D = THREE.Object3D;
var SpotLight = THREE.SpotLight;
var PointLight = THREE.PointLight;
var AmbientLight = THREE.AmbientLight;
var Control = objects.Control;
var GUI = dat.GUI;
var Color = THREE.Color;
var Vector3 = THREE.Vector3;
var Face3 = THREE.Face3;
var Point = objects.Point;
var CScreen = config.Screen;
//Custom Game Objects
var gameObject = objects.gameObject;
var scene;
var renderer;
var camera;
var axes;
//var cube: Mesh;
var childCube;
var sphere;
var ambientLight;
var spotLight;
var control;
var gui;
var stats;
var step = 0;
var cubeGeometry;
var cubeMaterial;
var emptyObject;
var sun;
var pointLight;
var firstPlanet;
var secondPlanet;
var thirdPlanet;
var fourthPlanet;
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
    sun = new gameObject(new SphereGeometry(10, 30, 30), new LambertMaterial({ map: THREE.ImageUtils.loadTexture('../Assets/images/sun.jpg') }), 0, 0, 0);
    scene.add(sun);
    console.log("Added sun to scene...");
    //add pointlight to the sun
    pointLight = new THREE.PointLight(0xffffff, 100, 100);
    sun.add(pointLight);
    //Add an empty object to the scene
    emptyObject = new Object3D();
    emptyObject.position.set(0, 0, 0);
    sun.add(emptyObject);
    console.log("Added empty object to sun...");
    //Add planets to scene 
    firstPlanet = new gameObject(new SphereGeometry(4, 30, 30), 
    // new LambertMaterial({ map: THREE.ImageUtils.loadTexture('../Assets/images/redPlanet.jpg') }),
    new LambertMaterial({ color: 0xff0000 }), 10, 5, 20);
    firstPlanet.receiveShadow = true;
    emptyObject.add(firstPlanet);
    console.log("Added first planet to scene...");
    secondPlanet = new gameObject(new SphereGeometry(3, 30, 30), new LambertMaterial({ map: THREE.ImageUtils.loadTexture('../Assets/images/bluePlanet.jpg') }), 30, 5, 30);
    secondPlanet.receiveShadow = true;
    emptyObject.add(secondPlanet);
    console.log("Added second planet to scene...");
    childCube = new gameObject(new SphereGeometry(0.5, 50, 50), new LambertMaterial({ color: 0xff0000 }), 3.5, 1, 0);
    childCube.castShadow = true;
    childCube.receiveShadow = true;
    secondPlanet.add(childCube);
    console.log("Added planet moon to scene...");
    thirdPlanet = new gameObject(new SphereGeometry(0.2, 50, 50), new LambertMaterial({ color: 0xff0000 }), 9, 1, 0);
    thirdPlanet.castShadow = true;
    thirdPlanet.receiveShadow = true;
    emptyObject.add(thirdPlanet);
    console.log("Added third planet to scene...");
    // Add an AmbientLight to the scene
    ambientLight = new AmbientLight(0x0c0c0c);
    scene.add(ambientLight);
    console.log("Added an Ambient Light to Scene");
    // Add a SpotLight to the scene
    spotLight = new SpotLight(0xffffff);
    spotLight.position.set(-70, 10, 100);
    //spotLight.rotation.set(-0.8, 42.7, 19.5);
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
function onResize() {
    //   camera.aspect = CScreen.RATIO;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    // renderer.setSize(CScreen.WIDTH, CScreen.HEIGHT);
}
function addControl(controlObject) {
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
function gameLoop() {
    stats.update();
    emptyObject.rotation.y += 0.05;
    secondPlanet.rotation.y += 0.025;
    //   childCube.rotation.z+=0.05;
    requestAnimationFrame(gameLoop);
    // render the scene
    renderer.render(scene, camera);
}
// Setup default renderer
function setupRenderer() {
    renderer = new Renderer();
    renderer.setClearColor(0x000000, 1.0);
    //renderer.setSize(CScreen.WIDTH, CScreen.HEIGHT);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    console.log("Finished setting up Renderer...");
}
// Setup main camera for the scene
function setupCamera() {
    //  camera = new PerspectiveCamera(45, config.Screen.RATIO, 0.1, 1000);
    camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = -75;
    camera.position.y = 80;
    camera.position.z = 125;
    camera.lookAt(new Vector3(0, 0, 0));
    console.log("Finished setting up Camera...");
}

//# sourceMappingURL=game.js.map
