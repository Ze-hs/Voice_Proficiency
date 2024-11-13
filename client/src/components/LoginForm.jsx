import { useDispatch } from "react-redux";
import { useField } from "../hooks/hooks";
import { login } from "../reducers/userReducer";
const LoginForm = () => {
    const dispatch = useDispatch();

    const { reset: usernameReset, ...username } = useField("text");
    const { reset: passwordReset, ...password } = useField("password");

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(login({ username: username.value, password: password.value }));
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Username</label>
                <input {...username} />
                <br />
                <label>Password</label>
                <input {...password} />
                <br />
                <button>Log in</button>
            </form>
        </div>
    );
};

export default LoginForm;
