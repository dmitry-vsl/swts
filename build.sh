set -e

cp node_modules/@swc/wasm-typescript/wasm.js wasm.js
sed -i.bak '/const.*TextEncoder.*require/d' wasm.js
sed -i.bak 's/node:buffer/buffer/' wasm.js
rm wasm.js.bak
npx browserify src/index.js -o service-worker.js
