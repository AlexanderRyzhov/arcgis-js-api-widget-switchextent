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
    stationaryWatching: any,
    arrayPreviousExtents: Array<Extent>,
    arrayNextExtents: Array<Extent>,
    prevExtent: Extent | null
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
    stationaryWatching: any;

    //properties for the workflow
    @property()
    arrayPreviousExtents: Array<Extent> = [];

    @property()
    prevCount: number = 0;

    @property()
    arrayNextExtents: Array<Extent> = [];

    @property()
    nextCount: number = 0;

    @property()
    prevExtent: Extent | null = null;

    //--------------------------------------------------------------------
    //
    //  Methods use for watching
    //
    //--------------------------------------------------------------------

    initializeWatching = (): void => {
        console.log('initializeHandlers');
        this.view.when()
                .then(_ => this._activateExtentWatching());
    }

    // variable activate & deactivate event
    private _activateExtentWatching = () => {
        console.log('_activateExtentWatching');
        this.stationaryWatching = watchUtils.whenTrue(this.view, "stationary", this._onExtentChange);
    }

    private _deactivateExtentWatching = () => this.stationaryWatching.remove();

    //--------------------------------------------------------------------
    //
    //  Clicks action
    //
    //--------------------------------------------------------------------

    //handle click and set previous extent 
    onPreviousClick = (): void => {
        console.log('onPreviousClick');
        this.arrayNextExtents.unshift(this.view.extent);
        this.view.extent = this.arrayPreviousExtents.pop();
        this._calcButtonsState()
    }

    //handle click and set previous extent is array length > 0
    onNextClick = (): void => {
        console.log('onNextClick');
        this.arrayPreviousExtents.push(this.view.extent);
        this.view.extent = this.arrayNextExtents.shift();
        this._calcButtonsState()
    }

    //--------------------------------------------------------------------
    //
    //  Privates methods
    //
    //--------------------------------------------------------------------

    //when view stationnary execute push extent
    private _onExtentChange = (event: boolean): void => {
        console.log('_onExtentChange');
        this.prevExtent ? this._extentChangeHandler() : this.prevExtent = this.view.extent;
    }


    private _extentChangeHandler = (): void => {
        //console.log('_extentChangeHandler');
        if (this.arrayPreviousExtents.length < this.count ) {            
            this.arrayPreviousExtents.push(this.prevExtent);
        } else {            
            this.arrayPreviousExtents.shift();
            this.arrayPreviousExtents.push(this.prevExtent);
        }        
        this.prevExtent = this.view.extent;
        this.arrayNextExtents = [];
        this._calcButtonsState();
    }


    private _calcButtonsState = (): void => {
        //console.log('_calcButtonsDisabled');
        this.prevCount = this.arrayPreviousExtents.length;
        this.nextCount = this.arrayNextExtents.length;
    }

}

export = SwitchExtentModel;