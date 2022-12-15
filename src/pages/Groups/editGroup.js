import { useState } from 'react';

export default function EditGroup() {

    const AddMember = async (event) => {
        event.preventDefault();
        // navigate("/AddSchedulePage", { replace: true });
        try {
            let res = await fetch("http://127.0.0.1:5000/group/edit", {
                method: "POST",
                body: JSON.stringify({
                    first_name: values.firstname,
                    last_name: values.lastname,
                    username: values.username,
                    password: values.password,
                    email: values.email
                }),
            });
            let resJson = await res.json();
            console.log(resJson)
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
    <div>
        <div>
            <label>
            GroupName:
            </label>
            <div>
                Members
            </div>
            <input
                type = "text"
                name = "userid"
            />
            <button> Add </button>
            <button> Delete </button>
        </div>
    </div>
    );
}