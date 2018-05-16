import React from "react";
import Header from "./Header";

class NationalParks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nationalParks: [],
            header: "National Parks"
        };
        this.onCancel = this.onCancel.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onSelect = this.onSelect.bind(this);
    }

    componentDidMount() {
        
    }

    render() {
        return(
            <React.Fragment>
                <Header header={this.state.header} />
                <h1>Hello World</h1>
            </React.Fragment>
        )
    }
}

export default NationalParks;