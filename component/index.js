var generators = require('yeoman-generator');
var mkdirp = require('mkdirp');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = generators.Base.extend({
    // The name `constructor` is important here
    constructor: function() {
        // Calling the super constructor is important so our generator is correctly set up
        generators.Base.apply(this, arguments);

        this.option('fromParent');
        this.option('name');

        this.capitalizeFirstLetter = function(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
    },

    //Ask for user inputs
    prompting: function() {
        if(this.options.fromParent){
          this.props = {name: this.options.name};
        }else{
          var done = this.async();
          this.prompt([{
              type: 'input',
              name: 'name',
              required: true,
              message: 'What\'s the name of Component'
          }]).then(function(answers) {
              this.props = answers;
              done();
          }.bind(this));
        }
    },

    //Writing Logic here
    writing: {
        //Copy the configuration files
        config: function() {
        },

        //Copy application files
        app: function() {

          var path = './app/components/';
          var pathStyles = './app/styles/components/';
          var template = '_component.js';

          if (this.options.fromParent) {
              path = '../app/components/',
              pathStyles = '../app/styles/components/',
              template = '_componentMain.js'
          }

          var name = this.capitalizeFirstLetter(this.props.name);
          this.fs.copyTpl(
              this.templatePath(template),
              this.destinationPath(path+name+'/'+name+'.js'), {
                  name: name
              }
          );
          this.fs.copyTpl(
              this.templatePath('_component.scss'),
              this.destinationPath(pathStyles+'_'+name.toLowerCase()+'.scss'), {
                  name: name
              }
          );
        },

        messages: function(){
          if (!this.options.fromParent) {
            this.log("Don\'t forget to import in webpack and app.scss ");
          }
        }
    },
});
