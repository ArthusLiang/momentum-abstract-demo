const { MomentumAbstractType, mfs, mcommon } = require('momentum-constructor-common');
const path = require('path');
const write = require('write');
const path_output = path.resolve(__dirname, '../src/sonic');
const buildSonic = async ()=> {
    mfs.clean(path_output);
    let files = mfs.list(MomentumAbstractType.sonic);
    let _data = {};
    files.forEach((name)=>{
        const _arr = name.split('/');
        if(_arr.length>1) {
            const _type = _arr[0];
            const _name = _arr[1];
            if(_data[_type]===undefined) {
                _data[_type] = {};
            }
            _data[_type][path.basename(_name, path.extname(_name))]=_name;
        }
    });
    write.sync(path.join(path_output, 'sonic.json'), JSON.stringify(_data, null, '\t'), { overwrite: true });
    mfs.save(path_output, MomentumAbstractType.sonic);
};

exports.buildSonic = buildSonic;