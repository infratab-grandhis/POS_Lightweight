import React from 'react';
import './ConfirmDialog.css';

const ConfirmDialog = ({ 
    isOpen, 
    title, 
    message, 
    confirmText = 'Confirm', 
    cancelText = 'Cancel',
    onConfirm, 
    onCancel,
    type = 'default' // default, danger, warning
}) => {
    if (!isOpen) return null;

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onCancel();
        }
    };

    return (
        <div className="confirm-dialog-backdrop" onClick={handleBackdropClick}>
            <div className={`confirm-dialog confirm-dialog-${type}`} role="dialog" aria-modal="true">
                <div className="confirm-dialog-header">
                    <h3 className="confirm-dialog-title">{title}</h3>
                </div>
                
                <div className="confirm-dialog-body">
                    <p className="confirm-dialog-message">{message}</p>
                </div>
                
                <div className="confirm-dialog-footer">
                    <button 
                        className="confirm-dialog-button confirm-dialog-cancel"
                        onClick={onCancel}
                        autoFocus
                    >
                        {cancelText}
                    </button>
                    <button 
                        className={`confirm-dialog-button confirm-dialog-confirm confirm-dialog-confirm-${type}`}
                        onClick={onConfirm}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDialog;
