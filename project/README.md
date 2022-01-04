

[TOC]

# app.js



```javascript
var express = require(‘express’);
var app = express();
```

express的路由，众所周知，是app.get(),app.post(),app.all()，。。。，但其实，它们都是app.use的别名。