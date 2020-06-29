import React from 'react';
import ToshopInput from './ToshopInput';
import ToshopDisplay from './ToshopDisplay';
import FilterBar from './FilterBar';


// user adds a task by inputing a string and checking/unchecking for being urgent
// by selecting an item, the filter bar will be visible for actions:
// delete, prioritize, unprioritize
// by clicking on each item, it can be edited inline
// the checkbox below input is for selecting/unselecting all

class Container extends React.Component {
    constructor(props) {
        super(props);
        // retrieve item from local storage then convert or inilize the value
        let toShopObj = localStorage.getItem("toShopObj");
        toShopObj = toShopObj !== null ? JSON.parse(toShopObj) : [];

        // adding checked property to each item for handling checked/unchecked
        toShopObj.forEach((item) => item.checked = false);

        this.state = {
            shopList: toShopObj,
            inputValue: '',
            allChecked: false,
            urgentChk: true
        };

    }
    addItem = () => {

        // not adding empty values
        if (this.state.inputValue === '') return;

        const { shopList } = this.state;

        // get the max id and set the new item id
        let max = Math.max.apply(null, shopList.map(item => item.id));
        max = max >= 0 ? max + 1 : 0;

        // seting a new object and adding to the list of items
        const newProduct = { id: max, name: this.state.inputValue, priority: this.state.urgentChk, checked: false, done: false };
        this.setState({ shopList: [...shopList, newProduct], inputValue: '' });
    }
    updateItem = (id, txt, updateType) => {
        let newShopList = [...this.state.shopList];
        const selected = newShopList.findIndex((i) => i.id === id);
        updateType === 'Text' ?
            newShopList[selected] = { ...newShopList[selected], name: txt } :
            newShopList[selected] = { ...newShopList[selected], checked: !newShopList[selected].checked };
        this.setState({ shopList: newShopList });
    }
    itemTextupdate = (id, txt) => {
        this.updateItem(id, txt, 'Text');
    }
    itemChecked = (id) => {
        this.updateItem(id, '', 'Check');
    }
    shopListClicked = (e, control, id) => {

        let newShopList = [...this.state.shopList];
        const selected = newShopList.findIndex((i) => i.id === id);

        if (control === 'remove') {
            e.stopPropagation();
            newShopList.splice(selected, 1);
        }
        else {
            newShopList[selected] = { ...newShopList[selected], checked: !newShopList[selected].checked };
        }
        this.setState({ shopList: newShopList });
    }

    listHasItem = (shopObject) => {
        return (shopObject.length > 0)
    }

    filterClicked = (isChecked) => {
        let newShopList = [...this.state.shopList];
        newShopList.map((item) => item.checked = isChecked);
        this.setState({ shopList: newShopList, allChecked: isChecked });
    }

    filterItems = (items, actionType) => {
        items.forEach((item) => {
            if (item.checked) {
                actionType === "done" ?
                    item.done = !item.done :
                    actionType === "isUrg" ?
                        item.priority = true :
                        item.priority = false;
                item.checked = false;
            }
        });
        return items;
    }

    // for events which are call back from filter bar
    doFilter = (actionType) => {
        let { shopList } = this.state;
        switch (actionType) {
            case "isUrg":
            case "noUrg":
            case "done":
                shopList = this.filterItems(shopList, actionType);
                break;
            case "del":
                shopList = shopList.filter((item) => !item.checked);
                break;
            case "sort":
                let highOrderShopList = [], lowOrderShopList = [];
                shopList.forEach((item) => {
                    item.priority ?
                        highOrderShopList = [...highOrderShopList, item] :
                        lowOrderShopList = [...lowOrderShopList, item];
                });
                shopList = [...highOrderShopList, ...lowOrderShopList];
                break;
            default: return;
        }
        this.setState({ shopList, allChecked: false });
    }

    urgentClicked = (isUrgent) => {
        this.setState({ urgentChk: isUrgent });
    }

    setInputFocus() {
        // Focus the text input using the callback ref
        this.productInput.focus();
    }

    componentDidMount() {
        this.setInputFocus();
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.state.shopList !== prevState.shopList) {

            this.saveParam();
            this.setInputFocus();
        }
    }

    //removing checked property before saving the items object to local storage
    saveParam = () => {
        const newShopList = this.state.shopList.map((item) => {
            return { id: item.id, name: item.name, priority: item.priority, done: item.done }
        });
        localStorage.setItem("toShopObj", JSON.stringify(newShopList));
    }

    render() {
        //There are three component for: 1.adding an item, 2.filtering items, 3.showing items
        //filter bar(Tofilter component) should be invisible if none of items are checked
        const isAnyChecked =
            this.state.shopList.findIndex((item) => item.checked === true) !== -1 ?
                true :
                false;
        return (
            //use ref callback to store a reference to a DOM node of ToshopInput component 
            <div className="parent-div">
                <div className="header">

                    <ToshopInput
                        urgentChk={this.state.urgentChk}
                        urgentClicked={this.urgentClicked}
                        onClick={this.addItem}
                        inputValue={this.state.inputValue}
                        inputChanged={(e) => this.setState({ inputValue: e.target.value })}
                        inputKeyPressed={this.addItem}
                        inputRef={e => this.productInput = e}
                    />
                </div>
                <FilterBar
                    onClick={this.filterClicked}
                    doFilter={this.doFilter}
                    allChecked={this.state.allChecked}
                    anyChecked={isAnyChecked}
                    hasItem={this.listHasItem(this.state.shopList)}
                />
                <div className="all-items">
                    <ToshopDisplay
                        items={this.state.shopList}
                        onClick={this.shopListClicked}
                        onChecked={this.itemChecked}
                        updateInlineText={this.itemTextupdate}
                    />
                </div>
            </div>
        )
    }
}

export default Container;