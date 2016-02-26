/// <reference path="../../typings/tsd.d.ts"/>

module objects {
    // CONTROL CLASS ++++++++++++++++++++++++++++++++++++++++++
    export class Control { 
        
        //PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++
          public zoomInFront(): void {
             camera.position.set(-70, 50, 15);
             camera.lookAt(sun.position);
         }
         
          public zoomInBack(): void {
             camera.position.set(100, 10, 150);
             fifthPlanetEmptyObject.add(camera);
             camera.lookAt(fifthPlanet.position);
         }
        
         public zoomOut(): void {
             camera.position.set(-75, 80, 200);
             camera.lookAt(scene.position);
         }
    }
}
