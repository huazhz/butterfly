KISSY.add("gallery/form/1.3/uploader/themes/singleImageUploader/index",function(g,i,j){function h(a){h.superclass.constructor.call(this,a)}var e=i.all;g.extend(h,j,{afterUploaderRender:function(){this._renderFiledrop();var a=this.get("queue");a.on("add",this._addFileHandler,this);this.get("uploader").on("select",function(){a.get("files").length&&a.clear()})},_addFileHandler:function(a){var b=this,c=a.file,a=c.target,d=e(".J_Del_"+c.id);a.on("mouseover mouseout",function(a){"mouseover"==a.type?(d.show(),
b._setDisplayMsg(!0,c.id)):(d.hide(),b._setDisplayMsg(!1,c.id))});d.data("data-file",c);d.on("click",b._delHandler,b)},_getStatusWrapper:function(a){return a&&a.all(".J_FileStatus")||e("")},_renderFiledrop:function(){var a=this.get("button").get("target"),b=this.get("oPlugin").filedrop;if(!b)return!1;a=new b({target:a,uploader:this.get("uploader"),tpl:{supportDrop:'<div class="drop-wrapper"></div>'}});a.render();return a},_waitingHandler:function(a){if("ajax"==a.uploader.get("type")){var b=this.get("oPlugin").preview,
a=a.file,c=e(".J_Pic_"+a.id);c.show();(new b).show(a.data,c)}},_startHandler:function(a){var b=this,c=a.uploader,d=a.index,h=b.get("queue"),c=c.get("type"),i=a.file,a=e(".J_ProgressBar_"+a.id);if("ajax"==c||"flash"==c){var c=b.get("oPlugin").progressBar,f;c&&(f=new c(a),f.on("change",function(a){100==a.value&&g.later(function(){f.hide();b._setDisplayMsg(!1,i.id)},500)}),f.render(),b.set("progressBar",f));h.updateFile(d,{progressBar:f})}},_progressHandler:function(a){var b=a.file,a=Math.ceil(100*(a.loaded/
a.total)),b=b.progressBar;if(!b)return!1;b.set("value",a)},_successHandler:function(a){var b=a.file,c=b.id,d=b.result,b=b.progressBar;d&&this._changeImageSrc(a.id,d);if(!b)return e(".J_ProgressBar_"+c).hide(),this._setDisplayMsg(!1,c),!1;b.set("value",100);e(".J_Mask_"+c).hide()},_errorHandler:function(a){var b=a.msg,a=a.id;e(".J_ErrorMsg_"+a).html(b);this._setDisplayMsg(!0,a);g.log(b)},_setDisplayMsg:function(a,b){if(!b)return!1;var c=e(".J_Mask_"+b),d=c.parent();if(d&&d.hasClass("error"))return!1;
c[a&&"show"||"hide"]()},_delHandler:function(a){var b=this.get("uploader"),c=this.get("queue"),a=e(a.target).data("data-file"),c=c.getFileIndex(a.id),a=a.status;("start"==a||"progress"==a)&&b.cancel(c)},getFilesLen:function(a){a||(a="success");return this.get("queue").getFiles(a).length},_changeImageSrc:function(a,b){var c=b.data,d=e(".J_Pic_"+a);if(!g.isObject(c))return!1;c=c.url;if(""==d.attr("src")||g.UA.safari)d.show(),d.attr("src",c)}},{ATTRS:{name:{value:"singleImageUploader"},cssUrl:{value:"gallery/form/1.4/uploader/themes/singleImageUploader/style.css"},
fileTpl:{value:'<div class="uploader-img-wrapper"><div class="uploader-img"><a href="javascript:void(0);"><img class="J_Pic_{id}" src="" /></a></div><div class=" J_Mask_{id} pic-mask"></div><div class="status-wrapper J_FileStatus"><div class="status waiting-status"><p>\u7b49\u5f85\u4e0a\u4f20\uff0c\u8bf7\u7a0d\u5019</p></div><div class="status start-status progress-status success-status"><div class="J_ProgressBar_{id}"><s class="loading-icon"></s>\u4e0a\u4f20\u4e2d...</div></div><div class="status error-status"><p class="J_ErrorMsg_{id}">\u4e0a\u4f20\u5931\u8d25\uff0c\u8bf7\u91cd\u8bd5\uff01</p></div></div><a class="J_Del_{id} del-pic" href="#">\u5220\u9664</a></div>'},
plugins:{value:["progressBar","filedrop","preview"]}}});return h},{requires:["node","../../theme"]});