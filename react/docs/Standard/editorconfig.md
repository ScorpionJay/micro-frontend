#简介说明

> 作者：小兵
> 来源：项目重构
> 更多说明：# http://editorconfig.org

使用 EditorConfig 配置 IDE 和编辑器＃
EditorConfig 允许您为任何文件类型定义缩进样式和其他空白设置。这样您的编辑器可以自动选择正确的设置。当开发人员使用带有不同行尾的平台时，例如 Mac 和 Windows，这非常方便。

这是一个典型的配置（.editorconfig），具有针对 Markdown，JSON 和 YAML 文件的单独规则：

EditorConfig 有助于维护跨多个编辑器和 IDE 从事同一项目的多个开发人员的一致编码风格。EditorConfig 项目包括一个用于定义编码样式的文件格式和一个文本编辑器插件集合，这些文本编辑器插件使编辑器可以读取文件格式并遵循定义的样式。EditorConfig 文件易于阅读，并且可以与版本控制系统很好地协同工作。

```
root = true

[*]
indent_style = tab
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

[*.{json,yml,md}]
indent_style = space
indent_size = 2

```

.editorconfig
