angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('SelectRestaurantCtrl', function($scope) {})

.controller('LoginCtrl', function($scope, $firebaseAuth, $location) {
  $scope.login = function(username, password) {
        var fbAuth = $firebaseAuth(fb);
        fbAuth.$authWithPassword({
            email: username,
            password: password
        }).then(function(authData) {
            alert("SUCCESS");
			//$location.path("/tab/dash");
        }).catch(function(error) {
			alert("ERROR: " + error);
            console.error("ERROR: " + error);
        });
    }
 
    $scope.register = function(username, password) {
        var fbAuth = $firebaseAuth(fb);
        fbAuth.$createUser({email: username, password: password}).then(function() {
            return fbAuth.$authWithPassword({
                email: username,
                password: password
            });
        }).then(function(authData) {
			//Store user (paid_account & created_dt) in db after registration
			fb.child("users").child(fb.getAuth().uid).set({
					created_dt: Firebase.ServerValue.TIMESTAMP
			});
            $location.path("/tab/dash");
        }).catch(function(error) {
			alert("ERROR: " + error);
            console.error("ERROR " + error);
        });
    }
})

.controller('NewRestaurantCtrl', function($scope, $state) {
	$scope.newRestaurant = function(restaurant){
		//Array to store user created restaurant
		$scope.restaurant = [];
		
		//Creating restaurant at fb > restaurant
		var newRestaurantRef= fb.child("restaurant");
		var newRestaurantReturnRef = newRestaurantRef.push({
			title: restaurant.title,
			description: restaurant.desc,
			promotion: restaurant.promo,
			contact: restaurant.contact,
			address: restaurant.add
		});
		
		//Get the unique key created by push method
		var newRestaurantKey = newRestaurantReturnRef.key();
		
		//To save the created restaurant at users child location
		var userRef = fb.child("users").child(fb.getAuth().uid);	
		
		//Retrieve the existing restaurant created by the user
		userRef.on("value", function(snapshot) {
			var userData= snapshot.val();
			$scope.restaurant = userData.my_restaurant;
		});
		
		//Push the newly created restaurant (unique key) to the array
		$scope.restaurant.push({
			restaurant_key: newRestaurantKey
		});
		
		//Save it to fb
		userRef.update({	
			my_restaurant: $scope.restaurant
		});
		
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
	//Populate list of user created restaurant(s)
	// Get a reference to our posts
	var userRef = fb.child("users").child(fb.getAuth().uid);
	var restaurantRef = fb.child("restaurant");
	
	$scope.restaurant = [];
	$scope.myListOfRestaurants = [];
	
	// Attach an asynchronous callback to read the data at our posts reference
	userRef.on("value", function(snapshot) {
		var userData= snapshot.val();
		$scope.restaurant = userData.my_restaurant;
		console.log(snapshot.val());
		// Get the user's created restaurant from the Restaurant child in FireBase
		for(var i=0; i < $scope.restaurant.length; i++) {
			var myRestaurantRef = restaurantRef.child($scope.restaurant[i].restaurant_key);
			
			myRestaurantRef.on("value", function(snapshot) {
				var myRestaurant = snapshot.val();
				console.log(snapshot.val());
				$scope.myListOfRestaurants.push(myRestaurant);
				
			}, function (errorObject) {
			  console.log("The read failed: " + errorObject.code);
			});
		}		
		
	}, function (errorObject) {
	  console.log("The read failed: " + errorObject.code);
	});
	

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
		var paid_account = 'N';
		paid_account = window.localStorage['paid_account'];
		if (paid_account != 'Y')
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
		window.localStorage['paid_account'] = 'Y';
		$scope.closeMyShelfModal();
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



