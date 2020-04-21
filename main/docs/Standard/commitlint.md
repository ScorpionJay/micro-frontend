# commit 代码校验

```
  "precommit": "lint-staged"
  },
  "lint-staged": {
    "src/**/*": [
      "prettier --write  \"./**/*.{js,jsx,css,less,md,json}\"",
      "eslint --fix",
      "git add"
    ]
  },
```

> commitlint

```
npm install --save-dev @commitlint/config-conventional @commitlint/cli

echo "module.exports = {extends: ['@commitlint/config-conventional']};" > commitlint.config.js
```

```
"husky": {
    "hooks": {
      "pre-commit": "npm run test",
      "commit-msg": "commitlint -e $HUSKY_GIT_PARAMS"
    }
  }
```

- [commitlint](https://github.com/conventional-changelog/commitlint)
- [@commitlint/config-conventional](https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-conventional)

```

> 提交格式

<type>: <subject>

> 常用type

  upd：更新某功能（不是 feat, 不是 fix）
  feat：新功能（feature）
  fix：修补bug
  docs：文档（documentation）
  style： 格式（不影响代码运行的变动）
  refactor：重构（即不是新增功能，也不是修改bug的代码变动）
  test：增加测试
  chore：构建过程或辅助工具的变动


[
  'build',
  'ci',
  'chore',
  'docs',
  'feat',
  'fix',
  'perf',
  'refactor',
  'revert',
  'style',
  'test'
];
echo "foo: some message" # fails
echo "fix: some message" # passes

```

[参考](https://segmentfault.com/a/1190000017790694)

## REF

- https://github.com/typicode/husky
- https://github.com/okonet/lint-staged
