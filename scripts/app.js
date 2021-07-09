'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var apiKey = "2723e8f7182ebc820b5560e27a86f344";
var baseURL = 'https://api.themoviedb.org/3/';

var Starter = function (_React$Component) {
    _inherits(Starter, _React$Component);

    function Starter() {
        _classCallCheck(this, Starter);

        return _possibleConstructorReturn(this, (Starter.__proto__ || Object.getPrototypeOf(Starter)).apply(this, arguments));
    }

    _createClass(Starter, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'h1',
                    null,
                    'Let\'s begin!!'
                ),
                React.createElement(
                    'h3',
                    null,
                    'What would you like to do today?'
                ),
                React.createElement(DisplayOptions, null)
            );
        }
    }]);

    return Starter;
}(React.Component);

var DisplayOptions = function (_React$Component2) {
    _inherits(DisplayOptions, _React$Component2);

    function DisplayOptions(props) {
        _classCallCheck(this, DisplayOptions);

        var _this2 = _possibleConstructorReturn(this, (DisplayOptions.__proto__ || Object.getPrototypeOf(DisplayOptions)).call(this, props));

        _this2.state = { resultList: [], errorEx: '' };
        return _this2;
    }

    _createClass(DisplayOptions, [{
        key: 'callTheAPI',
        value: function callTheAPI(actionName) {
            var _this3 = this;

            var url = baseURL;
            switch (actionName) {
                case 'browse-reco':
                    url += 'movie/3/recommendations?api_key=' + apiKey;
                    break;
                case 'trending-day':
                    url += 'trending/all/day?api_key=' + apiKey;
                    break;
                case 'cur-playing':
                    url += 'movie/now_playing?api_key=' + apiKey;
                    break;
                case 'upcoming':
                    url += 'movie/upcoming?api_key=' + apiKey;
                    break;
                default:
            }

            // fetch from URL - promise        
            fetch(url).then(function (res) {
                res.json().then(function (data) {
                    var dataResults = data.results // ? = data is NOT NULL - optional chaining - not supported in this React version
                    .filter(function (result) {
                        return result.original_title;
                    }) // removes undefined, false values
                    .map(function (result) {
                        return result.original_title;
                    }) // select query
                    .slice(0, 10); // top 10 results
                    _this3.setState({ resultList: dataResults });
                });
            }) // success
            .catch(function (ex) {
                _this3.setState({ errorEx: ex });
            }); // fail
        }
    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

            var buttonstyle = {
                padding: '15px 20px',
                background: '#008b8b',
                color: '#fff',
                fontSize: '14px'
                // width: 'fit-content',  
            };

            return React.createElement(
                'div',
                { style: { display: "flex", flexDirection: "row", justifyContent: "space-around", gap: 20 } },
                React.createElement(
                    'div',
                    { style: { display: "flex", flexDirection: "column", gap: 20 } },
                    React.createElement(
                        'button',
                        { className: 'browse-reco', style: buttonstyle, onClick: function onClick() {
                                return _this4.callTheAPI("browse-reco");
                            } },
                        'Browse recommendations'
                    ),
                    React.createElement(
                        'button',
                        { className: 'trending-day', style: buttonstyle, onClick: function onClick() {
                                return _this4.callTheAPI("trending-day");
                            } },
                        'What\'s trending today'
                    ),
                    React.createElement(
                        'button',
                        { className: 'cur-playing', style: buttonstyle, onClick: function onClick() {
                                return _this4.callTheAPI("cur-playing");
                            } },
                        'What\'s playing now'
                    ),
                    React.createElement(
                        'button',
                        { className: 'upcoming', style: buttonstyle, onClick: function onClick() {
                                return _this4.callTheAPI("upcoming");
                            } },
                        'What\'s upcoming'
                    )
                ),
                React.createElement(
                    'div',
                    { style: { display: "flex", flexDirection: "column", gap: 20 } },
                    React.createElement(
                        'ul',
                        { style: { background: '#008b8b', color: '#fff' } },
                        this.state.resultList.map(function (x) {
                            return React.createElement(
                                'li',
                                { key: x },
                                x
                            );
                        })
                    )
                )
            );
        }
    }]);

    return DisplayOptions;
}(React.Component);

ReactDOM.render(React.createElement(Starter, null), document.getElementById('root'));
