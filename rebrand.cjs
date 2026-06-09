const fs = require('fs');
const path = require('path');

const replacements = [
    { search: /AL HIKMATH PVT LTD/gi, replace: "Sri Ganesh Enterprises" },
    { search: /AL-HIKMATH PVT LTD/gi, replace: "Sri Ganesh Enterprises" },
    { search: /AL HIKMATH/gi, replace: "Sri Ganesh Enterprises" },
    { search: /AL-HIKMATH/gi, replace: "Sri Ganesh Enterprises" },
    { search: /\+91\s*98765\s*43210/g, replace: "+91 91503 10876" }, // Replace AL HIKMATH phone with Sri Ganesh phone
    { search: /\+919876543210/g, replace: "+919150310876" },
];

function replaceInDir(dir) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            replaceInDir(fullPath);
        } else if (/\.(tsx|ts|jsx|js|json|md)$/.test(file)) {
            let content = fs.readFileSync(fullPath, 'utf-8');
            let originalContent = content;

            for (const { search, replace } of replacements) {
                content = content.replace(search, replace);
            }

            if (content !== originalContent) {
                fs.writeFileSync(fullPath, content, 'utf-8');
                console.log(`Updated: ${fullPath}`);
            }
        }
    }
}

['app', 'components', 'data', 'lib'].forEach(replaceInDir);
console.log("Branding replacement complete.");
