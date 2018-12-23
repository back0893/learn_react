import React, { Component } from 'react';
import './App.css';
import './Button';
import Button from "./Button";
import Search from './Search';
import Table from "./Table";

const default_query='redux';
const path_base='https://hn.algolia.com/api/v1';
const path_search='/search';
const param_search='query=';

class App extends Component {
  constructor(props){
    super(props);
    /**
     * state 属性是每次改变都会
     *  render都会重新执行
     *  用来更改dom
     */
    this.state={
        results:null,
        searchKey:'',
        searchTerm:default_query,
        error:null
        // es6 中下面的写法也是可以的,只要名称一致
        // list,
    };
    //这是绑定this,因为js的this会依据上下文自己变化
    //  这是将 onDel的this永久重定向
    // this.onDel=this.onDel.bind(this);
      this.onSearchChange=this.onSearchChange.bind(this);
      this.setSearchTopStories=this.setSearchTopStories.bind(this);
      this.onSearchSubmit=this.onSearchSubmit.bind(this);
      this.needsToSearchStories=this.needsToSearchStories.bind(this);
  }
  needsToSearchStories(searchTerm){
      return !this.state.results[searchTerm];
  }
  setSearchTopStories(result){
      const{hits,page}=result;
      const {searchKey,results}=this.state;

      const oldHits=results && results[searchKey]?
          results[searchKey].hits
          :[];
      const updatedHits=[
          ...oldHits,
          ...hits
      ];
      this.setState({
          results:{
              ...results,
              [searchKey]:{hits:updatedHits,page}
          }
      })
  }
  fetchSearchTopStories(searchTerm){
      fetch(`${path_base}${path_search}?${param_search}${searchTerm}`)
          .then(response=>response.json())
          .then(result=>this.setSearchTopStories(result))
          .catch(e=>this.setState({error:e}));
  }
  onDel=(objectID)=>{
    console.log(objectID);
    const {searchKey,results}=this.state;
    const {hits,page}=results[searchKey];
     const updatedList=hits.filter((item)=>{
       return item.objectID!==objectID;
     });
     //下面2个都可以实现
     // this.setState({
     //     list:Object.assign({},this.state.list,{hits:updatedList})
     // });
      this.setState({
         results:{
             ...results,
             [searchKey]:{hits:updatedList,page}
         }
      });
  };
  isSearched(searchTerm){
    return (item)=>{
        return item.title.toLowerCase().includes(searchTerm.toLowerCase());
    }
  }
  onSearchSubmit(){
      const {searchTerm}=this.state;
      this.setState({searchKey:searchTerm});
      if(this.needsToSearchStories(searchTerm)){
          this.fetchSearchTopStories(searchTerm);
      }
  }
  componentDidMount(){
      const {searchTerm}=this.state;
      this.setState({searchKey:searchTerm});
      this.fetchSearchTopStories(searchTerm);
  }
  onSearchChange(event){
      this.setState({searchTerm:event.target.value});
      event.preventDefault();
  }
  render() {
     const {
          searchTerm,
          results,
          searchKey,
          error
      }=this.state;
     const page=(
         results &&
         results[searchKey] &&
         results[searchKey].page
     )||0;
    if(error){
        return <p>somtine go went wrong!</p>
    }
     const list=(
            results &&
            results[searchKey] &&
            results[searchKey].hits
     )||[];
    if(list.length===0){
        console.log('请求未成功时,会在这里不显示任何的值');
        return <h1>!!!!!!!!!!!!!!!!请求中!!!!!!!!!</h1>;
    }
    return (
      <div className="App">
          <Search searchTerm={searchTerm} onSearchChange={this.onSearchChange} onSearchSubmit={this.onSearchSubmit}/>
          {/*map对于array是一个循环*/}
          <Table items={list.filter(this.isSearched(searchTerm))} pattern={searchTerm} onDel={this.onDel}/>
      </div>
    );
  }
}

export default App;
