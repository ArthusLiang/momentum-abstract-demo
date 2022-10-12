const { MomentumAbstractType, mfs, mcommon } = require('momentum-constructor-common');
const path = require('path');
const path_output = path.resolve(__dirname, '../src/icon');

const buildIcon = async ()=> {
    mfs.clean(path_output);
    mfs.save(path_output, MomentumAbstractType.icon, {
        whitelist: mcommon.getRegFromNames(['language_bold.svg'])
    });
};

exports.buildIcon = buildIcon;