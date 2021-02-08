#!/usr/bin/env node

'use strict';
const fs = require('fs'); 
const path = require('path'); 
 
console.log('Creating Theme Folder Name');  



const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Theme Name: ", function(theme_name) {
    rl.question("Theme URI:", function(theme_uri) {
        rl.question("Author:", function(author) {
            rl.question("Author URI:", function(author_uri) {
                console.log(`Theme Name: ${theme_name}`);
                console.log(`Theme URI: ${theme_uri}`);
                console.log(`Author: ${author}`);
                console.log(`Author URI: ${author_uri}`);
                rl.close();
            });
        });
    });
});

 return;
fs.mkdir(path.join(__dirname, 'test'), (err) => { 
    if (err) { 
        return console.error(err); 
    } 
    console.log('Directory created successfully!'); 
}); 