import './styles/modal.css'

const Modal = ({title, text, okButton, cancelButton, okFunction, cancelFunction, action = 'OK', display, setDisplay}) => {
    const close = () => {
        setDisplay('none')
    }

    return (
        <div className="modal-overlay" style={{display: display}}>
            <div className="modal-window">
                <p className="modal-title">{title}</p>
                <div className="modal-main">
                    <p className="modal-text">{text}</p>
                    <div className="modal-buttons">
                    {
                        cancelButton && 
                        <button className="modal-cancel" onClick={close}>Отмена</button>
                    }
                    {
                        okButton && 
                        <button className="modal-ok" onClick={okFunction}>{action}</button>
                    }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal