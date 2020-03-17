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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "esri/core/tsSupport/declareExtendsHelper", "esri/core/tsSupport/decorateHelper", "esri/core/accessorSupport/decorators", "esri/widgets/Widget", "esri/widgets/support/widget", "./SwitchExtentModel"], function (require, exports, __extends, __decorate, decorators_1, Widget_1, widget_1, SwitchExtentModel_1) {
    "use strict";
    Widget_1 = __importDefault(Widget_1);
    SwitchExtentModel_1 = __importDefault(SwitchExtentModel_1);
    ;
    //--------------------------------------------------------------------
    //
    //  CSS
    //
    //--------------------------------------------------------------------
    var CSS = {
        base: "esri-switchextent esri-widget",
        switchPrevious: "esri-switchextent-previous esri-widget--button",
        switchNext: "esri-switchextent-next esri-widget--button",
        buttonDisabled: "esri-button--disabled",
        arrowLeftIcon: "esri-icon-left-triangle-arrow",
        arrowRightIcon: "esri-icon-right-triangle-arrow"
    };
    //--------------------------------------------------------------------
    //
    //  Subclasse
    //
    //--------------------------------------------------------------------
    var SwitchExtent = /** @class */ (function (_super) {
        __extends(SwitchExtent, _super);
        function SwitchExtent(properties) {
            var _this = _super.call(this) || this;
            //----------------------------------
            //  view model
            //----------------------------------
            _this.viewModel = new SwitchExtentModel_1.default();
            //-------------------------------------------------------------------
            //
            //  Private methods
            //
            //-------------------------------------------------------------------
            _this._onPreviousClick = function () { return _this.viewModel.onPreviousClick(); };
            _this._onNextClick = function () { return _this.viewModel.onNextClick(); };
            return _this;
        }
        //-------------------------------------------------------------------
        //
        //  Public methods
        //
        //-------------------------------------------------------------------
        SwitchExtent.prototype.postInitialize = function () {
            this.viewModel.initializeWatching();
        };
        SwitchExtent.prototype.render = function () {
            var classes = this.classes(CSS.base);
            var classPrevious = this.classes(CSS.switchPrevious, CSS.arrowLeftIcon, !this.prevCount ? CSS.buttonDisabled : null);
            var classNext = this.classes(CSS.switchNext, CSS.arrowRightIcon, !this.nextCount ? CSS.buttonDisabled : null);
            return (widget_1.tsx("div", { class: classes },
                widget_1.tsx("button", { onclick: this._onPreviousClick, class: classPrevious }, this.prevCount),
                widget_1.tsx("button", { onclick: this._onNextClick, class: classNext }, this.nextCount)));
        };
        __decorate([
            decorators_1.aliasOf("viewModel.view")
        ], SwitchExtent.prototype, "view", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.count")
        ], SwitchExtent.prototype, "count", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.isPreviousDisabled"),
            widget_1.renderable()
        ], SwitchExtent.prototype, "isPreviousDisabled", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.isNextDisabled"),
            widget_1.renderable()
        ], SwitchExtent.prototype, "isNextDisabled", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.prevCount"),
            widget_1.renderable()
        ], SwitchExtent.prototype, "prevCount", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.nextCount"),
            widget_1.renderable()
        ], SwitchExtent.prototype, "nextCount", void 0);
        __decorate([
            decorators_1.property({
                type: SwitchExtentModel_1.default
            })
        ], SwitchExtent.prototype, "viewModel", void 0);
        SwitchExtent = __decorate([
            decorators_1.subclass("esri.widgets.switchextent")
        ], SwitchExtent);
        return SwitchExtent;
    }(decorators_1.declared(Widget_1.default)));
    return SwitchExtent;
});
//# sourceMappingURL=SwitchExtent.js.map