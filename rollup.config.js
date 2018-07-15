import typescript from 'rollup-plugin-typescript2'
import sourceMaps from 'rollup-plugin-sourcemaps'
import uglify from 'rollup-plugin-uglify'

export default {
	input: './index.ts',
  output: [
    {
      file: 'lib/rook-ecs.min.js',
      name: 'Rook',
      format: 'umd',
      sourcemap: true
    }
  ],
	plugins: [
		typescript({
      cacheRoot: `${require('temp-dir')}/.rpt2_cache`,
      tsconfigOverride: {
        compilerOptions: {
          declaration: false
        },
        include: [
          'src',
          'index.ts'
        ]
      }
    }),
    sourceMaps(),
    uglify(),
  ]
}
