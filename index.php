<!DOCTYPE html>
<style>
#drop{
	border:2px dashed #bbb;
	-moz-border-radius:5px;
	-webkit-border-radius:5px;
	border-radius:5px;
	padding:25px;
	text-align:center;
	font:20pt bold,"Vollkorn";color:#bbb
}
#b64data{
	width:100%;
}
</style>
<b>Inwicast xml time pusher</b><br />
<input type="number" name="format" value="0" id="num"> nombre de décallage<br>

<div id="drop">Drop an XLS file here to see sheet data.</div>
<!--
<textarea id="b64data">... or paste a base64-encoding here</textarea>
<input type="button" id="dotext" value="Click here to process the base64 text" onclick="b64it();"/>
-->
<pre id="out"></pre>
<div id="xmlout"></div>
<br />

<script type="text/javascript">

</script>

<script type="text/javascript" src="js/jquery-2.0.3.min.js" ></script>
<script type="text/javascript" src="js/Blob.js" ></script>
<script type="text/javascript" src="js/FileSaver.js" ></script>
<script type="text/javascript" src="js/js.js" ></script>
<script type="text/javascript" src="js/xls.js" ></script>
