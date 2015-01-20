## Contribution Guidelines

When you commit your messages, follow this convention :
`<type>: <subject> <BLANK LINE> <optional message>`

For example:
```no-highlight
feat: add validation commit msg file


Installation:

The following types are accepted in the commit messages:
- feat
- fix
- docs
- style
- refactor
- perf
- test
- chore
- revert

But only feat/fix/docs/perf will be in the changelog.

If you do a breaking change, add an explanation preceded by `BREAKING CHANGE: `. For example:
```no-highlight
fix: remove deprecated promise unwrapping

BREAKING CHANGE: promise unwrapping has been removed.
It can no longer be turned on.
```

If you want to reference an issue, you can add a new line with either `Closes` or `Fixes` followed by the issue number. For example:
```no-highlight
feat: add changelog auto generation

Fixes #62
```

You can fix / close multiple issue with one commit, just add a new line for each.
