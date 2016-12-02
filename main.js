#!/usr/bin/env node

var path = require('path');
var os = require('os');
var fs = require('fs');
var ejs = require('ejs');
var configDir = path.join( process.env.HOME, '.file-headers' );


function cp( src, dest ){
  var data = fs.readFileSync(src);
  fs.writeFileSync( dest, data);
}

function initialize(){
  if( !fs.existsSync( configDir )){
    fs.mkdirSync( configDir );
    cp( path.join( __dirname, 'default-template' ), path.join( configDir, 'default' ) );
    cp( path.join( __dirname, 'default-data.js' ), path.join( configDir, 'template_data.js' ) );
  }
}


function getTemplate( fname ){
  var ext = path.extname(fname).slice(1) || 'default';

  if( fs.existsSync( path.join(configDir, ext ) ) ){
    return fs.readFileSync( path.join(configDir, ext ), 'utf-8' );
  } else {
    return fs.readFileSync( path.join(configDir, 'default' ), 'utf-8' );
  }
}


function getConfig(){
  try{
    return require( path.join(configDir, 'template_data' ) );
  } catch(e){
    return { date: new Date(), user: process.env.USER, email: process.env.USER + '@' + os.hostname() };
  }
}


function getHeader( fname ){
  var template = getTemplate( fname );
  var config = getConfig();
  var data = Object.assign({ filename: fname }, config );
  return ejs.render( template, data );
}


function printHeader( fname ){
  var header = getHeader( fname );
  console.log( header );
}


if( require.main === module ){
  var fname = process.argv[2];
  initialize();

  if( !fname ){
    console.log( 'file-header <filename>');
    process.exit(-1);
  }

  printHeader( fname );
}

