import * as EmailValidator from "email-validator";

export function minLength(n: number) {
  return (s: string) => {
    if (s.length >= n) return null;
    return {
      minLength: n,
    };
  };
}

export function required() {
  return (v: any) => {
    if (!!v) {
      return null;
    }
    return {
      required: true,
    };
  };
}

export function validPhone(input: string): null | any {
  const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  if (phoneRegex.test(input)) {
    return null;
  } else {
    return {
      invalidPhone: true,
    };
  }
}

export function validMail(input: string): any | null {
  if (EmailValidator.validate(input)) {
    return null;
  } else {
    return {
      invalidMail: true,
    };
  }
}

export function validNumber() {
  return (input: string) => {
    if (parseFloat(input)) {
      return null;
    } else {
      return {
        invalidNumber: true,
      };
    }
  };
}

export function validInt() {
  return (input: string) => {
    if (parseInt(input)) {
      return null;
    } else {
      return {
        invalidNumber: true,
      };
    }
  };
}
