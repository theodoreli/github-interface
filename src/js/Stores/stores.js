import Alt from '../alt'; // remember this is our own alt file, not the contributed module
import { createStore, datasource } from 'alt/utils/decorators';
import Actions from '../Actions/Actions';
import reqwest from 'reqwest';
import es6Promise from 'es6-promise';
import parseLinkHeader from 'thlorenz/parse-link-header';

es6Promise.polyfill();

//https://github.com/goatslacker/alt/issues/380
var req;

const SearchSource = {
  performSearch: {
    // remotely fetch something (required)
    remote(state) { // this is our Store state
      req = reqwest({url: `https://api.github.com/repos/npm/npm/issues?page=${state.toGetPage}&per_page=25`});
      return req
    },

    // this function checks in our local cache first
    // if the value is present it'll use that instead (optional).
/*
    local(state) {
      return state.results[state.value] ? state.results : null;
    },
*/

    // here we setup some actions to handle our response
    //loading: SearchActions.loadingResults, // (optional)
    //success: SearchActions.receivedResults, // (required)
    success: Actions.ajaxSucc, // (required)
    //error: SearchActions.fetchingResultsFailed, // (required)
    error: Actions.ajaxFail,

    // should fetch has precedence over the value returned by local in determining whether remote should be called
    // in this particular example if the value is present locally it would return but still fire off the remote request (optional)
    shouldFetch(state) {
      return true
    }
  }
};

// In the example they use these decorators. leave it out, screws up with store emitting events?
//@createStore(Alt)
//@datasource(SearchSource)
class StorePage {
    constructor() {
        this.toGetPage = 1;
        this.pageContents = {}; 
        this.pageLink = {};

        this.registerAsync(SearchSource);
        
        this.bindAction(Actions.getPage, this.onSearch);
        this.bindAction(Actions.ajaxSucc, this.onAjaxSucc);
    }

    onAjaxSucc(data) {
      // const enforces that we point to the same place in memory. we can alter what it points to, but not the pointer itself.
      const safeGetPage = (placement, links) => {
        if (! (placement in links) ) {return null}
        if (! ('page' in links[placement]) ) return null

        let pageNum = links[placement].page;
        pageNum = typeof pageNum === 'string' ? parseInt(pageNum, 10): pageNum;

        return pageNum
      }

      console.log('hey ajax succ')
      console.log(data)
      // https://github.com/ded/reqwest/issues/134
      var parsed = parseLinkHeader(req.request.getResponseHeader('Link'));
      console.log(parsed);

      //this.lastPage = typeof parsed.last.page === 'number' ? parsed.last.page: this.lastPage;
      this.pageLink = {
        first: safeGetPage('first', parsed),
        last: safeGetPage('last', parsed),
        next: safeGetPage('next', parsed),
        prev: safeGetPage('prev', parsed)
      }
      this.pageContents[this.toGetPage] = data;

    }

    onSearch(params) {
        console.log(params)
        this.toGetPage = params.toGetPage;
        //this.state.toGetPage = params.toGetPage;
        console.log(this.toGetPage);

        if (!this.getInstance().isLoading()) {
          console.log('inside !this.getInstance()');
            this.getInstance().performSearch();
        }
    }
}

export default Alt.createStore(StorePage, 'StorePage');
