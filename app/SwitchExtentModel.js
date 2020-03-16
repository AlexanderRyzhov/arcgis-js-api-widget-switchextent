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
            _this.isPreviousDisabled = true;
            _this.isNextDisabled = true;
            //properties for the workflow
            _this.arrayPreviousExtents = [];
            _this.arrayNextExtents = [];
            _this.prevExtent = null;
            //--------------------------------------------------------------------
            //
            //  Methods use for watching
            //
            //--------------------------------------------------------------------
            _this.initializeHandlers = function () {
                //when view ready
                console.log('initializeHandlers');
                _this.view.when().then(function (_) { return _this._activateExtentWatching(); });
            };
            // variable activate & deactivate event
            _this._activateExtentWatching = function () {
                console.log('_activateExtentWatching');
                _this.stationaryWatching = watchUtils.whenTrue(_this.view, "stationary", _this._onMoveEnd);
            };
            //private _deactivateExtentWatching = () => this.stationaryWatching.remove();
            //--------------------------------------------------------------------
            //
            //  Clicks action
            //
            //--------------------------------------------------------------------
            //handle click and set previous extent is array length > 0
            _this.onPreviousClick = function () {
                console.log('onPreviousClick');
                //push current view to the next array
                _this.arrayNextExtents.push(_this.view.extent);
                _this._setPreviousExtent();
            };
            _this._setPreviousExtent = function () {
                console.log('_setPreviousExtent');
                _this.arrayNextExtents.unshift(_this.view.extent);
                _this.view.extent = _this.arrayPreviousExtents.pop();
                _this._calcButtonsDisabled();
            };
            //handle click and set previous extent is array length > 0
            _this.onNextClick = function () {
                console.log('onNextClick');
                _this.view.extent = _this.arrayNextExtents.shift();
            };
            //--------------------------------------------------------------------
            //
            //  Privates methods
            //
            //--------------------------------------------------------------------
            //when view stationnary execute push extent
            _this._onMoveEnd = function (event) {
                console.log('_onMoveEnd');
                _this.prevExtent ? _this._changeExtentHandler() : _this.prevExtent = _this.view.extent;
            };
            //when view stationnary execute push extent
            _this._emptyNextArray = function () {
                console.log('_emptyNextArray');
                _this.arrayNextExtents = [];
            };
            _this._changeExtentHandler = function () {
                console.log('_changeExtentHandler');
                _this.arrayPreviousExtents.push(_this.prevExtent);
                _this.prevExtent = _this.view.extent;
                _this._emptyNextArray();
                _this._calcButtonsDisabled();
            };
            _this._calcButtonsDisabled = function () {
                console.log('_calcButtonsDisabled');
                _this.arrayNextExtents.length === 0 ? _this.isNextDisabled = true : _this.isNextDisabled = false;
                _this.arrayPreviousExtents.length === 0 ? _this.isPreviousDisabled = true : _this.isPreviousDisabled = false;
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
        ], SwitchExtentModel.prototype, "arrayPreviousExtents", void 0);
        __decorate([
            decorators_1.property()
        ], SwitchExtentModel.prototype, "arrayNextExtents", void 0);
        __decorate([
            decorators_1.property()
        ], SwitchExtentModel.prototype, "prevExtent", void 0);
        SwitchExtentModel = __decorate([
            decorators_1.subclass("esri.widgets.SwitchExtentModel")
        ], SwitchExtentModel);
        return SwitchExtentModel;
    }(decorators_1.declared(Accessor)));
    return SwitchExtentModel;
});
//# sourceMappingURL=SwitchExtentModel.js.map