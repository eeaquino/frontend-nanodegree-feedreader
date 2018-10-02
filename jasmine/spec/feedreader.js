/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function()
{
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds',
        function() {
            /* This is our first test - it tests to make sure that the
             * allFeeds variable has been defined and that it is not
             * empty. Experiment with this before you get started on
             * the rest of this project. What happens when you change
             * allFeeds in app.js to be an empty array and refresh the
             * page?
             */

            it('are defined',
                function() {
                    expect(allFeeds).toBeDefined();
                    expect(allFeeds.length).not.toBe(0);
                });

            /* This test loops through each feed
             * in the allFeeds object and ensures it has a URL defined
             * and that the URL is not empty.
             */
            it('has url not empty',
                function() {
                    for (let feed of allFeeds) {
                        expect(feed.url).toBeDefined();
                        expect(feed.url).not.toBe('');
                    }
                });

            /* This test loops through each feed
             * in the allFeeds object and ensures it has a name defined
             * and that the name is not empty.
             */
            it('has name not empty',
                function() {
                    for (let feed of allFeeds) {
                        expect(feed.name).toBeDefined();
                        expect(feed.name).not.toBe('');
                    }
                });
        });

    describe('The menu',
        function() {
            var body;
            beforeEach(function() {
                body = document.getElementsByTagName("body")[0];
            });
            /* This test ensures the menu element is
             * hidden by default. You'll have to analyze the HTML and
             * the CSS to determine how we're performing the
             * hiding/showing of the menu element.
             * Used class here to make sure the class is being set.
             */
            it('menu is hidden',
                function() {
                    expect(body.classList.contains("menu-hidden")).toBe(true);
                });
            /* This test  ensures the menu changes
             * visibility when the menu icon is clicked. This test
             * should have two expectations: does the menu display when
             * clicked and does it hide when clicked again.
             * Used slide menu position to make sure it is actually changing.
             */
            it('click event triggers menu visibility',
                function() {
                    var slideMenu = document.querySelector(".slide-menu");
                    var duration = slideMenu.style.transitionDuration;
                    slideMenu.style.transitionDuration = "0s";
                    $(".menu-icon-link").trigger("click");
                    expect(document.querySelector(".slide-menu").getBoundingClientRect().left).toBe(0);
                    $(".menu-icon-link").trigger("click");
                    expect(document.querySelector(".slide-menu").getBoundingClientRect().left).toBeLessThan(0);
                    slideMenu.style.transitionDuration = duration;
                });

        });

    describe('Initial Entries',
        function() {
            beforeEach(function(done) {
                loadFeed(0,
                    function() {
                        done();
                    });
            });
            /* This test  ensures when the loadFeed
             * function is called and completes its work, there is at least
             * a single .entry element within the .feed container.
             * Remember, loadFeed() is asynchronous so this test will require
             * the use of Jasmine's beforeEach and asynchronous done() function.
             */
            it('feed is loaded and not empty',
                function() {
                    expect(document.querySelectorAll(".feed .entry").length).toBeGreaterThan(0);
                });
        });
    
    describe('New Feed Selectio',
        function() {
            var feedBefore;
            var feedAfter;
            beforeEach(function(done) {
                loadFeed(0,
                    function() {
                        feedBefore = document.querySelector(".feed").innerHTML;
                        loadFeed(1,
                            function() {
                                feedAfter = document.querySelector(".feed").innerHTML;
                                done();
                            });
                    });

            });
            /* This test  ensures when a new feed is loaded
             * by the loadFeed function that the content actually changes.
             * Remember, loadFeed() is asynchronous.
             */
            it('feed Changes on selection change',
                function() {
                    expect(feedBefore).not.toBe(feedAfter);
                });
        });
}());