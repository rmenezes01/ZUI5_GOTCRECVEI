sap.ui.define([
        "sap/ui/core/UIComponent",
        "sap/ui/Device",
        "sap/ui/model/resource/ResourceModel",
        "copersucar/com/v2/gotc01/model/models"
    ],
    function (UIComponent, Device, ResourceModel, models) {
        "use strict";

        return UIComponent.extend("copersucar.com.v2.gotc01.Component", {
            metadata: {
                manifest: "json"
            },

            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            init: function () {
                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);

                // set the device model
                this.setModel(models.createDeviceModel(), "device");
                this.setModel( new sap.ui.model.odata.v2.ODataModel({
                    serviceUrl : "/sap/opu/odata/sap/ZGWLE_GOTC_COLAPP_VEIC_SRV"
                }));

                // set i18n model on view
                var oI18nModel = new ResourceModel({
                    bundleName: "copersucar.com.v2.gotc01.i18n.i18n"
                });
                this.setModel(oI18nModel, "i18n");

                // enable routing
                this.getRouter().initialize();
            }, 

            getContentDensityClass : function () {
		
                /*if (!this._sContentDensityClass) {
                    if (!sap.ui.Device.support.touch) {
                        this._sContentDensityClass = "sapUiSizeCompact";
                    } else {
                        this._sContentDensityClass = "sapUiSizeCozy";
                    }
                }*/
                this._sContentDensityClass = "sapUiSizeCozy";
                return this._sContentDensityClass;
            }
        });
    }
);