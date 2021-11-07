import React from 'react';
import HighletText from './HighletText';
import './style.scss';

const data = [
    {name: 'Vinay'},
    {name: 'Yadav'},
    {name: 'Oliver'},
    {name: 'Jack'},
    {name: 'Harry'},
    {name: 'Jacob'},
    {name: 'Jake'},
    {name: 'Joe'},
    {name: 'William'},
    {name: 'David'},
    {name: 'Richard'},
    {name: 'Joseph'},
    {name: 'Charles'},
    {name: 'Charlie'},
    {name: 'John'},
    {name: 'Damian'},
    {name: 'Emily'},
    {name: 'Mary'},
]

const debounce = (func, delay) => {
    let clearTimer;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(clearTimer);
        clearTimer = setTimeout(() => func.apply(context, args), delay);
    }
}

class AutoComplete extends React.Component {
    inputRef = React.createRef();
    state = {
        showOptions: false,
        data: [],
        selected: '',
        searchKey: '',
        loading: false,
    }
    componentDidMount() {
        window.addEventListener('click', this.onWindowClick)
    }
    onWindowClick = () => {
        this.setState({showOptions: false, searchKey: ''})
        this.clearInput();
    }
    onFocus = (e, fromOtherEl) => {
        if(!this.state.showOptions) {
            if(fromOtherEl && this.inputRef.current) {
                this.inputRef.current.focus();
            } else {
                this.setState({showOptions: true, data: []});
            }
        }
    }
    searchData = (key) => { 
        return new Promise((resolve, reject) => { //making search func as async 
            setTimeout(() => {
                const d = data.filter(i => i.name.toLowerCase().includes(key.toLowerCase()));
                resolve(d);
            }, 1000); // making 1000ms as delay to filter the data to act as real api call
        })
    }
    onSearch = async (e) => { 
        const key = e.target.value;
        if(key) {
            this.setState({loading: true});
            this.searchData(key).then(res => {
                this.setState({
                    data: res,
                    searchKey: key,
                    loading: false,
                })
            })
        } else {
            this.setState({
                data: [],
                searchKey: '',
                loading: false,
            });
        }
        

    }
    onBlur = () => {
        // this.setState({showOptions: false});
    }
    onSelect = (item) => {
        console.log(item)
        this.setState({
            selected: item.name,
            showOptions: false,
        })
        this.clearInput();
    }
    clearInput = () => {
        if(this.inputRef.current) {
            this.inputRef.current.value = '';
        }
    }
    onContentClick = e => {
        e.stopPropagation();
    }
    componentWillUnmount() {
        window.removeEventListener('click', this.onWindowClick)
    }
    debounceSearch = debounce(this.onSearch, 700); // making debounce effect to prevent calling filter continuesly on typing.
    render() {
        const {showOptions, data, selected, searchKey, loading} = this.state;
        
        return <div className="auto-complete" onClick={this.onContentClick}>
            <div className="label-c">
                <input ref={this.inputRef} onBlur={this.onBlur} onChange={this.debounceSearch} onFocus={this.onFocus}/>
                {!showOptions &&
                    <div className="label" onClick={() => this.onFocus(null, true)}>{selected} {!selected && <span>Search</span>}</div>   
                } 
            </div>
            {showOptions && (
                <div className="dropdown">
                    {loading && <div className="loader"></div>}
                    {searchKey && data.length === 0 && !loading && <div className="no-res">No Results</div>}
                    <div className="lists">
                        {data.map(d => 
                            <div className="list-itm" key={d.name} onClick={() => this.onSelect(d)}>
                                <HighletText text={d.name} highlet={searchKey}/>
                            </div>
                        )}
                    </div>
                </div>
            )}
            
        </div>
    }
}

export default AutoComplete;