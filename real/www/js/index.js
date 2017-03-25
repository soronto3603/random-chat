/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
 //카메라 관련모듈.
 /*
var win = function (r){
  iframe.contentWindow.postMessage(r.response,"*");
}
var fail = function (error) {
  navigator.notification.alert("fail",'debug','done');
}
function cameraSuccess(imguri){
  navigator.notification.alert(imguri,'debug','done');
  var options = new FileUploadOptions();
  options.fileKey = "upload";
  options.fileName = imguri.substr(imguri.lastIndexOf('/') + 1);
  options.mimeType = "image/jpeg";
  var ft = new FileTransfer();
  ft.upload(imguri, encodeURI("http://total0808.cafe24.com/random_chat/app/upload.php"), win, fail, options);
}
 function cameraError(error){
 	alert(error);
 }*/

var imguri2;

 var win = function (r) {
    var url=r.response;
    var options = new FileUploadOptions();
    options.fileKey = "upload";
    options.fileName=imguri2.substr(imguri2.lastIndexOf('/') + 1);
    options.mimeType = "image/jpeg";
    var ft = new FileTransfer();
    ft.upload(imguri2, encodeURI("http://total0808.cafe24.com/random_chat/app/upload.php"), win2, fail, options);
}
var win2 = function (r) {
    var data=new Object();

    data.title="image_url";
    data.url=r.response;

    var jsonData=JSON.stringify(data);
    //navigator.notification.alert(jsonData,'debug','done');
    document.getElementById('iframe').contentWindow.postMessage(jsonData,"*");
}
var fail = function (error) {
    alert("An error has occurred: Code = " + error.code);
    alert("upload error source " + error.source);
    alert("upload error target " + error.target);
}
function cameraSuccess(imguri){
    imguri2=imguri.replace('.jpg','_thumb.jpg');
    var options = new FileUploadOptions();
    options.fileKey = "upload";
    options.fileName = imguri.substr(imguri.lastIndexOf('/') + 1);
    options.mimeType = "image/jpeg";
    var ft = new FileTransfer();
    ft.upload(imguri, encodeURI("http://total0808.cafe24.com/random_chat/app/upload.php"), win, fail, options);
}
function cameraError(error){
  alert(error);
}
 //카메라 관련모듈.
 //SIM 관련 모듈
var phone_number;
function appStart(result){
  //navigator.notification.alert("http://total0808.cafe24.com/random_chat/app/wait.php?phone_number="+result.phoneNumber,'error','error');
  phone_number=result.phoneNumber
  document.getElementById('iframe').src="http://total0808.cafe24.com/random_chat/app/wait.php?phone_number="+result.phoneNumber;

}
function successCallback(result) {
  if(result==true){
    //hadRead response
    //navigator.notification.alert("true123123",'error','error');
  }else if(result=="OK"){
    //request response
    window.plugins.sim.getSimInfo(appStart, errorCallback);

  }
}
function errorCallback(error) {
  //navigator.notification.alert(error,'error','error');
  exitApp();
}
// Android only: check permission
function hasReadPermission() {
  window.plugins.sim.hasReadPermission(successCallback, errorCallback);
}

// Android only: request permission
function requestReadPermission() {
  window.plugins.sim.requestReadPermission(successCallback, errorCallback);
}
//
/*var data=new Object();

data.title="phone_number_message";
data.phone_number=result.phoneNumber;

var jsonData=JSON.stringify(data);
iframe.contentWindow.postMessage(jsonData,"*");*/
function exitApp(){
  var data=new Object();

  data.title="exit_message";

  var jsonData=JSON.stringify(data);
  iframe.contentWindow.postMessage(jsonData,"*");
}
function onBackKeyDown(){
  //alert("backkeydown is_ad:"+is_ad);
  if(is_ad==0){
    exitApp();
  }else{
    window.history.back();
    is_ad=0;
  }
}
function yourCallbackFunction(){
  var data=new Object();

  data.title="margin_message";

  var jsonData=JSON.stringify(data);
  iframe.contentWindow.postMessage(jsonData,"*");
}

var is_ad=0;
function init_admob(){
  admob.interstitial.config({
   id: 'ca-app-pub-1542264535834690/4129370764',
 });
  admob.interstitial.prepare();
}
var app = {
  // Application Constructor
  initialize: function() {
    document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    
  },
  onDeviceReady: function() {
    init_admob();
    document.addEventListener('backbutton',onBackKeyDown,false);
    document.addEventListener("resume", yourCallbackFunction, false);
    window.addEventListener("native.keyboardhide", this.onKeyboardHide);
    console.log(navigator.notification);
    requestReadPermission();
    admob.interstitial.show();
    //document.getElementById('iframe').src="http://me2.do/5eqIYyYh";
    window.onmessage=function(e){
      //navigator.notification.alert(e.data,{},'debug','done');
      if(e.data=="camera_message"){
        var options={
    				quality: 50,
			        destinationType: Camera.DestinationType.FILE_URI,
			        // In this app, dynamically set the picture source, Camera or photo gallery
			        sourceType: Camera.PictureSourceType.CAMERA,
			        encodingType: Camera.EncodingType.JPEG,
			        mediaType: Camera.MediaType.PICTURE,
			        allowEdit: true,
			        correctOrientation: true  //Corrects Android orientation quirks
    			};
    			navigator.camera.getPicture(cameraSuccess,cameraError,options);

      }
      else if(e.data=="picture_message"){
        var options={
    				quality: 50,
			        destinationType: Camera.DestinationType.FILE_URI,
			        // In this app, dynamically set the picture source, Camera or photo gallery
			        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
			        encodingType: Camera.EncodingType.JPEG,
			        mediaType: Camera.MediaType.PICTURE,
			        allowEdit: true,
			        correctOrientation: true  //Corrects Android orientation quirks
    			};
    			navigator.camera.getPicture(cameraSuccess,cameraError,options);
      }
      else if(e.data=="exit_message"){
        navigator.app.exitApp();
      }else{
        
        window.plugins.webintent.startActivity({
            action: window.plugins.webintent.ACTION_VIEW,
            url: e.data},
            function() {},
            function() {alert('Failed to open URL via Android Intent');}
        );
        //is_ad=1;
        //document.getElementById('iframe').src=e.data;
      }
    }
  },
  onKeyboardHide:function(e){
  }
};

app.initialize();
