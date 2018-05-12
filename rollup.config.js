import typescript from 'rollup-plugin-typescript2'
import sourceMaps from 'rollup-plugin-sourcemaps'

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
      cacheRoot: `${require('temp-dir')}/.rpt2_cache`
    }),
    sourceMaps()
  ]
}
