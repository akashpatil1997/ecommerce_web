var Tooltip=function(pos_left,pos_top,message){var container,INSTANCE=new VSModule,PADDING_TOP=13;return INSTANCE.remove=function(){container.addClass("conceal"),setTimeout(function(){container.remove()},500)},container=$('<div id="vs_tooltip" />').css({left:pos_left,top:pos_top+PADDING_TOP}).appendTo("body"),$("<p />").html(message).appendTo(container),$('<span class="tail" />').appendTo(container),Tooltip.current&&Tooltip.current.remove(),setTimeout(function(){Tooltip.current=INSTANCE,container.addClass("reveal")}),INSTANCE};Tooltip.galleries=null,VectorStock.LazyImage=function(container){var INSTANCE=new VSModule,windowframe=$(window);function checkVisibility(){if(!container.is(":hidden")){var frame_top=windowframe.scrollTop(),frame_bottom=frame_top+windowframe.height(),item_top=container.offset().top;item_top+container.height()>=frame_top-VectorStock.LazyImage.SCROLL_MARGIN&&item_top<=frame_bottom+VectorStock.LazyImage.SCROLL_MARGIN&&(loadImage(),windowframe.off("scroll resize",checkVisibility))}}function loadImage(){var icon=INSTANCE.anchor.loadingIcon(),img=new Image;img.onload=function(){$(img).appendTo(INSTANCE.anchor),setTimeout(function(){container.addClass("reveal"),icon.remove(),INSTANCE.dispatchEvent("loaded",[INSTANCE.id])},10)},img.onerror=function(){container.addClass("error"),icon.remove(),$('<span class="icon">!</span>').appendTo(INSTANCE.anchor),INSTANCE.dispatchEvent("error")},img.src=INSTANCE.src}return INSTANCE.anchor=$("a",container),INSTANCE.src=container.data("src"),INSTANCE.id=(INSTANCE.src.match(/(\d+)\.(jpe?g|png)$/)||[null,null])[1],VectorStock.LazyImage.observer_load?(container.bind("loadImage",loadImage),VectorStock.LazyImage.observer_load.observe(container[0])):(windowframe.on("scroll resize",checkVisibility),checkVisibility()),INSTANCE},VectorStock.LazyImage.SCROLL_MARGIN=500,window.IntersectionObserver&&(VectorStock.LazyImage.observer_load=new IntersectionObserver(function(entries,observer){entries.forEach(function(entry){entry.isIntersecting&&($(entry.target).trigger("loadImage"),observer.unobserve(entry.target))})},{root:null,rootMargin:VectorStock.LazyImage.SCROLL_MARGIN+"px",threshold:0}));var VectorDropdown=function(container){var display,display_label,select,options,INSTANCE=new VSModule;function onChange(){var opt_selected=$("option:selected",select),value=(opt_selected.closest("optgroup"),select.val()),url=opt_selected.data("url"),label="<strong>"+opt_selected.data("label")+"</strong>";opt_selected.data("details")&&(label+=" ("+opt_selected.data("details")+")"),display_label.html(label),container.attr("data-value",value),INSTANCE.value=value,INSTANCE.url=url,INSTANCE.dispatchEvent("change",[value,url])}return INSTANCE.value=null,INSTANCE.url=null,INSTANCE.setContents=function(file_urls){options.each(function(){var file_type=$(this).val();file_urls[file_type]?$(this).attr("data-url",file_urls[file_type]):$(this).remove()})},display=$("> .display",container),display_label=$(".label",display),select=$("> .select select",container),options=$("option",select),INSTANCE.value=select.val(),INSTANCE.url=$("option:selected",select).data("url"),select.on("change",onChange),INSTANCE},VectorOptions=function(container,vector_details,account_details){var area_help,area_options,area_license,opts_license,area_payment_standard,area_payment_editorial,area_payment_expanded,opts_payment_standard,opts_payment_editorial,opts_payment_expanded,area_customization,opts_customization,area_download,help_download,but_download,but_download_icon,but_download_label,area_download_options,dd_download_file,but_download_file,but_sync_dropbox,but_sync_googledrive,opt_customization,but_customization,INSTANCE=new VSModule;INSTANCE.license=null,INSTANCE.payment=null,INSTANCE.cost=null,INSTANCE.customization=null,INSTANCE.filetype=null;var area_payment={},opts_payment={};area_options=$(".options",container),area_help=$(".option h6 a",area_options),area_license=$('.option[data-type="license"]',area_options),opts_license=new VectorStock.FieldRadioboxes($(".radgroup label",area_license)),area_payment_standard=$('.option[data-type="payment"][data-license="standard"]',area_options),area_payment_editorial=$('.option[data-type="payment"][data-license="editorial"]',area_options),area_payment_expanded=$('.option[data-type="payment"][data-license="expanded"]',area_options),area_payment_standard.length&&(opts_payment_standard=new VectorStock.FieldRadioboxes($('.radgroup[data-license="standard"] label',area_payment_standard))),area_payment_editorial.length&&(opts_payment_editorial=new VectorStock.FieldRadioboxes($('.radgroup[data-license="editorial"] label',area_payment_editorial))),area_payment_expanded.length&&(opts_payment_expanded=new VectorStock.FieldRadioboxes($('.radgroup[data-license="expanded"] label',area_payment_expanded))),(area_customization=$('.option[data-type="customization"]',area_options)).length&&(opts_customization=new VectorStock.FieldCheckbox($("#f_payment_customization",area_customization))),area_download=$(".download",container),help_download=$("h6 .label",area_download),but_download=$('button[data-action="download"]',area_download),but_download_icon=$(".icon",but_download),but_download_label=$(".label",but_download),area_download_options=$(".download_options",container),dd_download_file=new VectorDropdown($('.optgroup[data-action="download"] .dropdown',area_download_options)),but_download_file=$('button[data-action="download_file"]',area_download_options),opt_customization=$('.optgroup[data-action="customization"]',area_download_options),but_customization=$("li button",opt_customization),but_sync_dropbox=$('.optgroup[data-action="sync"] li[data-type="dropbox"] button',area_download_options),but_sync_googledrive=$('.optgroup[data-action="sync"] li[data-type="googledrive"] button',area_download_options),$('.optgroup[data-action="edit"] li[data-type="request"] button',area_download_options),area_payment[VectorOptions.LICENSE_STANDARD]=area_payment_standard,area_payment[VectorOptions.LICENSE_EDITORIAL]=area_payment_editorial,area_payment[VectorOptions.LICENSE_EXPANDED]=area_payment_expanded,opts_payment[VectorOptions.LICENSE_STANDARD]=opts_payment_standard,opts_payment[VectorOptions.LICENSE_EDITORIAL]=opts_payment_editorial,opts_payment[VectorOptions.LICENSE_EXPANDED]=opts_payment_expanded;var but_download_label_copy,loaded_filesize=!1;function showTooltip(){if(!VectorStock.isMobile()){var scope=$(this).closest(".option, .download").addClass("hover"),help=$(".help",scope).show();function hideTooltip(){scope.removeClass("hover"),help.removeClass("reveal").hide(),$(this).off("mouseout",hideTooltip),$("body").off("click",hideTooltip)}setTimeout(function(){help.addClass("reveal")},25),$(this).on("mouseout",hideTooltip),scope.hasClass("option")&&$("body").on("click",hideTooltip)}}function onHoverFileSizes(){var FILETYPES=["ai","eps","pdf","jpg","png","cdr","zip"];if(!loaded_filesize){var scope=$(".help",area_download),loading=$(".loading",scope);loading.loadingIcon("small"),$.get("/api/filesizes/"+vector_details.id,function(response){if(response.success){for(var table=$("<table><thead><tr><th>File Type</th><th>Size</th></tr></thead><tbody></tbody></table>"),tbody=$("tbody",table),i=0;i<FILETYPES.length;i++)if(null!==response[FILETYPES[i]+"_bytes"]){var file_type=FILETYPES[i].toUpperCase(),file_size=response[FILETYPES[i]+"_bytes"],file_desc="";file_desc=1e6<file_size?(file_size/1e6).toFixed(2)+" <small>MB</small>":Math.round(file_size/1e3)+" <small>KB</small>",$('<tr class="'+FILETYPES[i]+'"><td colspan="2"><span class="row"><span class="dt">'+file_type+'</span><span class="dm"></span><span class="dd">'+file_desc+"</span></span></td></tr>").appendTo(tbody)}loading.remove(),table.appendTo(scope)}}),loaded_filesize=!0}showTooltip.call(this)}function onLicenseChange(){var license=opts_license.value;container.attr("data-license",license),area_license.attr("data-license",license);var label=(INSTANCE.license=license)===VectorOptions.LICENSE_FREE?VectorOptions.BUTTON_LABEL_FREE:VectorOptions.BUTTON_LABEL_DOWNLOAD;but_download_label.html(label),onPaymentChange(),INSTANCE.dispatchEvent("change_license",[INSTANCE.license])}function onPaymentChange(){var payment=opts_payment[INSTANCE.license]?opts_payment[INSTANCE.license].value:null;container.attr("data-payment",payment),opts_payment_expanded&&(INSTANCE.license==VectorOptions.LICENSE_STANDARD?opts_payment_expanded.set(opts_payment_standard.value,!0):INSTANCE.license==VectorOptions.LICENSE_EXPANDED&&opts_payment_standard.set(opts_payment_expanded.value,!0)),INSTANCE.payment=payment,INSTANCE.cost=opts_payment[INSTANCE.license]?opts_payment[INSTANCE.license].selected.data("cost"):null,INSTANCE.dispatchEvent("change_payment",[INSTANCE.payment])}function attemptDownload(){INSTANCE.dispatchEvent("download",[INSTANCE.license,INSTANCE.payment,INSTANCE.cost,INSTANCE.customization])}function onDownloadTypeChange(file_type,file_url){$(".label",but_download_file).html("Download "+file_type.toUpperCase()),INSTANCE.filetype=file_type}function attemptDownloadFile(){INSTANCE.dispatchEvent("download_file",[dd_download_file.url,INSTANCE.license])}function onClickSync(sync_type,sync_action){function getSyncPermission(){var query_str=$.param({url:window.location.protocol+"//"+window.location.host+window.location.pathname});VectorStock.goToURL("/api/"+sync_type+"/redirect?"+query_str)}if("connect"==sync_action)getSyncPermission();else{var button=$('.optgroup[data-action="sync"] li[data-type="'+sync_type+'"] button',area_download_options),listitem=button.parent(),label=$(".label",button),message=$(".message",listitem),loadicon=button.loadingIcon("small");message.length||(message=$('<div class="message" />').appendTo(listitem));var label_copy=label.text();listitem.removeClass("error").addClass("processing"),button.prop("disabled",!0),label.text("Connecting..."),message.removeClass("reveal"),$.get("/api/"+sync_type+"/save/"+vector_details.id).done(function(response){listitem.removeClass("processing"),button.prop("disabled",!1),loadicon.remove(),1==response.success?(listitem.addClass("saved"),button.prop("disabled",!0),label.text("Saved to "+label_copy+"!"),VectorStock.track("send","event","Download","Sync ("+sync_type+")","Vector: "+vector_details.id,0)):response.error==VectorOptions.SYNC_ERROR_TOKEN?getSyncPermission():(listitem.addClass("error"),label.text(label_copy),message.empty().append('<span class="label">Error - '+response.message+"</span>"),setTimeout(function(){message.addClass("reveal")},25),VectorStock.track("send","event","Error (User)","Sync ("+sync_type+")","Vector: "+vector_details.id,0))}).fail(function(event){loadicon.remove(),button.prop("disabled",!1),label.text(label_copy)})}}return INSTANCE.disableButton=function(label){but_download.prop("disabled",!0),but_download_icon.loadingIcon(),but_download_label_copy=but_download_label.html(),but_download_label.html(label)},INSTANCE.enableButton=function(){but_download.prop("disabled",!1),but_download_icon.empty(),but_download_label.html(but_download_label_copy)},INSTANCE.setPurchased=function(license,file_urls,customization_url){if(container.attr("data-status",license),license==VectorOptions.LICENSE_STANDARD&&opts_payment_expanded){for(var items_standard=opts_payment_standard.getItems(),items_expanded=opts_payment_expanded.getItems(),costs_standard={},i=items_standard.length;i--;){var payment=(input=$("input",items_standard[i])).val(),cost=input.data("cost");costs_standard[payment]=cost}for(var j=items_expanded.length;j--;){var input=$("input",items_expanded[j]),label=$(".value var",items_expanded[j]),cost_discounted=(payment=input.val(),(cost=input.data("cost"))-costs_standard[payment]);cost_discounted=Math.round(100*cost_discounted)/100,input.data("cost",cost_discounted),label.html(cost_discounted)}}dd_download_file.setContents(file_urls),customization_url&&(opt_customization.attr("data-status","pending"),opt_customization.attr("data-url",customization_url))},INSTANCE.triggerDownload=function(){area_download.addClass("downloading"),setTimeout(function(){area_download.removeClass("downloading")},850)},INSTANCE.license=opts_license.value,INSTANCE.payment=opts_payment[INSTANCE.license]?opts_payment[INSTANCE.license].value:null,INSTANCE.cost=opts_payment[INSTANCE.license]?opts_payment[INSTANCE.license].selected.data("cost"):null,INSTANCE.customization=INSTANCE.payment==VectorOptions.PAYMENT_SINGLEIMAGE&&opts_customization&&opts_customization.checked?parseInt(opts_customization.input.data("cost"),10):null,INSTANCE.filetype=dd_download_file.value,container.attr("data-license")!==opts_license.value&&onLicenseChange(),area_help.on("mouseover",showTooltip),opts_license.on("change",onLicenseChange),opts_payment_standard&&opts_payment_standard.on("change",onPaymentChange),opts_payment_editorial&&opts_payment_editorial.on("change",onPaymentChange),opts_payment_expanded&&opts_payment_expanded.on("change",onPaymentChange),opts_customization&&opts_customization.on("change",function(){INSTANCE.customization=INSTANCE.payment==VectorOptions.PAYMENT_SINGLEIMAGE&&opts_customization.checked?parseInt(opts_customization.input.data("cost"),10):null}),help_download.on("mouseover",onHoverFileSizes),but_download.on("click",attemptDownload),dd_download_file.on("change",onDownloadTypeChange),but_customization.on("click",function(){var job_url=but_customization.attr("data-job-url");VectorStock.goToURL(job_url)}),but_download_file.on("click",attemptDownloadFile),but_sync_dropbox.on("click",function(){onClickSync(VectorOptions.SYNC_TYPE_DROPBOX,but_sync_dropbox.attr("data-action"))}),but_sync_googledrive.on("click",function(){onClickSync(VectorOptions.SYNC_TYPE_GOOGLEDRIVE,but_sync_googledrive.attr("data-action"))}),"saving"==but_sync_dropbox.attr("data-action")&&onClickSync(VectorOptions.SYNC_TYPE_DROPBOX,"save"),"saving"==but_sync_googledrive.attr("data-action")&&onClickSync(VectorOptions.SYNC_TYPE_GOOGLEDRIVE,"save"),INSTANCE};VectorOptions.LICENSE_FREE="free",VectorOptions.LICENSE_STANDARD="standard",VectorOptions.LICENSE_EDITORIAL="editorial",VectorOptions.LICENSE_EXPANDED="expanded",VectorOptions.PAYMENT_SINGLEIMAGE="single-image",VectorOptions.PAYMENT_CREDITS="credits",VectorOptions.PAYMENT_SUBSCRIPTION="subscription",VectorOptions.BUTTON_LABEL_FREE="Free Download",VectorOptions.BUTTON_LABEL_DOWNLOAD="Download Image",VectorOptions.SYNC_TYPE_DROPBOX="dropbox",VectorOptions.SYNC_TYPE_GOOGLEDRIVE="googledrive",VectorOptions.SYNC_ERROR_TOKEN="invalid_access_token";var VectorImage=function(container,vector_details,account_details){var icon,img,INSTANCE=new VSModule,img_high=$(".highres",container),img_low=$(".lowres",container),area_panels=$(".panels",container),but_pinterest=$(".pinterest button",area_panels),but_facebook=$(".facebook button",area_panels),but_twitter=$(".twitter button",area_panels),but_composite=$('.composite button[data-action="download"]',area_panels),img_path=vector_details.url.replace(/https?:\/\/[^\/]+/i,""),src_high=img_high.data("src");function onClickImage(event){area_panels.length&&event.target!==area_panels[0]||INSTANCE.dispatchEvent("click")}function popupWindow(url,name,width,height){name=name||"",width=width||400,height=height||300;var left,top,win_left=window.screenX||window.screenLeft,win_top=window.screenY||window.screenTop,win_width=window.outerWidth||document.documentElement.clientWidth,win_height=window.outerHeight||document.documentElement.clientHeight-22;left=Math.round(win_left+(win_width-width)/2),top=Math.round(win_top+(win_height-height)/2.5);var win_popup=window.open(url,name,"scrollbars=no,menubar=no,resizable=yes,toolbar=no,location=no,status=yes,left="+left+",top="+top+",width="+width+",height="+height);return win_popup&&win_popup.focus&&win_popup.focus(),win_popup}function shareOnPinterest(){var url_share=vector_details.url+"?utm_source=Pinterest";url_share+="&utm_medium=VectorStock Social Share",url_share+="&utm_campaign=Vector Social Share",url_share+="&utm_content="+vector_details.title;var url_pinterest="https://www.pinterest.com/pin/create/button/?";url_pinterest+="media="+encodeURIComponent(vector_details.media),url_pinterest+="&description="+encodeURIComponent(vector_details.description),url_pinterest+="&url="+encodeURIComponent(url_share),VectorStock.track("send","event","Share","Pinterest",img_path),popupWindow(url_pinterest,"SharePinterest",766,703)}function shareOnFacebook(){var url_share=vector_details.url+"?utm_source=Facebook";url_share+="&utm_medium=VectorStock Social Share",url_share+="&utm_campaign=Vector Social Share",url_share+="&utm_content="+vector_details.title;var url_facebook="https://www.facebook.com/dialog/share?";url_facebook+="app_id=241100862642313",url_facebook+="&display=popup",url_facebook+="&href="+encodeURIComponent(vector_details.url),url_facebook+="&redirect_uri="+encodeURIComponent(url_share),VectorStock.track("send","event","Share","Facebook",img_path),popupWindow(url_facebook,"ShareFacebook",555,469)}function shareOnTwitter(){var url_twitter="https://twitter.com/intent/tweet?";url_twitter+="text="+encodeURIComponent(vector_details.title),url_twitter+="&url="+encodeURIComponent(vector_details.url),VectorStock.track("send","event","Share","Twitter",img_path),popupWindow(url_twitter,"ShareTwitter",550,300)}function downloadComposite(){INSTANCE.dispatchEvent("download_composite");var params=src_high.match(/\/i\/([a-z0-9\-]+)\/([0-9]+)\/([0-9]+)\/([a-z0-9\-]+)-([0-9]+)\.jpg/i);window.location=VectorStock.getCDNHost(params[5])+"/images/"+params[1]+"/"+params[2]+"/"+params[3]+"/"+params[5]+".jpg?download=1"}return icon=container.loadingIcon("large"),(img=new Image).onload=function(event){$(img).appendTo(img_high),setTimeout(function(){container.addClass("reveal"),icon.remove()},10)},img.onerror=function(event){$("<div><p>High-res image couldn’t load</p></div>").appendTo(img_low),icon.remove(),setTimeout(function(){container.addClass("error")},10)},img.src=src_high,container.on("click",onClickImage),but_pinterest.on("click",shareOnPinterest),but_facebook.on("click",shareOnFacebook),but_twitter.on("click",shareOnTwitter),but_composite.on("click",downloadComposite),INSTANCE},VectorAttribution=function(vector_id,vector_url,vector_title){var url_field,url_field_input,url_field_button,copy_action,INSTANCE=new VSModule;function selectURL(){setTimeout(function(){url_field_input.select()},10)}function highlightInput(){url_field.addClass("highlight")}function unhighlightInput(){url_field.removeClass("highlight")}function copyURLToClipboard(){try{if(url_field_input.select(),document.execCommand("copy")){var offset=url_field_button.offset(),pos_left=offset.left+url_field_button.width()/2,pos_top=offset.top+url_field_button.height(),tooltip=new Tooltip(pos_left,pos_top,"Copied!");setTimeout(function(){tooltip.remove()},750)}else copyURLToClipboardBackup()}catch(err){copyURLToClipboardBackup()}}function copyURLToClipboardBackup(){trackCopyAction(),window.prompt("Copy failed - try copying here instead:",url_field_input.val())}function trackCopyAction(){copy_action||(VectorStock.track("send","event","Action","Copy Vector URL","#"+vector_id+" "+vector_title,0),copy_action=!0)}return function(){var container,attr_url,url_steps;container=$('<section id="license_attribution" />').insertAfter("body > header"),attr_url=$('<div class="attr_url" />').appendTo(container),url_steps=$("<div />").appendTo(attr_url),$('<span class="icon"></span>').appendTo(url_steps),$("<h6>Want FREE Standard + Expanded licenses usage?</h6>").appendTo(url_steps),$('<p>Just copy-paste this link into your page to <a href="/faq/members/free-vector-attribution">credit the&nbsp;author</a>:</p>').appendTo(url_steps),url_field=$("<fieldset />").appendTo(attr_url),url_field_input=$('<input type="text" value="'+("<a href=&quot;"+vector_url+"&quot; target=&quot;_blank&quot;>"+vector_title+" at VectorStock</a>")+'">').appendTo(url_field),url_field_button=$('<button type="button">Copy</button>').appendTo(url_field),url_field_input.on("copy",trackCopyAction);try{document.queryCommandSupported("copy")&&(url_field.addClass("copy_support"),url_field_input.on("focus",selectURL),url_field_button.on("mousedown",highlightInput).on("mouseup",unhighlightInput).on("click",copyURLToClipboard))}catch(e){}var full_height=container.outerHeight();container.css({height:10}),setTimeout(function(){container.addClass("animating").css({height:full_height}),setTimeout(function(){container.removeClass("animating").css({height:""})},1100)},20),container.offset().top<$(window).scrollTop()&&VectorStock.scrollTo(container,250,"easeOutCubic")}(),INSTANCE};$(function(){var attribution,IMAGE_MIN_HEIGHT=500,IMAGE_MAX_SIDE=1e3,asset=$("#vs-asset"),asset_aside=$(".aside",asset),asset_aside_figure=$("figure",asset_aside),asset_form=$("form",asset),asset_image=$(".image",asset),asset_figure=$("figure",asset_image),asset_details=$(".details",asset),asset_options=$(".options",asset_details),but_like=$('button[data-action="like"]',asset_options),but_cart=$('button[data-action="cart"]',asset_options),but_gallery=$('button[data-action="gallery"]',asset_options),related=$("#vs-related"),repair_btn=$("#repair-vector"),asset_options_total=asset_options.data("total"),vector={id:parseInt($('input[id="vector_id"]',asset_form).val()),title:$('input[id="vector_title"]',asset_form).val(),description:$('input[id="vector_description"]',asset_form).val(),url:$('input[id="vector_url"]',asset_form).val(),media:$('input[id="vector_media"]',asset_form).val(),ratio:parseFloat($('input[id="vector_ratio"]',asset_form).val()),license_status:$('input[id="vector_license_status"]',asset_form).val(),artist:$('input[id="artist_name"]',asset_form).val()},account={is_artist:"1"==asset_form.data("artist"),is_owner:"1"==asset_form.data("owner"),logged_in:"1"==$('input[id="account_user"]',asset_form).val(),credits:parseInt($('input[id="account_credits"]',asset_form).val())||0,downloads:parseInt($('input[id="account_downloads"]',asset_form).val())||0};account.downloads=""!=account.downloads&&parseInt(account.downloads);var search_referer=EventTracker.retrieve("vs_search_referer");if(search_referer)try{search_referer=JSON.parse(search_referer)}catch(e){search_referer={keywords:search_referer}}var vector_options=new VectorOptions(asset_form,vector,account),image_desktop=new VectorImage(asset_figure,vector,account),image_mobile=new VectorImage(asset_aside_figure,vector,account),area_min_height=parseInt($("#nav_sidebar").css("marginTop"))+$("#nav_sidebar").height()+19,image_min_width=$(".meta",asset_details).width()+20+(account.logged_in?251:125);function trackEvent(event_type,event_delay){var event={action:event_type,image:vector.id,search:""};search_referer&&(search_referer.keywords&&(event.search=search_referer.keywords),search_referer.scope!==SearchResults.SCOPE_ALL&&(event.search_scope=search_referer.scope),search_referer.artists&&(event.search_artist=search_referer.artists),search_referer.categories&&(event.search_category=search_referer.categories)),EventTracker.track(EventTrackerLogger.ID_SEARCH,event,event_delay)}function setImageLimits(){var browser_width=window.innerWidth,browser_height=window.innerHeight-112,min_height="",max_width="";815<=browser_width&&(min_height=Math.max(area_min_height,asset_aside.height()+20),max_width=Math.max(IMAGE_MIN_HEIGHT,browser_height)/vector.ratio,max_width=Math.min(1e3/vector.ratio,max_width),max_width=Math.min(IMAGE_MAX_SIDE,max_width),max_width=Math.max(image_min_width,max_width)),asset.css({minHeight:min_height,maxWidth:max_width}),800<browser_width&&asset_options.width()<90*asset_options_total?asset_options.hasClass("mini")||asset_options.addClass("mini"):asset_options.hasClass("mini")&&asset_options.removeClass("mini")}function launchPaymentBox(license,cost_license,cost_customization){var pbox;if(cost_customization){var cost_total=cost_license+cost_customization;pbox=new PaymentBox({id:vector.id,title:vector.title,license:license,cost:cost_license},{cost:cost_customization},cost_total,!1,vector_options.filetype)}else pbox=new PaymentBox({id:vector.id,title:vector.title,license:license,cost:cost_license},cost_license,!1,vector_options.filetype);pbox.on("purchase",onSingleImagePurchase),pbox.on("view_options",function(){VectorStock.scrollTo($(".download_options"))})}function downloadAttempt(license){vector_options.disableButton("Downloading…");var url_download="/api/vector/download/"+vector.id;$.get(url_download).done(function(response){if(1==response.success)VectorStock.track("send","event","Download",license.toTitleCase()+" license","#"+vector.id,0),trackEvent("download_success"),downloadVector(response.url,license);else{var message="Image: #"+vector.id+", Message: ";response.message?message+=response.message:message+="No message set: "+JSON.stringify(response),VectorStock.track("send","event","Error (User)","Download",message),trackEvent("download_attempt"),alert("Sorry, download failed - "+(response.message||"Unknown server error, please contact support"))}vector_options.enableButton()}).fail(function(event){VectorStock.track("send","event","Error (JS)","CustomError: Download API Call Failed","Image: #"+vector.id+", "+JSON.stringify(event)),vector_options.enableButton(),trackEvent("download_attempt")})}function purchaseAttempt(license,payment_type,credit_cost){vector_options.disableButton("Processing…");var url_download="/api/"+payment_type+"/purchase/"+vector.id;payment_type!=VectorOptions.PAYMENT_CREDITS&&payment_type!=VectorOptions.PAYMENT_SUBSCRIPTION||(url_download+=license?"/"+license:""),$.get(url_download).done(function(response){1==response.success?function(license,payment_type,credit_cost,response){license=license||VectorOptions.LICENSE_STANDARD,vector.license_status=license,but_cart.trigger("unselect"),asset_options.attr("data-cart","off"),VectorStock.removeFromCart(vector.id),VectorStock.userData.addPurchase(vector.id),$('input[id="vector_license_status"]',asset_form).val(license),vector_options.setPurchased(license,response.file_urls),void 0!==response.downloads&&VectorStock.setTally("subscription",response.downloads);void 0!==response.credits&&VectorStock.setTally("credits",response.credits);var event_action=license.toTitleCase()+" license",event_label="#"+vector.id+" ",event_value=credit_cost||1;payment_type==VectorOptions.PAYMENT_SUBSCRIPTION?event_label+="(1 sub download)":event_label+="("+credit_cost+" credit"+(1==credit_cost?"":"s")+")";VectorStock.track("send","event","Download",event_action,event_label,event_value),trackEvent("purchase"),trackEvent("download_success");var url_download=response.url;"zip"!==vector_options.filetype&&response.file_urls[vector_options.filetype]&&(url_download=response.file_urls[vector_options.filetype]);downloadVector(url_download,license)}(license,payment_type,credit_cost,response):(VectorStock.track("send","event","Error (User)","Download","Image: #"+vector.id+", Message: "+(response.message||"[No message set]")),alert("Sorry, purchase failed - "+(response.message||"Unknown server error, please contact support"))),vector_options.enableButton()}).fail(function(event){vector_options.enableButton(),trackEvent("download_attempt")})}function downloadVector(url_download,license){var can_download_zip=!VectorStock.isMobile();license!=VectorOptions.LICENSE_FREE||attribution?can_download_zip&&VectorStock.goToURL(url_download):(attribution=new VectorAttribution(vector.id,vector.url,vector.title),can_download_zip&&setTimeout(function(){VectorStock.goToURL(url_download)},1e3))}function onSingleImagePurchase(transaction_response,image_license,transaction_cost){image_license=image_license||VectorOptions.LICENSE_STANDARD,vector.license_status=image_license,but_cart.trigger("unselect"),asset_options.attr("data-cart","off"),VectorStock.removeFromCart(vector.id),VectorStock.userData.addPurchase(vector.id),$('input[id="vector_license_status"]',asset_form).val(image_license),vector_options.setPurchased(image_license,transaction_response.file_urls,transaction_response.job_url);var event_action=image_license.toTitleCase()+" license",event_label="#"+vector.id+" (Single-Image)",event_value=transaction_cost;VectorStock.track("send","event","Download",event_action,event_label,event_value),trackEvent("purchase"),trackEvent("download_success"),vector_options.triggerDownload()}function onClickImage(){vector.license_status==vector_options.license?downloadAttempt(vector_options.license):account.logged_in?vector_options.license==VectorOptions.LICENSE_FREE?downloadAttempt(vector_options.license):account.credits||account.downloads||(vector_options.payment==VectorOptions.PAYMENT_SINGLEIMAGE?launchPaymentBox(vector_options.license,vector_options.cost,vector_options.customization):VectorStock.goToURL("/purchase?id="+vector.id)):(vector_options.license==VectorOptions.LICENSE_FREE?VectorStock.goToURL("/signup"):vector_options.payment==VectorOptions.PAYMENT_SINGLEIMAGE?launchPaymentBox(vector_options.license,vector_options.cost,vector_options.customization):VectorStock.goToURL("/signup"),trackEvent("download_attempt"))}VectorStock.syncCartButton=function(){but_cart&&(VectorStock.userData.isInCart(vector.id)?but_cart.trigger("select"):but_cart.trigger("unselect"))},$(window).on("resize focus",setImageLimits),setImageLimits(),image_desktop.on("click",onClickImage),image_desktop.on("download_composite",function(){trackEvent("composite")}),image_mobile.on("click",onClickImage),repair_btn.one("click",function(){var that=$(this),vector_id=that.data("id");that.text("Repairing"),$.post("/api/vector/repair/"+vector_id,function(json){json.success?that.text("Repaired"):that.text("Failed"),that.addClass("repaired")})}),$('button[data-action="follow"]',asset_details).each(function(){var tooltip,button=$(this),label=$(".label",button);button.on("mouseenter",function(){if(!button.hasClass("selected")){var left=button.offset().left+button.outerWidth()/2,top=button.offset().top+button.outerHeight()+5,message=button.attr("title");tooltip=new Tooltip(left,top,message),button.attr("title",""),button.one("mouseleave",function(){tooltip&&tooltip.remove(),button.attr("title",message)})}}),button.on("click",function(){var is_following=button.hasClass("selected"),label_text=is_following?"Follow":"Following";button.toggleClass("selected"),label.text(label_text),tooltip&&tooltip.remove(),is_following?VectorStock.removeFromFollowing(vector.artist):(VectorStock.addToFollowing(vector.artist,function(response){response&&response.success||(button.removeClass("selected"),label.text("Follow")),response&&response.message&&"max_following_reached"==response.message&&alert("Could not follow artist - limit reached"+(response.following?" ("+response.following+")":""))}),trackEvent("follow"))})}),but_like.each(function(){var counter=but_like.data("count")||0,is_liked=but_like.hasClass("selected"),like_tracked=!1,label=$(".tally",but_like);function onActionComplete(response){response.likes_image&&response.likes_image!==counter&&setCounter(response.likes_image),response.likes_account&&VectorStock.setTally("likes",response.likes_account)}function setCounter(new_counter){new_counter=Math.max(0,new_counter),label.text(0==new_counter?"":"("+new_counter+")"),counter=new_counter}but_like.on("select",function(){setCounter(counter+1),but_like.addClass("selected"),VectorStock.likeImage(vector.id,onActionComplete),is_liked=!0}),but_like.on("unselect",function(){setCounter(counter-1),but_like.removeClass("selected"),VectorStock.unlikeImage(vector.id,onActionComplete),is_liked=!1}),but_like.on("click",function(){VectorStock.isLoggedIn()?is_liked?but_like.trigger("unselect"):but_like.trigger("select"):VectorStock.goToURL("/signup"),is_liked&&!like_tracked&&(trackEvent("like"),like_tracked=!0)})}),but_cart.each(function(){var in_cart=but_cart.hasClass("selected");but_cart.on("select",function(){but_cart.addClass("selected"),in_cart=!0}),but_cart.on("unselect",function(){but_cart.removeClass("selected"),in_cart=!1}),but_cart.on("click",function(){in_cart?(but_cart.trigger("unselect"),VectorStock.removeFromCart(vector.id)):(but_cart.trigger("select"),VectorStock.addToCart(vector.id,vector_options.license,function(response){response.success||(but_cart.trigger("unselect"),response.message&&"cart_full"==response.message&&alert("Could not add image #"+vector.id+" to Cart - limit reached"+(response.cart_total?" ("+response.cart_total+")":"")))}),trackEvent("cart"))})}),but_gallery.on("click",function(){new GalleryBox(vector.id,vector.title,vector.artist);trackEvent("gallery")}),vector_options.on("change_license",function(license){var but_cart_disabled=!1;vector.license_status!=license&&vector.license_status!=VectorOptions.LICENSE_EXPANDED||(but_cart_disabled=!0),but_cart.prop("disabled",but_cart_disabled)}),vector_options.on("download",function(license,payment,cost,customization){account.is_owner||vector.license_status==license||vector.license_status==VectorOptions.LICENSE_EXPANDED?downloadAttempt(license):license==VectorOptions.LICENSE_FREE?account.logged_in?downloadAttempt(license):(new SignupBox,trackEvent("download_attempt")):payment==VectorOptions.PAYMENT_SINGLEIMAGE?(launchPaymentBox(license,cost,customization),trackEvent("download_attempt")):account.logged_in?payment==VectorOptions.PAYMENT_SUBSCRIPTION?0<account.downloads?purchaseAttempt(license,VectorOptions.PAYMENT_SUBSCRIPTION):(trackEvent("download_attempt",!0),VectorStock.goToURL("/purchase/subscription?id="+vector.id)):payment==VectorOptions.PAYMENT_CREDITS&&(account.credits>=cost?purchaseAttempt(license,VectorOptions.PAYMENT_CREDITS,cost):(trackEvent("download_attempt",!0),VectorStock.goToURL("/purchase/credits?id="+vector.id+"&license="+license))):(new SignupBox,trackEvent("download_attempt"))}),vector_options.on("download_file",function(url_download,license){license!=VectorOptions.LICENSE_FREE||""!=vector.license_status||attribution?VectorStock.goToURL(url_download):(attribution=new VectorAttribution(vector.id,vector.url,vector.title),setTimeout(function(){VectorStock.goToURL(url_download)},1e3))}),$(".filetypes li",asset_aside).on("mouseover",function(){var item=$(this),abbr=$("abbr",item),left=item.offset().left+item.outerWidth()/2,top=item.offset().top+item.outerHeight()+3,message=abbr.attr("title"),tooltip=new Tooltip(left,top,message);abbr.attr("title",""),item.one("mouseleave",function(){tooltip.remove(),abbr.attr("title",message)})}),$(".gallery li:not(.more)",related).each(function(){new VectorStock.LazyImage($(this))}),VectorStock.isMobile()||$(".gallery.small li:not(.more)").each(function(){var link=$("a",this),vector_id=$(this).data("id"),vector_title=$(this).data("title");if(vector_id)new PreviewLink(link,vector_id,vector_title)});var vector_upgrade_price=$('input[id="vector_upgrade_price"]');if(vector_upgrade_price.length){var cost=parseFloat(vector_upgrade_price.val());launchPaymentBox(VectorOptions.LICENSE_EXPANDED,cost)}trackEvent("view")});