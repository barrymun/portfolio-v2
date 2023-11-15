import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
    assetsInclude: ['**/*.glb'],
    plugins: [tsconfigPaths()],
});
