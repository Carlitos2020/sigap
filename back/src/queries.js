let cn = require('../src/dbconnection');
let db = cn.connection;
const numeral = require('numeral');

function SelectCollection(req, res, next, whereIN){
    let where = "WHERE "+whereIN;
    if (whereIN === "") where = "";

    let query = 
    "SELECT " +      
    "alumno_programa.dni_m AS dni, " +
    "concepto.concepto as concepto, " +
    "recaudaciones.id_alum, " + 
    "recaudaciones.numero as recibo, " + 
    "recaudaciones.id_rec, " +
    "recaudaciones.importe, " +
    "recaudaciones.fecha, " +
    "recaudaciones.id_ubicacion, " + 
    "recaudaciones.observacion_upg, " +
    "recaudaciones.observacion, " +
    "recaudaciones.validado, " +
    "moneda.moneda, " +
    "moneda.mascara, " +
    "programa.nom_programa as nombre_programa, " +
    "ubicacion.descripcion as ubicacion, "+
    "tipo.descripcion as tipo, "+
    "alumno_programa.cod_alumno as codigo, "+    
    "alumno.ape_nom as Nombre " +
    "FROM recaudaciones " +
    "INNER JOIN alumno ON recaudaciones.id_alum = alumno.id_alum " +    
    "JOIN concepto ON recaudaciones.id_concepto = concepto.id_concepto " +
    "JOIN clase_pagos ON concepto.id_clase_pagos = clase_pagos.id_clase_pagos " +    
    "LEFT JOIN alumno_programa ON (alumno_programa.cod_alumno = recaudaciones.cod_alumno) " +
    "LEFT JOIN programa ON alumno_programa.id_programa = programa.id_programa " +
    "LEFT JOIN ubicacion ON ubicacion.id_ubicacion = recaudaciones.id_ubicacion "+
    "LEFT JOIN moneda ON moneda.id_moneda = recaudaciones.moneda "+
    "LEFT JOIN tipo ON tipo.id_tipo = recaudaciones.id_tipo "+
        where +
    " ORDER BY alumno_programa.cod_alumno DESC, fecha DESC; "

    //"INNER JOIN alumno_alumno_programa ON alumno_alumno_programa.id_alum = alumno.id_alum " +
    //"INNER JOIN alumno_programa ON alumno_programa.cod_alumno = alumno_alumno_programa.cod_alumno " +

    console.log(query);
    db.any(query)
        .then(function(data){
            // data.forEach(element => {
            //     element.importe = 'S/.'+numeral(element.importe).format('0,0.00');
            // });
            res.status(200)
                .json({
                    status : 'success',
                    data:data,
                    message : 'Retrieved List'
                });
        })
        .catch(function(err){
            res.status(500)
                .json({
                    status : 'error',
                    message : err.stack
                });
        })
}
function SelectGeneral(req, res, next, table){
    let query = "Select * from "+table;
    if (table === "concepto")
        query = query +" JOIN clase_pagos ON concepto.id_clase_pagos = clase_pagos.id_clase_pagos "+
        "where clase_pagos.id_clase_pagos = 2";

    db.any(query)
        .then(function(data){
            res.status(200)
                .json({
                    status : 'success',
                    data:data,
                    message : 'Retrieved List'
                });
        })
        .catch(function(err){
            return next(err);
        })
}
//login
/*
function GetUsuario(req, res, next, username, password){
   // let querylogin = `Select * from usuario user_name = '${username} and pass  = '${password}' `;
  
      
    db.one('SELECT * FROM USUARIO where user_name = $1', username)

       .then(function(data){
            db.any('SELECT * FROM comparar_password($1::character varying,$2::character varying)',[username,password])
                .then(data2 => {

                     console.log('DATA:', data);
                    if (data2[0].comparar_password ==1) {
                       res.status(200)
                            .json({
                               status : 'success',
                               message : 'Logeado corecto'
                        });               
                               
                    }else{
                         /*res.status(500);
                         res.render('error', { error: err });
*/
/*
                         res.status(200)
                            .json({
                               status : 'success',
                               message : 'Logeado NO'
                        });  
                    } 
                })
                    
                

                .catch(error => {
                    return next(err);
                })
        })
        .catch(function(err){
            return next(err);
        })
}*/

//login

