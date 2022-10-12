const { MomentumAbstractType, mfs, mconvert } = require('momentum-constructor-common');
const path = require('path');
const path_output = path.resolve(__dirname, '../src/icon-colored');

const buildIconColored = async ()=> {
    mfs.clean(path_output);
    let files = mfs.read(MomentumAbstractType['icon-colored']);
    //rename
    files = mconvert.renameFile(files, {
        pattern: /\-/g,
        words: '@'
    });
    mfs.saveFiles(files, path_output);
};

exports.buildIconColored = buildIconColored;