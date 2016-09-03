var generators = require('yeoman-generator');
var mkdirp = require('mkdirp');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = generators.Base.extend({
    // The name `constructor` is important here
    constructor: function() {
        // Calling the super constructor is important so our generator is correctly set up
        generators.Base.apply(this, arguments);
    },

    //Ask for user inputs
    prompting: function() {
        var done = this.async();
        this.prompt([{
            type: 'input',
            name: 'name',
            message: 'Your project name',
            default: this.appname // Default to current folder name
        }]).then(function(answers) {
            this.props = answers;
            this.log('app name', answers.name);
            this.destinationRoot(answers.name);
            done();
        }.bind(this));
    },

    //Writing Logic here
    writing: {
        //Copy the configuration files
        config: function() {
            this.fs.copyTpl(
                this.templatePath('_package.json'),
                this.destinationPath('package.json'), {
                    name: this.props.name
                }
            );
            this.fs.copyTpl(
                this.templatePath('_webpack.config.js'),
                this.destinationPath('webpack.config.js'), {
                    name: this.props.name
                }
            );
        },

        //Copy application files
        app: function() {
            this.fs.copy(
                this.templatePath('_app/_components/_Main.jsx'),
                this.destinationPath('app/components/Main.js')
            );
            this.fs.copy(
                this.templatePath('_public/_index.html'),
                this.destinationPath('index.html')
            );
            this.fs.copy(
                this.templatePath('_app/_app.js'),
                this.destinationPath('app/app.js')
            );
            this.fs.copy(
                this.templatePath('_app/_styles/_app.scss'),
                this.destinationPath('app/styles/app.scss')
            );

        }
    },

    //Install Dependencies
    install: function() {
        this.npmInstall(
            ['webpack', 'webpack-dev-server', 'babel-preset-react', 'babel-preset-es2015',
                'babel-loader', 'babel-core', 'babel-preset-react', 'babel-preset-stage-0',
                'css-loader', 'foundation-sites', 'jquery@2.2.1', 'node-sass', 'sass-loader',
                'script-loader', 'style-loader','axios'
            ], {
                'saveDev': true
            }
        );
        this.npmInstall(
            ['react', 'react-dom', 'react-router'], {
                'save': true
            }
        );
    }
});
