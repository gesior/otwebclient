<?php
$fc = file_get_contents('itembug3.kcam');
$fc = gzuncompress(substr($fc, 8));

var_dump(file_put_contents('itembug3.ukcam', $fc));