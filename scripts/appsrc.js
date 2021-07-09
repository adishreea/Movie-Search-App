const apiKey = "2723e8f7182ebc820b5560e27a86f344";
const baseURL = 'https://api.themoviedb.org/3/';

class Starter extends React.Component {   
    render() {
        return (
            <div>
                <h1>Let's begin!!</h1>

                <h3>What would you like to do today?</h3>
                <DisplayOptions/>
            </div>
        );
    }
}

class DisplayOptions extends React.Component {      
    constructor(props) {
        super(props);
        this.state = {resultList: [], errorEx: ''};
    }

    callTheAPI(actionName){     
        let url = baseURL;
        switch(actionName){        
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
        fetch(url)
        .then(res => {
                res.json()
                .then( (data) => {
                    const dataResults = data.results            // ? = data is NOT NULL - optional chaining - not supported in this React version
                        .filter(result => result.original_title)    // removes undefined, false values
                        .map(result => result.original_title)   // select query
                        .slice(0, 10); // top 10 results
                    this.setState({resultList: dataResults});                    
                })
            }) // success
        .catch( (ex) => {
                this.setState ({errorEx: ex});
            }) // fail
    }
    
    render() {
        const buttonstyle = {
            padding: '15px 20px',
            background: '#008b8b',
            color: '#fff',
            fontSize: '14px',
            // width: 'fit-content',  
          };
          
        return(
            <div style={{display: "flex", flexDirection: "row", justifyContent: "space-around", gap: 20}}>               
                <div style={{display: "flex", flexDirection: "column", gap: 20}}>                   
                    <button className="browse-reco" style = {buttonstyle} onClick = {() => this.callTheAPI("browse-reco")}>Browse recommendations</button>
                    <button className="trending-day" style = {buttonstyle} onClick = {() => this.callTheAPI("trending-day")}>What's trending today</button>
                    <button className="cur-playing" style = {buttonstyle} onClick = {() => this.callTheAPI("cur-playing")}>What's playing now</button>
                    <button className="upcoming" style = {buttonstyle} onClick = {() => this.callTheAPI("upcoming")}>What's upcoming</button>
                </div>
                <div style={{display: "flex", flexDirection: "column", gap: 20}}>
                    <ul style={{background: '#008b8b', color: '#fff'}}>                    
                        {this.state.resultList.map((x) => {
                            return (<li key={x}>{x}</li>);
                            })
                        }
                    </ul>
                </div>
            </div>
        );
    }
}



ReactDOM.render(<Starter/>, document.getElementById('root'));
