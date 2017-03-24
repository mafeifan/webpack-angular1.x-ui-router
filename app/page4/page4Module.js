export default Angular => {
    const ngPage4Module = Angular.module('page4App', []);
    require('./page4.scss');
    require('./page4Service')(ngPage4Module);
    require('./page4Controller')(ngPage4Module);
}
