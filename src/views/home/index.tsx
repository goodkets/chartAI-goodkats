import React,{useState, useEffect} from 'react';
import {  Layout } from 'antd';
import Aside from "./aside"
import Header from "./header"
import Main from "./main"

const Home: React.FC = () => {
    const [Collapsed,homeSetCollapsed] = useState(false)
    const onCollapse = (collapsed: boolean) => {
        homeSetCollapsed(collapsed)
    }
    const [buttonStatus, setButtonStatus] = useState(false);
    const [viewWidth, setViewWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => {
            setViewWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (viewWidth <= 600) {
            // alert("请使用移动端浏览");
            setButtonStatus(true);
        } else {
            setButtonStatus(false);
        }
    }, [viewWidth]);
    return (
        <Layout style={{ height: '100vh' }}>
            <Aside useCollapsed={Collapsed}></Aside>
        <Layout>
            <Header onHomeSetCollapsed={onCollapse} Toggle={buttonStatus}></Header>
            <Main></Main>
        </Layout>
      </Layout>
    )
};

export default Home;
