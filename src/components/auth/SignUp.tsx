import { useState } from "react";
// import  { Dispatch, SetStateAction } from "react";
import axios from 'axios';
import CreateAccount from "./CreateAccount";
import PersonalInfo from "./PersonalInfo";
import Login from "./Login";

// type IAccountDetails = {
//   username: string;
//   password: string;
//   name: string;
//   email: string;
//   age: number;
//   sex: string;
//   height: number;
//   weight: number;
//   experience: number;
//   goals: string;
//   equipment: boolean;
//   trainer: boolean;
//   profile_pic: string;
//   online_status: boolean;
// }

const SignUp = () => {
  const [accountDetails, setAccountDetails] = useState({});
  const [personalDetails, setPersonalDetails] = useState({});
  const [step, setStep] = useState(1)

  const handleCreateAccount = (inputs) => {
    // setAccountDetails(values => ({...values, username: inputs.username, password: inputs.password, email: inputs.email}));
    setAccountDetails(inputs);
    setStep(step + 1);
  };

  const handlePersonalInfo = (inputs) => {
    setPersonalDetails(inputs)
    postSignup(accountDetails, inputs);
    // setStep(step + 1);
  };

  const postSignup = (accountDetails, personalDetails) => {
    const completedDetails = {
      ...accountDetails,
      ...personalDetails
    };

    axios.post('http://localhost:8080/signup', completedDetails)
    .then(() => setStep(step + 1))
    .catch((err) => {
      console.error(err);
      alert('Whoops! Something went wrong. Try again in a few moments.')
    });
  };


  return (
    <div>
      {
        step === 1 ?
          <CreateAccount
            handleCreateAccount={handleCreateAccount}
          />
        : step == 2 ?
          <PersonalInfo
            handlePersonalInfo={handlePersonalInfo}
          />
        : <Login/>
      }
    </div>
  );
}

export default SignUp;