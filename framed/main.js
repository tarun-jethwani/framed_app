var app = angular.module('myApp', ['ngFileUpload'])

app.controller('dropctrl', function($scope,$http) {
    $scope.levels = ["level1", "level2", "level3", "level4"];

    $scope.level_value=$scope.levels[0];
    $scope.var3='no images yet';


    //---------------push_level() http call to server ---------//
    $scope.push_level = function(){

     $http({
              method : 'GET',
              url : "http://ec2-34-209-125-251.us-west-2.compute.amazonaws.com:3000/levels/" + $scope.level_value,

            }).then(function(response){
                //success callback
                $scope.img_link = response.data;
                console.log(response.data);





               if($scope.img_link!=[])
               {
                 $scope.var3='';
                 $scope.var1=$scope.img_link[0].link;
                 $scope.var2=$scope.img_link[1].link;
               }
               else
               {
                 $scope.var3='no images yet';
                 $scope.var1='';
                 $scope.var2='';
               }


             });

         }});


app.controller('MyCtrl',['Upload','$window',function(Upload,$window){
    var vm = this;
    vm.submit = function(){ //function to call on form submit
        if (vm.upload_form.file.$valid && vm.file) { //check if from is valid
            vm.upload(vm.file); //call upload function
        }
    }

    vm.submit2 = function(){ //function to call on form submit
        if (vm.upload_form2.file2.$valid && vm.file2) { //check if from is valid
            vm.upload(vm.file2); //call upload function
        }
    }



    vm.upload = function (file) {
        Upload.upload({
            url: 'http://ec2-34-209-125-251.us-west-2.compute.amazonaws.com:3000/upload', //webAPI exposed to upload the file
            data:{file:file} //pass file as data, should be user ng-model
        }).then(function (resp) { //upload function returns a promise
            if(resp.data.error_code === 0){ //validate success
                $window.alert('Success ' + resp.config.data.file.name + 'uploaded. Response: ');
            } else {
                $window.alert('an error occured');
            }
        }, function (resp) { //catch error
            console.log('Error status: ' + resp.status);
            $window.alert('Error status: ' + resp.status);
        }
      )
    };
}]);
