<?php
    // header('Content-Type: text/xml; charset=UTF-8');
    require 'lib/nusoap.php';

    $url = 'http://localhost/soap1/service.php';
    // $cliente= new nusoap_client($url."?wsdl;",'wsdl',array('soap_version' => SOAP_1_1));
    $cliente= new nusoap_client($url."?wsdl;",'wsdl');
    // $cliente->soap_defencoding = 'UTF-8'; 
    // $cliente->http_encoding='utf-8';
    // $cliente->soap_defencoding = 'UTF-8';
    // $cliente->decode_utf8 = false;
    // $server->soap_defencoding='utf-8';
    // $client = new nusoap_client('http://www.domain.com/server.php?wsdl&debug=1', 'wsdl');

    $Id = $_POST["Id_Cargue"];

    $regs=$cliente->call('ListarRS',array("Id_Cargue"=>$Id),'uri:'.$url,'uri:'.$url.'/ListarRS');

    if($cliente->fault){
        echo "ERROR";
        print_r($regs);
    }else{
        if($cliente->getError()){
            echo '<b>Error en el cliente:'.$cliente->getError().'</b>';
        }else{
            print_r($regs);
        }
    }
?>