var SecondaryOnboardingCard=function(){function e(e,t){this.data=e,this.setCompleted(t)}return e.prototype.draw=function(e){return this.isCompleted()?this.drawCompleted():this.drawIncomplete(e)},e.prototype.drawIncomplete=function(e){var t=this,r=LPTools.createElement("div",{id:this.data.id,class:"card"},"");r.appendChild(LPTools.createElement("img",{id:this.data.id+"-icon",class:"card-icon",src:this.data.icon},"")),r.appendChild(LPTools.createElement("div",{id:this.data.id+"-header",class:"card-header"},Strings.translateString(this.data.header))),r.appendChild(LPTools.createElement("div",{id:this.data.id+"-text",class:"card-text"},Strings.translateString(this.data.bodyText)));var o=LPTools.createElement("button",{id:this.data.id+"-cta",class:"card-button btn-base btn-small btn-primary"},Strings.translateString(this.data.buttonText));return o.onclick=function(){t.data.cta(),bg.sendLpImprove("secondary_onboarding_card_click",{cardname:t.data.id}),e.refreshAfterCTA(t.data.id)},r.appendChild(o),r},e.prototype.drawCompleted=function(){var e=LPTools.createElement("div",{id:this.data.id,class:"cardComplete card"},"");return e.appendChild(LPTools.createElement("img",{id:this.data.id+"-icon-completed",class:"card-completed-icon",src:"images/SecondaryOnboarding/circle-success.png"},"")),e.appendChild(LPTools.createElement("div",{id:this.data.id+"-text-completed",class:"card-completed-header"},Strings.translateString(this.data.completedText))),e},e.prototype.isCompleted=function(){return this.completed},e.prototype.setCompleted=function(e){this.completed=e},e.prototype.getID=function(){return this.data.id},e.prototype.getKey=function(){return this.data.key},e}(),SecondaryOnboardingContainer=function(){function e(){this.cardWidth=330,this.vaultEl=$("#vault"),this.containerEl=$("#secondaryOnboardingContainer"),this.containerEl.hide(),this.preferences=new SecondaryOnboardingPreferences,this.progress=new SecondaryOnboardingProgressBar,this.showCarousel=$.proxy(this.showCarousel,this),this.postSlideHideCarousel=$.proxy(this.postSlideHideCarousel,this)}return e.prototype.init=function(e){var t=e.cards;this.resetContainer(),this.adjustVaultContentsPositioning(),this.cards=this.createCards(t),this.sortCards(this.cards);var r=LPTools.createElement("div",{id:"secondaryOnboardingHeader",class:"row"},"");r.append(this.createProgressbar()),r.append(this.createToggleButton()),this.containerEl.append(r),this.cardsCarouselEl=$(this.drawCards(this.cards)),this.containerEl.append(this.cardsCarouselEl),this.vaultEl.addClass("secondary-onboarding-overrides"),this.containerEl.addClass("secondary-onboarding lp-grid container gutter-sm leftOfAd right"),e.expanded?this.showCarousel(!1):this.hideCarousel(),this.containerEl.show(),bg.sendLpImprove("secondary_onboarding_container_shown"),this.setCardWidth(this.cards)},e.prototype.adjustVaultContentsPositioning=function(){$("#options").addClass("bottom"),$("#main").addClass("secondary-onboarding-bottom")},e.prototype.resetContainer=function(){$("#secondaryOnboardingHeader").remove(),$("#carousel").remove()},e.prototype.createCards=function(e){for(var t=[],r,o=0,a=Object.keys(e);o<a.length;o++){var n=a[o],s=DTO[n];s.id=n,t.push(new SecondaryOnboardingCard(s,e[n].completed))}return t},e.prototype.createToggleButton=function(){var e=this,t=LPTools.createElement("div",{id:"collapseToggleElement",class:"collapseToggleElement col-3 pull-right content-pull-right"},"");return t.appendChild(LPTools.createElement("span",{id:"collapseToggleButton"})),t.appendChild(LPTools.createElement("img",{id:"collapseToggleArrow",src:"images/SecondaryOnboarding/close_arrow.png",alt:"Secondary Onboarding Toggle Arrow"},"")),$(t).click(function(){e.toggleContainerState()}),t},e.prototype.createProgressbar=function(){var e=LPTools.createElement("div",{id:"progressBar",class:"col-9"},"");return e.appendChild(LPTools.createElement("span",{id:"progressBarText"},Strings.translateString("Get started with LastPass"))),e.appendChild(LPTools.createElement("span",{id:"cardProgressCount"},"")),e.appendChild(LPTools.createElement("span",{id:"cardProgressBar"},"")),e},e.prototype.showCarousel=function(e){void 0===e&&(e=!1),this.vaultEl.removeClass("collapsed"),e?(e=!1,this.cardsCarouselEl.slideToggle(400,this.showCarousel)):($("#collapseToggleButton").text("Collapse"),$("#collapseToggleArrow").attr("src","../images/SecondaryOnboarding/close_arrow.png"))},e.prototype.postSlideHideCarousel=function(){$("#collapseToggleButton").text("Expand"),$("#collapseToggleArrow").attr("src","../images/SecondaryOnboarding/open_arrow.png"),this.vaultEl.addClass("collapsed")},e.prototype.hideCarousel=function(){this.cardsCarouselEl.slideToggle(400,this.postSlideHideCarousel)},e.prototype.hideContainer=function(e){void 0===e&&(e=!1),this.vaultEl.removeClass("secondary-onboarding-overrides"),$("#main").removeClass("secondary-onboarding-bottom"),$("#options").removeClass("bottom"),this.containerEl.hide(),bg.sendLpImprove("secondary_onboarding_container_hidden")},e.prototype.sortCards=function(e){e.sort(function(e,t){return!e.isCompleted()&&!t.isCompleted()&&e.getKey()>t.getKey()||e.isCompleted()&&!t.isCompleted()?1:-1})},e.prototype.drawCards=function(e){var t=this,r=LPTools.createElement("div",{id:"carousel",class:"carousel content row"},""),o=LPTools.createElement("div",{id:"cardsCarousel",class:"cards-carousel"},""),a=LPTools.createElement("div",{id:"cards",class:"cards"},"");o.appendChild(a),$(a).width(this.cardWidth*e.length);for(var n=0,s=e;n<s.length;n++){var i=s[n];a.appendChild(i.draw(this))}var d=LPTools.createElement("div",{id:"prev",class:"arrow arrow-left"},"");d.onclick=function(){return t.scrollReverse(t.cardWidth)},r.appendChild(d),d.appendChild(LPTools.createElement("img",{id:"prevArrow",class:"arrow-img",src:"images/SecondaryOnboarding/arrow_left.png"},"")),r.appendChild(o);var c=LPTools.createElement("div",{id:"next",class:"arrow arrow-right"},"");return c.onclick=function(){return t.scrollNext(t.cardWidth)},c.appendChild(LPTools.createElement("img",{id:"nextArrow",class:"arrow-img",src:"images/SecondaryOnboarding/arrow_right.png"},"")),r.appendChild(c),r},e.prototype.setCardWidth=function(e){if(e.length>0){var t=""+e[0].getID();this.cardWidth=$("#"+t).outerWidth()+parseInt($("#"+t).css("margin-left"))+parseInt($("#"+t).css("margin-right"))}},e.prototype.scrollNext=function(e){var t=$("#cards").outerWidth()-$("#cardsCarousel").outerWidth(),r;Math.abs(parseInt($("#cards").css("left")))<t&&$("#cards").animate({left:"-="+e},"fast")},e.prototype.scrollReverse=function(e){var t;parseInt($("#cards").css("left"))<0&&$("#cards").animate({left:"+="+e},"fast")},e.prototype.toggleContainerState=function(){var e=this.preferences.retrieve();e.expanded?(this.hideCarousel(),bg.sendLpImprove("secondary_onboarding_container_collapsed")):(this.showCarousel(!0),bg.sendLpImprove("secondary_onboarding_container_shown")),e.expanded=!e.expanded,this.preferences.save(e)},e.prototype.refreshAfterCTA=function(e){var t=this;if("getMobileApp"===e){var r=this.drawCardsAfterCTA(e);$("#"+e).replaceWith(r.draw(this))}else Topics.get(Topics.DIALOG_CLOSE).subscribe(function(){var r=t.drawCardsAfterCTA(e);$("#"+e).replaceWith(r.draw(t)),Topics.get(Topics.DIALOG_CLOSE).unsubscribe()})},e.prototype.drawCardsAfterCTA=function(e){var t=DTO[e],r=this.preferences.retrieve(),o="getMobileApp"===e||DTO[e].checkComplete(),a;return o&&!r.cards[e].completed&&(r.cards[e].completed|=o,r.completedCards++,this.progress.showProgressCounter(r.completedCards,Object.keys(r.cards).length),this.progress.showProgressBarCompletion(r.completedCards),this.preferences.save(r),"getMobileApp"!==e&&bg.sendLpImprove("secondary_onboarding_card_complete",{cardname:e})),new SecondaryOnboardingCard(t,r.cards[e].completed)},e}(),DTO={vaultTour:{key:0,cta:function(){LPPlatform.openTour(!0,!0)},checkComplete:function(){if(LPProxy.getPreference("IntroTour")){var e=JSON.parse(LPProxy.getPreference("IntroTour")).remainingTours;if(e){var t=Object.keys(e),r=t[0];if(t&&r&&e[r])return e[r].isTaken}}return!1},header:"New around here? Take the tour",bodyText:"Take a guided tour of your LastPass vault and see how LastPass keeps you secure.",completedText:"Vault tour complete!",buttonText:"Take the tour",icon:"images/SecondaryOnboarding/mid-safe-color.svg"},addAPassword:{key:1,cta:function(){LPVault.openSiteDialog()},checkComplete:function(){return"undefined"!==bg.get("g_sites")&&Object.keys(bg.get("g_sites")).length>0},header:"Add a password now, save time later",bodyText:"Add your login information for your favorite website and save time on your next visit.",completedText:"First password saved!",buttonText:"Add a password",icon:"images/SecondaryOnboarding/mid-lock-color.svg"},getMobileApp:{key:2,cta:function(){LPProxy.sendMobileDownload({params:{},success:function(e){if(e&&e.success){var t="getMobileApp",r=new SecondaryOnboardingPreferences,o=r.retrieve();o.cards[t].completed=!0,r.save(o),bg.sendLpImprove("secondary_onboarding_card_complete",{cardname:t})}}})},checkComplete:function(){return!1},header:"Take LastPass everywhere",bodyText:"Download the app for iOS or Android. We'll deliver a link right to your inbox.",completedText:"Check your email to get the app!",buttonText:"Get LastPass mobile app",icon:"images/SecondaryOnboarding/mid-phone-color.svg"},enableMFA:{key:3,cta:function(){Topics.get(Topics.EDIT_SETTINGS).publish({source:"sidebar",defaulttab:"settings_multifactor"})},checkComplete:function(){return bg.get("g_2fa_inprocess")},header:"Enable Multi-Factor Authentication",bodyText:"Give your account an additional layer of security by setting up multi-factor authentication",completedText:"Multi-Factor Auth Enabled!",buttonText:"Set up Multi-Factor Auth",icon:"images/SecondaryOnboarding/mid-spy-color.svg"},saveAPayment:{key:4,cta:function(){LPVault.openNoteDialog({defaultData:{notetype:"Credit Card"}})},checkComplete:function(){var e=bg.get("g_securenotes");for(var t in e)if(e.hasOwnProperty(t)&&"Credit Card"===e[t].notetype)return!0;return!1},header:"Save payment cards and shop smart",bodyText:"Keep your payment card information ready and secure of bill pay and online shopping",completedText:"Payment card saved!",buttonText:"Save a payment card",icon:"images/SecondaryOnboarding/mid-card-color.svg"}},SecondaryOnboardingManager=function(){function e(){this.preferences=new SecondaryOnboardingPreferences,this.container=new SecondaryOnboardingContainer,this.progress=new SecondaryOnboardingProgressBar}return e.prototype.init=function(){this.preferenceData=this.preferences.retrieve(),this.updateCompletedCards(),this.preferences.save(this.preferenceData),this.allCardsCompleted()?this.hideContainer():this.initContainer()},e.prototype.initContainer=function(){this.container.init(this.preferenceData),this.updateProgressBar()},e.prototype.hideContainer=function(){this.container.hideContainer()},e.prototype.updateProgressBar=function(){var e=this.preferenceData.completedCards;this.progress.showProgressCounter(e,this.getCardCount()),this.progress.showProgressBarCompletion(e)},e.prototype.getCardCount=function(){return Object.keys(this.preferenceData.cards).length},e.prototype.allCardsCompleted=function(){return this.getCardCount()===this.preferenceData.completedCards},e.prototype.updateCompletedCards=function(){for(var e,t=0,r=Object.keys(this.preferenceData.cards);t<r.length;t++){var o=r[t],a=DTO[o].checkComplete();a&&!this.preferenceData.cards[o].completed&&(bg.sendLpImprove("secondary_onboarding_card_complete",{cardname:o}),this.preferenceData.completedCards++),this.preferenceData.cards[o].completed|=a}},e}(),SecondaryOnboardingPreferences=function(){function e(){this.defaultSecondaryOnboardingPref={expanded:!0,completedCards:0,cards:{vaultTour:{completed:!1},addAPassword:{completed:!1},getMobileApp:{completed:!1},enableMFA:{completed:!1},saveAPayment:{completed:!1}}}}return e.prototype.save=function(e){LPProxy.setPreferences("SecondaryOnboarding",JSON.stringify(e))},e.prototype.retrieve=function(){var e=LPProxy.getPreference("SecondaryOnboarding");return e&&"null"!==e&&"undefined"!==e?JSON.parse(e):this.defaultSecondaryOnboardingPref},e}(),SecondaryOnboardingProgressBar=function(){function e(){}return e.prototype.showProgressCounter=function(e,t){$("#cardProgressCount").text("("+e+"/"+t+")")},e.prototype.showProgressBarCompletion=function(e){$(".cardCompletionPercentage").remove();var t=LPTools.createElement("span",{class:"cardCompletionPercentage"},"");$(t).css("width",20*e+"px"),$("#cardProgressBar").append(t)},e}();
//# sourceMappingURL=sourcemaps/SecondaryOnboarding/SecondaryOnboarding.js.map
