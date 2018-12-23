import React, {Component} from 'react';
import Button from './Button';

class Table extends Component {
    render() {
        const {items,pattern,onDel} = this.props;
        return (
            /**
             * key作为标识符,以便虚拟dom不会再去渲染
             */
            items.map((item)=>{
                return (
                    <div key={item.objectID}>
                      <span>
                          <a href={item.url}>{item.title}</a>
                      </span>
                        <span>{item.author}</span>
                        <span>{item.num_counent}</span>
                        <span>
                    <Button onDel={onDel} title={item.objectID}/>
                  </span>
                    </div>
                )
            })

        )
    }
}


export default Table;