#!/bin/bash
set -e
#Function for cloning the repo and copying it into the src
clone_components()
{
echo "Starting clone and build scripts"
git clone https://github.com/Henrikschytze/novicell-components.git tmp_src 
cp -a -rf ./tmp_src/* ./src/ 
rm -rf ./tmp_src
echo "Components copied to ./src"
}
#Function for running actual build commands
build_site()
{ 
echo "Building site"
npm run build:prod
npm run fractal:build 
}
clone_components
build_site 