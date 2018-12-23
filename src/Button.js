import React, { Component } from 'react';
import './App.css';

class Button extends Component{
    render(){
        const {onDel=()=>{},title='',children='删除'}=this.props;
        return <button type='button' onClick={(event)=>onDel(title)}>{children}</button>
    }
}

export default Button;