#!/bin/bash
echo "Starint build script"
exec git clone "https://github.com/Novicell/novicell-components ./src" && npm run fractal:build && npm run build:prod
