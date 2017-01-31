<?php	
	$username = $_POST['username'];
	$password = $_POST['password'];
	
	$link = mysql_connect('catgamescores.db', $username, $password);
	if (!$link){
		die('Failed to connect to server: '.mysql_error());
	}

	//select database
	$db = mysql_select_db('catgamescores', $link);
	
	$sql = "SELECT name, score FROM gc_scores ORDER BY score DESC LIMIT 10";
	$result = mysql_query($sql, $link) or die ("Couldn't execute query.");
	
	//get number of rows in $result
	$num = mysql_numrows($result);
	
	$phpConfirm = "";
	
	$counter = 0;
	
	while ($row = mysql_fetch_array($result)){
		$name = $row["name"];
		$score = $row["score"];
		if ($counter != 0)
			$phpConfirm .= "|";
		$phpConfirm .= $name.",";
		$phpConfirm .= $score;
		
		$counter++;
	}
	echo "phpConfirm=".$phpConfirm;
	
	//free resources and close connection
	exit();
	mysql_free_result($result);
	mysql_close($connection);
?>