function GetUsuario(req, res, next, username,password){
   // let querylogin = `Select * from usuario user_name = '${username} and pass  = '${password}' `;
  
      
    let querylogin = `SELECT * FROM USUARIO where user_name='${username}' and pass  = '${password}' `;


    /*
        db.any(querylogin)
        .then(()=>{
            res.status(200)
                .json({
                    
                    status : 'success',
                    message : 'Update success'
                })
        })
        .catch(err=>{
            return next(err);
        })
*/
        db.one('SELECT * FROM USUARIO WHERE user_name = $1', username)
        .then(function (data) {
            db.any('SELECT * FROM comparar_password($1::character varying,$2::character varying)', [username, password])
                .then(data2 => {
                console.log('DATA:', data2); // print data;
                    if(data2[0].comparar_password == 2){
                        res.status(200)
                            .json({
                                status : 'success',
                                data:data,
                                message : 'logeando xD'
                             });
                    }else{
                       res.status(500)
                            .json({
                                status : 'success',
                                data:data,
                                message : '----------------------'
                             });
                    }
               
            })
        })
        .catch(function (error) {
            return next(errOr);
        });

}

/*---------------------------------------------------------------
Te devuelv null si el usuario no existe
2 si la contraseña es incorrecta
Y 1 si todo es correcto
*/
/*
function GetUsuario(req, res, next, username,password){


     db.one('SELECT * FROM USUARIO WHERE user_name = $1', username)
        .then(function (data) {
            db.any('SELECT * FROM comparar_password($1::character varying,$2::character varying)', [username, password])
                .then(data2 => {
                console.log('DATA:', data2); // print data;
                    if(data2[0].comparar_password == 1){
                         res.status(200)
                            .json({
                                status : 'success',
                                data:data,
                                message : 'entro login'
                             });
                    }else{
                        res.status(300)
                            .json({
                                status : 'no valido',
                                data:data,
                                message : data2[0].comparar_password
                             });
                    }
               
            })
        })
        .catch(function (error) {
            console.log(err)
            return next(err);
        });

}
*/

//modificado

function UpdateObservation(req,res,next,id,message){
    let query = 'UPDATE public.recaudaciones SET'+
        ' observacion_upg='+message+
        ' WHERE id_rec='+id+';';
    console.log(query)
    db.any(query)
        .then(()=>{
            res.status(200)
                .json({
                    status : 'success',
                    message : 'Update success'
                })
        })
        .catch(err=>{
            return next(err);
        })
}
function UpdateQuery(req, res, next, when1, when2, when3, indices) {
    let ind = require('../src/algoritms');
    let query =`UPDATE recaudaciones SET ${ind.i_flag} = CASE ${ind.i_recaudacion} 
        ${when1}, ${ind.i_obs} = CASE ${ind.i_recaudacion} ${when2},
        ${ind.i_ubic} = CASE ${ind.i_recaudacion} ${when3}
         WHERE ${ind.i_recaudacion} IN (${indices})`;
    console.log(query);
    db.any(query)
        .then(function(data){
            res.status(200)
                .json({
                    status : 'success',
                    data:data,
                    message : 'Retrieved List'
                });
        })
        .catch(function (err) {
            console.log(err);
            return next(err);
        })
}
function GetReceipt(req,res,next,idRecibo){
    let query = `SELECT r.numero FROM recaudaciones as r WHERE r.numero='${idRecibo}'`;

    console.log(query);
    db.any(query)
        .then(function(data){
                
            if (data.length == 0) {
                recibo = 0;
            }else{
                recibo = 1;
            }
            res.status(200)
                .json({
                    response: recibo,
                });
        })
        .catch(function(err){
            return res.status(500)
                .json({
                    status : err.stack
                });
        });
}
function GetObservation(req,res,next,idObservacion){
    let query = `SELECT r.observacion_upg FROM recaudaciones as r WHERE r.id_rec=${idObservacion};`;
    let obs_upg;
    db.any(query)
        .then(function(data){
            
            if (data.length == 0) {
                obs_upg = [];
            }else{
                obs_upg = data[0]['observacion_upg'];
            }
            res.status(200)
                .json({
                    status : 'success',
                    data:obs_upg,
                    message : 'Get observarion succesfully'
                });
        })
        .catch(function(err){
            return res.status(500)
                .json({
                    status : 'error'
                });
        });
}
function InsertQuery(req, res, next, valores){
    let query=`insert into recaudaciones
    (id_alum, id_concepto, id_registro, id_ubicacion, cod_alumno, numero, importe, observacion, fecha, validado, id_tipo, observacion_upg, moneda)
        values ${valores}`;
    console.log(query);
    db.any(query)
        .then(function(data){
            res.status(200)
                .json({
                    status : 'success',
                    data:data,
                    message : 'Retrieved List'
                });
        })
        .catch(function (err) {
            res.status(500)
            .json({
                status : 'error',
                message : err.stack
            });
        })
}

module.exports = {
    SelectGeneral:SelectGeneral,
    SelectCollection:SelectCollection,
    GetUsuario:GetUsuario,
    UpdateObservation:UpdateObservation,
    GetObservation:GetObservation,
    UpdateQuery:UpdateQuery,
    GetReceipt:GetReceipt,
    InsertQuery:InsertQuery
};