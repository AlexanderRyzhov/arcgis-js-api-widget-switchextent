/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />

import { declared, property, subclass } from "esri/core/accessorSupport/decorators";
import Accessor = require("esri/core/Accessor");

// esri.views
import MapView = require("esri/views/MapView");
import SceneView = require("esri/views/SceneView");
import Extent = require("esri/geometry/Extent");
import watchUtils = require('esri/core/watchUtils');

interface SwitchExtentModelProperties {
    view: MapView | null,
    count: number,
    isPreviousDisabled: boolean,
    isNextDisabled: boolean,
    stationaryWatching: any,
    dragWatching: any,
    arrayPreviousExtents: Array<Extent>,
    arrayNextExtents: Array<Extent>,
    prevExtent: Extent | null,
    lastArrayExtentString: string,
    currentExtentString: string
}


@subclass("esri.widgets.SwitchExtentModel")
class SwitchExtentModel extends declared(Accessor) {

    constructor(properties?: SwitchExtentModelProperties) {
        super();

    }


    //--------------------------------------------------------------------
    //
    //  Properties
    //
    //--------------------------------------------------------------------

    //propertie shared
    @property()
    view: MapView | SceneView;

    @property()
    count: number;

    @property()
    isPreviousDisabled: boolean = true;

    @property()
    isNextDisabled: boolean = true;

    @property()
    stationaryWatching: any;

    //properties for the workflow
    @property()
    arrayPreviousExtents: Array<Extent> = [];

    @property()
    arrayNextExtents: Array<Extent> = [];

    @property()
    prevExtent: Extent | null = null;

    //--------------------------------------------------------------------
    //
    //  Methods use for watching
    //
    //--------------------------------------------------------------------

    initializeHandlers = (): void => {
        //when view ready
        console.log('initializeHandlers');
        this.view.when().then(_ => this._activateExtentWatching());
    }

    // variable activate & deactivate event
    private _activateExtentWatching = () => {
        console.log('_activateExtentWatching');
        this.stationaryWatching = watchUtils.whenTrue(this.view, "stationary", this._onMoveEnd);
    }

    //private _deactivateExtentWatching = () => this.stationaryWatching.remove();

    //--------------------------------------------------------------------
    //
    //  Clicks action
    //
    //--------------------------------------------------------------------

    //handle click and set previous extent is array length > 0
    onPreviousClick = (): void => {
        console.log('onPreviousClick');
        //push current view to the next array
        this.arrayNextExtents.push(this.view.extent);
        this._setPreviousExtent();        
    }

    private _setPreviousExtent = (): void => {
        console.log('_setPreviousExtent');
        this.arrayNextExtents.unshift(this.view.extent);
        this.view.extent = this.arrayPreviousExtents.pop();
        this._calcButtonsDisabled()
    }

    //handle click and set previous extent is array length > 0
    onNextClick = (): void => {
        console.log('onNextClick');
        this.view.extent = this.arrayNextExtents.shift();
        
    }

    //--------------------------------------------------------------------
    //
    //  Privates methods
    //
    //--------------------------------------------------------------------

    //when view stationnary execute push extent
    private _onMoveEnd = (event: boolean): void => {
        console.log('_onMoveEnd');
        this.prevExtent ? this._changeExtentHandler() : this.prevExtent = this.view.extent;
    }

    //when view stationnary execute push extent

    private _emptyNextArray = (): void => {
        console.log('_emptyNextArray');
        this.arrayNextExtents = [];
    }

    private _changeExtentHandler = (): void => {
        console.log('_changeExtentHandler');
        this.arrayPreviousExtents.push(this.prevExtent);
        this.prevExtent = this.view.extent;
        this._emptyNextArray()
        this._calcButtonsDisabled();
    }


    private _calcButtonsDisabled = (): void => {
        console.log('_calcButtonsDisabled');
        this.arrayNextExtents.length === 0 ? this.isNextDisabled = true : this.isNextDisabled = false;
        this.arrayPreviousExtents.length === 0 ? this.isPreviousDisabled = true : this.isPreviousDisabled = false;
    }

}

export = SwitchExtentModel;