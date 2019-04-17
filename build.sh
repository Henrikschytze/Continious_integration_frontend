#!/bin/bash
set -e

clone_components()
{
echo "Starting clone and build scripts"
git clone https://github.com/Novicell/novicell-components.git tmp_src 
cp -a -rf ./tmp_src/* ./src/ 
rm -rf ./tmp_src
echo "Components copied to ./src"
build_site 
}
build_site()
{ 
echo "Building site"
npm run fractal:build 
npm run build:prod
}
clone_components
cp -rf /dist/ /build/