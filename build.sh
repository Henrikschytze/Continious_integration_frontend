#!/bin/bash
echo "Starint build script"
exec git clone https://github.com/Novicell/novicell-components.git ./tmp_src && mv -f ./tmp_src/* ./src && npm run fractal:build && npm run build:prod
#!/bin/bash