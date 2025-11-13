import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormFeedback,
} from 'reactstrap';

const invitialValues = {
    email: '',
    password: '',
    terms: false,
}

const errorMessages = {
  email:"Geçerli bir email giriniz...",
  password:"güçlü bir parola olusturun... En az 4 karakterden olusmalı ve 1 adet büyük harf, 1 adet özel karakter, rakam içermelidir.",
  terms:"Lütfen şartları kabul edin",
}
export default function Login() {
  const history = useHistory();
  const [form, setForm] = useState(invitialValues);
  const [errors, setErrors] = useState({
    email: false,
    password: false,
    terms: false,
  });
  const [isValid, setIsValid] = useState(false);

   const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{4,15}$/;



useEffect(() => {
  if (validateEmail(form.email) && regex.test(form.password) && form.terms ) {
    setIsValid(true);
    }else{
      setIsValid(false);
    }
}, [form]);





  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    });
    if(name === "email"){
      if(validateEmail(value)){
        setErrors({...errors, [name]: false});
      }else {
        setErrors({...errors, [name]: true});
      }
    }
if(name === "password"){
  if(regex.test(value)){
    setErrors({...errors, [name]: false});
  }else{
    setErrors({...errors, [name]: true});
  }
}
 if (name === 'terms') {
      if (value) {
        setErrors({ ...errors, [name]: false });
      } else {
        setErrors({ ...errors, [name]: true });
      }
      }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isValid) return;
    history.push('/success');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          value={form.email}
          onChange={handleChange}
          invalid={errors.email}
        />
        {errors.email && <FormFeedback> {errorMessages.email}</FormFeedback>}

      </FormGroup>

      <FormGroup>
        <Label for="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Lütfen parola giriniz"
          value={form.password}
          onChange={handleChange}
          invalid={errors.password}
        />
        {errors.password && <FormFeedback> {errorMessages.password}</FormFeedback>}

      </FormGroup>

      <FormGroup check>
        <Input
          id="terms"
          name="terms"
          checked={form.terms}
          type="checkbox"
          onChange={handleChange}
        />{' '}
        <Label htmlFor="terms" check>
          I agree to terms of service and privacy policy
        </Label>
      </FormGroup>


      <FormGroup className="text-center p-4">
        <Button color="primary" disabled={!isValid} type="submit">
          Sign In
        </Button>
      </FormGroup>
    </Form>
  );
}
