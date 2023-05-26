# What it is
If your project needs to use custom transformers in the tsconfig.json then you may use [ttypescript](https://github.com/cevek/ttypescript/#readme) to resolve your issue.

However, some tools, like [Mocha](https://mochajs.org/), doesn't allow to pass parameters down to modules (like ts-node).

This is a quick solution to the issue.

# Usages
## Mocha
`mocha --require tts-node`