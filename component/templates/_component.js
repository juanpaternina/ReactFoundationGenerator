var React = require('react');
const styles = require('./<%= name %>.scss');
const Api = require('Api');

var <%= name %> = (props) => {
  return (
    <h1>Your <%= name %> component </h1>
  );
}

module.exports = <%= name %>;

// Api.getSomethingEx().then((value) => {
//   console.log(value);
// }).catch((err) => {
//   console.log(err);
// })
