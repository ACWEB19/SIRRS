<?php
    // header('Content-Type: text/xml; charset=UTF-8;');   
    include('lib/nusoap.php');
    require ('dao.php');

    $url = ('http://localhost/soap1/service.php');
    $server = new nusoap_server();
    $server->configureWSDL("consulta",$url);
    $server->wsdl->schemaTargetNamespace=$url;
    // $server->http_encoding='utf-8';
    $server->soap_defencoding='ISO-8859-1';
    // $server->soap_defencoding='UTF-8';
    // $dom = new DOMDocument("1.0");
    $server->register(
                    "ListarRS",
                    array("Id_Cargue" => "xsd:string"),
                    array("return" => "xsd:string"), $url
                    );

    function ListarRS($Id_RegistroSanitario){
        $conn = conexion();
        $permitidos = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_";
        /* $noPermitidos = "!@#$%^&*()+{}|:"<>?,./;'[]="; */

        for ($i=0; $i<strlen($Id_RegistroSanitario); $i++){
            if (strpos($permitidos, substr($Id_RegistroSanitario,$i,1))===false){
                 $valido == "no";
            }else
                $valido == "si";
        }

        if($valido === "no" ){
            $sql = "SELECT descripcion FROM error WHERE id = 2";
            $rs= mysqli_query($conn, $sql);
            $cadena="<?xml version='1.0' encoding='UTF-8'?>";
            if($rs!=null){
                $cadena.="<registros>";
                if(mysqli_num_rows($rs)>0){
                    while($row = mysqli_fetch_row($rs)){
                        $cadena.="<Error>"; 
                            $cadena.="<Mensaje>".$row[0]."</Mensaje>";
                        $cadena.="</Error>";
                        $cadena.="</br>";
                    /*     $i++; */
                    }
                }else{
                   /*  $cadena.="<Error> No hay datos </Error>"; */
                }
                $cadena.="</registros>";
            }else{
                $cadena.="<Error> Error de service ".mysqli_error()."</Error>";
            }
            $respuesta= new soapval('return', 'xsd:string', $cadena);
            return $respuesta;
            
        }elseif($Id_RegistroSanitario!=Null){
            $sql= "SELECT Id_Cargue, Id_RegistroSanitario, Fecha_Vencimiento, CLV_Identificador, Producto_Nombre,Producto_Marcas, Producto_Fabricantes, Producto_Tipo, Producto_Empresa, Estado_Envio FROM cargue WHERE Id_Cargue = (select MAX(Id_Cargue) FROM cargue WHERE Id_RegistroSanitario ='$Id_RegistroSanitario') ORDER BY Id_Cargue DESC";
            //$sql = "SELECT * FROM cargue WHERE Id_RegistroSanitario = '$Id_RegistroSanitario'";
            $rs= mysqli_query($conn, $sql);
            $cadena="<?xml version='1.0' encoding='UTF-8'?>";
            // echo($rs);
            
            if($rs!=null){

                $cadena.="<registros>";
                if(mysqli_num_rows($rs)>0){
                    while($row = mysqli_fetch_row($rs)){
                        $cadena.="<registro>";
                            // $cadena.="<Id_Cargue>".$row[0]."</Id_Cargue>";
                            $cadena.="<Id_RegistroSanitario>".$row[1]."</Id_RegistroSanitario>";
                            $cadena.="<Fecha_Vencimiento>".$row[2]."</Fecha_Vencimiento>";
                            $cadena.="<CLV_Identificador>".$row[3]."</CLV_Identificador>";
                            $cadena.="<Producto>";
                                $cadena.="<Nombre>". $row[4]."</Nombre>";
                                $cadena.="<Marcas>";
                                    $cadena.="<item>".$row[5]."</item>";
                                $cadena.="</Marcas>";
                                $cadena.="<Fabricantes>";
                                    $cadena.="<item>".$row[6]."</item>";
                                $cadena.="</Fabricantes>";
                                $cadena.="<Tipo_Producto>".$row[7]."</Tipo_Producto>";
                                $cadena.="<Empresa>".$row[8]."</Empresa>";
                            $cadena.="</Producto>"; 
                        $cadena.="</registro>";
                        $cadena.="</br>";
                        /* $i++; */
                    }
                }else{
                    $sql = "SELECT descripcion FROM error WHERE id = 3";
                    $rs= mysqli_query($conn, $sql);
                    $cadena="<?xml version='1.0' encoding='UTF-8'?>";
                    echo $rs;
                    // return;s
                    if($rs!=null){


                        $cadena.="<registros>";
                        if(mysqli_num_rows($rs)>0){
                            while($row = mysqli_fetch_row($rs)){
                                $cadena.="<Error>"; 
                                    $cadena.="<Mensaje>".$row[0]."</Mensaje>";
                                $cadena.="</Error>";
                                $cadena.="</br>";
                            /*     $i++; */
                            }
                        }else{
                        /*  $cadena.="<Error> No hay datos </Error>"; */
                        }
                        $cadena.="</registros>";
                    }else{
                        $cadena.="<Error> Error de service ".mysqli_error()."</Error>";
                    }
                    $respuesta= new soapval('return', 'xsd:string', $cadena);
                    return $respuesta;
                    // $cadena.="<Error> Ingrese un número de Registro Sanitario válido </Error>";
                }
                $cadena.="</registros>";
            }else{
                $cadena.="<Error> Error de service ".mysqli_error()."</Error>";
            }
            $respuesta= new soapval('return', 'xsd:string', $cadena);
            return $respuesta;
            // En caso de que no exista el Registro.
        }else{
            $sql = "SELECT descripcion FROM error WHERE id = 1";
            $rs= mysqli_query($conn, $sql);
            $cadena="<?xml version='1.0' encoding='UTF-8'?>";
            if($rs!=null){
                $cadena.="<registros>";
                if(mysqli_num_rows($rs)>0){
                    while($row = mysqli_fetch_row($rs)){
                        $cadena.="<Error>"; 
                        $cadena.="<Mensaje>".$row[0]."</Mensaje>";
                        $cadena.="</Error>";
                        $cadena.="</br>";
                    /*     $i++; */
                    }
                }else{
                   /*  $cadena.="<Error> No hay datos </Error>"; */
                }
                $cadena.="</registros>";
            }else{
                $cadena.="<Error> Error de service ".mysqli_error()."</Error>";
            }
            $respuesta= new soapval('return', 'xsd:string', $cadena);
            return $respuesta;
        }
        // $xml_string = $dom->saveXML();
        // echo $xml_string;
    }
    

        // $HTTP_RAW_POST_DATA = isset ($HTTP_RAW_POST_DATA) ? $HTTP_RAW_POST_DATA : '';
        // $server->service($HTTP_RAW_POST_DATA);
    @$server->service(file_get_contents("php://input"));

    // if(!isset($HTTP_RAW_POST_DATA));
    // $HTTP_RAW_POST_DATA = file_get_contents('php://input');
    // $server->service($HTTP_RAW_POST_DATA);

?>