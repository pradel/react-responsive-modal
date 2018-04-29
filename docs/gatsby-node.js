const path = require('path');

exports.modifyWebpackConfig = ({ config, stage }) => {
  config.merge(current => {
    if (!current.resolve.alias) {
      current.resolve.alias = {};
    }
    current.resolve.alias['react-responsive-modal'] = path.join(
      __dirname,
      '../lib/'
    );
    return current;
  });
};
