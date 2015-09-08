import Alt from '../alt'; // remember this is our own alt file, not the contributed module

class LocationActions {
  constructor() {
    this.generateActions(
      'getPage'
    );
  }

  ajaxSucc(res) {
    console.log('success handler');
    console.log(res);
    console.log(this)
    this.dispatch(res)
  }
  ajaxFail(res) {
    console.log('fail handler');
    console.log(res);
  }

  locationsFailed(errorMessage) {
    this.dispatch(errorMessage);
  }

  favoriteLocation(location) {
    this.dispatch(location);
  }
}

export default Alt.createActions(LocationActions);
