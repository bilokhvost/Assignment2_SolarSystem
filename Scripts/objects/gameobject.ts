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

module objects {
    export class gameObject extends THREE.Mesh {
        //PRIVATE INSTANCE VARIABLES +++++++++++++++++++++++++++++++++++++
        private _geometry: THREE.Geometry;
        private _material: THREE.Material;
        
        //CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++++++++++
        constructor(geometry: THREE.Geometry, material: THREE.Material, x:number, y:number, z:number) {
            super(geometry, material);
            this._geometry = geometry;
            this._material = material;
            this.position.x = x;
            this.position.y = y;
            this.position.z = z;
            this.receiveShadow = true;
            this.castShadow = true;
        }
    }
}