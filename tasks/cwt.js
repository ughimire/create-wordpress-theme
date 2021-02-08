#!/usr/bin/env node

'use strict';
const fs = require('fs'); 
const path = require('path'); 
const readline = require("readline");

const wpCreateThemeFolder = (theme_dir_name) => {
    fs.mkdir(path.join(__dirname, theme_dir_name), (err) => { 
            if (err) { 
                return console.error(err); 
            } 
            console.log('Directory created successfully!'); 
        }); 
  };

  const wpCreateThemeTemplates = (theme_name, theme_uri,author,author_uri) => {
    var wp_theme_name = 'undefined',
 wp_theme_uri='',
 wp_author='',
 wp_author_uri='',
 wp_description='',
 wp_text_domain='',
 wp_tested_upto='5.5',
 wp_requires_php='5.6',
 wp_tags='';

  };
  
  const getThemeName =(raw_name)=>{
      var valid_name = raw_name.toLowerCase();
      valid_name = valid_name.split(' ').join('-'); 
      return valid_name;


  };
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


rl.question("Theme Name:", function(theme_name) {
    rl.question("Theme URI:", function(theme_uri) {
        rl.question("Author:", function(author) {
            rl.question("Author URI:", function(author_uri) {

            var theme_valid_name = getThemeName(theme_name);
               wpCreateThemeFolder(theme_valid_name);
               //wpCreateThemeFiles()
                rl.close();
            });
        });
    });
});

//console.log(wp_theme_name);
 return;
