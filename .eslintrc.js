module.exports = {
  "extends": [
  	"airbnb", 
  	"plugin:meteor/recommended"
  ],
  "installedESLint": true,
  "plugins": [
    "react",
    "jsx-a11y",
    "import",
    "meteor"
  ],
  "env": {
    "browser": true,
    "node": true,
    "meteor": true
  },
  "settings": {
    "import/resolver": "meteor"
  },
  "rules": {
    "no-undef": "warn",
    "no-unused-vars": "warn",
    "no-multiple-empty-lines": "warn",
    "max-len": "off",
    "no-console": "off",
    "eol-last": "off",
    "comma-dangle": "off",
    "consistent-return": "off",
    "no-extra-boolean-cast": "off",
    "class-methods-use-this": "off",
    "no-underscore-dangle": "off",
    "no-mixed-operators": "off",
    "no-plusplus": "off",
    "default-case": "off",
    "import/no-extraneous-dependencies": "off", // disable
    "import/extensions": 0,
    "jsx-a11y/no-static-element-interactions": 0
  },
};