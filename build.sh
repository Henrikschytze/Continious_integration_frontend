#!/bin/bash
echo "Starting build script"
exec git clone https://github.com/Novicell/novicell-components.git tmp_src 
exec cp -a -rf ./tmp_src/* ./src/ 
exec rm -rf ./tmp_src 
exec npm run fractal:build 
exec npm run build:prod
echo "Components copied to ./src"