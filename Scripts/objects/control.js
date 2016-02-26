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
