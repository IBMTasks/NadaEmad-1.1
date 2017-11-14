
app.controller("mainController",['$scope',"$rootScope","appLabelsEn",function ($rootScope,$scope,$location,$translate,appLabelsEn) {

    $scope.active = 0;
    $scope.myInterval = 3000;
    $scope.noWrapSlides = false;
    var slides = $scope.slides = [
        {image:'../../images/top-section-bg.png',id:'0',title:'aboutusVision', text:'aboutusVisionText'},
        {image:'../../images/top-section-bg2.png',id:'1',title:'aboutusMission',text:'aboutusMissionText'},
        {image:'../../images/top-section-bg4.png',id:'2',title:'aboutusTeam',text:'aboutusTeamText'}];

   



}]);