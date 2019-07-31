var FieldHistoryDialog=function(t){Dialog.call(this,t,{backButtonText:Strings.translateString("Hide All"),nextButtonText:Strings.translateString("Show All"),closeButtonEnabled:!0,dynamicHeight:!0,confirmOnClose:!1,overlayDialog:!0}),this.toggles=null};FieldHistoryDialog.prototype=Object.create(Dialog.prototype),FieldHistoryDialog.prototype.constructor=FieldHistoryDialog,function(t){var e=function(t,e,o){this.show=function(){o.value=LPProxy.decrypt(t,e.getKey())},this.getElement=function(){return i};var i=LPTools.createElement("div","action",Strings.translateString("Show")),n;$(i).bind("click",(n=this,function(){n.show()}))},o=function(t,e){var o=!1;this.show=function(){s.value=LPProxy.decrypt(t,e.getKey()),l.addClass("selected"),o=!0},this.hide=function(){s.value=i,l.removeClass("selected"),o=!1},this.toggle=function(){o?this.hide():this.show()},this.getElement=function(){return n};var n=LPTools.createElement("div","relative"),s=LPTools.createElement("input",{class:"dialogInput",readonly:!0,type:"text"});s.value=i,n.appendChild(s);var l=LPTools.createElement("div","showPassword iconButton"),r;n.appendChild(l),(l=$(l)).bind("click",(r=this,function(){r.toggle()}))},i="********************";FieldHistoryDialog.prototype.open=function(t){this.toggles=[],(t=t||{}).title=Strings.translateString("Password History"),t.historyType===Constants.HISTORY_TYPES.USERNAME?t.title=Strings.translateString("Username History"):t.historyType===Constants.HISTORY_TYPES.NOTE&&(t.title=Strings.translateString("Note History")),Dialog.prototype.open.call(this,t)},FieldHistoryDialog.prototype.initialize=function(){var t;Dialog.prototype.initialize.apply(this,arguments),this.backButton.unbind("click"),this.nextButton.unbind("click"),(t=this).backButton.bind("click",function(){for(var e=0,o=t.toggles.length;e<o;++e)t.toggles[e].hide()}),t.nextButton.bind("click",function(){for(var e=0,o=t.toggles.length;e<o;++e)t.toggles[e].show()})},FieldHistoryDialog.prototype.close=function(){Dialog.prototype.close.apply(this,arguments),t.getElementById("fieldHistoryNoteDisplay").value="",$("#fieldHistoryElements").empty()},FieldHistoryDialog.prototype.setup=function(i,n){var s=Strings.translateString("Password");n.historyType===Constants.HISTORY_TYPES.USERNAME?s=Strings.translateString("Usernameproper"):n.historyType===Constants.HISTORY_TYPES.NOTE&&(s=Strings.translateString("Action"));var l=t.getElementById("fieldHistoryNoteDisplay");$("#fieldHistoryColumnHeader").text(s);var r=document.getElementById("fieldHistoryElements");if(n.history&&n.history.length>0){this.$element.removeClass("empty");for(var a=0,y=n.history.length;a<y;++a){var g=n.history[a],d=LPTools.createElement("tr");r.appendChild(d);var h=LPTools.createElement("td","fieldHistoryDate",g.date),p=g.whom&&g.whom.length?Strings.translateString("by")+" "+g.whom:"";h.appendChild(LPTools.createElement("p","fieldHistoryWhom",p)),d.appendChild(h);var c=null;c=n.historyType===Constants.HISTORY_TYPES.NOTE?new e(g.value,n.vaultItem,l):new o(g.value,n.vaultItem);var u=LPTools.createElement("td");u.appendChild(c.getElement()),d.appendChild(u),this.toggles.push(c)}}else this.$element.addClass("empty");Dialog.prototype.setup.apply(this,arguments),n.history&&n.history.length>0&&n.historyType===Constants.HISTORY_TYPES.NOTE?(this.$element.addClass("noteHistory"),this.dialogContent.css("bottom","0")):this.$element.removeClass("noteHistory")}}(document);
//# sourceMappingURL=sourcemaps/fieldHistoryDialog.js.map
