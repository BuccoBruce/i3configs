LPTabState=function(){var e={},t=null,s=6e3,r=50;LPPlatform.onTabClosed(function(t){delete e[t]}),Topics.get(Topics.CLEAR_DATA).subscribe(function(){e={}});var i=function(e){this.tabID=e.tabID,this.domain=lp_gettld_url(e.tabURL),this.sites=[],this.acccountsVersion=null,this.usernameField=null,this.username=null,this.lastFillSource=null,this.fillSourceCounts={},this.formParser=LPModule.getService("FormParser"),this.siteService=LPModule.getService("Site"),this.backgroundTools=LPModule.getService("BackgroundTools")};i.prototype.getDomainSites=function(){if(this.acccountsVersion!==g_local_accts_version){this.sites=[];var e=getsites(this.domain);for(var t in e)this.sites.push(g_sites[t]);this.acccountsVersion=g_local_accts_version}return this.passwordForm?reorderOnURL(getsites(this.domain),this.passwordForm.getURL()):this.sites},i.prototype.getFields=function(){var e=[];this.passwordForm&&(e=this.passwordForm.getFields());var t=this.getUsernameField(),s;t&&t.value===this.getUsername()&&(0===e.filter(function(e){return e.name===t.name&&e.value===t.value}).length&&e.unshift(t));return e.filter(function(e){return e.id||e.attributes.name})},i.prototype.getUsernameField=function(){if(!this.usernameField)for(var t in e){var s=e[t];if(s.usernameField&&compare_tlds(s.domain,this.domain)){this.usernameField=s.usernameField;break}}return this.usernameField},i.prototype.setUsernameField=function(e){e&&(this.usernameField=e)},i.prototype.setUsername=function(e){this.username=e,this.timeUsernameLastCached=Date.now()},i.prototype.getUsername=function(){var t=this.sites.length>1;if(!this.username&&this.passwordForm&&this.setUsername(this.passwordForm.getUsername()),!this.username&&!t)for(var s in e){var r=e[s];if(r.username&&compare_tlds(r.domain,this.domain)){this.setUsername(r.username);break}}return this.username},i.prototype.getLastFillSource=function(){return this.lastFillSource},i.prototype.clearFillSource=function(){this.lastFillSource=null,this.fillSourceCounts={}},i.prototype.setLastFillSource=function(e){this.lastFillSource=e,"Manual"!==e&&(this.fillSourceCounts.hasOwnProperty(e)||(this.fillSourceCounts[e]=0),this.fillSourceCounts[e]++)},i.prototype.debouncedSetLastFillSource=null,i.prototype.getFillSourceCounts=function(){return this.fillSourceCounts};var o=function(e,t){switch(t.transitionType){case"auto_subframe":case"manual_subframe":return!1}return t.transitionQualifiers.indexOf("from_address_bar")>-1||t.transitionQualifiers.indexOf("forward_back")>-1};i.prototype.processPasswordSubmit=function(e,t){this.passwordForm=this.formParser.parse(e),e.username?this.setUsername(e.username):this.passwordForm.getUsername()?this.setUsername(this.passwordForm.getUsername()):this.shouldUseCachedUsername()||this.setUsername(null),delete this.isMultiStepLogin,this.setUsernameField(this.passwordForm.getUsernameField()),e.generatedPassword?this.generatedPassword=e.generatedPassword:LPPlatform.once(LPPlatform.onTransition,function(e){o(this,e)&&this.clear()},this)},i.prototype.shouldUseCachedUsername=function(){var e=this.username&&this.timeUsernameLastCached>new Date(Date.now()+6e4),t,s=1===this.getDomainSites().length&&this.passwordForm.isChangePasswordForm;return!e&&(this.isMultiStepLogin||s)},i.prototype.processTextSubmit=function(e,t){var s=this.formParser.parse(e,{strict:!0});0===this.getMatchingSites(s.getUsername()).length&&(this.isMultiStepLogin=!0),this.setUsernameField(s.getUsernameField()),this.setUsername(s.getUsername())},i.prototype.getMatchingSites=function(e){var t=this,s=t.getDomainSites(),r=[],e;if(e=e||t.getUsername())r=s.filter(function(t){return this.siteService.hasMatchingSiteUserName(t,e)},this);else{var i=t.passwordForm&&t.passwordForm.getOriginalPassword(),o=t.passwordForm.getFormMetaData(),a=null!==o&&1===o.uniquePasswords.length;i&&(r=s.filter(function(e){return null!==this.siteService.findMatchingSitePassword(e,i)},this)),a&&t.passwordForm.getPassword()&&(r=s.filter(function(e){return null!==this.siteService.findMatchingSitePassword(e,t.passwordForm.getPassword())},this))}return t.matchingSiteCount=r.length,r},i.prototype.shouldShowSiteNotification=function(){return!!this.passwordForm&&(!!(this.passwordForm.succeeded()||this.passwordForm.isChangePasswordForm()||this.passwordForm.isCreateAccountForm())&&(this.passwordForm.isChangePasswordForm()?Preferences.get("showChangeNotificationBar"):Preferences.get("showSaveNotificationBar")))};var a=(n=function(e){var t="";return e.forEach(function(e){t+=e.formname+"\t"+encodeURIComponent(e.name)+"\t"+encodeURIComponent(crypto_btoa(e.value))+"\t"+encodeURIComponent(e.type)+"\n"}),bin2hex(t)},function(e,t){if(t.length>0){e.fields=e.fields.concat(t),g_local_accts_version++,rewritelocalfile();var s={data:n(t),ref:url2hex(e.url),updatefields:1,aid:e.aid};e.sharedfolderid&&(s.sharedfolderid=e.sharedfolderid),e.postdata=new PostParams(s).toString(),e.posturl=base_url+"gm_deliver.php",e.newvalues=t,updateFieldsFromSubmit(e.postdata,e)}}),n,u=function(e){return{name:e.attributes.name||e.id,type:e.type,value:e.value,formname:""}},l=function(e,t){return t===e.unencryptedUsername?e.username:t===this.siteService.decrypt(e,e.password)?e.password:lpmenc_acct(t,!0,e,g_shares)},c,d;i.prototype.addFields=function(e){if(this.getUsername()){var t=this,s=this.getFields();e.forEach(function(e){if(e.fields){var r=[];s.forEach(function(s){var i=u(s),o;0===e.fields.filter(function(t){return t.name===i.name&&(!e.save_all||t.formname===s.formname)}).length&&r.push({otherfield:e.save_all,name:i.name,type:i.type,value:l.call(t,e,s.value),checked:!1,formname:e.save_all?s.formname:"",urid:"0",otherlogin:"0",url:""})}),a(e,r)}})}},i.prototype.getSiteNotificationData=function(e){if(this.passwordForm){var t={formSubmitted:this.passwordForm.submitted(),formSucceeded:this.passwordForm.succeeded()};if(1==t.formSubmitted&&Topics.get(Topics.PASSWORD_FORM_SUBMITTED).publish({form:this.passwordForm,tabId:e.tabID}),this.shouldShowSiteNotification()){var s=this.passwordForm.getFormProfile(),r=this.getMatchingSites(),i=r.filter(function(e){return null!==this.siteService.findMatchingSitePassword(e,this.passwordForm.getPassword())},this);if(i.length>0)return this.addFields(i),this.clear({force:!0}),{};t.matchingSites=r.map(function(e){return e.aid});var o="",a="";g_nofolder_feature_enabled||(a=o=siteCats[this.domain]||"");var n=getacct(get_personal_linked()),l=Policies.getSaveSiteToPersonal();l&&n&&-1===l.indexOf(this.domain)&&(a=n.group),Policies.getAccountSelectionBasedOnEmail()&&n&&this.username===n.group&&(a=n.group),""!==a&&""!==o&&a!==o&&(a+="\\"+o);var c=this.getDomainSites().map(function(e){return e.aid}),d;if(t.defaultData={url:this.passwordForm.shouldSaveFields()?s.url:hostof(s.url),name:this.domain,unencryptedUsername:this.getUsername(),group:a,basic_auth:this.passwordForm.isBasicAuthentication()?"1":"0",realm:s.realm,domain:lp_gettld_url(e.tabURL),domainSites:c},t.dialogData={password:this.passwordForm.getPassword()},t.matchingSiteSameSubDomain=1===r.length&&hostof(r[0].url)===hostof(this.passwordForm.getFormProfile().url),t.sameDomain=compare_tlds(lp_gettld_url(this.passwordForm.getFormProfile().url),lp_gettld_url(e.tabURL)),t.generatedPassword=this.generatedPassword===this.passwordForm.getPassword(),this.passwordForm.shouldSaveFields())this.getFields().length>0&&(t.dialogData.fields=this.getFields().map(u))}else this.clear();return t}return{}},i.prototype.getFormSubmissionTabState=function(){for(var e=this;e;){if(e.passwordForm)return e;e=e.previousTabState}return this},i.prototype.getUsernames=function(){return this.getDomainSites().map(function(e){return e.unencryptedUsername})},i.prototype.getSiteNotification=(c=function(e,t,s){var r=e.getUsernames();t.forEachWindow({each:function(t,s){return t.LPContentScriptTools.findText({searches:r,callback:function(t){e.setUsername(t),s()}})},done:s})},d=function(e,t,s){var r=!1,i=LPTabs.get({tabID:e.tabID}),o=function(){e.passwordForm&&(e.passwordForm.succeeded()||e.passwordForm.succeeded(!r),e.passwordForm.succeeded()&&!e.passwordForm.getUsername()&&e.getDomainSites().length>0)?c(e,i,s):s()};if(t){var a=i.getFrame(t.frameID);a&&a.LPSiteNotification.formExists(e.passwordForm.getFormProfile(),function(e){r=e,o()})}else e.passwordForm.getFormProfile().top?i.getTop().LPSiteNotification.formExists(e.passwordForm.getFormProfile(),function(e){r=e,o()}):i.onFramesLoaded(function(){i.forEachFrame({each:function(t,s){return t.LPSiteNotification.formExists(e.passwordForm.getFormProfile(),function(e){r=r||e,s()})},done:o})})},function(e,t){if(e.callback){var s=this.getFormSubmissionTabState(),r=function(){e.callback(s.getSiteNotificationData(t))};if(s.passwordForm&&s.passwordForm.getPassword()){if(s.domain===this.domain&&!s.passwordForm.isBasicAuthentication())return void d(s,e.source,r);s.passwordForm.succeeded(!0)}r()}}),i.prototype.clear=function(e){var t=e&&e.force,s=!0;return this.previousTabState&&(s=this.previousTabState.clear(e))&&delete this.previousTabState,this.passwordForm&&(this.passwordForm.getPassword()===this.generatedPassword&&(this.passwordForm.submitted(!1),s=!1),(s||t)&&(delete this.passwordForm,delete this.generatedPassword)),s},i.prototype.processBasicAuthentication=function(e){this.passwordForm=this.formParser.parse({basicAuthentication:!0,url:e.url,realm:e.realm,username:e.username,password:e.password})},i.prototype.setLoginRequestRecentlyResolved=function(){var e=this;e.loginRequestRecentlyResolved&&(clearTimeout(e.loginRequestRecentlyResolved),delete e.loginRequestRecentlyResolved),this.loginRequestRecentlyResolved=setTimeout(function(){delete e.loginRequestRecentlyResolved},s)},i.prototype.getLoginRequestRecentlyResolved=function(){return!!this.loginRequestRecentlyResolved};var m=function(e){if(!lploggedin)return!1;var t=lp_gettld_url(e.tabURL);return LPContentScriptFeatures.new_save_site?!(hasNeverEnableLP(e.tabURL,t)||hasNeverSave(e.tabURL,t)||lp_url_is_lastpass(e.tabURL)||lp_url_is_lastpassext(e.tabURL)):IntroTutorial.getState().enabled&&IntroTutorial.isOnStateDomain(t)},f=function(t,s){if(t){if(m(t)){var r=e[t.tabID];if(!r||!compare_tlds(r.domain,lp_gettld_url(t.tabURL))){var o=e[t.tabID]=new i(t);o.previousTabState=r,r=o}s(r)}}else LPPlatform.getCurrentTab(function(e){e&&f(e.tabDetails,s)})},h,p,g,F,S,w,v,b,P,_,U,R,y,L,T;return{getSiteNotification:function(e,t){f(t,function(s){s.getSiteNotification(e,t)})},clear:function(e,t){f(t,function(t){t.clear(e)})},processPasswordSubmit:function(e,t){f(t,function(s){s.processPasswordSubmit(e.formData,t),s.getSiteNotification({callback:e.callback,source:t},t),Topics.get(Topics.PROCESSED_FORM_SUBMIT).publish({password:!0,tabId:s.tabID,inputValues:e.formData.fields})})},processTextSubmit:function(e,t){f(t,function(s){s.processTextSubmit(e,t),Topics.get(Topics.PROCESSED_FORM_SUBMIT).publish({password:!1,tabId:s.tabID,inputValues:e.fields})})},processBasicAuthentication:function(e,t){f(t,function(t){t.processBasicAuthentication(e)})},getState:function(e,t){var s={enabled:m(t)};s.enabled?f(t,function(t){s.usernames=t.getUsernames(),s.formSubmittedFrame=t.passwordForm&&!t.passwordForm.getFormProfile().top,e(s)}):e(s)},getStateByTabId:function(t,s){if(t){var r=e[t];s(r)}else LPPlatform.getCurrentTab(function(e){e&&f(e.tabDetails,s)})},getStateByTabIdImmediate:function(t){return t?e[t]:null},setLoginRequestRecentlyResolved:function(e){f(e,function(e){e.setLoginRequestRecentlyResolved()})},setCopiedGeneratedPassword:function(e){t=e},getCopiedGeneratedPassword:function(e){e(t)},clearFillSource:function(){f(null,function(e){e.clearFillSource()})},setLastFillSource:function(e){f(null,function(t){t.debouncedSetLastFillSource||(t.debouncedSetLastFillSource=t.backgroundTools.debounce(t.setLastFillSource,r,!1)),t.debouncedSetLastFillSource.call(t,e)})},getLastFillSource:function(e){f(null,function(e){e.getLastFillSource()})},getFillSourceCounts:function(){f(null,function(e){e.getFillSourceCounts()})}}}();
//# sourceMappingURL=sourcemaps/loginTracking.js.map
