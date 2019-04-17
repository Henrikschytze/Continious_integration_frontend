#!/bin/bash
echo "Starting build script"
exec git clone https://github.com/Novicell/novicell-components.git tmp_src 2>&1 | tee output.txt && cp -a -rf ./tmp_src/* ./src/ 2>&1 | tee output.txt && rm -rf ./tmp_src 2>&1 | tee output.txt && npm run fractal:build && npm run build:prod
echo "Components copied to ./src"