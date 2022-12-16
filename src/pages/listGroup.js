import React from "react";
import { Button } from "devextreme-react";
import { useNavigate } from "react-router-dom";
import authHeader from "../utils/authHeader";


class ListGroup extends React.Component {

    navigate = useNavigate();

    constructor(props) {
        super(props);
      
        this.state = { grouplist: []};
      }
    
    async componentDidMount() {
        try {
            let res = await fetch("http://127.0.0.1:5000/api/group/list",
            {
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

    handleOnClick = (groupid) => {
        const path = "/group/"+groupid
        this.navigate(path)
    }

    render() {
        return (
            <div>
                <List list={this.state.grouplist} onClick={this.handleOnClick()} />
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
            onClick = {onClick(item.uuid)}>
                {item.groupname}
            </Button>
        ))}
    </ul>
    );

export const ListGroupPage = () => (
    < ListGroup />
);
