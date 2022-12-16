import { Button } from "devextreme-react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TextField } from "@mui/material";
import authHeader from "../utils/authHeader";



const List = ({ list, onRemove }) => (
    <ul>
        {list.map((item) => (
        <Item key={item} item={item} onRemove={onRemove} />
        ))}
    </ul>
    );

const Item = ({ item, onRemove }) => (
<li>
    <span>{item}</span>
    <button type="button" onClick={() => onRemove(item)}>
        Remove
    </button>
</li>
);

class EditGroup extends React.Component {
    navigate = useNavigate();

    constructor(props) {
        super(props);
      
        this.state = { groupname: '', members: [], new: '' };
      }
    
    
    async componentDidMount() {
        try {
            let res = await fetch(
                "http://ec2-44-206-245-116.compute-1.amazonaws.com:5000/group/:groupid", 
                {
                method: "GET",
                headers: authHeader()
            });
            let resJson = await res.json();
            console.log(resJson)
            this.setState({ groupname: resJson.groupname, members: resJson.members })
        }
        catch (err) {
            console.log(err);
        }
    }
    
    handleDeleteGroup = async () => {
        try {
            let res = await fetch(
                "http://ec2-44-206-245-116.compute-1.amazonaws.com:5000/group/:groupid", 
                {
                method: "DELETE",
                headers: authHeader()
            });
            let resJson = await res.json();
            console.log(resJson)
        }
        catch (err) {
            console.log(err);
        }
        this.navigate('/calendar');
    }

    handleUpdateGroup = async() => {
        try {
            let res = await fetch("http://ec2-44-206-245-116.compute-1.amazonaws.com:5000/group/:groupid", 
            {
                method: "PUT",
                headers: authHeader(),
                body: JSON.stringify({
                    groupname: this.state.groupname,
                    members: this.state.members
                }),
            });
            let resJson = await res.json();
            console.log(resJson)
        }
        catch (err) {
            console.log(err);
        }
       this.navigate('/calendar');
    }


    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value})

    }

    handleAddMember() {
        this.setState({ members: [...this.state.members, this.state.new]})
    }

    handleRemove(member) {
        const newList = this.state.members.filter((item) => item !== member);
    
        this.setState({ members: newList })
    }

    render() {
        return (
            <div>
                <div>
                    {this.state.groupname}
                </div>
                <div>
                    <List list={this.state.members} onRemove={this.handleRemove} />
                </div>
                <div>
                    <TextField
                        className="input"
                        type="text"
                        name="new"
                        value={this.state.new}
                        onChange = {this.handleChange}
                    />
                    <div>
                        <Button
                        component="label"
                        color="primary"
                        onClick={this.handleAddMember}
                        >Add Member</Button>
                    </div>
                    <div>
                        <Button
                        component="label"
                        color="primary"
                        onClick={this.handleDeleteGroup}
                        >Delete Group</Button>
                    </div>
                    <div>
                        <Button
                        component="label"
                        color="primary"
                        onClick={this.handleUpdateGroup}
                        >Update Group</Button>
                    </div>  
                </div>
            </div>
            

        )
    }
}

export const EditGroupPage = () => (
    < EditGroup />
);
