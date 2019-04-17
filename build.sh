#!/bin/bash
build_site()
{
git clone https://github.com/Novicell/novicell-components.git tmp_src 
cp -a -rf ./tmp_src/* ./src/ 
rm -rf ./tmp_src 
npm run fractal:build 
npm run build:prod
}
echo "Starting build script"
build_site
echo "Components copied to ./src"