#简介说明

> 作者：小兵
> 来源：项目重构
> 下面是简易说明，更多说明：https://github.com/conventional-changelog/commitlint#config

1. 作用：根据 commitlint-config-conventional（基于 Angular 约定）的常见类型可以是(用于说明 commit 的类别，只允许使用下面 11 个标识):
   build
   ci
   chore
   docs
   feat
   fix
   perf
   refactor
   revert
   style
   test

```
        feat：新功能（feature）
        fix：修补bug
        docs：文档（documentation）
        style： 格式（不影响代码运行的变动）
        refactor：重构（即不是新增功能，也不是修改bug的代码变动）
        test：增加测试
        chore：构建过程或辅助工具的变动
        bug：这个是自定义的，注意不能用中文

    module.exports = {
    extends: ['@commitlint/config-conventional'],
        rules: {
            "type-enum": [
                2,
                "always",
                ["feat", "fix", "docs", "style", "refactor", "test", "chore", "revert","bug"]
            ],
            "subject-full-stop": [0, "never"],
            "subject-case": [0, "never"]
            }
    };

```
