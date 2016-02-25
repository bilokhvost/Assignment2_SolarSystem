/// <reference path="../../typings/tsd.d.ts"/>
var objects;
(function (objects) {
    // CONTROL CLASS ++++++++++++++++++++++++++++++++++++++++++
    var Control = (function () {
        function Control() {
        }
        //PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++
        Control.prototype.zoomIn = function () {
            camera.position.set(secondPlanet.position.x - 25, secondPlanet.position.y + 25, secondPlanet.position.z + 25);
            camera.lookAt(secondPlanet.position);
            zoom = true;
        };
        Control.prototype.zoomOut = function () {
            camera.position.set(-100, 100, 100);
            camera.lookAt(scene.position);
            zoom = false;
        };
        return Control;
    })();
    objects.Control = Control;
})(objects || (objects = {}));

//# sourceMappingURL=control.js.map
