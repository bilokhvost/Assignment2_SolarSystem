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
var objects;
(function (objects) {
    // CONTROL CLASS ++++++++++++++++++++++++++++++++++++++++++
    var Control = (function () {
        function Control() {
        }
        //PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++
        Control.prototype.zoomInFront = function () {
            camera.position.set(-70, 50, 15);
            camera.lookAt(sun.position);
        };
        Control.prototype.zoomInBack = function () {
            camera.position.set(100, 10, 150);
            fifthPlanetEmptyObject.add(camera);
            camera.lookAt(fifthPlanet.position);
        };
        Control.prototype.zoomOut = function () {
            camera.position.set(-75, 80, 200);
            camera.lookAt(scene.position);
        };
        return Control;
    })();
    objects.Control = Control;
})(objects || (objects = {}));

//# sourceMappingURL=control.js.map
