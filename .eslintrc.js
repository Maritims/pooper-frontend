module.exports = {
    "parser": "@typescript-eslint/parser",
    "plugins": [
        "svelte3",
        "@typescript-eslint"
    ],
    "overrides": [
        {
            "files": ["**/*.svelte"],
            "processor": "svelte3/svelte3"
        }
    ],
    "rules": {
    },
    "settings": {
        "svelte3/typescript": () => require('typescript')
    },
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    }
}
