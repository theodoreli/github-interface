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
    this.dispatch(res)
  }
  ajaxFail(res) {
    console.log('fail handler');
    console.log(res);
  }
}

export default Alt.createActions(LocationActions);
