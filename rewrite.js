const fs = require('fs');
const path = require('path');

function replaceNextWithReactRouter(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            replaceNextWithReactRouter(fullPath);
        } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js') || fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
            let content = fs.readFileSync(fullPath, 'utf-8');
            let originalContent = content;
            
            // Replace next/link with react-router-dom Link
            content = content.replace(/import Link from ['"]next\/link['"];?/g, 'import { Link } from "react-router-dom";');

            // Replace next/navigation
            content = content.replace(/import \{.*?useRouter.*?\} from ['"]next\/navigation['"];?/g, 'import { useNavigate } from "react-router-dom";');
            content = content.replace(/useRouter\(\)/g, 'useNavigate()');
            content = content.replace(/\.push\(/g, '('); // router.push('/path') -> navigate('/path')
            
            // Fix usePathname -> useLocation
            content = content.replace(/import \{.*?usePathname.*?\} from ['"]next\/navigation['"];?/g, 'import { useLocation } from "react-router-dom";');
            content = content.replace(/usePathname\(\)/g, 'useLocation().pathname');

            // Replace next/image with standard img
            content = content.replace(/import Image from ['"]next\/image['"];?/g, '');
            content = content.replace(/<Image/g, '<img');

            if (content !== originalContent) {
                fs.writeFileSync(fullPath, content, 'utf-8');
            }
        }
    }
}

replaceNextWithReactRouter('src/components/al_hikmath');
replaceNextWithReactRouter('src/al_hikmath_app');
