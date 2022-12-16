import React from "react";
import { Button } from "devextreme-react";
import authHeader from "../utils/authHeader";

class ListGroup extends React.Component {

    constructor(props) {
        super(props);
      
        // Initializing the state 
        this.state = { grouplist: []};
      }
    
    async componentDidMount() {
        try {
            let res = await fetch("http://127.0.0.1:5000/group/list", {
                method: "GET",
                headers: authHeader()
            });
            let resJson = await res.json();
            console.log(resJson)
            this.setState({ grouplist: resJson.grouplist })
        }
        catch (err) {
            console.log(err);
        }
    }

    handleOnClick = () => {

    }

    render() {
        return (
            <div>
                <List list={this.state.grouplist} onClick={this.handleOnClick} />
            </div>
        )
    }


}

const List = ({ list, onClick }) => (
    <ul>
        {list.map((item) => (
            <Button 
            component="label"
            color="primary"
            onClick = {onClick}>
                {item}
            </Button>
        ))}
    </ul>
    );

export const ListGroupPage = () => (
    < ListGroup />
);
