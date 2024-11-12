import { useField } from "../hooks/hooks";
import loginService from "../services/login";
const LoginForm = () => {
    const { reset: usernameReset, ...username } = useField("text");
    const { reset: passwordReset, ...password } = useField("password");

    const handleSubmit = (event) => {
        event.preventDefault();
        loginService.login({
            username: username.value,
            password: password.value,
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input {...username} />
            <input {...password} />
            <input />
            <button>Log in</button>
        </form>
    );
};

export default LoginForm;
