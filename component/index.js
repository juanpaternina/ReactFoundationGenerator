var generators = require('yeoman-generator');
var mkdirp = require('mkdirp');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = generators.Base.extend({
    // The name `constructor` is important here
    constructor: function() {
        // Calling the super constructor is important so our generator is correctly set up
        generators.Base.apply(this, arguments);

        this.capitalizeFirstLetter = function(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
    },

    //Ask for user inputs
    prompting: function() {
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
    },

    //Writing Logic here
    writing: {
        //Copy the configuration files
        config: function() {
        },

        //Copy application files
        app: function() {
          var name = this.capitalizeFirstLetter(this.props.name);
          this.fs.copyTpl(
              this.templatePath('_component.js'),
              this.destinationPath('./app/components/'+name+'/'+name+'.js'), {
                  name: name
              }
          );
          this.fs.copyTpl(
              this.templatePath('_component.scss'),
              this.destinationPath('./app/components/'+name+'/'+name+'.scss'), {
                  name: name
              }
          );
        }
    },

    //Install Dependencies
    install: function() {
        //Dev Dependencies

        //Dependencies

    }
});
