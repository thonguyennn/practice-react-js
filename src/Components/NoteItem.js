import React, { Component } from 'react';
import { connect } from 'react-redux';

class NoteItem extends Component {
    twoActionBtn = () => {
        this.props.changeEditStatus() // thay đôi trạng thái

        // truyền dữ liệu cần sửa vào form
        // console.log(this.props.note)

        this.props.getEditData(this.props.note)

    }
    deleteData = () => {
        this.props.getDeleteData(this.props.note.id)
        this.props.changeAlertOn("Xóa ghi chú thành công","danger")
    }
    render() {
        return (
            <div>
                <div className="card">
                    <div className="card-header" role="tab" id="note1">
                        <h5 className="mb-0">
                        <a data-toggle="collapse" data-parent="#noteList" href={"#number " +this.props.i} aria-expanded="true" aria-controls="noteList__content1">
                            {this.props.noteTitle}
                        </a>
                        <div className="btn-group float-right">
                                <button className="btn btn-outline-info" onClick={() => this.twoActionBtn()}>Sửa</button>
                                <button className="btn btn-outline-secondary" onClick={() => this.deleteData()}>Xóa</button>
                        </div>
                        </h5>
                    </div>
                    <div id={"number " +this.props.i} className="collapse in" role="tabpanel" aria-labelledby="note1">
                        <div className="card-body">
                            {this.props.noteContent}
                        </div>
                    </div>
                    </div>
            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        editStatus: state.isEdit
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        changeEditStatus: () => {
            dispatch({
                type: "CHANGE"
            })
        },
        getEditData: (editObject) => {
            dispatch({
                type: "GET_DATA",
                editObject
            })
        },
        getDeleteData: (deleteId) => {
            dispatch({
                type: "DELETE",
                deleteId
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


export default connect(mapStateToProps, mapDispatchToProps)(NoteItem)