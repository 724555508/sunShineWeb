<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<html>
<head>
<title>首页测试</title>

<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">
</head>
<body>
	用户名: ${ user.id }
	<form method="post" action="/test/upload" enctype="multipart/form-data">
		<input id="pics" type="file" name="files" multiple="multiple"
			accept="*"> <input type="submit" value="提交">
	</form>

	<button id="btn" value="点击出错" onclick="clic()">点击出错</button>
	<script src="../js/jquery-1.11.3.js"></script>
	<script type="text/javascript">
		function clic() {
			$.post("../test/${ user.id }", {}, function(data) {
				alert(data);
			}, "json");
		}
	</script>
</body>
</html>
