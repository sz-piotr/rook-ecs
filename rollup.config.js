import typescript from 'rollup-plugin-typescript2'
import sourceMaps from 'rollup-plugin-sourcemaps'
import uglify from 'rollup-plugin-uglify'
import dtsBundleGenrator from 'dts-bundle-generator'

const pkg = require('./package.json')
const isProduction = process.env.npm_lifecycle_event === 'build'

export default {
	input: './src/index.ts',
  output: [
    {
      file: pkg.main,
      name: 'Rook',
      format: 'umd',
      sourcemap: true
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true
    }
  ],
	plugins: [
		typescript({
      cacheRoot: `${require('temp-dir')}/.rpt2_cache`,
      useTsconfigDeclarationDir: true
    }),
    sourceMaps(),
    isProduction && uglify(),
    isProduction && dtsBundle({
      inputFile: './lib/types/index.d.ts',
      outputFile: './lib/rook-ecs.d.ts'
    })
  ]
}

function dtsBundle (options) {
  const cache = Object.create(null)

  return {
    name: 'dts-bundle',
    onwrite () {
      const bundle = generateDtsBundle(options.inputFile)
      const fs = require('fs')
      const path = require('path')
      fs.writeFileSync(
        path.resolve(__dirname, options.outputFile),
        bundle,
        'utf-8'
      )
    }
  }

  function generateDtsBundle (inputFile) {
    if (cache[inputFile]) {
      return cache[inputFile]
    }

    var consoleLog = console.log
    console.log = function () {}

    const bundle = dtsBundleGenrator.generateDtsBundle('./lib/types/index.d.ts')
    cache[inputFile] = bundle

    console.log = consoleLog

    return bundle
  }
}
