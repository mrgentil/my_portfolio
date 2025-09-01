import { copyFileSync } from 'fs'
try {
    copyFileSync('out/index.html', 'out/404.html')
    console.log('Created out/404.html for GitHub Pages SPA routing.')
} catch (e) {
    console.error('Could not create 404.html:', e)
}