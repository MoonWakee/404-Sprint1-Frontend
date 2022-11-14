import { useState } from 'react';

let nextId = 0;

export default function CreateGroup() {

  const [groupName, setGroupName] = useState('');
  const [userid, setUserId] = useState('')
  const [members, setMembers] = useState([]);

  return (
    <div>
        <div>
            <label>
            GroupName:
            </label>
            <input
                value={groupName}
                onChange={e => setGroupName(e.target.value)}
                />
        </div>
        <div>
            <input
            value={userid}
            onChange={e =>  setUserId(e.target.value)}
            />
            <button onClick={ () => {
                setUserId('')
                members.push({ id: nextId++, userid: userid })
            }}> Add </button>
        </div>
        <ul>
            {members.map(member => (
                <li key = {member.id}> {member.userid} </li>
            ))}
        </ul>
        <button>
            Create Group
        </button>
    </div>
  );
}