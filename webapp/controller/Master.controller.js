sap.ui.define([
    "sap/ui/core/mvc/Controller", 
    "copersucar/com/v2/gotc01/model/models",    
    "copersucar/com/v2/gotc01/utils/Formatter",
    "copersucar/com/v2/gotc01/utils/Grouper"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     * @param {typeof object} models
     * @param {typeof object} Formatter
     * @param {typeof object} Grouper
     */
 function (Controller, models, Formatter, Grouper) {
    "use strict";

    return Controller.extend("copersucar.com.v2.gotc01.controller.Master", {

/*
jQuery.sap.require("copersucar.com.gotc_01.util.Formatter");
jQuery.sap.require("copersucar.com.gotc_01.util.Grouper");

function getResourceText(sKey) {
	jQuery.sap.require("jquery.sap.resources");
	var sLocale = sap.ui.getCore().getConfiguration().getLanguage();
	var oBundle = jQuery.sap.resources({
		url : "/sap/bc/ui5_ui5/sap/zcoletorapp1/i18n/i18n.properties",
		locale : sLocale
	});
	return oBundle.getText(sKey);
};

sap.ui.controller("copersucar.com.v2.gotc01.view.Master", {
    */
	
        onInit : function() {

            //var that = this;
            
           // var oModel = new sap.ui.model.odata.v2.ODataModel({
           //     serviceUrl : "/sap/opu/odata/sap/ZCOLETORAPP_SRV"
           // });
                        

            this.getView().setModel(models.createViewModel(), "view");

            /*Ler parametros de entrada do aplicativo e salvar no model de estado da View */            
            let oStartupParameters = 
                this.getOwnerComponent().getComponentData() && this.getOwnerComponent().getComponentData().startupParameters ?                     
                    this.getOwnerComponent().getComponentData().startupParameters : { processo: ["RE"] };
                    //oStartupParameters.processo =
                    //oStartupParameters.processo ? oStartupParameters.processo.map((oItem) => { return oItem.substring(0, oItem.indexOf("/")); } )[0] : "RE"; 
                    
                    if ( oStartupParameters.processo.length > 0 ) {
                        oStartupParameters.processo = oStartupParameters.processo[0];
                    }else{
                        oStartupParameters.processo = "RE";
                    };

            this.getView().getModel("view").setProperty("/startUpParams", oStartupParameters);

            if ( oStartupParameters.processo == "RE" ) {
                let oModel = this.getOwnerComponent().getModel();
                oModel.read("/ZCOLETORAPPSet(Uname='')", {
                    success: function(oData, oResponse) {
                        if (oData.Flexibilizacao == 'T'){                            
                            this.getView().byId("C6").setSelected(true);
                            this.getView().byId("C6").setEnabled(true);
                            this.getView().byId("C5").setSelected(false);                            
                            this.getView().byId("C5").setEnabled(true);
                        } else{
                            this.getView().byId("C6").setEnabled(false);
                            this.getView().byId("C6").setSelected(false);                            
                            this.getView().byId("C5").setSelected(true);
                            this.getView().byId("C5").setEnabled(false);
                        }
                    }.bind(this)
                });
            }
            //sap.ui.getCore().setModel(oModel, "updtModel");
            //let vProcesso = jQuery.sap.getUriParameters().get("processo");
            //this.getView().getModel("view").setProperty("/start/process", vProcesso)
        },

        onAfterRendering: function() {
            jQuery.sap.delayedCall(500, this, function() {
                this.getView().byId("idE_Ticket").focus(null);
            });
        },	

        fechar : function() {
            // Fechar App.
            //close();
            window.history.back();
        },
        
        preamostCheck : function(){
            var FlexibilEdit = this.getView().byId("C6").getEditable();
            if (FlexibilEdit == true) {                
                if ( this.getView().byId("C5").getSelected() == true ) {
                    this.getView().byId("C5").setSelected(true);
                    this.getView().byId("C6").setSelected(false);
                } else {
                    this.getView().byId("C5").setSelected(false);
                    this.getView().byId("C6").setSelected(true);
                };
            }else {
                this.getView().byId("C5").setSelected(true);
                this.getView().byId("C5").setEditable(false);
                };    
            },       
        
        flexibilCheck : function(){

            var Flexibil = this.getView().byId("C6").getSelected();
            
            if (Flexibil == true){
                //this.getView().byId("C1").setSelected(false);
                //this.getView().byId("C2").setSelected(false);
                //this.getView().byId("C3").setSelected(false);
                //this.getView().byId("C4").setSelected(false);
                this.getView().byId("C5").setSelected(false);
                
                //this.getView().byId("C1").setEditable(false);
                //this.getView().byId("C2").setEditable(false);
                //this.getView().byId("C3").setEditable(false);
                //this.getView().byId("C4").setEditable(false);
                //this.getView().byId("C5").setEditable(false);
                
            }else{
                
                //this.getView().byId("C1").setEditable(true);
                //this.getView().byId("C2").setEditable(true);
                //this.getView().byId("C3").setEditable(true);
                //this.getView().byId("C4").setEditable(true);
                //this.getView().byId("C5").setEditable(true);
                this.getView().byId("C5").setSelected(true);
                
            };
                
        },

        limpar : function(Press) {
            // Ação do Botão Limpar.
            var ticket = this.getView().byId("idE_Ticket").setValue(null);
            var placa = this.getView().byId("idE_Placa").setValue(null);
            var agend = this.getView().byId("idE_Agend").setValue(null);
            
            let sProcesso = this.getView().getModel("view").getProperty("/startUpParams/processo");
            if(sProcesso === "R5") {
                this.getView().byId("C1").setSelected(false);
                this.getView().byId("C2").setSelected(false);
                this.getView().byId("C3").setSelected(false);
                this.getView().byId("C4").setSelected(false);
                this.getView().byId("C7").setSelected(false);
                this.getView().byId("C8").setSelected(false);
                this.getView().byId("C9").setSelected(false);
                this.getView().byId("C10").setSelected(false);
                this.getView().byId("C11").setSelected(false);

                this.getView().byId("C1").setEditable(true);
                this.getView().byId("C2").setEditable(true);
                this.getView().byId("C3").setEditable(true);
                this.getView().byId("C4").setEditable(true);
                this.getView().byId("C7").setEditable(true);
                this.getView().byId("C8").setEditable(true);
                this.getView().byId("C9").setEditable(true);
                this.getView().byId("C10").setEditable(true);
                this.getView().byId("C11").setEditable(true);

            } else {
                //this.getView().byId("C5").setSelected(true);
                //this.getView().byId("C6").setSelected(false);
                //this.getView().byId("C5").setEditable(true);
            }

        },

        readBarCode: function(){
            
            jQuery.sap.require("sap.ndc.BarcodeScanner");
            
            sap.ndc.BarcodeScanner.scan(
                    function (mResult) {
                        
                        this.getView().byId("idE_Ticket").setValue(mResult.text);
                        
                    }.bind(this),
                    function (oError) {
                        alert("Falha na Leitura do Scanner: " + oError);
                    },
                    function (mParams) {
                    
                    }.bind(this));
        },
        
        onRB_Ticket : function() {
            // Ação ao marcar o RadioButton Ticket.
            var field_ticket = this.getView().byId("idE_Ticket").setEditable(true).focus(null);
            var field_placa = this.getView().byId("idE_Placa").setEditable(false);
            var field_agend = this.getView().byId("idE_Agend").setEditable(false);
            //this.limpar("placa");
            this.limpar(null);
            this.getView().byId("btnBar").setVisible(true);	
        },

        onRB_Placa : function() {
            //  Ação ao marcar o RadioButton Placa.
            var field_ticket = this.getView().byId("idE_Ticket").setEditable(false);
            var field_placa = this.getView().byId("idE_Placa").setEditable(true).focus(null);		
            var field_agend = this.getView().byId("idE_Agend").setEditable(false);
            //this.limpar("ticket");
            this.limpar(null);
            this.getView().byId("btnBar").setVisible(false);	
        },

        onRB_Agend : function() {
            //  Ação ao marcar o RadioButton Placa.
            var field_ticket = this.getView().byId("idE_Ticket").setEditable(false);
            var field_placa = this.getView().byId("idE_Placa").setEditable(false);
            var field_agend = this.getView().byId("idE_Agend").setEditable(true).focus(null);
            this.limpar(null);
            this.getView().byId("btnBar").setVisible(false);		
        },

        aplicar : function(evt) {
            
            this.getView().getModel("view").setProperty("/state/busy", true);

            // Ajuste para considerar apenas um oData
            
            //var updtModel = sap.ui.getCore().getModel("updtModel");
            let updtModel = this.getOwnerComponent().getModel();
            var setOk = "Y";
            
            updtModel.setHeaders({
                "X-Requested-With" : "X"
            });
            
            let sProcesso = this.getView().getModel("view").getProperty("/startUpParams/processo");

            var objUpdate = {};

            objUpdate.Ticket = this.getView().byId("idE_Ticket").getValue();
            objUpdate.Placa  = this.getView().byId("idE_Placa").getValue();
            objUpdate.Exti2  = this.getView().byId("idE_Agend").getValue();
            objUpdate.ProcOrigem = sProcesso; //"R5"; //quinta fila

            if(sProcesso === "R5") {
                if(this.getView().byId("C1").getSelected() == true){
                    objUpdate.Zzplcbs = true; //'X';
                }else{
                    objUpdate.Zzplcbs = false; //'';
                }
                if(this.getView().byId("C2").getSelected() == true){
                    objUpdate.Zzcbirr = true; //'X';
                }else{
                    objUpdate.Zzcbirr = false; //'';
                }
                if(this.getView().byId("C3").getSelected() == true){
                    objUpdate.Zzlcirr = true; //'X';
                }else{
                    objUpdate.Zzlcirr = false; //'';
                }
                if(this.getView().byId("C4").getSelected() == true){
                    objUpdate.Zzdvfis = true; //'X';
                }else{
                    objUpdate.Zzdvfis = false; //'';
                }
                if(this.getView().byId("C7").getSelected() == true){
                    objUpdate.Zzsemcb = true;
                }else{
                    objUpdate.Zzsemcb = false;
                }
                if(this.getView().byId("C8").getSelected() == true){
                    objUpdate.Zzsemlc = true; 
                }else{
                    objUpdate.Zzsemlc = false;
                }
                if(this.getView().byId("C9").getSelected() == true){
                    objUpdate.Zzautod = true; 
                }else{
                    objUpdate.Zzautod = false;
                }
                if(this.getView().byId("C10").getSelected() == true){
                    objUpdate.Zztomba = true; 
                }else{
                    objUpdate.Zztomba = false;
                }
                if(this.getView().byId("C11").getSelected() == true){
                    objUpdate.Zzxlona = true; 
                }else{
                    objUpdate.Zzxlona = false;
                }
            } else {
                if(this.getView().byId("C5").getSelected() == true){
                    objUpdate.Zzpream = true; //'X';
                }else{
                    objUpdate.Zzpream = false; //'';
                }
                if(this.getView().byId("C6").getSelected() == true){
                    objUpdate.Zzflexi = true; //'X';
                }else{
                    objUpdate.Zzflexi = false; //'';
                }
            }
            var updateurl = "/ZCOLETORAPP_UPDTSet(Uname='')";
            
            updtModel.update(updateurl, objUpdate, {
                success : function(oData, oResponse) {
                    this.getView().getModel("view").setProperty("/state/busy", false);
                    
                    var Mensagem = new String();
                    
                    var eccMessage = oResponse.headers["sap-message"];
                    var eccMessageObject = JSON.parse(eccMessage);
            
                    Mensagem = eccMessageObject.message;
            
                    this.show_dialog(Mensagem.slice(0,1),eccMessageObject.code,Mensagem.slice(1));
            
            
                }.bind(this),
                error : function(err, oResponse) {
                    this.getView().getModel("view").setProperty("/state/busy", false);
                    this.show_dialog('error','ZGOTC/999','Erro de Interface. Contactar o suporte!');
                }.bind(this)

            });
            
            /* Comentado por L. Araujo
            //Ação ao clicar em Aplicar.
            var iValue = this.getView().byId("idE_Ticket").getValue();
            var okcode = "X";
            var regex = /^[0-9]+$/;

            //Serviço oData em QAS ou PRD		
            var host = window.location.protocol+"//"+window.location.hostname+":"+window.location.port;
            var sServiceUrl  = "/sap/opu/odata/sap/zgwgotc_coletor_srv/";
            
            if (window.location.hostname == "fiori.copersucar.com.br") {
                sServiceUrl = "/sap/opu/odata/sap/ZCOLETOR_PRD_SRV/";
            }
            
            var sUrl = host + sServiceUrl + "TicketSet('"+$.trim(iValue)+"')/Message";		

            if(iValue == " "){
                iValue = this.getView().byId("idE_Placa").getValue();			
    //		    regex = /^[a-zA-Z0-9]+$/;
                sUrl = host + sServiceUrl + "PlacaSet('"+$.trim(iValue)+"')/Message";
                
            }else{
                if (!iValue.match(regex)) {
                    okcode = " ";
                    jQuery.sap.require("sap.m.MessageBox");
                    sap.m.MessageBox.show("Valor " +iValue+ " inválido",{title: "Mensagem", width: "280px"});			
                }
            }				

            iValue = $.trim(iValue);
            var oModel =  new sap.ui.model.json.JSONModel();				
                    
            if (okcode == "X"){		

                $.ajax({
                    url: sUrl,
                    dataType: 'json',
                    async: false,
                    success: function(response) {
                        var data = response;			
                        oModel.setData(data);
                    }});

                sap.ui.getCore().setModel(oModel);  			
                
                jQuery.sap.require("sap.m.MessageBox");
                var msg = new sap.m.Text({text: "{/d/Message}", wrapping: true, width: "265px"});
                sap.m.MessageBox.show(msg, {title: "Mensagem", width: "280px"});			
            }
            
        */
            
        },		

        show_dialog: function(type,code,message){
        
            if(type == "E"){
                var tipo = sap.ui.core.ValueState.Error;
                var icone = "sap-icon://message-error";
            }else if (type == "I"){
                tipo = sap.ui.core.ValueState.Information;
                icone = "sap-icon://message-information";
            }else if (type == "S"){
                tipo = sap.ui.core.ValueState.Success;
                icone = "sap-icon://message-success";
            }else if (type == "W"){
                tipo = sap.ui.core.ValueState.Warning;
                icone = "sap-icon://message-warning";
            }else{
                tipo = sap.ui.core.ValueState.None;
                icone = "sap-icon://circle-task";
            };
            
            
            var dialog = new sap.m.Dialog({
                title : 'Gestão Operacional de Terminais',
                type : 'Message',
                icon : icone,
                state : tipo,
                content : new sap.m.Text({
                    text : message
                }),
                beginButton : new sap.m.Button({
                    text : 'OK',
                    press : function() {
        
                        dialog.close();
                        
                    }
                }),
                afterClose : function() {
        
                    dialog.destroy();
                    document.location.reload(true);
                }
            });
        
            dialog.open();
            
        }
	
    });
});
