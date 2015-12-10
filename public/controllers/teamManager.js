angular.module('Retrospection').controller('TeamManager', ['$scope', '$state', 'AuthenticationService', 'teams', 'Socket',
	function($scope, $state, AuthenticationService, teams, Socket) {
		$scope.authentication = AuthenticationService;
		$scope.teams = teams.data;
		$scope.team = {};
		$scope.newTeam = {};
		$scope.createTeamSuccess = false;
		$scope.createTeamError = false;

		$scope.changeTeam = function(isValid) {
			if(isValid) {
				AuthenticationService.updateTeam($scope.team, $scope.authentication.user._id).
					then(function(response) {
						if(response.data.success) {
							AuthenticationService.user.team = response.data.user.team;
							$state.go('profile');
						}
					});
			}
		};

		Socket.on('team.added', function(){
			AuthenticationService.getTeamsList().then(function(response){
				$scope.teams = response.data;
			});
		});

		$scope.createTeam = function(isValid) {
			if(isValid) {
				AuthenticationService.createTeam($scope.newTeam).then(function(response) {
					if(response.data.success) {
						$scope.createTeamSuccess = true;
						$scope.newTeam.teamName = '';	
					} else {
						$scope.createTeamError = true;
					}		
				});
			}
		}
	}
]);