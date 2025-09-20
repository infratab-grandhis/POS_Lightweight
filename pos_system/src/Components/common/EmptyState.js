import React from 'react';
import Button from './Button';
import './EmptyState.css';

const EmptyState = ({ 
  icon = '📭',
  title = 'Nothing here yet',
  message = 'Add some items to get started!',
  actionText,
  onAction,
  className = ''
}) => {
  return (
    <div className={`empty-state ${className}`}>
      <div className="empty-state-icon">{icon}</div>
      <h2 className="empty-state-title">{title}</h2>
      <p className="empty-state-message">{message}</p>
      {actionText && onAction && (
        <Button variant="primary" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
