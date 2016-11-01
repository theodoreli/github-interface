import Alt from '../alt'; // remember this is our own alt file, not the contributed module
import { createStore, datasource } from 'alt/utils/decorators';
import reqwest from 'reqwest';
import es6Promise from 'es6-promise';
import parseLinkHeader from 'thlorenz/parse-link-header';

import Actions from '../Actions/Actions';

es6Promise.polyfill();

//https://github.com/goatslacker/alt/issues/380
var req;

const SearchSource = {
  performSearch: {
    remote(state) { // this is our Store state
      req = reqwest({url: `https://api.github.com/repos/npm/npm/issues?page=${state.toGetPage}&per_page=25`});
      return req
    },

    success: Actions.ajaxSucc, // (required)
    error: Actions.ajaxFail, // (required)

    // should fetch has precedence over the value returned by local in determining whether remote should be called
    // in this particular example if the value is present locally it would return but still fire off the remote request (optional)
    shouldFetch(state) {
      return true
    }
  }
};

/*
 * In the example they use these decorators. Leave it out, as it possibly
 * screws up with store emitting events?
 */
//@createStore(Alt)
//@datasource(SearchSource)
class StorePage {
    constructor() {
        this.toGetPage = 1;
        this.pageContents = {};
        this.pageLink = {
          first: 1,
          last: 1
        };

        this.registerAsync(SearchSource);

        this.bindAction(Actions.getPage, this.onSearch);
        this.bindAction(Actions.ajaxSucc, this.onAjaxSucc);
    }


    onAjaxSucc(data) {
      const safeGetPage = (placement, links) => {
        if (! (placement in links) ) {return null}
        if (! ('page' in links[placement]) ) return null

        let pageNum = links[placement].page;
        pageNum = typeof pageNum === 'string' ? parseInt(pageNum, 10): pageNum;

        return pageNum
      }

      // https://github.com/ded/reqwest/issues/134
      var parsed = parseLinkHeader(req.request.getResponseHeader('Link'));

      this.pageLink = {
        first: safeGetPage('first', parsed),
        last: safeGetPage('last', parsed),
        next: safeGetPage('next', parsed),
        prev: safeGetPage('prev', parsed)
      }
      this.pageContents[this.toGetPage] = data;

    }


    onSearch(params) {
        this.toGetPage = params.toGetPage;

        if (!this.getInstance().isLoading()) {
            this.getInstance().performSearch();
        }
    }
}

export default Alt.createStore(StorePage, 'StorePage');
