import React,{Component} from 'react';
import Button from "./Button";


class Search extends Component{
    render(){
        const {searchTerm,onSearchChange,onSearchSubmit=()=>{}}=this.props;
        console.log(onSearchSubmit);
        return (
            <form>
                <input type="text"
                       onChange={onSearchChange}
                       value={searchTerm}
                />
                <Button onDel={onSearchSubmit}>搜索</Button>
            </form>
        )
    }
}

export default Search;