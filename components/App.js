App = React.createClass({
  getInitialState() {
    return {
      loading: false,
      searchingText: '',
      gif: {}
    }
  },
  handleSearch: function(searchingText) {  // 1.Pobierz na wejściu wpisywany tekst.
    this.setState({
      loading: true  // 2.Zasygnalizuj, że zaczął się proces ładowania.
    });
    this.getGif(searchingText, function(gif) {  // 3.Rozpocznij pobieranie gifa.
      this.setState({  // 4 Na zakończenie pobierania:
        loading: false,  // a przestań sygnalizować ładowanie,
        gif: gif,  // b ustaw nowego gifa z wyniku pobierania
        searchingText: searchingText  // c ustaw nowy stan dla wyszukiwanego tekstu
      });
    }.bind(this));
  },
  getGif: function(searchingText, callback) {
    var GIPHY_API_URL = 'https://api.giphy.com';
    var GIPHY_PUB_KEY = '9nHaixweXV90T40ZIvRDDwPLKtRy4FnT'
    var url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = function() {
        if (xhr.status === 200) {
           var data = JSON.parse(xhr.responseText).data;
            var gif = {
                url: data.fixed_width_downsampled_url,
                sourceUrl: data.url
            };
            callback(gif);
        }
    };
    xhr.send();
  },
  render: function() {

    var styles = {
      margin: '0 auto',
      textAlign: 'center',
      width: '90%'
    };

    return (
      <div style={styles}>
          <h1>Wyszukiwarka GIF-ów</h1>
          <p>Znajdź gifa na <a href='http://giphy.com'>giphy</a>. Naciskaj enter, aby pobrać kolejne gify</p>
          <Search onSearch={this.handleSearch}/>
        <Gif
          loading={this.state.loading}
          url={this.state.gif.url}
          sourceUrl={this.state.gif.sourceUrl}
         />
      </div>
    );
  },
});