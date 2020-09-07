import React, { Component } from 'react';

import '../css/App.css';

class IndexPage extends Component {
    constructor (){
        super();

        this.state = {
            
        };
    }

    render() {
        console.log(this.props.match.params.id);
        return (
        <div className="App" >
            <div className="home">
                <h1>Header! {sessionStorage.getItem("username")}</h1>
            </div>
        </div >
        );
    }
}

export default IndexPage;