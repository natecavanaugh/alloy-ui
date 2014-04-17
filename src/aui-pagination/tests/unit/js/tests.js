YUI.add('aui-pagination-tests', function(Y) {

    //--------------------------------------------------------------------------
    // Pagination Tests
    //--------------------------------------------------------------------------

    var suite = new Y.Test.Suite('aui-pagination');

    var pagination = new Y.Pagination({
        boundingBox: '#pagination',
        circular: false,
        showControls: false,
        total: 10
    }).render();

    var paginationFirstLast = new Y.Pagination({
        boundingBox: '#paginationFirstLast',
        total: 10
    }).render();

    suite.add(new Y.Test.Case({

        name: 'Pagination control rendering tests',

        // Tests: AUI-1106
        'assert that pagination controls do not render': function() {
            var instance = this,
                paginationContent,
                paginationItems;

            paginationContent = Y.one('#pagination .pagination-content');
            paginationItems = paginationContent.all('li');

            Y.Test.Assert.isNull(paginationContent.one('.pagination-control'));

            instance._assertItemsCanBeSelectedWhenControlsAreDisabled(paginationItems.item(1));

            instance._assertItemsCanBeSelectedWhenControlsAreDisabled(paginationItems.item(0));
        },

        _assertItemsCanBeSelectedWhenControlsAreDisabled: function(item) {
            item.simulate('click');

            Y.Test.Assert.isTrue(item.hasClass('active'));
        }
    }));

    //--------------------------------------------------------------------------
    // Test Case for Skip to First and Last Page
    //--------------------------------------------------------------------------

    suite.add(new Y.Test.Case({

        name: 'Test Pagination Skip to First and Last Page',

        // Tests: AUI-1264
        '#1 First li should have text First': function() {
            var listItems = Y.one('#paginationFirstLast').all('li');

            Y.Assert.isTrue(
                listItems.first().get('text') === 'First', 'First li should have text First');
        },

        '#2 Last li should have text Last': function() {
            var listItems = Y.one('#paginationFirstLast').all('li');

            Y.Assert.isTrue(
                listItems.last().get('text') === 'Last', 'Last li should have text Last');
        },

        '#3 Clicking on last button should move to last page and disable last button': function() {
            var test = this,
                listItems = Y.one('#paginationFirstLast').all('li'),
                lastButton = listItems.last(),
                lastPage = listItems.item(listItems.size() - 3);

            lastButton.simulate('click');

            Y.Assert.isTrue(lastPage.hasClass('active'));
            Y.Assert.isTrue(lastButton.hasClass('disabled'));
        },

        '#4 Clicking on first button should move to first page and disable first button': function() {
            var test = this,
                listItems = Y.one('#paginationFirstLast').all('li'),
                firstButton = listItems.item(0),
                firstPage = listItems.item(2);

            firstButton.simulate('click');

            Y.Assert.isTrue(firstPage.hasClass('active'));
            Y.Assert.isTrue(firstButton.hasClass('disabled'));
        }
    }));

    //--------------------------------------------------------------------------
    // Test Case for Testing Pagination Links States
    //--------------------------------------------------------------------------

    suite.add(new Y.Test.Case({

        name: 'Pagination link state tests',

        // Tests: AUI-1274
        'Assert that Pagination State and Pagination UI are in Sync': function() {
            var state = { page: 5 },
                paginationItems = Y.one('#pagination .pagination-content').all('li'),
                pageIndex = (state.page - 1);

            pagination.setState(state);

            paginationItems.each(function(item, index) {
                Y.Test.Assert.isTrue((index === pageIndex) === item.hasClass('active'));
            });
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['test', 'aui-pagination', 'node-event-simulate']
});
