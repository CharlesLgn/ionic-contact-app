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

   // Retrieve the posted data

    $json = file_get_contents('php://input');
    $obj = json_decode($json);
    $key = strip_tags($obj->key);

    // Determine which mode is being requested
    switch ($key) {

        // Add a new record to the contact table
        case "create":

            // Sanitise URL supplied values
            $first_name = filter_var($obj->first_name, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
            $last_name = filter_var($obj->last_name, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
            $tel = filter_var($obj->tel, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);

            // Attempt to run PDO prepared statement
            try {
                $sql = "INSERT INTO contact(first_name, last_name, tel) VALUES(:first_name, :last_namee, :tel)";
                $stmt = $pdo->prepare($sql);
                $stmt->bindParam(':first_name', $name, PDO::PARAM_STR);
                $stmt->bindParam(':last_name', $description, PDO::PARAM_STR);
                $stmt->bindParam(':tel', $description, PDO::PARAM_STR);
                $stmt->execute();

                echo json_encode(array('message' => 'Congratulations the record ' . $name . ' was added to the database'));
            } // Catch any errors in running the prepared statement
            catch (PDOException $e) {
                echo $e->getMessage();
            }
            break;


        // Update an existing record in the technologies table
        case "update":

            // Sanitise URL supplied values
            $first_name = filter_var($obj->first_name, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
            $last_name = filter_var($obj->last_name, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
            $tel = filter_var($obj->tel, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
            $recordID = filter_var($obj->recordID, FILTER_SANITIZE_NUMBER_INT);

            // Attempt to run PDO prepared statement
            try {
                $sql = "UPDATE contact SET first_name = :first_name, last_name = :last_name, tel = :tel WHERE id = :recordID";
                $stmt = $pdo->prepare($sql);
                $stmt->bindParam(':first_name', $first_name, PDO::PARAM_STR);
                $stmt->bindParam(':last_name', $last_name, PDO::PARAM_STR);
                $stmt->bindParam(':tel', $tel, PDO::PARAM_STR);
                $stmt->bindParam(':recordID', $recordID, PDO::PARAM_INT);
                $stmt->execute();

                echo json_encode('Congratulations the record ' . $name . ' was updated');
            } // Catch any errors in running the prepared statement
            catch (PDOException $e) {
                echo $e->getMessage();
            }

            break;


        // Remove an existing record in the technologies table
        case "delete":

            // Sanitise supplied record ID for matching to table record
            $recordID = filter_var($obj->recordID, FILTER_SANITIZE_NUMBER_INT);

            // Attempt to run PDO prepared statement
            try {
                $pdo = new PDO($dsn, $un, $pwd);
                $sql = "DELETE FROM contact WHERE id = :recordID";
                $stmt = $pdo->prepare($sql);
                $stmt->bindParam(':recordID', $recordID, PDO::PARAM_INT);
                $stmt->execute();

                echo json_encode('Congratulations the record ' . $name . ' was removed');
            } // Catch any errors in running the prepared statement
            catch (PDOException $e) {
                echo $e->getMessage();
            }

            break;
    }
?>