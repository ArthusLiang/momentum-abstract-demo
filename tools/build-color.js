const { MomentumAbstractType, mfs, mconvert } = require('momentum-constructor-common');
const write = require('write');
const path = require('path');

const path_output = path.resolve(__dirname, '../src/color');

const rgbaStr = (rgba)=> {
    return `rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a})`
};

const generateScss = (file) => {
    let _scss = [];
    Object.values(file.content).forEach((subObj)=>{
        Object.keys(subObj).forEach((key)=>{
            if(subObj[key].rgba) {
                _scss.push(`$${key}:${rgbaStr(subObj[key].rgba)};`);
            } else {
                const _line = [];
                Object.values(subObj[key].colors).forEach((_color)=>{
                    _line.push(rgbaStr(_color.rgba));
                });
                _scss.push(`$${key}:linear-gradient(${_line.join(',')});`);
            }
        });
    });
    write.sync(path.join(path_output, `${file.name}.scss`), _scss.join('\n'), { overwrite: true });
};

const buildColor = async ()=> {
    // read files
    let files = mfs.read(MomentumAbstractType.color);

    // save json
    mfs.saveFiles(files, path_output);

    // flat struct
    files = mconvert.flat(files, MomentumAbstractType.color);

    // save scss
    Object.values(files).forEach((file)=>{
        generateScss(file);
    });

    // save renamed files
    // rename token
    files = mconvert.renameToken(files, {
        pattern: /\-/,
        words: '@'
    });
    
    // rename file
    files = mconvert.renameFile(files, {
        pattern: /core/g,
        words: 'main'
    });
    mfs.saveFiles(files, path.join(path_output, 'rename'));

};

exports.buildColor = buildColor;