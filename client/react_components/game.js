var React = require('react');

var Game = React.createClass({
    getInitialState: function(){
        return{
            gold: 0,
            locations:[
                    {name: 'Farm', min: 10, max: 20},
                    {name: 'Cave', min: 5, max: 20},
                    {name: 'House', min: 2, max: 5},
                    {name: 'Casino', min: -50, max: 50}
            ],
            history: []
        }
    },
    findGold: function(result, location){
        if(result < 0){
            var outcome = "lost";
            var resultDescription = 'You lost $'+ result +' monies at the '+ location
            this.setState({
                gold: this.state.gold += result,
                history: this.state.history.concat([{outcome, resultDescription}])
            })

        }
        else{
            var outcome = "won";
            var resultDescription = 'You won $'+ result +' monies at the '+ location
            this.setState({
                gold: this.state.gold += result,
                history: this.state.history.concat([{outcome, resultDescription}])
            })
        }
        {console.log(this.state.history)}
    },
    render: function(){
        // NEED TO ATTACH MAIN GOLD COUNTER
        // WILL NOT WORK WITH "THIS.FINDGOLD"
        // "THIS" WILL BE THE PROP COMPONENT/ SO MAKE IT INTO A VARIABLE
        var main = this
        var goldSources = this.state.locations.map(function(location){
            return <GoldMine
                key={location.name}
                name={location.name}
                min={location.min}
                max={location.max}
                findGold={main.findGold}
            />
        });
        return (
            <div className= "count">
                <GoldDisplay gold={this.state.gold}/>
                <div className = 'game'>
                    {goldSources}
                </div>
                <SearchHistory history={this.state.history}/>
            </div>
        )
    }
})


// GOLD COUNTER COMPONENT
// AT THE TOP OF THE PAGE
// USED IN THE PARENT COMPONENT
var GoldDisplay = React.createClass({
    render: function(){
        return(
            <div className = 'gold-display'>
                <h4>Your Gold: {this.props.gold}</h4>
            </div>
        )
    }
});

// GOLD MINING COMPONENT
// BLUEPRINT FOR MAKING THE FARM, HOUSE, CAVE, CASINO // FROM FOR EACH BUILDING
// USING THE getInitialState
var GoldMine = React.createClass({
    render: function(){
        if(this.props.name == 'Farm'){
            return (
                <div className='gold-source' id="farm">
                    <img src="assets/farm.png" alt="farm"/>
                    <h3>{this.props.name}</h3>
                    <p>Earn $0-${this.props.max}</p>
                    <button className="button-primary" onClick={this.goldSearch}><i className="fa fa-github-alt" aria-hidden="true"></i> Find Gold!</button>

                </div>
            )
        }
        if(this.props.name == 'Cave'){
            return (
                <div className='gold-source' id="cave">
                    <img src="assets/cave.png" alt="cave"/>
                    <h3>{this.props.name}</h3>
                    <p>Earn $0-${this.props.max}</p>
                    <button className="button-success" onClick={this.goldSearch}><i className="fa fa-tree" aria-hidden="true"></i> Find Gold!</button>

                </div>
            )
        }
        if(this.props.name == 'House'){
            return (
                <div className='gold-source' id="house">
                    <img src="assets/house.png" alt="house"/>
                    <h3>{this.props.name}</h3>
                    <p>Earn $0-${this.props.max}</p>
                    <button className="button-warning" onClick={this.goldSearch}><i className="fa fa-home" aria-hidden="true"></i> Find Gold!</button>

                </div>
            )
        }
        if(this.props.name == 'Casino'){
            return (
                <div className='gold-source' id="casino">
                    <img src="assets/casino.png" alt="casino"/>
                    <h3>{this.props.name}</h3>
                    <p>Earns/Takes $0-{this.props.max}</p>
                    <button className="button-danger" onClick={this.goldSearch}><i className="fa fa-usd" aria-hidden="true"></i> Find Gold!</button>

                </div>
            )
        }
    },
    goldSearch: function(){
        var result = Math.round(Math.random()*(this.props.max - this.props.min) + this.props.min);
		this.props.findGold(result, this.props.name);
    }
});



// HISTORY COMPONENT
var SearchHistory = React.createClass({
	render: function (){
        {console.log(this.props.history, "hello")}
		var searchEvents = this.props.history.map(function(event, index){
			return <SearchEvent key = {index} event={event}/>
		});
		return (
			<div className = 'search-history'>
				<ul >
                    <br/>
					<h3>Activities:</h3>
                    <hr/>
					{searchEvents.reverse()}
				</ul>
			</div>
		);
	}
});

// HISTORY CHILD COMPONENT
var SearchEvent = React.createClass({
	render: function (){
		return (
			<li className={this.props.event.outcome}>{this.props.event.resultDescription}</li>
		);
	}
});


module.exports = Game;
