// Configuration pour lancer les tests avec un chrome headless dans le cas d'une pipeline d'intégration continue.

// Importer la configuration de base.
var properties = null;
var originalConfigFn = require('./karma.conf.js');
originalConfigFn({
  set: function (arg) {
    properties = arg;
  },
});

// Faire les modifications.
properties.browsers = ['ChromeHeadlessNoSandbox'];
properties.autoWatch = false;
properties.singleRun = true;
properties.restartOnFileChange = false;

// Exporter la nouvelle configuration.
module.exports = function (config) {
  config.set(properties);
};
