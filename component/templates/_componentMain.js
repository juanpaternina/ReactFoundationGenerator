var React = require('react');
const Api = require('Api');

var <%= name %> = (props) => {
  return (
    <h1>Your Great <%= name %> component </h1>
  );
}

module.exports = <%= name %>;

// Api.getSomethingEx().then((value) => {
//   console.log(value);
// }).catch((err) => {
//   console.log(err);
// })
