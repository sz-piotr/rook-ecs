import typescript from 'rollup-plugin-typescript2'
import sourceMaps from 'rollup-plugin-sourcemaps'
import uglify from 'rollup-plugin-uglify'

const isProduction = process.env.npm_lifecycle_event === 'build'

export default {
	input: './src/main.ts',
  output: {
    file: 'lib/ouyo.js',
    name: 'OUYO',
    format: 'umd',
    sourcemap: true
  },
	plugins: [
		typescript({
      cacheRoot: `${require('temp-dir')}/.rpt2_cache`,
      useTsconfigDeclarationDir: true
    }),
    sourceMaps(),
    isProduction && uglify()
  ]
}
