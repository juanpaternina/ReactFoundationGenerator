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
        this.prompt(
          [
            {
              type: 'input',
              name: 'name',
              message: 'Your project name',
              default: this.appname // Default to current folder name
            },
            {
              type: 'input',
              name: 'version',
              message: 'Version (0.0.0)',
              default: "0.0.0"// Default to current folder name
            },
            {
              type: 'input',
              name: 'description',
              message: 'Description',
              default: "" // Default to current folder name
            },
            {
              type: 'input',
              name: 'author',
              message: 'Author',
              default: "" // Default to current folder name
            },
            {
              type: 'input',
              name: 'licence',
              message: 'Licence',
              default: ""// Default to current folder name
            },
          ]).then(function(answers) {
                this.props = answers;
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
                    name: this.props.name,
                    author: this.props.author,
                    version: this.props.version,
                    description: this.props.description,
                    licence: this.props.licence,
                }
            );
            this.fs.copyTpl(
                this.templatePath('_webpack.config.js'),
                this.destinationPath('webpack.config.js'), {
                    name: this.props.name
                }
            );
            this.fs.copy(
                this.templatePath('_gitignore'),
                this.destinationPath('.gitignore')
            );
            this.fs.copyTpl(
                this.templatePath('_readme.md'),
                this.destinationPath('readme.md'), {
                    name: this.props.name
                }
            );
        },

        //Copy application files
        app: function() {
            this.fs.copy(
                this.templatePath('_app/_index.html'),
                this.destinationPath('app/index.html')
            );
            this.fs.copy(
                this.templatePath('_app/_app.js'),
                this.destinationPath('app/app.js')
            );
            this.fs.copy(
                this.templatePath('_app/_styles/_app.scss'),
                this.destinationPath('app/styles/app.scss')
            );
            this.fs.copy(
                this.templatePath('_app/_favicon.ico'),
                this.destinationPath('app/favicon.ico')
            );
            this.fs.copy(
                this.templatePath('_app/_images/_yeoman.png'),
                this.destinationPath('app/images/yeoman.png')
            );
            this.composeWith('yo-test:component', {
                options: {
                    fromParent: true,
                    name: 'Main'
                }
            });
        }
    },

    //Install Dependencies
    install: function() {
        //Dev Dependencies
        this.npmInstall(
            ['webpack', 'webpack-dev-server', 'babel-preset-react', 'babel-preset-es2015',
                'babel-loader', 'babel-core', 'babel-preset-react', 'babel-preset-stage-0',
                'css-loader', 'foundation-sites', 'jquery@2.2.1', 'node-sass', 'sass-loader',
                'script-loader', 'style-loader', 'react-redux', 'redux'
            ], {
                'saveDev': true
            }
        );
        //Dependencies
        this.npmInstall(
            ['react', 'react-dom', 'react-router', 'axios'], {
                'save': true
            }
        );
    }
});
