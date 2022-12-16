import { Button } from "devextreme-react";
import React from "react";
import { json } from "react-router-dom";
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
      
        // Initializing the state 
        this.state = { groupname: '', members: [], new: '' };
      }
    
    
    async componentDidMount() {
        try {
            let res = await fetch("http://127.0.0.1:5000/group/:groupid", {
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
            let res = await fetch("http://127.0.0.1:5000/group/:groupid", {
                method: "DELETE",
                headers: authHeader()
            });
            let resJson = await res.json();
            console.log(resJson)
        }
        catch (err) {
            console.log(err);
        }
        navigate('/calendar');
    }

    handleUpdateGroup = async() => {
        try {
            let res = await fetch("http://127.0.0.1:5000/group/:groupid", {
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
        navigate('/calendar');
    }


    handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    }

    handleAddMember = () => {
        setValues({
            ...values,
            members: [...values.members, values.new],
            new: ""
        })
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
                    <List list={this.state.members} onRemove={handleRemove} />
                </div>
                <div>
                    <TextField
                        className="input"
                        type="text"
                        name="new"
                        value={values.new}
                        onChange = {handleChange}
                    />
                    <div>
                        <Button
                        component="label"
                        color="primary"
                        onClick={handleAddMember}
                        >Add Member</Button>
                    </div>
                    <div>
                        <Button
                        component="label"
                        color="primary"
                        onClick={handleDeleteGroup}
                        >Delete Group</Button>
                    </div>
                    <div>
                        <Button
                        component="label"
                        color="primary"
                        onClick={handleUpdateGroup}
                        >Update Group</Button>
                    </div>  
                </div>
            </div>
            

        )
    }
}
