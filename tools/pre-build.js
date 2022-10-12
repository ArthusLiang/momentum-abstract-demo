const { buildColor } = require('./build-color');
const { buildIcon } = require('./build-icon');
const { buildFont } = require('./build-font');
const { buildSonic } = require('./build-sonic');
const { buildIllustration } = require('./build-illustration');

const _build =  async ()=> {
    await buildColor();
    await buildIcon();
    await buildFont();
    await buildSonic();
    await buildIllustration();
}

_build();