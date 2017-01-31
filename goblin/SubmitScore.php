<?php	
	$username = $_POST['username'];
	$password = $_POST['password'];
	
	$link = mysql_connect('catgamescores.db', $username, $password);
	if (!$link){
		die('Failed to connect to server: '.mysql_error());
	}

	//select database
	$db = mysql_select_db('catgamescores', $link);
	
	//function to sanitize values recieved from the form. Prevents SQL injection
	function clean($str)
	{
		$str = @trim($str);
		if (get_magic_quotes_gpc()){
			$str = stripslashes($str);
		}
		return mysql_real_escape_string($str); //error
	}

	//Sanitize the POST values
	$name = clean($_POST['name']);
	$score = clean($_POST['score']);
	$currentdate = date("Y/m/d");

	//Create INSERT query
	$qry = "INSERT INTO gc_scores VALUES('".$name."', '".$score."', '".$currentdate."')";
	$result = @mysql_query($qry);
	
	echo "writing=Ok";
	exit();
	mysql_close();
?>