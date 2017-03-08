# file-header
A CLI tool for generating file header from a configuration file and an EJS template.


## Installation 

#### install the package
`npm i -g file-header`

#### Edit the config file ( Optional )
Data to be presented on a file header is stored in a config file which is located at `~/.file-headers/template_data.js`

The default content of this file will be as follows.
```javascript
module.exports = {
  user: process.env.USER,
  email: process.env.USER + '@' + process.env.HOST,
  date: new Date(),
};

```

We can customize it as required. For example, change it to

```javascript
module.exports = {
  user: 'Jake sully'
  email: 'gmail@jakesully.com'
  github: 'https://github.com/jakesully'
  date: new Date(),
};
```

#### Edit the [EJS](ejs) tempalte of the default file-header ( Optional )

The default file header template can be found at `~/.file-headers/default`
It is just [EJS](ejs) template. We can customize it to any extend.

If we require different template for each file type , create a file  `~/.file-headers/<extention>`

For javscript, create a custom template at  `~/.file-headers/js` and customize it.


## Usage

Commandline
```
file-header <filename.ext>
```
which will print the file header to your console.


#### Use with Vim editor

Add the below line to your vim config file
```vim
command! Header :execute '0r!file-header %'
```

Now, type `:Header` to add file header to your current buffer.

[ejs]: https://github.com/mde/ejs "Ejs template engine"



