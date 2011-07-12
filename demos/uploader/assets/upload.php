<?php
	foreach ($_FILES as $key => $value) {
		echo "Uploaded: " . $value['name'];
	}
?>