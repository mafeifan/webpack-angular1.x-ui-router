// module.exports = dashboardModule => {
//   dashboardModule.controller('dashboardController',
//     function ($rootScope, $scope, $state, apiRequest) {
//       $rootScope.userInfo = window._DB.get('userInfo');
//       apiRequest.get('list')
//         .then(res => {
//           $scope.list = res.data
//         });
//
//       $scope.logout = () => {
//         localStorage.clear();
//         $state.go('login');
//       }
//     });
// };

export default function ($rootScope, $scope, $state, apiRequest) {
  $rootScope.userInfo = window._DB.get('userInfo');
  apiRequest.get('list')
    .then(res => {
      $scope.list = res.data
    });

  $scope.logout = () => {
    localStorage.clear();
    $state.go('login');
  }
}
