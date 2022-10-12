const { MomentumAbstractType, mfs, mconvert } = require('momentum-constructor-common');
const write = require('write');
const path = require('path');
const path_output = path.resolve(__dirname, '../src/font');

const getWeight = (w)=> {
    switch(w) {
        case 'thin':
            return 100;
        case 'extra-light':
            return 200;
        case 'light':
            return 300;
        case 'normal':
        case 'regular':
            return 400;
        case 'medium':
            return 500;
        case 'semi-bold':
            return 600;
        case 'bold':
            return 700;
        case 'extra-bold':
            return 800;
        case 'black':
            return 900;
        default:
            let v = parseInt(w);
            return v ? v : 400;
    };
};

const generateScss = (file) => {
    Object.keys(file.content).forEach((key)=>{
        let _scss = [];
        let _css = [];
        let subObj = file.content[key];
        let _name = file.name === 'core' ? '' : `_${key}`;
        let _namePrefix = file.name === 'core' ? '' : `${key}_`;
        Object.keys(subObj).forEach((classKey)=>{
            let _objFrom = subObj[classKey];
            let _objTo = [];
            _objTo.push(`font-size: ${_objFrom.fontSize}px;`);
            _objTo.push(`line-height: ${_objFrom.lineHeight}px;`);
            if(_objFrom.weight!==undefined) {
                _objTo.push(`font-weight: ${getWeight(_objFrom.weight)};`);
            }
            if(_objFrom.decoration!==undefined) {
                _objTo.push(`text-decoration: ${_objFrom.decoration};`);
            }
            _scss.push(`@mixin ${classKey}() {\n\t${ _objTo.join('\n\t') }\n}`);
            _css.push(`.${_namePrefix}${classKey}{ ${ _objTo.join('') } }`);
        });
        write.sync(path.join(path_output, `${file.name}${_name}_mixins.scss`), _scss.join('\n\n'), { overwrite: true });
        write.sync(path.join(path_output, `${file.name}${_name}.scss`), _css.join('\n'), { overwrite: true });
    });
};

const buildFont = async ()=> {
    let files = mfs.read(MomentumAbstractType.font);
    Object.values(files).forEach((file)=>{
        generateScss(file);
    });
    mfs.saveFiles(files, path_output);
};

exports.buildFont = buildFont;