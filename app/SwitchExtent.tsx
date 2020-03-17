/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />

import { aliasOf, declared, property, subclass } from "esri/core/accessorSupport/decorators";
import Widget from "esri/widgets/Widget";
import { tsx, renderable } from "esri/widgets/support/widget";
import SceneView from "esri/views/SceneView";
import MapView from "esri/views/MapView";
import SwitchExtentModel from "./SwitchExtentModel";

// esri.views
import View = require("esri/views/View");


//--------------------------------------------------------------------
//
//  Interfaces
//
//--------------------------------------------------------------------

interface SwitchExtentProperties extends __esri.WidgetProperties {
    view: MapView | SceneView,
    count: number
};


//--------------------------------------------------------------------
//
//  CSS
//
//--------------------------------------------------------------------

const CSS = {
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

@subclass("esri.widgets.switchextent")
class SwitchExtent extends declared(Widget) {

    constructor(properties?: SwitchExtentProperties) {
        super();
    }

    //--------------------------------------------------------------------
    //
    //  Properties
    //
    //--------------------------------------------------------------------
    //----------------------------------
    //  view
    //----------------------------------
    @aliasOf("viewModel.view")
    view: View;

    //----------------------------------
    //  lenght of extent in memory
    //----------------------------------
    @aliasOf("viewModel.count")
    count: number;


    //----------------------------------
    //  state of buttons
    //----------------------------------

    @aliasOf("viewModel.isPreviousDisabled")
    @renderable()
    isPreviousDisabled: boolean;

    @aliasOf("viewModel.isNextDisabled")
    @renderable()
    isNextDisabled: boolean;

    @aliasOf("viewModel.prevCount")
    @renderable()
    prevCount: number;

    @aliasOf("viewModel.nextCount")
    @renderable()
    nextCount: number;


    //----------------------------------
    //  view model
    //----------------------------------
    @property({
        type: SwitchExtentModel
    })
    viewModel: SwitchExtentModel = new SwitchExtentModel();


    //-------------------------------------------------------------------
    //
    //  Public methods
    //
    //-------------------------------------------------------------------

    postInitialize(): void {
        this.viewModel.initializeWatching();
    }

    render() {

        const classes = this.classes(
            CSS.base
        );

        const classPrevious = this.classes(
            CSS.switchPrevious,
            CSS.arrowLeftIcon,
            !this.prevCount ? CSS.buttonDisabled : null
        );

        const classNext = this.classes(
            CSS.switchNext,
            CSS.arrowRightIcon,
            !this.nextCount ? CSS.buttonDisabled : null
        );

        return (
            <div class={classes} >
                <button onclick={this._onPreviousClick} class={classPrevious}>{this.prevCount}</button>
        <button onclick={this._onNextClick} class={classNext}>{this.nextCount}</button>
            </div>
        );
    }
    //-------------------------------------------------------------------
    //
    //  Private methods
    //
    //-------------------------------------------------------------------

    private _onPreviousClick = () => this.viewModel.onPreviousClick();
    private _onNextClick = () => this.viewModel.onNextClick();

}

export = SwitchExtent;