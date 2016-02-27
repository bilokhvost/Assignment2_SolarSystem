/*controls.ts
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
             scene.add(camera);
             camera.lookAt(scene.position);
         }
    }
}
