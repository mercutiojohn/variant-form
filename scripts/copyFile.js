const fs = require('fs');
const path = require('path');

const homeDir = process.cwd();

const targetFolderPath = process.env.TARGET_FOLDER || process.argv[2] || '../../proj-template/xcom-admin/src/utils/vform/designer/';

if(!fs.existsSync(targetFolderPath)) {
    fs.mkdirSync(targetFolderPath, {
        recursive: true
    });
}

const filesToCopy = [
    'VFormDesigner.css',
    'VFormDesigner.umd.js',
    'VFormDesigner.umd.js.map',
];

filesToCopy.forEach((file) => {
    const sourcePath = path.join(homeDir, 'dist', 'lib', file);
    const targetPath = path.join(targetFolderPath, file);
    fs.copyFileSync(sourcePath, targetPath, fs.constants.COPYFILE_REPLACE);
    console.log(`${file}已成功导入${targetFolderPath}`)
})
