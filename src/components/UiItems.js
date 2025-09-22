import './UiItems.css';

export function Button({ type, children, onClick, className }) {
    return (
        <button type={type} className={`button ${className || ""}`} onClick={onClick}>
            {children}
        </button>
    );
}

export function ErrorAlert({ message }) {
    return <div className="error-alert">{message}</div>;
}

export function Input({ label, type, value, onChange, required }) {
    return (
        <div className="input-group">
            <label htmlFor={label}>{label}</label>
            {type === 'textarea' ? (
                <textarea
                    id={label}
                    value={value}
                    onChange={onChange}
                    required={required}
                />
            ) : (
                <input
                    type={type}
                    id={label}
                    value={value}
                    onChange={onChange}
                    required={required}
                />
            )}
        </div>
    );
}

export function LoadingSpinner() {
    return <div className="loading-spinner">Loading...</div>;
}

export function Select({ label, value, onChange, options, usersSequrityLevel = null }) {
    let userOptions = options;

    if (usersSequrityLevel !== null) {
        userOptions = options.filter((_, index) => index <= usersSequrityLevel);
    }

    return (
        <div className="select-group">
            <label htmlFor={label}>{label}</label>
            <select id={label} value={value} onChange={onChange}>
                {userOptions.map((option, index) => (
                    <option
                        key={index}
                        value={typeof option === "string" ? option : index}
                    >
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
}
