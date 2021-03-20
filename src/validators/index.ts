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
  