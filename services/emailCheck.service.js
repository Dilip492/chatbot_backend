import axios from "axios";
import dotenv from "dotenv"
dotenv.config();

const checkEmail = async (email) => {
    const res = await axios.get(
        `https://emailreputation.abstractapi.com/v1/?api_key=${process.env.ABSTRACT_API_KEY}&email=${email}`,
    );

    return res.data;
};

export default checkEmail;