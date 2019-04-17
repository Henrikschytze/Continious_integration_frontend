#!/bin/bash
echo "Starting build script"
git clone https://github.com/Novicell/novicell-components.git tmp_src && cp -a -rf ./tmp_src/* ./src/ && rm -rf ./tmp_src && npm run fractal:build && npm run build:prod
echo "Components copied to ./src"