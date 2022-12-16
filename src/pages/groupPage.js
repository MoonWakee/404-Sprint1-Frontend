import { useParams } from "react-router-dom"
import { withRouter } from "react-router";
import React from "react";

const params = useParams();
groupid = params.id;

class GroupPage extends React.Component {

    componentDidMount() {
        const id = this.props.match.params.id;
    }

    render() {
        return (
            <div>
                {id}
            </div>
        )
    }
}

export default withRouter(GroupPage);