<?php

  // Define database connection parameters
   $hn      = '127.0.0.1';
   $un      = 'root';
   $pwd     = '';
   $db      = 'ligony2u_ionic_tuto';
   $cs      = 'utf8';
   
   // Set up the PDO parameters
   $dsn 	= "mysql:host=" . $hn . ";port=3306;dbname=" . $db . ";charset=" . $cs;
   $opt 	= array(
                        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_OBJ,
                        PDO::ATTR_EMULATE_PREPARES   => false,
                       );
   // Create a PDO instance (connect to the database)
   $pdo 	= new PDO($dsn, $un, $pwd, $opt);
   $data    = array();

    $json    =  file_get_contents('php://input');

   $obj     =  json_decode($json, true);

   
   // Sanitise URL supplied values
    $user 		     = filter_var($obj->user, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $pasword	  = filter_var($obj->pasword, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    	 
   // Attempt to query database table and retrieve data
   try {
      $stmt 	= $pdo->query('SELECT count user as res FROM user WHERE WHERE name = :user AND pasword = :pasword');
	  $stmt 	=	$pdo->prepare($sql);
      $stmt->bindParam(':user', $user, PDO::PARAM_STR);
      $stmt->bindParam(':pasword', $pasword, PDO::PARAM_STR);
      $stmt->execute();
      if($stmt->columnCount() == 0){
          echo json_encode('1');
      } else {
          echo json_encode('0');
      }
   }
   catch(PDOException $e)
   {
      echo $e->getMessage();
   }

?>