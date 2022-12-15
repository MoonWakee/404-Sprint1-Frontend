import { useState } from 'react';


export default function CreateGroup() {

  const [groupName, setGroupName] = useState('');

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
        <button>
            Create Group
        </button>
    </div>
  );
}