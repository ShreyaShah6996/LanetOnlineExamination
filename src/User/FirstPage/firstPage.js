import React,{Component} from 'react';
import UserHeader from "../../components/Headers/UserHeader";
import Test from '../Test/Test';
class FirstPage extends Component{
    render(){
        return(
            <div>
                <UserHeader/>
                <Test/>
            </div>
        )
    }
}
export default FirstPage;