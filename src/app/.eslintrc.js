module.exports = {
  extends: "airbnb",
  env: {
    browser: true
  },
  rules:{
    "linebreak-style": 0,
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "react/prop-types": 0,
    "react/prefer-stateless-function": [0, { "ignorePureComponents": true }],
    "class-methods-use-this": [1, { "exceptMethods": ["componentDidMount"] }],
    "prefer-destructuring": ["error", {
      "VariableDeclarator": {
        "array": false,
        "object": false
      },
      "AssignmentExpression": {
        "array": false,
        "object": false
      }
    }, {
      "enforceForRenamedProperties": false
    }],
    "import/prefer-default-export": "off",
    "max-len": [1, 80, 2, {
      "ignoreTemplateLiterals": true
    }],
    "jsx-a11y/anchor-is-valid": "off",
    "jsx-a11y/href-no-hash": "off"
  },
  plugins: [
    "react"
  ]
}