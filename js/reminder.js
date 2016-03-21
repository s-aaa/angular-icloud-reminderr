var reminder=angular.module('reminder',[]);
reminder.filter('search',[function(){
	return function(data,key){
		var itemskey=function(items){
			for (var i = 0; i < items.length; i++) {
				if (items[i].title.indexOf(key)!=-1) {
					return true;
				}
			}
			return false;
		}
		var r=[];
		for (var i = 0; i < data.length; i++) {
			if (data[i].name.indexOf(key)!=-1) {
				r.push(data[i])
			}
			if (itemskey(data[i].items)) {
				var re=[];
				for (var j = 0; j < data[i].items.length; j++) {
					if (data[i].items[j].title.indexOf(key)!=-1) {
						re.push(data[i].items[j])
					}
				}
				data[i].items=re;
				r.push(data[i])
			}
		}
		return r;
	}
}])
reminder.controller('rdCtrl', ['$scope', function($scope){
	// angular.copy() 深拷贝一个对象或者数组
	var d=localStorage.data;
	$scope.shijianliebiao=d?JSON.parse(d):[];
	$scope.clistindex=0;
	$scope.copy=angular.copy($scope.shijianliebiao)

	$scope.showlist=function(index){
		$scope.clistindex=index;
		$scope.key=null;
	}
	
	
	$scope.colors=['purple','blue','green','yellow','brow','pink','orange'];

	$scope.addItem=function(){
		var data={name:'新列表'+ ($scope.shijianliebiao.length),color:$scope.colors[$scope.shijianliebiao.length % 7],items:[]};
		$scope.shijianliebiao.push(data);
		localStorage.data=JSON.stringify($scope.shijianliebiao);
	} 

	$scope.countDone=function(){
		var lis=$scope.shijianliebiao[$scope.clistindex].items;
		var r=0;
		for (var i = 0; i < lis.length; i++) {
			if (lis[i].isdone) {
				r+=1;
			}
		}
		return r;
	}

	$scope.deleteItem=function() {
		var r=[];
		for (var i = 0; i < $scope.shijianliebiao.length; i++) {
			if ($scope.shijianliebiao.length==1) {
				r.push($scope.shijianliebiao[i]);

			}else{
				if (i!=$scope.clistindex) {
				r.push($scope.shijianliebiao[i]);
			}
				
			}
		}
		$scope.shijianliebiao=r;
		localStorage.data=JSON.stringify($scope.shijianliebiao);
		$scope.clistindex=0;
	}

	$scope.addTodo=function(){
		var cu=$scope.shijianliebiao[$scope.clistindex].items;
		var data={title:'新条目'+(cu.length+1),isdone:false};
		cu.push(data);
		localStorage.data=JSON.stringify($scope.shijianliebiao)

	}

	$scope.deleteTodo=function(index){
		var cu=$scope.shijianliebiao[$scope.clistindex].items;
		var r=[];
		for (var i = 0; i < cu.length; i++) {
			if(i!=index){
				r.push(cu[i]);
			}
		}
		$scope.shijianliebiao[$scope.clistindex].items=r;
		localStorage.data=JSON.stringify($scope.shijianliebiao);
	}

	$scope.save=function(){
		localStorage.data=JSON.stringify($scope.shijianliebiao);
	}

	$scope.wancheng=function(){
		var youinput=document.querySelector('.you-input');
		var youtitle=document.querySelector('.youtitle');
		var zuoinput=document.querySelector('.zuoinput');
		var xuanxaingbox=document.querySelector('.xuanxaingbox');
		if (youinput.value) {
			youtitle.innerHTML=youinput.value;
			zuoinput.value=youinput.value;
			$scope.shijianliebiao[$scope.clistindex].name=youinput.value;
		}
			
	}
	$scope.quxiao=function(){
		var youinput=document.querySelector('.you-input');
		youinput.value=null;
	}
	// var liss=document.querySelectorAll('.yiwanchengul');
	// liss[0].onclick=function(e){
	// 	var el=e.target;
	// 	el.setAttribute('class','red');
	// }
	

}])