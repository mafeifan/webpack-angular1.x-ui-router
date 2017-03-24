let page4Controller = function(page4Service){
    let vm = this;


    page4Service.test().then(res => {
        vm.title = res.data.email;
        vm.pets = [
            {name: 'Ellie'},
            {name: 'Mr. Fish'},
            {name: 'Stella'},
            {name: 'Stuby'}
        ];
    })
};

export default ngModule => {
    ngModule.controller('Page4Controller', page4Controller);
}