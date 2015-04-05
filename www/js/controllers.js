angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('SelectRestaurantCtrl', function($scope) {})

.controller('NewRestaurantCtrl', function($scope, $state) {
	$scope.newRestaurant = function(){
		$state.go("tab.myshelf");	
	};	
})

.controller('MyRestaurantCtrl', function($scope, $ionicModal, $state) {
	//Create and Load the Modal
	$ionicModal.fromTemplateUrl('myrestaurant.html', {
    scope: $scope
    }).then(function (modal) {
        $scope.myRestaurantModal = modal;
    });
	
	//Open our new task modal
	$scope.showMyRestaurantModal = function(){
		$scope.myRestaurantModal.show();
	};
	
	//Close the new task modal
	$scope.closeMyRestaurantModal = function(){
		$scope.myRestaurantModal.hide();	
	};
	
	$scope.updateRestaurant = function(){
		$scope.myRestaurantModal.hide();	
		$state.go("tab.myshelf");	
	};
})

.controller('MyShelfCtrl', function($scope, $ionicModal, $timeout, $state) {
	//Create and Load the Modal
	$ionicModal.fromTemplateUrl('myshelf.html', {
    scope: $scope
    }).then(function (modal) {
        $scope.myShelfModal = modal;
    });
	
	//Open our new task modal
	$scope.showMyShelfModal = function(){
		$scope.myShelfModal.show();
	};
	
	//Close the new task modal
	$scope.closeMyShelfModal = function(){
		$scope.myShelfModal.hide();	
	};

	$scope.$on('$ionicView.enter', function () {
		$scope.showMyShelfModal();
	});
	
	//Create and Load the Modal (for adding a new shelf)
	$ionicModal.fromTemplateUrl('newshelf.html', {
    scope: $scope
    }).then(function (modal) {
        $scope.newShelfModal = modal;
    });
	
	//Open our new task modal
	$scope.showNewShelfModal = function(){
		$scope.newShelfModal.show();
	};
	
	//Close the new task modal
	$scope.closeNewShelfModal = function(){
		$scope.newShelfModal.hide();	
	};
	
	
	$scope.newRestaurant = function(){
		$scope.closeNewShelfModal();
		$state.go("tab.newrestaurant");	
	};
})


.controller('FavouriteCtrl', function($scope, $ionicModal, $state) {
	//Create and Load the Modal
	$ionicModal.fromTemplateUrl('rand-restaurant.html', function(modal) {
		$scope.randRestaurantModal = modal;
	}, {
		scope: $scope,
	});
	
	//Open our new task modal
	$scope.randRestaurant = function(){
		$scope.randRestaurantModal.show();
	};
	
	//Close the new task modal
	$scope.closeRandRestaurant = function(){
		$scope.randRestaurantModal.hide();	
	};
	
	$scope.selRandRestaurant = function(){
		$scope.randRestaurantModal.hide();	
		$state.go("tab.account");	
	};
	 
})

.controller('SettingsCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});



