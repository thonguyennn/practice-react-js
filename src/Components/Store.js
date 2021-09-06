import {app} from './firebaseConnect'

var redux = require('redux')
const noteInitialState = {
    isEdit: false,
    editItem: {},
    isAdd: false,
    alertShow: false,
    alertContent: "",
    alertType:""
}
const allReducer = (state = noteInitialState, action) => {
    switch (action.type) {
        case "ADD":
            app.push(action.getItem)
            console.log('Thêm mới dữ liệu thành công')
            return state
        case "CHANGE":
            return {...state, isEdit: !state.isEdit}
        case "CHANGE_STATUS":
            return {...state, isAdd: !state.isAdd}
        case "CHANGE_ALERT_ON":
            return {...state, alertShow: true, alertContent: action.alertContent, alertType: action.alertType}
        case "CHANGE_ALERT_OFF":
            return {...state, alertShow: false}
        case "GET_DATA":
            return {...state, editItem: action.editObject}
        case "EDIT":
            //update dữ liệu lên firebase
            app.child(action.getItem.id).update({
                noteTitle: action.getItem.noteTitle,
                noteContent: action.getItem.noteContent
            })
            return {...state, editItem: {}}
        case "DELETE":
            app.child(action.deleteId).remove()
            return state
        default: 
            return state
    }
}

var store = redux.createStore(allReducer)
store.subscribe(function() {
    console.log(JSON.stringify(store.getState()))
})

export default store;