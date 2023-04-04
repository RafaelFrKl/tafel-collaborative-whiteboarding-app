const CreateUserForm = ({
    handleSubmit,
    handleUsernameChange,
    handleNameChange,
    handlePasswordChange,
    username,
    fullName,
    password
}) => {
    return (
        <div>
            <h2>New Account</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    username
                    <input
                        value={username}
                        onChange={handleUsernameChange}
                    />
                </div>
                <div>
                    full name
                    <input
                        value={fullName}
                        onChange={handleNameChange}
                    />
                </div>
                <div>
                    password
                    <input
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </div>
                <button type="submit">Create Account</button>
            </form>
        </div>
    )
}

export default CreateUserForm