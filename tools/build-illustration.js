const { MomentumAbstractType, mfs, mcommon } = require('momentum-constructor-common');
const path = require('path');
const path_output = path.resolve(__dirname, '../src/illustration');

const buildIllustration = async ()=> {
    mfs.clean(path_output);
    mfs.save(path_output, MomentumAbstractType.illustration);
};

exports.buildIllustration = buildIllustration;