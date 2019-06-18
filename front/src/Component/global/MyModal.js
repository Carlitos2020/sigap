import React, { Component } from 'react';
import { Modal, ModalFooter, ModalHeader, ModalBody, Button, Label, Input } from 'reactstrap';
//import {Modal,ModalManager,Effect} from 'react-dynamic-modal';
import './css/bootstrap.css';

class MyModal extends Component {

    constructor(props) {
        super(props);
        this.handlerGuardar = this.handlerGuardar.bind(this);
        this.close = this.close.bind(this);
        this.texto = React.createRef();
        this.state = {
            modal: false
        }
    }
    componentWillMount() {
        this.setState({
            modal: this.props.estado
        })
    }
    handlerGuardar() {
        let data = this.texto.current.value;
        // console.log(data);
        this.props.change(data, this.props.id_rec);
        //  ModalManager.close();
        this.setState({
            modal: false
        })
    }
    close() {
        this.setState({
            modal: false
        })
    }
    render() {
        let obs = this.props.obs;
        //const { text } = this.props;
        //console.log(text);
        const externalCloseBtn = <button className="close" style={{ position: 'absolute', top: '15px', right: '15px' }} onClick={this.close}>&times;</button>;
        return (
            <div>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} external={externalCloseBtn}>
                    <ModalHeader>
                        <Label>Observaciones</Label>
                    </ModalHeader>
                    <ModalBody>
                        <Input type="textarea" readOnly className="form-control" id="message-text" defaultValue={obs} />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.close}>Cerrar</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}
export default MyModal;