import typescript from 'rollup-plugin-typescript2'
import sourceMaps from 'rollup-plugin-sourcemaps'
import uglify from 'rollup-plugin-uglify'

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
    isProduction && uglify()
  ]
}
