import React, { Component } from 'react';
import {connect} from 'react-redux'

class NoteForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            noteTitle: '',
            noteContent: '',
            id:''
        }
    }

    
    componentWillMount() {
        if(this.props.editItem){
            this.setState({
                // trường hợp sửa
                noteTitle: this.props.editItem.noteTitle,
                noteContent: this.props.editItem.noteContent,
                id: this.props.editItem.id
            });
        }
    }
    
    
    isChange = (e) => {
        const name = e.target.name
        const value = e.target.value

        this.setState({
            [name]: value
        })

    }

    submitBtn = (title, content) => {
        if(this.state.id) { // edit
            var editObject = {}
            editObject.id = this.state.id
            editObject.noteTitle = this.state.noteTitle
            editObject.noteContent = this.state.noteContent

            this.props.editDataStore(editObject)
            this.props.changeEditStatus() // ấn lưu nhận dữ liệu và tắt form
            this.props.changeAlertOn("Sửa thành công","success") // Hiện thông báo thành công
        } else { // add
            var item = {};
            item.noteTitle = title
            item.noteContent = content
    
            this.props.addDataStore(item) // sử dụng reducer trong store
            this.props.changeAlertOn("Thêm mới thành công","success") // Hiện thông báo thành công

        }
    }

    changeTitle = () => {
        if(this.props.addStatus){
            return <h2>Thêm mới note</h2>
        }else {
            return <h2>Chỉnh sửa note</h2>
        }
    }
    render() {
        return (
                <div className="col-4">
                {this.changeTitle()}
                    <form>
                    <div className="form-group">
                        <label htmlFor="noteTitle">Tiêu đề note list</label>
                        <input defaultValue={this.props.editItem.noteTitle}
                        onChange={(e) => this.isChange(e)}
                        type="text" className="form-control" name="noteTitle" id="noteTitle" 
                        aria-describedby="noteEditForm" placeholder="Tiêu đề note" />
                        <small id="noteEditForm" className="form-text text-muted">Điền tiêu đề vào đây</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="noteContent">Nội dung note list</label>
                        <textarea defaultValue={this.props.editItem.noteContent}
                        onChange={(e) => this.isChange(e)}
                        type="text" className="form-control" name="noteContent" id="noteContent"
                        aria-describedby="noteEditForm" placeholder="Nội dung note" />
                        <small id="noteEditForm" className="form-text text-muted">Điền nội dung vào đây</small>
                    </div>
                    <button onClick={() => this.submitBtn(this.state.noteTitle, this.state.noteContent)} type="reset" className="btn btn-primary btn-block">Lưu</button>
                    </form>
                </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        editItem: state.editItem,
        addStatus: state.isAdd
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        addDataStore: (getItem) => {
            dispatch({
                type: 'ADD',
                getItem
            })
        },
        editDataStore: (getItem) => {
            dispatch({
                type: 'EDIT',
                getItem
            })
        },
        changeEditStatus: () => {
            dispatch({
                type: "CHANGE"
            })
        },
        changeAlertOn: (alertContent, alertType) => {
            dispatch({
                type: "CHANGE_ALERT_ON",
                alertContent,
                alertType
            })
        },
        changeAlertOff: () => {
            dispatch({
                type: "CHANGE_ALERT_OFF"
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteForm)