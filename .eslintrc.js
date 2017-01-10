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
    "no-shadow": "warn",
    "no-redeclare": "warn",
    "no-param-reassign": "warn",
    "object-shorthand": "warn",
    "no-use-before-define": "off",
    "no-nested-ternary": "off",
    "quote-props": "off",
    "max-len": "off",
    "no-console": "off",
    "eol-last": "off",
    "one-var": "off",
    "comma-dangle": "off",
    "consistent-return": "off",
    "no-extra-boolean-cast": "off",
    "class-methods-use-this": "off",
    "no-underscore-dangle": "off",
    "no-mixed-operators": "off",
    "no-plusplus": "off",
    "default-case": "off",
    "func-names": "off",
    "space-before-function-parentheses": "off",
    "import/no-extraneous-dependencies": 0, // disable
    "import/prefer-default-export": 1,
    "import/extensions": 0,
    "jsx-a11y/no-static-element-interactions": 0,
    "react/self-closing-comp": 1,
    "meteor/audit-argument-checks": 0
  },
};