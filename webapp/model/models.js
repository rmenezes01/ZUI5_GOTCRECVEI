sap.ui.define([
    "sap/ui/model/json/JSONModel",
    "sap/ui/Device"
], 
    /**
     * provide app-view type models (as in the first "V" in MVVC)
     * 
     * @param {typeof sap.ui.model.json.JSONModel} JSONModel
     * @param {typeof sap.ui.Device} Device
     * 
     * @returns {Function} createDeviceModel() for providing runtime info for the device the UI5 app is running on
     */
    function (JSONModel, Device) {
        "use strict";

        return {
            createDeviceModel: function () {
                var oModel = new JSONModel($.extend({
                    isPhone : Device.system.phone,
                    listMode : (Device.system.phone) ? "None" : "SingleSelectMaster",
                    listItemType : (Device.system.phone) ? "Active" : "Inactive"
                }, Device, true));
                oModel.setDefaultBindingMode("OneWay");
                return oModel;
            }, 

            createViewModel: function () {
                return new JSONModel({
                    state: {
                        busy: false, 
                        delay: 1
                    }
                });
            }
        };
    }
);