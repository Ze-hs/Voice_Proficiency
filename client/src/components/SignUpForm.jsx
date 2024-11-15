import { useDispatch } from "react-redux";
import { useField } from "../hooks/hooks";
import { signUp } from "../reducers/userReducer";
const SignUpForm = () => {
    const { reset: nameReset, ...name } = useField("text");
    const { reset: usernameReset, ...username } = useField("text");
    const { reset: passwordReset, ...password } = useField("password");

    const dispatch = useDispatch();

    const handleSumbit = (event) => {
        event.preventDefault();
        dispatch(
            signUp({
                name: name.value,
                username: username.value,
                password: password.value,
            })
        );
    };

    return (
        <form onSubmit={handleSumbit}>
            <label>name</label>
            <input {...name}></input>

            <label>Username</label>
            <input {...username}></input>

            <label>password</label>
            <input {...password}></input>
        </form>
    );
};

export default SignUpForm;
