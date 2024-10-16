import React, { useState } from 'react';
import { Avatar } from 'antd'
const UserList = ['U', 'Lucy', 'Tom', 'Edward'];
const ColorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];
const GapList = [4, 3, 2, 1];
const UserLogo: React.FC = () => {
    const [user, setUser] = useState(UserList[0]);
    const [color, setColor] = useState(ColorList[0]);
    const [gap, setGap] = useState(GapList[0]);
    return (
        <>
            {/* <Avatar style={{ backgroundColor: color, verticalAlign: 'middle' }} size="large" gap={gap}>
                {user}
            </Avatar> */}
            <Avatar src='https://qiniuchat.littlewheat.com/other/avatar.jpg'></Avatar>
        </>
    );
};

export default UserLogo;