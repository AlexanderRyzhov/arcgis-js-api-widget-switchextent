/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "esri/core/tsSupport/declareExtendsHelper", "esri/core/tsSupport/decorateHelper", "esri/core/accessorSupport/decorators", "esri/core/Accessor", "esri/core/watchUtils"], function (require, exports, __extends, __decorate, decorators_1, Accessor, watchUtils) {
    "use strict";
    var SwitchExtentModel = /** @class */ (function (_super) {
        __extends(SwitchExtentModel, _super);
        function SwitchExtentModel(properties) {
            var _this = _super.call(this) || this;
            //--------------------------------------------------------------------
            //
            //  Methods use for watching
            //
            //--------------------------------------------------------------------
            // variable activate & deactivate event
            _this._activateExtentWatching = function () { return _this.stationaryWatching = watchUtils.whenTrue(_this.view, "stationary", _this._onMoveEnd); };
            _this._activateDragHandler = function () { return _this.dragWatching = _this.view.on('drag', function (event) { return _this._onDrag(event); }); };
            _this._deactivateExtentWatching = function () { return _this.stationaryWatching.remove(); };
            _this._deactivateDragWatching = function () { return _this.dragWatching.remove(); };
            //activate watching view
            _this.handleMoveView = function () {
                //initialize array
                _this.arrayPreviousExtents = [];
                _this.arrayNextExtents = [];
                //when view ready
                _this.view.when()
                    .then(function (_) { return _this._noChange(); })
                    .then(function (_) { return _this._activateExtentWatching(); });
            };
            //--------------------------------------------------------------------
            //
            //  Clicks action
            //
            //--------------------------------------------------------------------
            //handle click and set previous extent is array length > 0
            _this.onPreviousClick = function () {
                //push current view to the next array
                _this.arrayNextExtents.push(_this.view.extent);
                //reinitialize previous extent properties
                _this.prevExtent = null;
                _this.arrayPreviousExtents.length > 0 ? _this._setExtent() : null;
            };
            //handle click and set previous extent is array length > 0
            _this.onNextClick = function () {
                _this._activateDragHandler();
                //reinitialize previous extent properties
                _this.view.extent = _this.arrayNextExtents[_this.arrayNextExtents.length - 1];
                _this.arrayNextExtents.splice(_this.arrayNextExtents.length - 1);
            };
            //--------------------------------------------------------------------
            //
            //  Privates methods
            //
            //--------------------------------------------------------------------
            //when view stationnary execute push extent
            _this._onMoveEnd = function (event) {
                event ? _this._noChange() : null;
            };
            //when view stationnary execute push extent
            _this._onDrag = function (event) {
                event.action === 'end' ? _this._emptyNextArray() : null;
            };
            _this._emptyNextArray = function () {
                _this.arrayNextExtents = [];
                _this._deactivateDragWatching();
            };
            //goal : pushing new extent in array
            _this._noChange = function () {
                // stringify current extent & last entry in arrat view
                _this.currentExtentString = JSON.stringify(_this.view.extent);
                _this.lastArrayExtentString = JSON.stringify(_this.arrayPreviousExtents[_this.arrayPreviousExtents.length - 1]);
                // if a previous extent exists, we compare it with the current and if it's egal, no push (use in the clicking process)
                // else we compare actual extent et last entry in array (use during the first initialize of watching)
                if (_this.prevExtent) {
                    var prevExtentToString = JSON.stringify(_this.prevExtent);
                    _this.currentExtentString !== prevExtentToString ? _this._pushExtent() : null;
                }
                else {
                    _this.lastArrayExtentString !== _this.currentExtentString ? _this._pushExtent() : null;
                }
                _this._activateButton();
            };
            _this._pushExtent = function () {
                //check the limit of the array defined by users
                _this.arrayPreviousExtents.length === _this.count ? _this.arrayPreviousExtents.splice(0, 1) : null;
                //push the extent in the array
                _this.arrayPreviousExtents.push(_this.view.extent);
                //update the properties array
                _this.lastArrayExtentString = JSON.stringify(_this.arrayPreviousExtents[_this.arrayPreviousExtents.length - 1]);
            };
            _this._setExtent = function () {
                //if last extent in the array is egal to the current extent and array length > 1, remove this value
                _this.lastArrayExtentString === _this.currentExtentString && _this.arrayPreviousExtents.length > 1 ? _this.arrayPreviousExtents.splice(_this.arrayPreviousExtents.length - 1) : null;
                _this.view.extent = _this.arrayPreviousExtents[_this.arrayPreviousExtents.length - 1];
                _this.prevExtent = _this.view.extent;
                _this.arrayPreviousExtents.length > 1 ? _this.arrayPreviousExtents.splice(_this.arrayPreviousExtents.length - 1) : _this.isPreviousDisabled = true;
            };
            _this._activateButton = function () {
                _this.arrayNextExtents.length === 0 ? _this.isNextDisabled = true : _this.isNextDisabled = false;
                _this.currentExtentString === JSON.stringify(_this.arrayPreviousExtents[0]) ? _this.isPreviousDisabled = true : _this.isPreviousDisabled = false;
            };
            return _this;
        }
        __decorate([
            decorators_1.property()
        ], SwitchExtentModel.prototype, "view", void 0);
        __decorate([
            decorators_1.property()
        ], SwitchExtentModel.prototype, "count", void 0);
        __decorate([
            decorators_1.property()
        ], SwitchExtentModel.prototype, "isPreviousDisabled", void 0);
        __decorate([
            decorators_1.property()
        ], SwitchExtentModel.prototype, "isNextDisabled", void 0);
        __decorate([
            decorators_1.property()
        ], SwitchExtentModel.prototype, "stationaryWatching", void 0);
        __decorate([
            decorators_1.property()
        ], SwitchExtentModel.prototype, "dragWatching", void 0);
        __decorate([
            decorators_1.property()
        ], SwitchExtentModel.prototype, "arrayPreviousExtents", void 0);
        __decorate([
            decorators_1.property()
        ], SwitchExtentModel.prototype, "arrayNextExtents", void 0);
        __decorate([
            decorators_1.property()
        ], SwitchExtentModel.prototype, "prevExtent", void 0);
        __decorate([
            decorators_1.property()
        ], SwitchExtentModel.prototype, "lastArrayExtentString", void 0);
        __decorate([
            decorators_1.property()
        ], SwitchExtentModel.prototype, "currentExtentString", void 0);
        SwitchExtentModel = __decorate([
            decorators_1.subclass("esri.widgets.SwitchExtentModel")
        ], SwitchExtentModel);
        return SwitchExtentModel;
    }(decorators_1.declared(Accessor)));
    return SwitchExtentModel;
});
