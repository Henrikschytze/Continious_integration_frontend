#!/bin/bash
set -e
#Color variable green
GREEN='tput setaf 2'
#Function for cloning the repo and copying it into the src
clone_components()
{
echo "${GREEN}Starting clone and build scripts"
git clone https://github.com/Henrikschytze/novicell-components.git tmp_src 
cp -a -rf ./tmp_src/* ./src/
copy_dependencies
rm -rf ./tmp_src
echo "${GREEN}Components copied to ./src"
}
copy_dependencies()
{
echo "${GREEN}Attempting to add to package.json" 
node ./src/copyDependencies.js 
echo "${GREEN}installing new dependencies..."
npm install 
}
#Function for running actual build commands
build_site()
{ 
echo "${GREEN}Building site"
npm run build:prod
npm run fractal:build 
}
clone_components
build_site 