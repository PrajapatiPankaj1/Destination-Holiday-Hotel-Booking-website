import fs from 'fs';
import path from 'path';

const directory = './src';

const rebrandFile = (filePath) => {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        if (content.includes('£')) {
            content = content.replace(/£/g, '₹');
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`✅ Rebranded currency to ₹ in: ${filePath}`);
        }
    } catch (err) {
        console.error(`❌ Failed to read/write file: ${filePath}`, err.message);
    }
};

const traverseDirectory = (dir) => {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            traverseDirectory(fullPath);
        } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
            rebrandFile(fullPath);
        }
    });
};

try {
    console.log('🔄 Starting ShopVibe Currency Rebranding Tool...');
    traverseDirectory(directory);
    console.log('🎉 Successfully rebranded all frontend files to Indian Rupees (₹)!');
} catch (error) {
    console.error('❌ Error during rebranding process:', error.message);
}