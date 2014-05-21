$(document).ready(function(){
function xlsworker(data, cb) {
	var worker = new Worker('js/xlsworker.js');
	worker.onmessage = function(e) {
		switch(e.data.t) {
			case 'ready': break;
			case 'e': console.error(e.data.d);
			case 'xls': cb(e.data.d); break;
		}
	};
	worker.postMessage(data);
}

function get_radio_value( radioName ) {
	var radios = document.getElementsByName( radioName );
	for( var i = 0; i < radios.length; i++ ) {
		if( radios[i].checked ) {
			return radios[i].value;
		}
	}
}

function to_json(workbook) {
	var result = {};
	workbook.SheetNames.forEach(function(sheetName) {
		var roa = XLS.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
		if(roa.length > 0){
			result[sheetName] = roa;
		}
	});
	return result;
}

function to_csv(workbook) {
	var result = [];
	workbook.SheetNames.forEach(function(sheetName) {
		var csv = XLS.utils.make_csv(workbook.Sheets[sheetName]);
		if(csv.length > 0){
			result.push("SHEET: " + sheetName);
			result.push("");
			result.push(csv);
		}
	});
	return result.join("\n");
}

function to_formulae(workbook) {
	var result = [];
	workbook.SheetNames.forEach(function(sheetName) {
		var formulae = XLS.utils.get_formulae(workbook.Sheets[sheetName]);
		if(formulae.length > 0){
			result.push("SHEET: " + sheetName);
			result.push("");
			result.push(formulae.join("\n"));
		}
	});
	return result.join("\n");
}

var tarea = document.getElementById('b64data');
function b64it() {
	var cfb = XLS.CFB.read(tarea.value, {type: 'base64'});
	var wb = XLS.parse_xlscfb(cfb);
	process_wb(wb);
}

function process_wb(wb) {
	var output = "";
	switch(get_radio_value("format")) {
		case "json":
			output = JSON.stringify(to_json(wb), 2, 2);
			break;
		case "form":
			output = to_formulae(wb);
			break; 
		default:
			output = to_csv(wb);
	}
	if(out.innerText === undefined) out.textContent = output;
	else out.innerText = output;
}



function process(xml) {

	var item = $(xml).find("item").each(function(){	
		var mediac = $(this).find("content");
		//out.innerText += mediac.attr("start");
		var format1=$('#num');
		var nowval=mediac.attr("start");
		mediac.attr("start",parseInt(nowval)+parseInt(format1.val()));

	});
	
	
	xmlout.innerText = (new XMLSerializer()).serializeToString(xml[0]);

	var bb = new BlobBuilder();
bb.append((new XMLSerializer).serializeToString(document));
var blob = bb.getBlob("application/xhtml+xml;charset=" + document.characterSet);
saveAs(blob, "document.xhtml");
}

var drop = document.getElementById('drop');
function handleDrop(e) {
	e.stopPropagation();
	e.preventDefault();
	var files = e.dataTransfer.files;
	
	var i,f;
	for (i = 0, f = files[i]; i != files.length; ++i) {
	   xmlhttp=new XMLHttpRequest();
	   xmlhttp.open("GET",f,false);
	   //out.innerText = f.name;
	   		var reader = new FileReader();
			reader.onload = function(e) {
			var data = e.target.result;
			var xml = data,
			xmlDoc = $.parseXML( xml ),
			$xml = $( xmlDoc );
			process($xml);
			
		};
		reader.readAsText(f, "UTF-8");

	}
}

function handleDragover(e) {
	e.stopPropagation();
	e.preventDefault();
	e.dataTransfer.dropEffect = 'copy';
}

if(drop.addEventListener) {
	drop.addEventListener('dragenter', handleDragover, false);
	drop.addEventListener('dragover', handleDragover, false);
	drop.addEventListener('drop', handleDrop, false);
}

});
