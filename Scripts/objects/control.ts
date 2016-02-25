/// <reference path="../../typings/tsd.d.ts"/>

module objects {
    // CONTROL CLASS ++++++++++++++++++++++++++++++++++++++++++
    export class Control { 
        
        //PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++
          public zoomIn(): void {
             camera.position.set(secondPlanet.position.x - 25, secondPlanet.position.y + 25, secondPlanet.position.z + 25);
             camera.lookAt(secondPlanet.position);
             zoom = true;
         }
        
         public zoomOut(): void {
             camera.position.set(-100, 100, 100);
             camera.lookAt(scene.position);
             zoom = false;
         }
    }
}
