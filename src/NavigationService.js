import { NavigationActions ,StackActions} from 'react-navigation';

let _navigators = [];

function setTopLevelNavigator(navigatorRef) {
  navigatorRef && _navigators.push(navigatorRef);
}

function getTopLevelNavigator(){
  return _navigators[_navigators.length - 1]
}
function removeTopLevelNavigator(){
  _navigators.pop()
}
function getTopLevelNavigators(){
  return _navigators
}

function navigate({routeName, params}) {
  getTopLevelNavigator().dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
}

function replace({routeName, params}) {
  getTopLevelNavigator().dispatch(
    StackActions.replace({
      routeName,
      params,
    })
  );
}

export default {
  navigate,
  replace,
  setTopLevelNavigator,
  getTopLevelNavigator,
  getTopLevelNavigators,
  removeTopLevelNavigator
};