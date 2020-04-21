# stylelint

[user guide](https://stylelint.io/user-guide/get-started)

1. install

```
npm install --save-dev stylelint stylelint-config-standard

```

2. Create a .stylelintrc.json configuration file in the root of your project:

```
{
  "extends": "stylelint-config-standard"
}
```

3. Run stylelint on, for example, all the CSS files in your project:

```
   npx stylelint "\*_/_.css"
```
