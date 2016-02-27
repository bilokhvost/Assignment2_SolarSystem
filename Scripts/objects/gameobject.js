/*gameobjects.ts
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
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    var gameObject = (function (_super) {
        __extends(gameObject, _super);
        //CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++++++++++
        function gameObject(geometry, material, x, y, z) {
            _super.call(this, geometry, material);
            this._geometry = geometry;
            this._material = material;
            this.position.x = x;
            this.position.y = y;
            this.position.z = z;
            this.receiveShadow = true;
            this.castShadow = true;
        }
        return gameObject;
    })(THREE.Mesh);
    objects.gameObject = gameObject;
})(objects || (objects = {}));

//# sourceMappingURL=gameobject.js.map
