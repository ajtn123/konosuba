import { readFileSync, readdirSync, statSync } from 'fs';
import { join, relative } from 'path';

function* walkDir(dir) {
    const dirs = [dir];
    while (dirs.length > 0) {
        const current = dirs.pop();
        const entries = readdirSync(current, { withFileTypes: true });
        for (const entry of entries) {
            const fullPath = join(current, entry.name);
            if (entry.isDirectory()) {
                dirs.push(fullPath);
            } else if (entry.isFile() && entry.name.endsWith('.md')) {
                yield fullPath;
            }
        }
    }
}

const docsReadDir = join(process.cwd(), 'docs', 'read');
let hasError = false;
let totalFiles = 0;
let totalPairs = 0;

for (const filePath of walkDir(docsReadDir)) {
    const content = readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');

    let openCount = 0;
    let closeCount = 0;
    let lineDetails = [];

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const opens = (line.match(/「/g) || []).length;
        const closes = (line.match(/」/g) || []).length;

        if (opens > 0 || closes > 0) {
            lineDetails.push({
                lineNum: i + 1,
                opens,
                closes,
                text: line.trim().substring(0, 80)
            });
        }

        openCount += opens;
        closeCount += closes;
    }

    const relPath = relative(docsReadDir, filePath);
    totalFiles++;

    if (openCount !== closeCount) {
        console.log(`\n❌ ${relPath}`);
        console.log(`   『: ${openCount}, 』: ${closeCount}  (差 ${openCount - closeCount})`);
        for (const detail of lineDetails) {
            if (detail.opens !== detail.closes) {
                console.log(`   L${detail.lineNum}: 『×${detail.opens} 』×${detail.closes}  ${detail.text}`);
            }
        }
        hasError = true;
    } else {
        totalPairs += openCount;
        console.log(`✅ ${relPath}  (${openCount} 对)`);
    }
}

console.log(`\n========== 总结 ==========`);
console.log(`检查文件数: ${totalFiles}`);
console.log(`「」总对数: ${totalPairs}`);
if (hasError) {
    console.log('❌ 存在不匹配的文件！请修复上述问题。');
} else {
    console.log('✅ 所有文件中的「」都完美成对出现！');
}
