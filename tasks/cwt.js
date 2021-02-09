#!/usr/bin/env node

'use strict';
const fs = require('fs');
const path = require('path');
const readline = require("readline");


const wpThemeHeader = {
    theme_name: 'undefined',
    theme_constant:'UNDEFINED',
    theme_prefix:'undefined',
    class_name:'Undefined',
    theme_uri:'',
    author:'',
    author_uri:'',
    description:'',
    text_domain:'',
    tested_upto:'5.5',
    requires_php:'5.6',
    tags:''
};
const wpCreateThemeFolder = (theme_dir_name) => {
    fs.mkdir(path.join(process.cwd(), theme_dir_name), (err) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
    });
};
const makeCoreDirectory=(filePath)=>{
    var dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  fs.mkdirSync(dirname);
  return true;


}

const walk = function (dir) {
    var results = [];
    var list = fs.readdirSync(dir);
    list.forEach(function (file) {
        file = dir + '/' + file;
        var stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            /* Recurse into a subdirectory */
            results = results.concat(walk(file));
        } else {
            /* Is a file */
            results.push(file);
            var relative_path = path.relative((path.join(__dirname, "tmpl")), file);
            relative_path=relative_path.replace("{{theme_name_prefix}}", wpThemeHeader.text_domain).replace('.tpl','');
            var theme_file_path = path.join(process.cwd(), wpThemeHeader.text_domain, relative_path);
            
            fs.readFile(file, 'utf8', function (err,data) {
                if (err) {
                  return console.log(err);
                }
                var result = wpThemeFilesReplaceAll(data); data;

                makeCoreDirectory(theme_file_path);
              
                fs.writeFile(theme_file_path, result, 'utf8', function (err) {
                   if (err) return console.log(err);
                });
              });
              



        }
    });

    return results;
}
const wpThemeFilesReplaceAll=(data)=>{
    data= data.replace(/{{theme_name}}/g, wpThemeHeader.theme_name);
    
    data= data.replace(/{{theme_uri}}/g, wpThemeHeader.theme_uri);
    
    data= data.replace(/{{author}}/g, wpThemeHeader.author);

    data= data.replace(/{{author_uri}}/g, wpThemeHeader.author_uri);

    data= data.replace(/{{description}}/g, wpThemeHeader.description);

    data= data.replace(/{{text_domain}}/g, wpThemeHeader.text_domain);

    data= data.replace(/{{tested_upto}}/g, wpThemeHeader.tested_upto);

    data= data.replace(/{{requires_php}}/g, wpThemeHeader.requires_php);

    data= data.replace(/{{tags}}/g, wpThemeHeader.tags);

    data = data.replace(/{{theme_constant}}/g, wpThemeHeader.theme_constant);

    data = data.replace(/{{theme_prefix}}/g, wpThemeHeader.theme_prefix);

    data = data.replace(/{{class_name}}/g, wpThemeHeader.class_name);



    return data;
}

const wpCreateThemeTemplates = (theme_name, theme_uri, author, author_uri) => {
    var theme_dir_name = getThemeName(theme_name);

    var wp_theme_name = 'undefined',
        wp_theme_uri = '',
        wp_author = '',
        wp_author_uri = '',
        wp_description = '',
        wp_text_domain = '',
        wp_tested_upto = '5.5',
        wp_requires_php = '5.6',
        wp_tags = '';
    var tmpl_path = (path.join(__dirname, "tmpl"));
    var arr = walk(tmpl_path);

};

const getThemeName = (raw_name) => {
    var valid_name = raw_name.toLowerCase();
    valid_name = valid_name.split(' ').join('-');
    return valid_name;


};
const getThemePrefix = (raw_name, toUpperCase = false) => {
    var valid_name_prefix = raw_name.toLowerCase();
    if (toUpperCase) {
        valid_name_prefix = raw_name.toUpperCase();
    }
    valid_name_prefix = valid_name_prefix.split(' ').join('-');
    valid_name_prefix = valid_name_prefix.split('-').join('_');

    return valid_name_prefix;
}
const getThemeNamePrefix = (raw_name) => {
    var valid_name_prefix = raw_name.toLowerCase();

    valid_name_prefix = valid_name_prefix.split(' ').join('-');

    return valid_name_prefix;
}


const getThemeClassName = (raw_name) => {
    var valid_name_prefix = raw_name.charAt(0).toUpperCase() + raw_name.slice(1);
    valid_name_prefix = valid_name_prefix.split(' ').join('-');
    valid_name_prefix = valid_name_prefix.split('-').join('_');
    return valid_name_prefix;
}
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


rl.question("Theme Name:", function (theme_name) {
    rl.question("Theme URI:", function (theme_uri) {
        rl.question("Author:", function (author) {
            rl.question("Author URI:", function (author_uri) {
                var theme_valid_name = getThemeName(theme_name);

                wpThemeHeader.theme_name = theme_name;
                wpThemeHeader.theme_uri=theme_uri;
                wpThemeHeader.author=author;
                wpThemeHeader.author_uri=author_uri;
                wpThemeHeader.text_domain=theme_valid_name;
                wpThemeHeader.theme_constant=getThemePrefix(theme_name, true);
                wpThemeHeader.theme_prefix=getThemePrefix(theme_name, false);
                wpThemeHeader.class_name=getThemeClassName(theme_name);


                wpCreateThemeFolder(theme_valid_name);
                wpCreateThemeTemplates(theme_name, theme_uri, author, author_uri);
                rl.close();
            });
        });
    });
});

//console.log(wp_theme_name);
return;
