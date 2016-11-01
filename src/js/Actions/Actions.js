import Alt from '../alt';


class LocationActions {
  constructor() {
    this.generateActions(
      'getPage'
    );
  }


  ajaxSucc(res) {
    this.dispatch(res)
  }


  ajaxFail(res) {
  }
}

export default Alt.createActions(LocationActions);
