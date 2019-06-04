import React from 'react';
import { Modal, Input } from 'antd';

class TextModal extends  React.Component {

    constructor(props) {
        super(props);

        this.MAX = 100;

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
        const { onTextCompleted } = this.props;

        onTextCompleted(this.state.value);

        this.setState({ value: '' })
    }

    render() {
        const { visible, onModalDismiss } = this.props;

        return (
            <Modal
                title="Text"
                centered
                visible={visible}
                onOk={this.handleModalConfirm}
                onCancel={onModalDismiss}>
                <Input
                    onChange={this.handleTextChange}
                    value={this.state.value}
                    size="large"
                    onPressEnter={this.handleModalConfirm}
                    placeholder="Text goes here"
                />
            </Modal>
        );
    }
}

export default TextModal;