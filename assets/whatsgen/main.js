/*
 *   Copyright Hendurhance (c) 2019 
 *   All rights reserved.
 */

var yourTextarea = document.getElementById("_whatsgen_message");
var insertAtCursor = function(myField, myValueBefore, myValueAfter) {

    if (document.selection) {

        myField.focus();
        document.selection.createRange().text = myValueBefore + document.selection.createRange().text + myValueAfter;


    } else if (myField.selectionStart || myField.selectionStart == '0') {

        var startPos = myField.selectionStart;
        var endPos = myField.selectionEnd;
        myField.value = myField.value.substring(0, startPos)+ myValueBefore+ myField.value.substring(startPos, endPos)+ myValueAfter+ myField.value.substring(endPos, myField.value.length);

    } 
}
$("#_whatsgen_message").keydown(function(e) {
    if(e.ctrlKey) {
        if(e.keyCode == 66) {
            insertAtCursor(yourTextarea, '*', '*');
            return false;
        }
        if(e.keyCode == 73) {
            insertAtCursor(yourTextarea, '_', '_');
            return false;
        }
        if(e.keyCode == 83) {
            insertAtCursor(yourTextarea, '~', '~');
            return false;
        }
    }
});

$(".inputbar .item").click(function() {
    if($(this).data("tool") == 'bold') {
        insertAtCursor(yourTextarea, '*', '*');                
    }
    if($(this).data("tool") == 'italic') {
        insertAtCursor(yourTextarea, '_', '_');                
    }
    if($(this).data("tool") == 'striketrhough') {
        insertAtCursor(yourTextarea, '~', '~');                
    }
    $("#_whatsgen_message").keyup();
});
function copyToClipboard(element) {
	var $temp = $("<input>");
	$("body").append($temp);
	$temp.val($(element).val()).select();
	document.execCommand("copy");
	$temp.remove();
	alert("Copied");
}
function goToByScroll(id){
	document.getElementById(id).scrollIntoView({behavior: 'smooth'});
}
function generate(){
	var nomor = $("#_whatsgen_code").val().concat($("#_whatsgen_phone").val());
	nomor = nomor.replace(/[^0-9\.]/g, '');
	var u = "https://api.whatsapp.com/send?phone="+nomor+"&text="+encodeURIComponent($("#_whatsgen_message").val());
	$("#_whatsgen_reslink").val(u);
	$("#_whatsgen_testlink").attr("href",u);
	$("#_whatsgen_qr").attr("src",base_url + "qr.php?url=" + encodeURIComponent(u) + "&dl=0");
	$("#_whatsgen_qrlink").attr("href",base_url + "qr.php?url=" + encodeURIComponent(u) + "&dl=1");
	$("#_whatsgen_result").show();
	goToByScroll("_whatsgen_result");
}
$(function() {
	url = "https://api.whatsapp.com/send?phone=6283840460580&text=https%3A%2F%2Fapi.whatsapp.com%2Fsend%3Fphone%3D62%26text%3D";
	$("#_whatsgen_reslink").val(url);
	$("#_whatsgen_testlink").attr("href",url);
	$("#_whatsgen_qr").attr("src",base_url + "qr.php?url=" + encodeURIComponent(url) + "&dl=0");
	$("#_whatsgen_qrlink").attr("href",base_url + "qr.php?url=" + encodeURIComponent(url) + "&dl=1");
	$("#_whatsgen_result").hide();
	
	$("#_whatsgen_generate").click(generate);
});