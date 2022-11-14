import { useState } from 'react';

let nextId = 0;

export default function GroupForm() {

  const [groupName, setGroupName] = useState('');
  const [userid, setUserId] = useState('')
  const [members, setMembers] = useState([]);

  return (
    <div>
      <label>
        GroupName:
      </label>
        <input
            value={groupName}
            onChange={e => setGroupName(e.target.value)}
            />
        <input
          value={userid}
          onChange={e =>  setUserId(e.target.value)}
        />
        <button onClick={ () => {
            setUserId('')
            members.push({ id: nextId++, userid: userid })
        }}> Add </button>
        <ul>
            {members.map(member => (
                <li key = {member.id}> {member.userid} </li>
            ))}
        </ul>
    </div>
  );
}