import { readFileSync, readdirSync } from 'fs';
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

for (const filePath of walkDir(docsReadDir)) {
    const content = readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    const relPath = relative(docsReadDir, filePath);
    totalFiles++;

    let fileHasIssue = false;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        let depth = 0;
        const opens = []; // positions of unmatched '「'

        for (let j = 0; j < line.length; j++) {
            const ch = line[j];

            if (ch === '「') {
                if (depth > 0 && (j === 0 || line[j - 1] !== '「')) {
                    if (!fileHasIssue) {
                        console.log(`\n❌ ${relPath}`);
                        fileHasIssue = true;
                        hasError = true;
                    }
                    const prev = j > 0 ? line[j - 1] : '·';
                    console.log(`   L${i + 1} Col${j}: 嵌套「 前面是「${prev}」, depth=${depth}`);
                    console.log(`   ${line.trim().substring(0, 100)}`);
                }
                opens.push(j);
                depth++;
            }

            if (ch === '」') {
                if (depth > 1) {
                    const nextCh = j + 1 < line.length ? line[j + 1] : '·';
                    if (nextCh !== '」') {
                        if (!fileHasIssue) {
                            console.log(`\n❌ ${relPath}`);
                            fileHasIssue = true;
                            hasError = true;
                        }
                        console.log(`   L${i + 1} Col${j}: 嵌套」后面是「${nextCh}」, depth=${depth}`);
                        console.log(`   ${line.trim().substring(0, 100)}`);
                    }
                }
                opens.pop();
                depth--;
            }
        }

        // Check for unmatched opens at end of line (cross-line)
        if (depth > 0 && opens.length > 0) {
            // This is a cross-line quote, which is fine for this checker
        }
    }

    if (!fileHasIssue) {
        console.log(`✅ ${relPath}`);
    }
}

console.log(`\n========== 总结 ==========`);
console.log(`检查文件数: ${totalFiles}`);
if (hasError) {
    console.log('❌ 存在嵌套引号问题！请修复上述内容。');
} else {
    console.log('✅ 所有文件中的「」都没有非法嵌套！');
}
