import React from 'react';
import { Modal, Input, Button } from 'antd';

class UserModal extends  React.Component {

    constructor(props) {
        super(props);

        this.MAX = 50;

        this.state = {
            value: ''
        }
    }

    handleTextChange = (e) => {
        const { target: { value } } = e;
        const newValue = value.slice(0, this.MAX);

        this.setState({
            value: newValue
        });
    }

    handleModalConfirm = () => {
        const { onUsernameCompleted } = this.props;

        if (this.state.value) {
            onUsernameCompleted(this.state.value);
            this.setState({ value: '' })
        }

    }

    getFooter = () => {
        return (
            <Button
                onClick={this.handleModalConfirm}
                type="primary">confirm</Button>
        );
    }

    render() {
        const { visible } = this.props;

        return (
            <Modal
                title="User"
                centered
                closable={false}
                maskClosable={false}
                footer={this.getFooter()}
                visible={visible}>
                <Input
                    onChange={this.handleTextChange}
                    value={this.state.value}
                    size="large"
                />
            </Modal>
        );
    }
}

export default UserModal;